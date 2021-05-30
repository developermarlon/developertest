import {Model, DataTypes} from 'sequelize'
import sequelize from '../db'

class UserRole extends Model{} 

UserRole.init({
    id_role: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }, 
    name:  {
        type: DataTypes.STRING(50),
        unique: true
    },
    state: DataTypes.INTEGER
},{
    sequelize, 
    modelName: 'user_role'
})

export default UserRole