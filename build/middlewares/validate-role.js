"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var validateRole = roles => {
  return function (req, res, next) {
    var type_user = req.user.dataValues.user_role.dataValues.name;
    if (roles.includes(type_user)) return next();
    res.status(400).json({
      message: 'invalid user role'
    });
  };
};

var _default = validateRole;
exports.default = _default;