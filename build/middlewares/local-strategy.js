"use strict";

var _passport = _interopRequireDefault(require("passport"));

var _passportLocal = require("passport-local");

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _user = _interopRequireDefault(require("../database/models/user"));

var _userRole = _interopRequireDefault(require("../database/models/user-role"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

_passport.default.use(new _passportLocal.Strategy({
  usernameField: 'email',
  passwordField: 'password'
}, /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (email, password, callback) {
    try {
      var user = yield _user.default.findOne({
        where: {
          email
        },
        include: [{
          attributes: ['name'],
          model: _userRole.default,
          required: false
        }]
      });

      if (user) {
        if (!(yield _bcrypt.default.compare(password, user.dataValues.password))) return callback(null, false, {
          message: 'Incorrect email or password.'
        });
        return callback(null, {
          id_user: user.dataValues.id_user,
          name: user.dataValues.name,
          email: user.dataValues.email,
          photo: user.dataValues.photo,
          role: user.dataValues.user_role.dataValues.name
        }, {
          message: 'Logged In Successfully'
        });
      } else {
        return callback(null, false, {
          message: 'Incorrect email or password.'
        });
      }
    } catch (error) {
      callback(error);
    }
  });

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}()));