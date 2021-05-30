"use strict";

var _passport = _interopRequireDefault(require("passport"));

var _passportJwt = require("passport-jwt");

var _user = _interopRequireDefault(require("../database/models/user"));

var _userRole = _interopRequireDefault(require("../database/models/user-role"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

_passport.default.use(new _passportJwt.Strategy({
  jwtFromRequest: _passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
}, /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (jwtPayload, callback) {
    try {
      var user = yield _user.default.findOne({
        where: {
          id_user: jwtPayload.id
        },
        include: [{
          model: _userRole.default,
          required: false
        }]
      });
      if (user) return callback(null, user);
      return callback(null, false);
    } catch (error) {
      return callback(error);
    }
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}()));