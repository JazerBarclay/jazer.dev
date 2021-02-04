const db = require('../../database/dbConnection')

module.exports = {
    create: (data, callBack) => {
        db.query(
            `INSERT INTO users (
                email, username, password
            ) VALUES ($1,$2,$3) RETURNING *;`,
            [data.email, data.username, data.password],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    },
    getAll: (data, callBack) => {
        db.query(
            `SELECT * FROM users;`,
            [],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    },
    getByID: (id, callBack) => {
        db.query(
            `SELECT * FROM users WHERE user_id = $1;`,
            [id],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    },
    getByUsername: (username, callBack) => {
        db.query(
            `SELECT * FROM users WHERE username = $1;`,
            [username],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results.rows[0])
            }
        )
    },
    update: (data, callBack) => {
        db.query(
            `UPDATE users SET email=$1, username=$2, password=$3 WHERE user_id=$4 RETURNING *;`,
            [data.email, data.username, data.password, data.id],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    },
    delete: (id, callBack) => {
        db.query(
            `DELETE FROM users WHERE user_id = $1`,
            [id],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    }
}