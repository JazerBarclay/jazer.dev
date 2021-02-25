const db = require('../../database/dbConnection')

module.exports = {
    create: (data, callBack) => {
        db.query(
            `INSERT INTO posts (
                author, slug, title, description, body
            ) VALUES ($1,$2,$3,$4,$5) RETURNING *;`,
            [data.user_id, data.slug, data.title, data.description, data.body],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    },
    getAll: (data, callBack) => {
        db.query(
            `SELECT * FROM posts ORDER BY post_id DESC;`,
            [],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    },
    getPublished: (data, callBack) => {
        db.query(
            `SELECT * FROM posts WHERE published IS NOT NULL ORDER BY post_id DESC;`,
            [],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    },
    getByID: (id, callBack) => {
        db.query(
            `SELECT * FROM posts WHERE post_id = $1;`,
            [id],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    },
    getBySlug: (slug, callBack) => {
        db.query(
            `SELECT * FROM posts WHERE slug = $1;`,
            [slug],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    },
    update: (data, callBack) => {
        db.query(
            `UPDATE posts SET slug=$1, title=$2, description=$3, body=$4 , published=$5 WHERE post_id=$6 RETURNING *;`,
            [data.slug, data.title, data.description, data.body, data.published, data.id],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    },
    remove: (id, callBack) => {
        db.query(
            `DELETE FROM posts WHERE post_id = $1;`,
            [id],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    }
}