"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = require("sequelize");

var _db = _interopRequireDefault(require("../constans/db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sequelize = new _sequelize.Sequelize(_db.default.database, _db.default.user, _db.default.password, {
  host: _db.default.host,
  dialect: _db.default.dialect,
  port: _db.default.port,
  timezone: 'America/Bogota',
  dialectOptions: {
    timezone: 'local'
  },
  pool: {
    max: 5,
    min: 0,
    require: 30000,
    idle: 10000
  },
  logging: false
});
sequelize.sync({
  force: false
});
var _default = sequelize;
exports.default = _default;