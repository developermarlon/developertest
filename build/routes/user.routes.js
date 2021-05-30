"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _passport = _interopRequireDefault(require("passport"));

var UserController = _interopRequireWildcard(require("../controllers/user.controller"));

var _validateRole = _interopRequireDefault(require("../middlewares/validate-role"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import packages
//config
var router = (0, _express.Router)(); //controllers

//methods
router.post('/', _passport.default.authenticate('jwt', {
  session: false
}), (0, _validateRole.default)(['admin', 'client']), UserController.getUsers);
router.post('/verifyToken', _passport.default.authenticate('jwt', {
  session: false
}), UserController.verifyToken);
router.post('/login', UserController.login);
router.post('/register', UserController.register);
router.post('/uploadPhoto', UserController.uploadPhoto);
router.put('/updateUser', _passport.default.authenticate('jwt', {
  session: false
}), (0, _validateRole.default)(['admin']), UserController.updateUser);
router.put('/editProfile', _passport.default.authenticate('jwt', {
  session: false
}), UserController.editProfile);
router.post('/deleteUser', _passport.default.authenticate('jwt', {
  session: false
}), (0, _validateRole.default)(['admin']), UserController.deleteUser);
var _default = router;
exports.default = _default;