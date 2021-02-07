const { verify } = require('jsonwebtoken')

module.exports = {
    validate: (req, res, next) => {
        let token = req.get('authorization')
        if (!token) return res.status(403).json({message: "Access Denied! Unauthorised User"})
        // Remove 'Bearer ' string before key
        token = token.slice(7)
        verify(token, process.env.JWT_KEY, (err, decoded) => {
            if (err) return res.status(403).json({message: "Access Denied! Invalid Token"})
            console.log(decoded)
            next()
        })
    }
}