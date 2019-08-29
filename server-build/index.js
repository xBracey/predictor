/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/api/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/App.js":
/*!********************!*\
  !*** ./src/App.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _Home__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Home */ \"./src/Home.js\");\nvar _jsxFileName = \"/Users/tom/euro-predictor/src/App.js\";\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (() => {\n  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Home__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n    name: \"Alligator\",\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 5\n    },\n    __self: undefined\n  });\n});\n\n//# sourceURL=webpack:///./src/App.js?");

/***/ }),

/***/ "./src/Home.js":
/*!*********************!*\
  !*** ./src/Home.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\nvar _jsxFileName = \"/Users/tom/euro-predictor/src/Home.js\";\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (props => {\n  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h1\", {\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 4\n    },\n    __self: undefined\n  }, \"Hello \", props.name, \"!\");\n});\n\n//# sourceURL=webpack:///./src/Home.js?");

/***/ }),

/***/ "./src/api/index.js":
/*!**************************!*\
  !*** ./src/api/index.js ***!
  \**************************/
/*! exports provided: jwtOptions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"jwtOptions\", function() { return jwtOptions; });\n/* harmony import */ var dotenv_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dotenv/config */ \"dotenv/config\");\n/* harmony import */ var dotenv_config__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dotenv_config__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cors */ \"cors\");\n/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(cors__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-dom/server */ \"react-dom/server\");\n/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_dom_server__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! body-parser */ \"body-parser\");\n/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(body_parser__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var passport__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! passport */ \"passport\");\n/* harmony import */ var passport__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(passport__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var passport_jwt__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! passport-jwt */ \"passport-jwt\");\n/* harmony import */ var passport_jwt__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(passport_jwt__WEBPACK_IMPORTED_MODULE_9__);\n/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./models */ \"./src/api/models/index.js\");\n/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./routes */ \"./src/api/routes/index.js\");\n/* harmony import */ var _seeds__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./seeds */ \"./src/api/seeds/index.js\");\n/* harmony import */ var _routes_user__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./routes/user */ \"./src/api/routes/user.js\");\n/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../App */ \"./src/App.js\");\nvar _jsxFileName = \"/Users/tom/euro-predictor/src/api/index.js\";\n\n\n\n\n\n\n\n // import passport and passport-jwt modules\n\n\n // ExtractJwt to help extract the token\n\n\n\n\n\n\nconst app = express__WEBPACK_IMPORTED_MODULE_2___default()();\nconst force = \"false\" === \"true\";\nlet ExtractJwt = passport_jwt__WEBPACK_IMPORTED_MODULE_9___default.a.ExtractJwt; // JwtStrategy which is the strategy for the authentication\n\nlet JwtStrategy = passport_jwt__WEBPACK_IMPORTED_MODULE_9___default.a.Strategy;\nconst jwtOptions = {};\njwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();\njwtOptions.secretOrKey = \"pooliecrazy\"; // lets create our strategy for web token\n\nlet strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {\n  let user = Object(_routes_user__WEBPACK_IMPORTED_MODULE_13__[\"getUser\"])(jwt_payload.username);\n\n  if (user) {\n    next(null, user);\n  } else {\n    next(null, false);\n  }\n}); // use the strategy\n\npassport__WEBPACK_IMPORTED_MODULE_8___default.a.use(strategy);\nconsole.log(force);\napp.use(passport__WEBPACK_IMPORTED_MODULE_8___default.a.initialize());\napp.use(cors__WEBPACK_IMPORTED_MODULE_1___default()());\napp.use(express__WEBPACK_IMPORTED_MODULE_2___default.a.json());\napp.use(express__WEBPACK_IMPORTED_MODULE_2___default.a.urlencoded({\n  extended: true\n}));\napp.use(\"/user\", _routes__WEBPACK_IMPORTED_MODULE_11__[\"default\"].user);\napp.get(\"/*\", (req, res) => {\n  const app = react_dom_server__WEBPACK_IMPORTED_MODULE_4___default.a.renderToString(react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_App__WEBPACK_IMPORTED_MODULE_14__[\"default\"], {\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 50\n    },\n    __self: undefined\n  }));\n  const indexFile = path__WEBPACK_IMPORTED_MODULE_5___default.a.resolve(\"./build/index.html\");\n  fs__WEBPACK_IMPORTED_MODULE_6___default.a.readFile(indexFile, \"utf8\", (err, data) => {\n    if (err) {\n      console.error(\"Something went wrong:\", err);\n      return res.status(500).send(\"Oops, better luck next time!\");\n    }\n\n    return res.send(data.replace('<div id=\"root\"></div>', \"<div id=\\\"root\\\">\".concat(app, \"</div>\")));\n  });\n});\n_models__WEBPACK_IMPORTED_MODULE_10__[\"sequelize\"].sync({\n  force\n}).then(() => {\n  if (force) {\n    Object(_seeds__WEBPACK_IMPORTED_MODULE_12__[\"default\"])();\n  }\n\n  app.listen(\"3000\", () => {\n    console.log(\"Example app listening on port \".concat(\"3000\", \"!\"));\n  });\n});\n\n//# sourceURL=webpack:///./src/api/index.js?");

/***/ }),

/***/ "./src/api/models/group.js":
/*!*********************************!*\
  !*** ./src/api/models/group.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst group = (sequelize, DataTypes) => {\n  const Group = sequelize.define(\"group\", {\n    number: {\n      type: DataTypes.STRING(1),\n      primaryKey: true\n    }\n  });\n\n  Group.associate = models => {\n    Group.hasMany(models.Team);\n    Group.hasMany(models.Group_Match);\n  };\n\n  return Group;\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (group);\n\n//# sourceURL=webpack:///./src/api/models/group.js?");

/***/ }),

/***/ "./src/api/models/group_match.js":
/*!***************************************!*\
  !*** ./src/api/models/group_match.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst group_match = (sequelize, DataTypes) => {\n  const Group_Match = sequelize.define(\"group_match\", {\n    homeGoals: {\n      type: DataTypes.INTEGER\n    },\n    awayGoals: {\n      type: DataTypes.INTEGER\n    }\n  });\n\n  Group_Match.associate = models => {\n    Group_Match.belongsTo(models.Group);\n    Group_Match.belongsTo(models.Team, {\n      as: \"homeTeam\"\n    });\n    Group_Match.belongsTo(models.Team, {\n      as: \"awayTeam\"\n    });\n    Group_Match.belongsToMany(models.Player, {\n      through: models.Group_Match_Scorer\n    });\n    Group_Match.belongsToMany(models.User, {\n      through: models.Group_Prediction\n    });\n  };\n\n  return Group_Match;\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (group_match);\n\n//# sourceURL=webpack:///./src/api/models/group_match.js?");

/***/ }),

/***/ "./src/api/models/group_match_scorer.js":
/*!**********************************************!*\
  !*** ./src/api/models/group_match_scorer.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst group_match_scorer = (sequelize, DataTypes) => {\n  const Group_Match_Scorer = sequelize.define(\"group_match_scorer\");\n  return Group_Match_Scorer;\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (group_match_scorer);\n\n//# sourceURL=webpack:///./src/api/models/group_match_scorer.js?");

/***/ }),

/***/ "./src/api/models/group_prediction.js":
/*!********************************************!*\
  !*** ./src/api/models/group_prediction.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst group_prediction = (sequelize, DataTypes) => {\n  const Group_Prediction = sequelize.define(\"group_prediction\", {\n    home_goals: {\n      type: DataTypes.INTEGER,\n      allowNull: false\n    },\n    away_goals: {\n      type: DataTypes.INTEGER,\n      allowNull: false\n    }\n  });\n  return Group_Prediction;\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (group_prediction);\n\n//# sourceURL=webpack:///./src/api/models/group_prediction.js?");

/***/ }),

/***/ "./src/api/models/index.js":
/*!*********************************!*\
  !*** ./src/api/models/index.js ***!
  \*********************************/
/*! exports provided: sequelize, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"sequelize\", function() { return sequelize; });\n/* harmony import */ var sequelize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sequelize */ \"sequelize\");\n/* harmony import */ var sequelize__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sequelize__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _user__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./user */ \"./src/api/models/user.js\");\n/* harmony import */ var _group__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./group */ \"./src/api/models/group.js\");\n/* harmony import */ var _team__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./team */ \"./src/api/models/team.js\");\n/* harmony import */ var _group_match__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./group_match */ \"./src/api/models/group_match.js\");\n/* harmony import */ var _league__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./league */ \"./src/api/models/league.js\");\n/* harmony import */ var _user_league__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./user_league */ \"./src/api/models/user_league.js\");\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./player */ \"./src/api/models/player.js\");\n/* harmony import */ var _knockout_match__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./knockout_match */ \"./src/api/models/knockout_match.js\");\n/* harmony import */ var _group_match_scorer__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./group_match_scorer */ \"./src/api/models/group_match_scorer.js\");\n/* harmony import */ var _knockout_match_scorer__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./knockout_match_scorer */ \"./src/api/models/knockout_match_scorer.js\");\n/* harmony import */ var _group_prediction__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./group_prediction */ \"./src/api/models/group_prediction.js\");\n/* harmony import */ var _knockout_prediction__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./knockout_prediction */ \"./src/api/models/knockout_prediction.js\");\n\n\n\n\n\n\n\n\n\n\n\n\n\nconst sequelize =  true ? new sequelize__WEBPACK_IMPORTED_MODULE_0___default.a(\"europredictor\", \"europredictor\", \"europredictor\", {\n  dialect: \"postgres\"\n}) : undefined;\nconst models = {\n  Group: _group__WEBPACK_IMPORTED_MODULE_2__[\"default\"],\n  Player: _player__WEBPACK_IMPORTED_MODULE_7__[\"default\"],\n  Team: _team__WEBPACK_IMPORTED_MODULE_3__[\"default\"],\n  League: _league__WEBPACK_IMPORTED_MODULE_5__[\"default\"],\n  Group_Match: _group_match__WEBPACK_IMPORTED_MODULE_4__[\"default\"],\n  Knockout_Match: _knockout_match__WEBPACK_IMPORTED_MODULE_8__[\"default\"],\n  User: _user__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  Group_Match_Scorer: _group_match_scorer__WEBPACK_IMPORTED_MODULE_9__[\"default\"],\n  Knockout_Match_Scorer: _knockout_match_scorer__WEBPACK_IMPORTED_MODULE_10__[\"default\"],\n  Group_Prediction: _group_prediction__WEBPACK_IMPORTED_MODULE_11__[\"default\"],\n  Knockout_Prediction: _knockout_prediction__WEBPACK_IMPORTED_MODULE_12__[\"default\"],\n  User_League: _user_league__WEBPACK_IMPORTED_MODULE_6__[\"default\"]\n};\nObject.keys(models).forEach(key => {\n  if (\"associate\" in models[key]) {\n    models[key].associate(models);\n  }\n});\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (models);\n\n//# sourceURL=webpack:///./src/api/models/index.js?");

/***/ }),

/***/ "./src/api/models/knockout_match.js":
/*!******************************************!*\
  !*** ./src/api/models/knockout_match.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst knockout_match = (sequelize, DataTypes) => {\n  const Knockout_Match = sequelize.define(\"knockout_match\", {\n    home_goals: {\n      type: DataTypes.INTEGER,\n      allowNull: false\n    },\n    away_goals: {\n      type: DataTypes.INTEGER,\n      allowNull: false\n    }\n  });\n\n  Knockout_Match.associate = models => {\n    Knockout_Match.belongsTo(models.Team, {\n      as: \"home_team_id\"\n    });\n    Knockout_Match.belongsTo(models.Team, {\n      as: \"away_team_id\"\n    });\n    Knockout_Match.belongsToMany(models.Player, {\n      through: models.Knockout_Match_Scorer\n    });\n    Knockout_Match.belongsToMany(models.User, {\n      through: models.Knockout_Prediction\n    });\n  };\n\n  return Knockout_Match;\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (knockout_match);\n\n//# sourceURL=webpack:///./src/api/models/knockout_match.js?");

/***/ }),

/***/ "./src/api/models/knockout_match_scorer.js":
/*!*************************************************!*\
  !*** ./src/api/models/knockout_match_scorer.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst knockout_match_scorer = (sequelize, DataTypes) => {\n  const Knockout_Match_Scorer = sequelize.define(\"knockout_match_scorer\");\n  return Knockout_Match_Scorer;\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (knockout_match_scorer);\n\n//# sourceURL=webpack:///./src/api/models/knockout_match_scorer.js?");

/***/ }),

/***/ "./src/api/models/knockout_prediction.js":
/*!***********************************************!*\
  !*** ./src/api/models/knockout_prediction.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst knockout_prediction = (sequelize, DataTypes) => {\n  const Knockout_Prediction = sequelize.define(\"knockout_prediction\", {\n    home_goals: {\n      type: DataTypes.INTEGER,\n      allowNull: false\n    },\n    away_goals: {\n      type: DataTypes.INTEGER,\n      allowNull: false\n    }\n  });\n  return Knockout_Prediction;\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (knockout_prediction);\n\n//# sourceURL=webpack:///./src/api/models/knockout_prediction.js?");

/***/ }),

/***/ "./src/api/models/league.js":
/*!**********************************!*\
  !*** ./src/api/models/league.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst league = (sequelize, DataTypes) => {\n  const League = sequelize.define(\"league\", {\n    name: {\n      type: DataTypes.STRING,\n      allowNull: false\n    }\n  });\n\n  League.associate = models => {\n    League.belongsToMany(models.User, {\n      through: models.User_League\n    });\n  };\n\n  return League;\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (league);\n\n//# sourceURL=webpack:///./src/api/models/league.js?");

/***/ }),

/***/ "./src/api/models/player.js":
/*!**********************************!*\
  !*** ./src/api/models/player.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst player = (sequelize, DataTypes) => {\n  const Player = sequelize.define(\"player\", {\n    name: {\n      type: DataTypes.STRING,\n      allowNull: false\n    }\n  });\n\n  Player.associate = models => {\n    Player.belongsTo(models.Team);\n    Player.belongsToMany(models.Group_Match, {\n      through: models.Group_Match_Scorer\n    });\n    Player.belongsToMany(models.Knockout_Match, {\n      through: models.Knockout_Match_Scorer\n    });\n  };\n\n  return Player;\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (player);\n\n//# sourceURL=webpack:///./src/api/models/player.js?");

/***/ }),

/***/ "./src/api/models/team.js":
/*!********************************!*\
  !*** ./src/api/models/team.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst team = (sequelize, DataTypes) => {\n  const Team = sequelize.define(\"team\", {\n    name: {\n      type: DataTypes.STRING,\n      primaryKey: true\n    }\n  });\n\n  Team.associate = models => {\n    Team.belongsTo(models.Group);\n    Team.hasMany(models.Player);\n  };\n\n  return Team;\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (team);\n\n//# sourceURL=webpack:///./src/api/models/team.js?");

/***/ }),

/***/ "./src/api/models/user.js":
/*!********************************!*\
  !*** ./src/api/models/user.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst user = (sequelize, DataTypes) => {\n  const User = sequelize.define(\"user\", {\n    username: {\n      type: DataTypes.STRING,\n      primaryKey: true\n    },\n    password: {\n      type: DataTypes.STRING,\n      allowNull: false\n    },\n    email: {\n      type: DataTypes.STRING,\n      allowNull: false\n    },\n    name: {\n      type: DataTypes.STRING\n    },\n    verified: {\n      type: DataTypes.BOOLEAN,\n      defaultValue: false\n    },\n    admin: {\n      type: DataTypes.BOOLEAN,\n      defaultValue: false\n    }\n  });\n\n  User.associate = models => {\n    User.belongsToMany(models.League, {\n      through: models.User_League\n    });\n    User.belongsTo(models.Player, {\n      as: \"top_scorer_id\"\n    });\n    User.belongsToMany(models.Group_Match, {\n      through: models.Group_Prediction\n    });\n    User.belongsToMany(models.Knockout_Match, {\n      through: models.Knockout_Prediction\n    });\n  };\n\n  return User;\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (user);\n\n//# sourceURL=webpack:///./src/api/models/user.js?");

/***/ }),

/***/ "./src/api/models/user_league.js":
/*!***************************************!*\
  !*** ./src/api/models/user_league.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst user_league = (sequelize, DataTypes) => {\n  const User_League = sequelize.define(\"user_league\", {\n    admin: {\n      type: DataTypes.BOOLEAN,\n      defaultValue: false\n    }\n  });\n  return User_League;\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (user_league);\n\n//# sourceURL=webpack:///./src/api/models/user_league.js?");

/***/ }),

/***/ "./src/api/routes/index.js":
/*!*********************************!*\
  !*** ./src/api/routes/index.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _user__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./user */ \"./src/api/routes/user.js\");\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  user: _user__WEBPACK_IMPORTED_MODULE_0__[\"default\"]\n});\n\n//# sourceURL=webpack:///./src/api/routes/index.js?");

/***/ }),

/***/ "./src/api/routes/user.js":
/*!********************************!*\
  !*** ./src/api/routes/user.js ***!
  \********************************/
/*! exports provided: getUser, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getUser\", function() { return getUser; });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bcrypt */ \"bcrypt\");\n/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(bcrypt__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../models */ \"./src/api/models/index.js\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../ */ \"./src/api/index.js\");\n/* harmony import */ var passport__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! passport */ \"passport\");\n/* harmony import */ var passport__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(passport__WEBPACK_IMPORTED_MODULE_5__);\n\n\n\n\n\n\nconst router = Object(express__WEBPACK_IMPORTED_MODULE_0__[\"Router\"])();\nconst saltRounds = 10;\n\nconst createUser = async ({\n  username,\n  password,\n  email,\n  name\n}) => {\n  return await _models__WEBPACK_IMPORTED_MODULE_2__[\"default\"].User.create({\n    username,\n    password,\n    email,\n    name\n  });\n};\n\nconst getAllUsers = async () => {\n  return await _models__WEBPACK_IMPORTED_MODULE_2__[\"default\"].User.findAll();\n};\n\nconst getUser = async username => {\n  return await _models__WEBPACK_IMPORTED_MODULE_2__[\"default\"].User.findOne({\n    where: {\n      username\n    }\n  });\n};\n\nconst hashPassword = password => {\n  bcrypt__WEBPACK_IMPORTED_MODULE_1___default.a.hash(password, saltRounds).then(function (hash) {\n    return hash;\n  });\n};\n\nrouter.get(\"/me\", passport__WEBPACK_IMPORTED_MODULE_5___default.a.authenticate(\"jwt\", {\n  session: false\n}), function (req, res) {\n  req.user.then(user => {\n    getUser(user.username).then(user => {\n      return res.json(user);\n    });\n  });\n});\nrouter.get(\"/\", passport__WEBPACK_IMPORTED_MODULE_5___default.a.authenticate(\"jwt\", {\n  session: false\n}), function (req, res) {\n  req.user.then(user => {\n    if (user.admin) {\n      getAllUsers(user.username).then(user => {\n        return res.json(user);\n      });\n    } else {\n      return res.json({});\n    }\n  });\n});\nrouter.post(\"/register\", (req, res) => {\n  const _req$body = req.body,\n        username = _req$body.username,\n        password = _req$body.password,\n        email = _req$body.email,\n        name = _req$body.name;\n  bcrypt__WEBPACK_IMPORTED_MODULE_1___default.a.hash(password, saltRounds).then(hash => {\n    const user = {\n      username,\n      password: hash,\n      email,\n      name\n    };\n    createUser(user).then(user => {\n      return res.json(user);\n    });\n  });\n});\nrouter.post(\"/login\", async function (req, res, next) {\n  const _req$body2 = req.body,\n        username = _req$body2.username,\n        password = _req$body2.password;\n\n  if (username && password) {\n    // we get the user with the name and save the resolved promise\n    let user = await getUser(username);\n\n    if (!user) {\n      return res.status(401).json({\n        msg: \"No such user found\",\n        user\n      });\n    }\n\n    bcrypt__WEBPACK_IMPORTED_MODULE_1___default.a.compare(password, user.password).then(function (result) {\n      if (result) {\n        // from now on we’ll identify the user by the id and the id is// the only personalized value that goes into our token\n        let payload = {\n          username: user.username\n        };\n        let token = jsonwebtoken__WEBPACK_IMPORTED_MODULE_3___default.a.sign(payload, ___WEBPACK_IMPORTED_MODULE_4__[\"jwtOptions\"].secretOrKey);\n        return res.json({\n          msg: \"ok\",\n          token: token\n        });\n      } else {\n        return res.status(401).json({\n          msg: \"Password is incorrect\"\n        });\n      }\n    });\n  }\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (router);\n\n//# sourceURL=webpack:///./src/api/routes/user.js?");

/***/ }),

/***/ "./src/api/seeds/group.js":
/*!********************************!*\
  !*** ./src/api/seeds/group.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models */ \"./src/api/models/index.js\");\n\nconst groups = [{\n  number: \"A\"\n}, {\n  number: \"B\"\n}, {\n  number: \"C\"\n}, {\n  number: \"D\"\n}, {\n  number: \"E\"\n}, {\n  number: \"F\"\n}];\n\nconst group = async () => {\n  await _models__WEBPACK_IMPORTED_MODULE_0__[\"default\"].Group.bulkCreate(groups);\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (group);\n\n//# sourceURL=webpack:///./src/api/seeds/group.js?");

/***/ }),

/***/ "./src/api/seeds/group_matches.js":
/*!****************************************!*\
  !*** ./src/api/seeds/group_matches.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models */ \"./src/api/models/index.js\");\n\n\nconst group_match = async () => {\n  await _models__WEBPACK_IMPORTED_MODULE_0__[\"default\"].Team.findAll().then(async teamsArray => {\n    const teams = JSON.parse(JSON.stringify(teamsArray));\n    const group_matches = [];\n\n    for (let i = 0; i < teams.length; i++) {\n      let matching_teams = teams.slice(i + 1).filter(team => teams[i].groupNumber === team.groupNumber);\n\n      for (let j = 0; j < matching_teams.length; j++) {\n        group_matches.push({\n          groupNumber: teams[i].groupNumber,\n          homeTeamId: teams[i].id,\n          awayTeamId: matching_teams[j].id\n        });\n      }\n    }\n\n    await _models__WEBPACK_IMPORTED_MODULE_0__[\"default\"].Group_Match.bulkCreate(group_matches);\n  });\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (group_match);\n\n//# sourceURL=webpack:///./src/api/seeds/group_matches.js?");

/***/ }),

/***/ "./src/api/seeds/index.js":
/*!********************************!*\
  !*** ./src/api/seeds/index.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _user__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./user */ \"./src/api/seeds/user.js\");\n/* harmony import */ var _group__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./group */ \"./src/api/seeds/group.js\");\n/* harmony import */ var _team__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./team */ \"./src/api/seeds/team.js\");\n/* harmony import */ var _group_matches__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./group_matches */ \"./src/api/seeds/group_matches.js\");\n/* harmony import */ var _league__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./league */ \"./src/api/seeds/league.js\");\n/* harmony import */ var _user_league__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./user_league */ \"./src/api/seeds/user_league.js\");\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./player */ \"./src/api/seeds/player.js\");\n\n\n\n\n\n\n\n\nconst seeds = async () => {\n  await Object(_user__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n  await Object(_group__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\n  await Object(_team__WEBPACK_IMPORTED_MODULE_2__[\"default\"])();\n  await Object(_group_matches__WEBPACK_IMPORTED_MODULE_3__[\"default\"])();\n  await Object(_league__WEBPACK_IMPORTED_MODULE_4__[\"default\"])();\n  await Object(_user_league__WEBPACK_IMPORTED_MODULE_5__[\"default\"])();\n  await Object(_player__WEBPACK_IMPORTED_MODULE_6__[\"default\"])();\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (seeds);\n\n//# sourceURL=webpack:///./src/api/seeds/index.js?");

/***/ }),

/***/ "./src/api/seeds/league.js":
/*!*********************************!*\
  !*** ./src/api/seeds/league.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models */ \"./src/api/models/index.js\");\n\nconst leagues = [{\n  name: \"Brace's Predictor\"\n}];\n\nconst league = async () => {\n  await _models__WEBPACK_IMPORTED_MODULE_0__[\"default\"].League.bulkCreate(leagues);\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (league);\n\n//# sourceURL=webpack:///./src/api/seeds/league.js?");

/***/ }),

/***/ "./src/api/seeds/player.js":
/*!*********************************!*\
  !*** ./src/api/seeds/player.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models */ \"./src/api/models/index.js\");\n\nconst players = [{\n  name: \"Harry Kane\",\n  teamName: \"England\"\n}, {\n  name: \"Kylian Mbappe\",\n  teamName: \"France\"\n}, {\n  name: \"Toni Kroos\",\n  teamName: \"Germany\"\n}, {\n  name: \"Romelu Lukaku\",\n  teamName: \"Belgium\"\n}, {\n  name: \"Memphis Depay\",\n  teamName: \"Netherlands\"\n}, {\n  name: \"Cristiano Ronaldo\",\n  teamName: \"Portugal\"\n}];\n\nconst player = async () => {\n  await _models__WEBPACK_IMPORTED_MODULE_0__[\"default\"].Player.bulkCreate(players);\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (player);\n\n//# sourceURL=webpack:///./src/api/seeds/player.js?");

/***/ }),

/***/ "./src/api/seeds/team.js":
/*!*******************************!*\
  !*** ./src/api/seeds/team.js ***!
  \*******************************/
/*! exports provided: teams, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"teams\", function() { return teams; });\n/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models */ \"./src/api/models/index.js\");\n\nconst teams = [{\n  name: \"England\",\n  groupNumber: \"A\"\n}, {\n  name: \"Czech Republic\",\n  groupNumber: \"B\"\n}, {\n  name: \"Ukraine\",\n  groupNumber: \"C\"\n}, {\n  name: \"Portugal\",\n  groupNumber: \"D\"\n}, {\n  name: \"Ireland\",\n  groupNumber: \"E\"\n}, {\n  name: \"Denmark\",\n  groupNumber: \"F\"\n}, {\n  name: \"Hungary\",\n  groupNumber: \"A\"\n}, {\n  name: \"Croatia\",\n  groupNumber: \"B\"\n}, {\n  name: \"Spain\",\n  groupNumber: \"C\"\n}, {\n  name: \"Sweden\",\n  groupNumber: \"D\"\n}, {\n  name: \"Poland\",\n  groupNumber: \"E\"\n}, {\n  name: \"Austria\",\n  groupNumber: \"F\"\n}, {\n  name: \"France\",\n  groupNumber: \"A\"\n}, {\n  name: \"Turkey\",\n  groupNumber: \"B\"\n}, {\n  name: \"Belgium\",\n  groupNumber: \"C\"\n}, {\n  name: \"Russia\",\n  groupNumber: \"D\"\n}, {\n  name: \"Italy\",\n  groupNumber: \"E\"\n}, {\n  name: \"Greece\",\n  groupNumber: \"F\"\n}, {\n  name: \"Wales\",\n  groupNumber: \"A\"\n}, {\n  name: \"Switzerland\",\n  groupNumber: \"B\"\n}, {\n  name: \"Northern Ireland\",\n  groupNumber: \"C\"\n}, {\n  name: \"Serbia\",\n  groupNumber: \"D\"\n}, {\n  name: \"Germany\",\n  groupNumber: \"E\"\n}, {\n  name: \"Netherlands\",\n  groupNumber: \"F\"\n}];\n\nconst team = async () => {\n  await _models__WEBPACK_IMPORTED_MODULE_0__[\"default\"].Team.bulkCreate(teams);\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (team);\n\n//# sourceURL=webpack:///./src/api/seeds/team.js?");

/***/ }),

/***/ "./src/api/seeds/user.js":
/*!*******************************!*\
  !*** ./src/api/seeds/user.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models */ \"./src/api/models/index.js\");\n\nconst users = [{\n  username: \"xBracey\",\n  password: \"$2b$10$9Z.cV.rYcefrux//LpzfIuGK38r.UaQBXzbt.rD0WDuPWRmgzMwu2\",\n  email: \"tommy-brace-22@hotmail.com\",\n  name: \"Thomas Brace\",\n  verified: true,\n  admin: true\n}];\n\nconst user = async () => {\n  await _models__WEBPACK_IMPORTED_MODULE_0__[\"default\"].User.bulkCreate(users);\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (user);\n\n//# sourceURL=webpack:///./src/api/seeds/user.js?");

/***/ }),

/***/ "./src/api/seeds/user_league.js":
/*!**************************************!*\
  !*** ./src/api/seeds/user_league.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models */ \"./src/api/models/index.js\");\n\nconst user_leagues = [{\n  userUsername: \"xBracey\",\n  leagueId: \"1\",\n  admin: true\n}];\n\nconst user_league = async () => {\n  await _models__WEBPACK_IMPORTED_MODULE_0__[\"default\"].User_League.bulkCreate(user_leagues);\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (user_league);\n\n//# sourceURL=webpack:///./src/api/seeds/user_league.js?");

/***/ }),

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"bcrypt\");\n\n//# sourceURL=webpack:///external_%22bcrypt%22?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"body-parser\");\n\n//# sourceURL=webpack:///external_%22body-parser%22?");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"cors\");\n\n//# sourceURL=webpack:///external_%22cors%22?");

/***/ }),

/***/ "dotenv/config":
/*!********************************!*\
  !*** external "dotenv/config" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"dotenv/config\");\n\n//# sourceURL=webpack:///external_%22dotenv/config%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs\");\n\n//# sourceURL=webpack:///external_%22fs%22?");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"jsonwebtoken\");\n\n//# sourceURL=webpack:///external_%22jsonwebtoken%22?");

/***/ }),

/***/ "passport":
/*!***************************!*\
  !*** external "passport" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"passport\");\n\n//# sourceURL=webpack:///external_%22passport%22?");

/***/ }),

/***/ "passport-jwt":
/*!*******************************!*\
  !*** external "passport-jwt" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"passport-jwt\");\n\n//# sourceURL=webpack:///external_%22passport-jwt%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react\");\n\n//# sourceURL=webpack:///external_%22react%22?");

/***/ }),

/***/ "react-dom/server":
/*!***********************************!*\
  !*** external "react-dom/server" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-dom/server\");\n\n//# sourceURL=webpack:///external_%22react-dom/server%22?");

/***/ }),

/***/ "sequelize":
/*!****************************!*\
  !*** external "sequelize" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"sequelize\");\n\n//# sourceURL=webpack:///external_%22sequelize%22?");

/***/ })

/******/ });