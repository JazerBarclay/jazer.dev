const db = require('../../database/dbConnection')

module.exports = {
    create: (data, callBack) => {
        db.query(
            `INSERT INTO posts (
                author, slug, title, body
            ) VALUES ($1,$2,$3,$4) RETURNING *;`,
            [data.user_id, data.slug, data.title, data.body],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    },
    getAll: (data, callBack) => {
        db.query(
            `SELECT * FROM posts;`,
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
            `UPDATE posts SET slug=$1, title=$2, body=$3, published=$4 WHERE post_id=$5 RETURNING *;`,
            [data.slug, data.title, data.body, data.published, data.id],
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