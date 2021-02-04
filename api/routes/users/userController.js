const { getAll } = require('./userService')

module.exports = {
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
}