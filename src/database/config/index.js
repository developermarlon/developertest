//config asociations
import '../asociations'

//import models
import UserRole from '../models/user-role'
import User from '../models/user'

//import packages
import bcrypt from 'bcrypt'

//define types user
const roles = [
    {
        name: 'admin',
        state: 1
    },
    {
        name: 'client',
        state: 1
    } 
]

//define user
const users = [
    {
        name: 'Marlon Torres Lozano',
        email: 'developer.marlon.torres@gmail.com',
        password: 'semeolvido123',
        role: 'admin',
        photo: 'https://res.cloudinary.com/hnhnaig2j/image/upload/v1617161423/default/default-user_ynpwjb.png'
    },
]

const main = (async () => {

    //insert type users
    for(let i = 0; i < roles.length; i++) {
        try {
            await UserRole.create(roles[i]) 
        }catch(error) {
            // console.log(error)
        }
    }

    //insert users
    for(let i = 0; i < users.length; i++) {
        try {
            const role = await UserRole.findOne({
                attributes: ['id_role'],
                where: {
                    name: users[i].role
                }
            })

            //encrypt password
            users[i].password = await bcrypt.hash(users[i].password, 10)

            //await bcrypt.compare(password, user.password)

            //update user type by primary key
            users[i].role = role.dataValues.id_role

            await User.create(users[i]) 
        }catch(error) {
            // console.log(error)
        }
    }

})()