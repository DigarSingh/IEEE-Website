/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./src/pages/_app.js":
/*!***************************!*\
  !*** ./src/pages/_app.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../styles/globals.css */ \"./src/styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/router */ \"../node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\nfunction MyApp({ Component, pageProps }) {\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_3__.useRouter)();\n    // This will run whenever the route changes\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        // Check auth status when component mounts and route changes\n        const checkAuth = ()=>{\n            if (true) return;\n            const token = localStorage.getItem(\"token\");\n            // Check for protected routes that need authentication\n            const protectedRoutes = [\n                \"/dashboard\",\n                \"/profile\",\n                \"/member-area\"\n            ];\n            const isProtectedRoute = protectedRoutes.some((route)=>router.pathname.startsWith(route));\n            // If on a protected route and not logged in, redirect to login\n            if (isProtectedRoute && !token) {\n                router.push(\"/login\");\n            }\n        };\n        // Only run on client-side\n        if (false) {}\n    }, [\n        router.pathname\n    ]);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n        ...pageProps\n    }, void 0, false, {\n        fileName: \"D:\\\\Officel IEEE\\\\frontend\\\\src\\\\pages\\\\_app.js\",\n        lineNumber: 34,\n        columnNumber: 10\n    }, this);\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyApp);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcGFnZXMvX2FwcC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQWtDO0FBQ0g7QUFDUztBQUV4QyxTQUFTRSxNQUFNLEVBQUVDLFNBQVMsRUFBRUMsU0FBUyxFQUFFO0lBQ3JDLE1BQU1DLFNBQVNKLHNEQUFTQTtJQUV4QiwyQ0FBMkM7SUFDM0NELGdEQUFTQSxDQUFDO1FBQ1IsNERBQTREO1FBQzVELE1BQU1NLFlBQVk7WUFDaEIsSUFBSSxJQUFrQixFQUFhO1lBRW5DLE1BQU1DLFFBQVFDLGFBQWFDLE9BQU8sQ0FBQztZQUVuQyxzREFBc0Q7WUFDdEQsTUFBTUMsa0JBQWtCO2dCQUFDO2dCQUFjO2dCQUFZO2FBQWU7WUFDbEUsTUFBTUMsbUJBQW1CRCxnQkFBZ0JFLElBQUksQ0FBQ0MsQ0FBQUEsUUFDNUNSLE9BQU9TLFFBQVEsQ0FBQ0MsVUFBVSxDQUFDRjtZQUc3QiwrREFBK0Q7WUFDL0QsSUFBSUYsb0JBQW9CLENBQUNKLE9BQU87Z0JBQzlCRixPQUFPVyxJQUFJLENBQUM7WUFDZDtRQUNGO1FBRUEsMEJBQTBCO1FBQzFCLElBQUksS0FBa0IsRUFBYSxFQUVsQztJQUNILEdBQUc7UUFBQ1gsT0FBT1MsUUFBUTtLQUFDO0lBRXBCLHFCQUFPLDhEQUFDWDtRQUFXLEdBQUdDLFNBQVM7Ozs7OztBQUNqQztBQUVBLGlFQUFlRixLQUFLQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vaWVlZS1jbHViLXdlYnNpdGUvLi9zcmMvcGFnZXMvX2FwcC5qcz84ZmRhIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0ICcuLi9zdHlsZXMvZ2xvYmFscy5jc3MnO1xyXG5pbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tICduZXh0L3JvdXRlcic7XHJcblxyXG5mdW5jdGlvbiBNeUFwcCh7IENvbXBvbmVudCwgcGFnZVByb3BzIH0pIHtcclxuICBjb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKTtcclxuICBcclxuICAvLyBUaGlzIHdpbGwgcnVuIHdoZW5ldmVyIHRoZSByb3V0ZSBjaGFuZ2VzXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIC8vIENoZWNrIGF1dGggc3RhdHVzIHdoZW4gY29tcG9uZW50IG1vdW50cyBhbmQgcm91dGUgY2hhbmdlc1xyXG4gICAgY29uc3QgY2hlY2tBdXRoID0gKCkgPT4ge1xyXG4gICAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcpIHJldHVybjtcclxuICAgICAgXHJcbiAgICAgIGNvbnN0IHRva2VuID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rva2VuJyk7XHJcbiAgICAgIFxyXG4gICAgICAvLyBDaGVjayBmb3IgcHJvdGVjdGVkIHJvdXRlcyB0aGF0IG5lZWQgYXV0aGVudGljYXRpb25cclxuICAgICAgY29uc3QgcHJvdGVjdGVkUm91dGVzID0gWycvZGFzaGJvYXJkJywgJy9wcm9maWxlJywgJy9tZW1iZXItYXJlYSddO1xyXG4gICAgICBjb25zdCBpc1Byb3RlY3RlZFJvdXRlID0gcHJvdGVjdGVkUm91dGVzLnNvbWUocm91dGUgPT4gXHJcbiAgICAgICAgcm91dGVyLnBhdGhuYW1lLnN0YXJ0c1dpdGgocm91dGUpXHJcbiAgICAgICk7XHJcbiAgICAgIFxyXG4gICAgICAvLyBJZiBvbiBhIHByb3RlY3RlZCByb3V0ZSBhbmQgbm90IGxvZ2dlZCBpbiwgcmVkaXJlY3QgdG8gbG9naW5cclxuICAgICAgaWYgKGlzUHJvdGVjdGVkUm91dGUgJiYgIXRva2VuKSB7XHJcbiAgICAgICAgcm91dGVyLnB1c2goJy9sb2dpbicpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gICAgXHJcbiAgICAvLyBPbmx5IHJ1biBvbiBjbGllbnQtc2lkZVxyXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgIGNoZWNrQXV0aCgpO1xyXG4gICAgfVxyXG4gIH0sIFtyb3V0ZXIucGF0aG5hbWVdKTtcclxuICBcclxuICByZXR1cm4gPENvbXBvbmVudCB7Li4ucGFnZVByb3BzfSAvPjtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTXlBcHA7XHJcbiJdLCJuYW1lcyI6WyJ1c2VFZmZlY3QiLCJ1c2VSb3V0ZXIiLCJNeUFwcCIsIkNvbXBvbmVudCIsInBhZ2VQcm9wcyIsInJvdXRlciIsImNoZWNrQXV0aCIsInRva2VuIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsInByb3RlY3RlZFJvdXRlcyIsImlzUHJvdGVjdGVkUm91dGUiLCJzb21lIiwicm91dGUiLCJwYXRobmFtZSIsInN0YXJ0c1dpdGgiLCJwdXNoIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/pages/_app.js\n");

/***/ }),

/***/ "./src/styles/globals.css":
/*!********************************!*\
  !*** ./src/styles/globals.css ***!
  \********************************/
/***/ (() => {



/***/ }),

/***/ "next/dist/compiled/next-server/pages.runtime.dev.js":
/*!**********************************************************************!*\
  !*** external "next/dist/compiled/next-server/pages.runtime.dev.js" ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/pages.runtime.dev.js");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react-dom":
/*!****************************!*\
  !*** external "react-dom" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("react-dom");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "react/jsx-runtime":
/*!************************************!*\
  !*** external "react/jsx-runtime" ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@swc"], () => (__webpack_exec__("./src/pages/_app.js")));
module.exports = __webpack_exports__;

})();