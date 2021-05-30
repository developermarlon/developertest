"use strict";

var _app = _interopRequireDefault(require("../app"));

var _index = require("../index");

var _socket = require("socket.io");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var io = new _socket.Server(_index.server, {});

_app.default.set('io', io);

io.on("connection", socket => {
  socket.on('listen-server', data => {
    console.log('listen', data);
  });
});