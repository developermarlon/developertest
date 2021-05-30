import User from './models/user.js'
import UserRole from './models/user-role.js'

//User
User.belongsTo(UserRole, {foreignKey: 'role'}) 

//UserRole
UserRole.hasOne(User, {foreignKey: 'role'})

//MODEL User
//User.hasMany(Appoiment, {foreignKey: 'id_user'}) 