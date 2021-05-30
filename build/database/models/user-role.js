"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = require("sequelize");

var _db = _interopRequireDefault(require("../db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UserRole extends _sequelize.Model {}

UserRole.init({
  id_role: {
    type: _sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: _sequelize.DataTypes.STRING(50),
    unique: true
  },
  state: _sequelize.DataTypes.INTEGER
}, {
  sequelize: _db.default,
  modelName: 'user_role'
});
var _default = UserRole;
exports.default = _default;