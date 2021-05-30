import {Model, DataTypes} from 'sequelize'
import sequelize from '../db'

class User extends Model{}

User.init({
    id_user: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(),
        required: true
    },
    email: {
        type: DataTypes.STRING(),
        required: true,
        unique: true
    },
    password: {
        type: DataTypes.STRING(),
        required: true
    },
    photo: {
        type: DataTypes.STRING()
    },
    role: DataTypes.INTEGER
}, {
    sequelize,
    modelName: 'user'
})

export default User