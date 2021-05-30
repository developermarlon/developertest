import passport from 'passport'
import { Strategy as LocalStrategy }  from 'passport-local'
import bcrypt from 'bcrypt'
import User from '../database/models/user'
import UserRole from '../database/models/user-role'

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, async (email, password, callback) => {
        try {
            const user = await User.findOne({ 
                where: { email },
                include: [{
                    attributes: ['name'],
                    model: UserRole,
                    required: false
                }]
            })
            if(user) {
                if(!await bcrypt.compare(password, user.dataValues.password)) return callback(null, false, {message: 'Incorrect email or password.'})
                return callback(null,{id_user: user.dataValues.id_user, name: user.dataValues.name, email: user.dataValues.email, photo: user.dataValues.photo, role: user.dataValues.user_role.dataValues.name }, {message: 'Logged In Successfully'})
            }else{
                return callback(null, false, {message: 'Incorrect email or password.'})
            }
        }catch(error) {
            callback(error)
        }
    }
));