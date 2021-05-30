"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = require("sequelize");

var _db = _interopRequireDefault(require("../db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class User extends _sequelize.Model {}

User.init({
  id_user: {
    type: _sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: _sequelize.DataTypes.STRING(),
    required: true
  },
  email: {
    type: _sequelize.DataTypes.STRING(),
    required: true,
    unique: true
  },
  password: {
    type: _sequelize.DataTypes.STRING(),
    required: true
  },
  photo: {
    type: _sequelize.DataTypes.STRING()
  },
  role: _sequelize.DataTypes.INTEGER
}, {
  sequelize: _db.default,
  modelName: 'user'
});
var _default = User;
exports.default = _default;