"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  host: process.env.NODE_ENV === 'production' ? 'ec2-52-45-73-150.compute-1.amazonaws.com' : 'localhost',
  database: process.env.NODE_ENV === 'production' ? 'd8dvk7kpnmgu5p' : 'example-crud',
  port: process.env.NODE_ENV === 'production' ? '5432' : 3306,
  user: process.env.NODE_ENV === 'production' ? 'ahyubmllzzldza' : 'root',
  dialect: process.env.NODE_ENV === 'production' ? 'postgres' : 'mysql',
  password: process.env.NODE_ENV === 'production' ? 'ce12acc9a6baf1103cbe1dbfe55b91e6262358c104060a16ec77cc69786a4b85' : ''
};
exports.default = _default;