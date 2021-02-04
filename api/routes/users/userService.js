const db = require('../../database/dbConnection')

module.exports = {
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
}