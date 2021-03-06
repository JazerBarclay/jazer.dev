const { verify } = require('jsonwebtoken')

module.exports = {
    validate: (req, res, next) => {
        let token = req.get('authorization')
        if (!token) {
            req.body.auth = {
                user_id: 0,
                username: 'guest',
                verified: false
            }
            return next()
        }
        
        // Remove 'Bearer ' string before key
        token = token.slice(7)
        verify(token, process.env.JWT_KEY, (err, decoded) => {
            if (err) return res.status(403).json({message: "Error - Invalid Token"})
            req.body.auth = decoded.result
            return next()
        })
    }
}