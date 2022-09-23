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
/******/ 	return __webpack_require__(__webpack_require__.s = "./frontend/src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./frontend/src/components/App.js":
/*!****************************************!*\
  !*** ./frontend/src/components/App.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("throw new Error(\"Module build failed (from ./node_modules/babel-loader/lib/index.js):\\nSyntaxError: Z:\\\\Tawassam\\\\frontend\\\\src\\\\components\\\\App.js: Unexpected token (6:11)\\n\\n\\u001b[0m \\u001b[90m 4 | \\u001b[39m\\u001b[36mclass\\u001b[39m \\u001b[33mApp\\u001b[39m \\u001b[36mextends\\u001b[39m \\u001b[33mComponent\\u001b[39m {\\u001b[0m\\n\\u001b[0m \\u001b[90m 5 | \\u001b[39m  render() {\\u001b[0m\\n\\u001b[0m\\u001b[31m\\u001b[1m>\\u001b[22m\\u001b[39m\\u001b[90m 6 | \\u001b[39m    \\u001b[36mreturn\\u001b[39m \\u001b[33m<\\u001b[39m\\u001b[33mh1\\u001b[39m\\u001b[33m>\\u001b[39m \\u001b[33mInteresting\\u001b[39m \\u001b[33m<\\u001b[39m\\u001b[33m/\\u001b[39m\\u001b[33mh1\\u001b[39m\\u001b[33m>\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m   | \\u001b[39m           \\u001b[31m\\u001b[1m^\\u001b[22m\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m 7 | \\u001b[39m  }\\u001b[0m\\n\\u001b[0m \\u001b[90m 8 | \\u001b[39m}\\u001b[0m\\n\\u001b[0m \\u001b[90m 9 | \\u001b[39m\\u001b[0m\\n    at Parser._raise (Z:\\\\Tawassam\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:746:17)\\n    at Parser.raiseWithData (Z:\\\\Tawassam\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:739:17)\\n    at Parser.raise (Z:\\\\Tawassam\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:733:17)\\n    at Parser.unexpected (Z:\\\\Tawassam\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:8807:16)\\n    at Parser.parseExprAtom (Z:\\\\Tawassam\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:10130:20)\\n    at Parser.parseExprSubscripts (Z:\\\\Tawassam\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:9656:23)\\n    at Parser.parseMaybeUnary (Z:\\\\Tawassam\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:9636:21)\\n    at Parser.parseExprOps (Z:\\\\Tawassam\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:9506:23)\\n    at Parser.parseMaybeConditional (Z:\\\\Tawassam\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:9479:23)\\n    at Parser.parseMaybeAssign (Z:\\\\Tawassam\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:9434:21)\\n    at Parser.parseExpression (Z:\\\\Tawassam\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:9386:23)\\n    at Parser.parseReturnStatement (Z:\\\\Tawassam\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:11523:28)\\n    at Parser.parseStatementContent (Z:\\\\Tawassam\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:11204:21)\\n    at Parser.parseStatement (Z:\\\\Tawassam\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:11156:17)\\n    at Parser.parseBlockOrModuleBlockBody (Z:\\\\Tawassam\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:11731:25)\\n    at Parser.parseBlockBody (Z:\\\\Tawassam\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:11717:10)\\n    at Parser.parseBlock (Z:\\\\Tawassam\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:11701:10)\\n    at Parser.parseFunctionBody (Z:\\\\Tawassam\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:10708:24)\\n    at Parser.parseFunctionBodyAndFinish (Z:\\\\Tawassam\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:10691:10)\\n    at Parser.parseMethod (Z:\\\\Tawassam\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:10653:10)\\n    at Parser.pushClassMethod (Z:\\\\Tawassam\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:12156:30)\\n    at Parser.parseClassMemberWithIsStatic (Z:\\\\Tawassam\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:12073:12)\\n    at Parser.parseClassMember (Z:\\\\Tawassam\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:12015:10)\\n    at Z:\\\\Tawassam\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:11960:14\\n    at Parser.withTopicForbiddingContext (Z:\\\\Tawassam\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:11031:14)\\n    at Parser.parseClassBody (Z:\\\\Tawassam\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:11937:10)\\n    at Parser.parseClass (Z:\\\\Tawassam\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:11911:22)\\n    at Parser.parseStatementContent (Z:\\\\Tawassam\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:11198:21)\\n    at Parser.parseStatement (Z:\\\\Tawassam\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:11156:17)\\n    at Parser.parseBlockOrModuleBlockBody (Z:\\\\Tawassam\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:11731:25)\");\n\n//# sourceURL=webpack:///./frontend/src/components/App.js?");

/***/ }),

/***/ "./frontend/src/index.js":
/*!*******************************!*\
  !*** ./frontend/src/index.js ***!
  \*******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_App__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/App */ \"./frontend/src/components/App.js\");\n/* harmony import */ var _components_App__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_components_App__WEBPACK_IMPORTED_MODULE_0__);\n\n\n//# sourceURL=webpack:///./frontend/src/index.js?");

/***/ })

/******/ });