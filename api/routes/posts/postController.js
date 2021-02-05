const { response } = require('express')
const { create, getAll, getByID, update, remove } = require('./postService')

module.exports = {
    createPost: (req,res) => {
        const body = req.body
        create(body, (err, results) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            
            return res.status(200).json({
                success: 1,
                data: results.rows[0]
            })
        })
    },
    getPosts: (req,res) => {
        getAll(null, (err, results) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }

            if (!results.rows[0]) return res.status(404).json({success: 0, message: "No records found"})

            return res.status(200).json({
                success: 1,
                data: results.rows
            })
        })
    },
    getPostByID: (req,res) => {
        getByID(req.params.id, (err, results) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }

            if (!results.rows[0]) return res.status(404).json({success: 0, message: "No record found"})
            
            if (req.params.slug != results.rows[0].slug) return res.redirect(301, "/post/"+req.params.id+"/"+results.rows[0].slug)
            
            return res.status(200).json({
                success: 1,
                data: results.rows[0]
            })
        })
    },
    getPostBySlug: (req,res) => {
        getBySlug(req.params.slug, (err, results) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            
            if (!results.rows[0]) return res.status(404).json({success: 0, message: "No record found"})
            
            return res.status(200).json({
                success: 1,
                data: results.rows[0]
            })
        })
    },
    updatePost: (req,res) => {
        const body = req.body
        req.body.id = req.params.id
        req.body.last_updated = Date.now
        update(body, (err, results) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            
            return res.status(200).json({
                success: 1,
                data: results.rows[0]
            })
        })
    },
    deletePost: (req,res) => {
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
            
            if (results.rowCount === 0) return res.status(404).json({success: 0, message: "Record not found"})
            
            return res.status(200).json({
                success: 1,
                message: "Post id: "+ req.params.id +" successfully deleted"
            })
        })
    }
}