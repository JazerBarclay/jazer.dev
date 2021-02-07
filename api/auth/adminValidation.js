module.exports = {
    isAdmin: (req, res, next) => {
        // If no auth sent or user id doesn't match admin id return 403 forbidden
        if (!req.get('authorization') || req.body.auth.user_id !== 1) 
            return res.status(403).json({message: "Access Denied! Unauthorised User"})
        return next()
    }
}