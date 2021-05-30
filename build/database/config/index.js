"use strict";

require("../asociations");

var _userRole = _interopRequireDefault(require("../models/user-role"));

var _user = _interopRequireDefault(require("../models/user"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//define types user
var roles = [{
  name: 'admin',
  state: 1
}, {
  name: 'client',
  state: 1
}]; //define user

var users = [{
  name: 'Marlon Torres Lozano',
  email: 'developer.marlon.torres@gmail.com',
  password: 'semeolvido123',
  role: 'admin',
  photo: 'https://res.cloudinary.com/hnhnaig2j/image/upload/v1617161423/default/default-user_ynpwjb.png'
}];

var main = _asyncToGenerator(function* () {
  //insert type users
  for (var i = 0; i < roles.length; i++) {
    try {
      yield _userRole.default.create(roles[i]);
    } catch (error) {// console.log(error)
    }
  } //insert users


  for (var _i = 0; _i < users.length; _i++) {
    try {
      var role = yield _userRole.default.findOne({
        attributes: ['id_role'],
        where: {
          name: users[_i].role
        }
      }); //encrypt password

      users[_i].password = yield _bcrypt.default.hash(users[_i].password, 10); //await bcrypt.compare(password, user.password)
      //update user type by primary key

      users[_i].role = role.dataValues.id_role;
      yield _user.default.create(users[_i]);
    } catch (error) {// console.log(error)
    }
  }
})();