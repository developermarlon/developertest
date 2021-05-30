"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = require("sequelize");

var _db = _interopRequireDefault(require("../db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class TypeUser extends _sequelize.Model {}

TypeUser.init({
  id_type: {
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
  modelName: 'types_user'
}); // TypeUser.sync({force: true})

var _default = TypeUser;
exports.default = _default;