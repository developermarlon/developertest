"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _cors = _interopRequireDefault(require("cors"));

var _product = _interopRequireDefault(require("./routes/product.routes"));

var _user = _interopRequireDefault(require("./routes/user.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import packages
//import routes
//settings
var app = (0, _express.default)(); // instance app from express

_dotenv.default.config({
  // ==> config switch environment variables
  path: ".env.".concat(process.env.NODE_ENV)
}); //middlewares


app.use((0, _morgan.default)('dev')); // config logs app

app.use(_express.default.json());
app.use(_express.default.urlencoded({
  extended: false
}));
app.use((0, _cors.default)()); //public folder

app.use(_express.default.static(__dirname + '/public')); //config routes

app.use('/products', _product.default);
app.use('/users', _user.default); // export default app express

var _default = app;
exports.default = _default;