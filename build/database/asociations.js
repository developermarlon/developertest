"use strict";

var _user = _interopRequireDefault(require("./models/user.js"));

var _userRole = _interopRequireDefault(require("./models/user-role.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//User
_user.default.belongsTo(_userRole.default, {
  foreignKey: 'role'
}); //UserRole


_userRole.default.hasOne(_user.default, {
  foreignKey: 'role'
}); //MODEL User
//User.hasMany(Appoiment, {foreignKey: 'id_user'})