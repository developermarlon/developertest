import passport from 'passport'
import { Strategy as JWTStrategy, ExtractJwt as ExtractJWT } from 'passport-jwt'
import User from '../database/models/user'
import UserRole from '../database/models/user-role'

passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey   : process.env.JWT_SECRET
    }, async (jwtPayload, callback) => {
        try {
            const user = await User.findOne({
                where: {
                    id_user: jwtPayload.id_user
                },
                include: [
                    {
                        model: UserRole,
                        required: false
                    }
                ]
            })
            if(user) return callback(null, user)
            return callback(null, false)
        }catch(error) {
            console.log(error)
            return callback(error)
        }
    }
));