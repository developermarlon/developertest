const validateRole = (roles) => {
    return function(req, res, next) {
        const type_user = req.user.dataValues.user_role.dataValues.name
        if(roles.includes(type_user)) return next()
        res.status(400).json({
            message: 'invalid user role'
        })
    }
}

export default validateRole
