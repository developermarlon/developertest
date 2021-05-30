"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.server = void 0;

var _app = _interopRequireDefault(require("./app"));

var _socket = _interopRequireDefault(require("socket.io"));

require("./database/config");

require("./middlewares/local-strategy");

require("./middlewares/jwt-strategy");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//config db
//configure authentication strategies
//config app
var server = _app.default.listen(process.env.PORT); //web sockets


exports.server = server;
var io = new _socket.default(server);

_app.default.set('io', io);

io.on('connection', socket => {
  socket.emit('countClients', socket.client.conn.server.clientsCount);
  socket.broadcast.emit('countClients', socket.client.conn.server.clientsCount);
  socket.on('disconnect', () => {
    socket.emit('countClients', socket.client.conn.server.clientsCount);
    socket.broadcast.emit('countClients', socket.client.conn.server.clientsCount);
  });
});
console.log("listen on port ".concat(process.env.PORT));