const { create, getAll, getByID, getByUsername, update, remove } = require('./userService')
const { genSaltSync, hashSync, compareSync } = require('bcrypt')

const { sign } = require('jsonwebtoken')

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
                    message: "Database connection error"
                });
            }
            results.rows[0].password = returnPass
            return res.status(200).json({
                data: results.rows[0]
            })
        })
    },
    getUsers: (req,res) => {
        getAll(null, (err, results) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                data: results.rows
            })
        })
    },
    getUserByID: (req,res) => {
        getByID(req.params.id, (err, results) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    message: "Database connection error"
                });
            }
            if (!results.rows[0]) res.status(404).json({message: "No record found"})
            return res.status(200).json({
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
                    message: "Database connection error"
                });
            }
            results.rows[0].password = returnPass
            return res.status(200).json({
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
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                message: "User id: "+ req.params.id +" successfully deleted"
            })
        })
    },
    login: (req, res) => {
        const body = req.body;
        getByUsername(body.username, (err, results) => {
            if (err) console.log(err)
            if (!results) return res.json({ message: "Invalid username or password"})
            const comp = compareSync(body.password, results.password)
            if (comp) {
                results.password = undefined
                const jsontoken = sign({result: results}, process.env.JWT_KEY, {expiresIn: "1h"})
                return res.json({
                    message: "Login Successful",
                    token: jsontoken
                })
            }
            return res.json({ message: "Invalid username or password"})
        })
    }
}