const { create, getAll, getByID, getByUsername, update, remove } = require('./userService')
const { genSaltSync, hashSync } = require('bcrypt')

module.exports = {
    createUser: (req,res) => {
        const body = req.body
        const salt = genSaltSync(10)
        const returnPass = body.password
        body.password = hashSync(body.password, salt)
        create(body, (err, results) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            results.rows[0].password = returnPass
            return res.status(200).json({
                success: 1,
                data: results.rows[0]
            })
        })
    },
    getUsers: (req,res) => {
        getAll(null, (err, results) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results.rows
            })
        })
    },
    getUserByID: (req,res) => {
        getByID(req.params.id, (err, results) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            if (!results.rows[0]) res.status(404).json({success: 0, message: "No record found"})
            return res.status(200).json({
                success: 1,
                data: results.rows[0]
            })
        })
    },
    updateUser: (req,res) => {
        const body = req.body
        req.body.id = req.params.id
        const salt = genSaltSync(10)
        const returnPass = body.password
        body.password = hashSync(body.password, salt)
        update(body, (err, results) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            results.rows[0].password = returnPass
            return res.status(200).json({
                success: 1,
                data: results.rows[0]
            })
        })
    },
    deleteUser: (req,res) => {
        const body = req.body
        req.body.id = req.params.id
        remove(req.params.id, (err, results) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success: 1,
                message: "User id: "+ req.params.id +" successfully deleted"
            })
        })
    },
}