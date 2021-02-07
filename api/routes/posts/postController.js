const e = require('express')
const { response } = require('express')
const { create, getAll, getPublished, getBySlug, getByID, update, remove } = require('./postService')

module.exports = {
    createPost: (req,res) => {
        const body = req.body
        create(body, (err, results) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    message: "Database connection error"
                });
            }
            
            return res.status(200).json({
                results: results.rows[0]
            })
        })
    },
    getPosts: (req,res) => {
        if (req.body.auth.user_id !== 1) {
            getPublished(null, (err, results) => {
                if (err) {
                    console.log(err)
                    return res.status(500).json({
                        message: "Database connection error"
                    });
                }
    
                return res.status(200).json({
                    results: results.rows
                })
            })
        } else {
            getAll(null, (err, results) => {
                if (err) {
                    console.log(err)
                    return res.status(500).json({
                        message: "Database connection error"
                    });
                }

                return res.status(200).json({
                    results: results.rows
                })
            })
        }
    },
    getPostByID: (req,res) => {
        getByID(req.params.id, (err, results) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    message: "Database connection error"
                });
            }

            if (!results.rows[0]) return res.status(404).json({message: "No record found"})
            
            if (req.params.slug != results.rows[0].slug) return res.redirect(301, "/post/"+req.params.id+"/"+results.rows[0].slug)
            
            return res.status(200).json({
                data: results.rows[0]
            })
        })
    },
    getPostBySlug: (req,res) => {
        getBySlug(req.params.slug, (err, results) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    message: "Database connection error"
                });
            }
            
            // If not admin, dont show unpublished posts
            // (fine to use filter rather than new query as single row response?)
            if (req.body.auth.user_id !== 1) 
                results.rows = results.rows.filter((item) => {
                    return item.published !== null;
                })

            if (!results.rows[0]) 
                return res.status(404).json({message: "No post found matching slug '"+req.params.slug+"'"})
            
            return res.status(200).json({
                results: results.rows[0]
            })
        })
    },
    updatePost: (req,res) => {
        const body = req.body
        req.body.slug = req.params.slug
        req.body.last_updated = Date.now
        update(body, (err, results) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    message: "Database connection error"
                });
            }
            
            return res.status(200).json({
                results: results.rows[0]
            })
        })
    },
    deletePost: (req,res) => {
        remove(req.params.slug, (err, results) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    message: "Database connection error"
                });
            }
            
            if (results.rowCount === 0) return res.status(404).json({success: 0, message: "Record not found"})
            
            return res.status(200).json({
                message: "Post id: "+ req.params.id +" successfully deleted"
            })
        })
    }
}