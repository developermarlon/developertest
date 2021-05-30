"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.login = void 0;

var _passport = _interopRequireDefault(require("passport"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var login = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    try {
      _passport.default.authenticate('local', {
        session: false
      }, (err, user, info) => {
        if (err || !user) {
          console.log(err);
          return res.status(400).json({
            message: 'Something is not right',
            user: user
          });
        }

        req.login(user, {
          session: false
        }, err => {
          if (err) {
            res.status(400).send(err);
          }

          var token = _jsonwebtoken.default.sign({
            id: user
          }, process.env.JWT_SECRET, {
            expiresIn: "20h"
          });

          return res.status(200).json({
            user,
            token: "Bearer ".concat(token)
          });
        });
      })(req, res);
    } catch (error) {// console.log(error)
    }
  });

  return function login(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.login = login;