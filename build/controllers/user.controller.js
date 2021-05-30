"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateUser = exports.editProfile = exports.register = exports.uploadPhoto = exports.login = exports.verifyToken = exports.deleteUser = exports.getUsers = void 0;

var _passport = _interopRequireDefault(require("passport"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _user = _interopRequireDefault(require("../database/models/user"));

var _userRole = _interopRequireDefault(require("../database/models/user-role"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _multer = _interopRequireDefault(require("multer"));

var _path = _interopRequireDefault(require("path"));

var _cloudinary = _interopRequireDefault(require("cloudinary"));

var _uuid = require("uuid");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getUsers = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    try {
      var _res = yield _user.default.findAll({
        where: {},
        include: [{
          attributes: ['name'],
          model: _userRole.default,
          required: true,
          where: {
            name: 'client'
          }
        }]
      });

      res.status(200).json(_res);
    } catch (error) {
      console.log(error);
    }
  });

  return function getUsers(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.getUsers = getUsers;

var deleteUser = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    try {
      var {
        id_user
      } = req.body;
      var io = req.app.get('io');
      yield _user.default.destroy({
        where: {
          id_user
        }
      });
      io.emit('updateUsers');
      res.status(200).json({
        message: 'User deleted successfully'
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        message: 'Sorry, the user was not deleted'
      });
    }
  });

  return function deleteUser(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.deleteUser = deleteUser;

var verifyToken = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    res.status(200).json({
      message: 'token verified'
    });
  });

  return function verifyToken(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.verifyToken = verifyToken;

var login = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (req, res) {
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
            id_user: user.id_user
          }, process.env.JWT_SECRET, {
            expiresIn: "1d"
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

  return function login(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.login = login;
var upload = (0, _multer.default)({
  storage: _multer.default.diskStorage({
    destination: _path.default.join(__dirname, '../public/uploads/profile'),
    filename: (res, file, cb) => {
      cb(null, (0, _uuid.v4)() + _path.default.extname(file.originalname).toLocaleLowerCase());
    }
  }),
  limits: {
    fileSize: 10000000
  },
  fileFilter: (req, file, cb) => {
    var filetypes = /jpeg|jpg|png|gif/;
    var mimetype = filetypes.test(file.mimetype);
    var extname = filetypes.test(_path.default.extname(file.originalname));

    if (mimetype && extname) {
      return cb(null, true);
    }

    cb("Error: The file must be an image");
  }
}).single('photo');

var uploadPhoto = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(function* (req, res, next) {
    yield upload(req, res, /*#__PURE__*/function () {
      var _ref6 = _asyncToGenerator(function* (err, result) {
        if (err) {
          return res.status(400).json({
            message: err.message
          });
        }

        yield _cloudinary.default.v2.uploader.upload(req.file.path, {
          folder: "example/profile",
          gravity: "face",
          crop: "thumb",
          public_id: req.file.filename,
          width: 200
        }, (err, result) => {
          if (err) {
            console.log(err);
          }

          if (result) {
            res.status(200).json({
              message: 'Photo uploaded successfully',
              routeImage: result.secure_url
            });
          }
        });
      });

      return function (_x12, _x13) {
        return _ref6.apply(this, arguments);
      };
    }());
  });

  return function uploadPhoto(_x9, _x10, _x11) {
    return _ref5.apply(this, arguments);
  };
}();

exports.uploadPhoto = uploadPhoto;

var register = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(function* (req, res) {
    try {
      var {
        name,
        email,
        password,
        photo
      } = req.body;
      var io = req.app.get('io');
      var role = yield _userRole.default.findOne({
        attributes: ['id_role'],
        where: {
          name: 'client'
        }
      });
      var encryptPassword = yield _bcrypt.default.hash(password, 10);
      yield _user.default.create({
        name,
        email,
        password: encryptPassword,
        role: role.dataValues.id_role,
        photo
      });
      io.emit('updateUsers');
      res.status(200).json({
        message: 'User created successfully'
      });
    } catch (error) {
      // console.log(error)
      res.status(400).json({
        message: 'Sorry, the user already exist'
      });
    }
  });

  return function register(_x14, _x15) {
    return _ref7.apply(this, arguments);
  };
}();

exports.register = register;

var editProfile = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(function* (req, res) {
    try {
      var {
        name,
        email,
        photo
      } = req.body;
      yield _user.default.update({
        name,
        email,
        photo
      }, {
        where: {
          id_user: req.user.dataValues.id_user
        }
      });
      res.status(200).json({
        message: 'User updated successfully'
      });
    } catch (error) {
      // console.log(error)
      res.status(400).json({
        message: 'Sorry, the user was not updated'
      });
    }
  });

  return function editProfile(_x16, _x17) {
    return _ref8.apply(this, arguments);
  };
}();

exports.editProfile = editProfile;

var updateUser = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator(function* (req, res) {
    try {
      var {
        id_user,
        name,
        email,
        photo
      } = req.body;
      var io = req.app.get('io');
      yield _user.default.update({
        name,
        email,
        photo
      }, {
        where: {
          id_user
        }
      });
      io.emit('updateUsers');
      res.status(200).json({
        message: 'User updated successfully'
      });
    } catch (error) {
      // console.log(error)
      res.status(400).json({
        message: 'Sorry, the user was not updated'
      });
    }
  });

  return function updateUser(_x18, _x19) {
    return _ref9.apply(this, arguments);
  };
}();

exports.updateUser = updateUser;