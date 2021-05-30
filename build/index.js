"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.server = void 0;

var _app = _interopRequireDefault(require("./app"));

require("./database/config");

require("./middlewares/local-strategy");

require("./middlewares/jwt-strategy");

require("./libs/web-sckets");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//config db
//configure authentication strategies
//config app
var server = _app.default.listen(process.env.PORT); //web sockets


exports.server = server;
console.log("listen on port ".concat(process.env.PORT));