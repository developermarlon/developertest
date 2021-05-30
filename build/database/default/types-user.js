"use strict";

var _typeUser = _interopRequireDefault(require("../models/type-user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var types = [{
  name: 'superuser',
  state: 1
}, {
  name: 'admin',
  state: 1
}];

function createDefault() {
  return _createDefault.apply(this, arguments);
}

function _createDefault() {
  _createDefault = _asyncToGenerator(function* () {
    for (var i = 0; i < types.length; i++) {
      try {
        yield _typeUser.default.create(types[i]);
      } catch (error) {// console.log('type already exist')
      }
    }
  });
  return _createDefault.apply(this, arguments);
}

createDefault();