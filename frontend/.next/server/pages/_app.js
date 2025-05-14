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

/***/ "./src/components/ErrorBoundary.js":
/*!*****************************************!*\
  !*** ./src/components/ErrorBoundary.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n\n\nclass ErrorBoundary extends (react__WEBPACK_IMPORTED_MODULE_1___default().Component) {\n    constructor(props){\n        super(props);\n        this.state = {\n            hasError: false\n        };\n    }\n    static getDerivedStateFromError(error) {\n        return {\n            hasError: true\n        };\n    }\n    componentDidCatch(error, errorInfo) {\n        console.error(\"Error caught by boundary:\", error, errorInfo);\n    }\n    render() {\n        if (this.state.hasError) {\n            return this.props.fallback || /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"p-4 text-red-500\",\n                children: \"Something went wrong.\"\n            }, void 0, false, {\n                fileName: \"D:\\\\Officel IEEE\\\\frontend\\\\src\\\\components\\\\ErrorBoundary.js\",\n                lineNumber: 19,\n                columnNumber: 37\n            }, this);\n        }\n        return this.props.children;\n    }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ErrorBoundary);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9FcnJvckJvdW5kYXJ5LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUEwQjtBQUUxQixNQUFNQyxzQkFBc0JELHdEQUFlO0lBQ3pDRyxZQUFZQyxLQUFLLENBQUU7UUFDakIsS0FBSyxDQUFDQTtRQUNOLElBQUksQ0FBQ0MsS0FBSyxHQUFHO1lBQUVDLFVBQVU7UUFBTTtJQUNqQztJQUVBLE9BQU9DLHlCQUF5QkMsS0FBSyxFQUFFO1FBQ3JDLE9BQU87WUFBRUYsVUFBVTtRQUFLO0lBQzFCO0lBRUFHLGtCQUFrQkQsS0FBSyxFQUFFRSxTQUFTLEVBQUU7UUFDbENDLFFBQVFILEtBQUssQ0FBQyw2QkFBNkJBLE9BQU9FO0lBQ3BEO0lBRUFFLFNBQVM7UUFDUCxJQUFJLElBQUksQ0FBQ1AsS0FBSyxDQUFDQyxRQUFRLEVBQUU7WUFDdkIsT0FBTyxJQUFJLENBQUNGLEtBQUssQ0FBQ1MsUUFBUSxrQkFBSSw4REFBQ0M7Z0JBQUlDLFdBQVU7MEJBQW1COzs7Ozs7UUFDbEU7UUFFQSxPQUFPLElBQUksQ0FBQ1gsS0FBSyxDQUFDWSxRQUFRO0lBQzVCO0FBQ0Y7QUFFQSxpRUFBZWYsYUFBYUEsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2llZWUtY2x1Yi13ZWJzaXRlLy4vc3JjL2NvbXBvbmVudHMvRXJyb3JCb3VuZGFyeS5qcz9mNTJkIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcblxyXG5jbGFzcyBFcnJvckJvdW5kYXJ5IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgc3VwZXIocHJvcHMpO1xyXG4gICAgdGhpcy5zdGF0ZSA9IHsgaGFzRXJyb3I6IGZhbHNlIH07XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZ2V0RGVyaXZlZFN0YXRlRnJvbUVycm9yKGVycm9yKSB7XHJcbiAgICByZXR1cm4geyBoYXNFcnJvcjogdHJ1ZSB9O1xyXG4gIH1cclxuXHJcbiAgY29tcG9uZW50RGlkQ2F0Y2goZXJyb3IsIGVycm9ySW5mbykge1xyXG4gICAgY29uc29sZS5lcnJvcihcIkVycm9yIGNhdWdodCBieSBib3VuZGFyeTpcIiwgZXJyb3IsIGVycm9ySW5mbyk7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICBpZiAodGhpcy5zdGF0ZS5oYXNFcnJvcikge1xyXG4gICAgICByZXR1cm4gdGhpcy5wcm9wcy5mYWxsYmFjayB8fCA8ZGl2IGNsYXNzTmFtZT1cInAtNCB0ZXh0LXJlZC01MDBcIj5Tb21ldGhpbmcgd2VudCB3cm9uZy48L2Rpdj47XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMucHJvcHMuY2hpbGRyZW47XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFcnJvckJvdW5kYXJ5O1xyXG4iXSwibmFtZXMiOlsiUmVhY3QiLCJFcnJvckJvdW5kYXJ5IiwiQ29tcG9uZW50IiwiY29uc3RydWN0b3IiLCJwcm9wcyIsInN0YXRlIiwiaGFzRXJyb3IiLCJnZXREZXJpdmVkU3RhdGVGcm9tRXJyb3IiLCJlcnJvciIsImNvbXBvbmVudERpZENhdGNoIiwiZXJyb3JJbmZvIiwiY29uc29sZSIsInJlbmRlciIsImZhbGxiYWNrIiwiZGl2IiwiY2xhc3NOYW1lIiwiY2hpbGRyZW4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/components/ErrorBoundary.js\n");

/***/ }),

/***/ "./src/pages/_app.js":
/*!***************************!*\
  !*** ./src/pages/_app.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../styles/globals.css */ \"./src/styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _components_ErrorBoundary__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/ErrorBoundary */ \"./src/components/ErrorBoundary.js\");\n\n\n\n\nfunction MyApp({ Component, pageProps }) {\n    const [isClient, setIsClient] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    // This effect runs only on client\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        setIsClient(true);\n    }, []);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ErrorBoundary__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n        children: isClient ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n            ...pageProps\n        }, void 0, false, {\n            fileName: \"D:\\\\Officel IEEE\\\\frontend\\\\src\\\\pages\\\\_app.js\",\n            lineNumber: 16,\n            columnNumber: 19\n        }, this) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            style: {\n                visibility: \"hidden\"\n            },\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                ...pageProps\n            }, void 0, false, {\n                fileName: \"D:\\\\Officel IEEE\\\\frontend\\\\src\\\\pages\\\\_app.js\",\n                lineNumber: 18,\n                columnNumber: 11\n            }, this)\n        }, void 0, false, {\n            fileName: \"D:\\\\Officel IEEE\\\\frontend\\\\src\\\\pages\\\\_app.js\",\n            lineNumber: 17,\n            columnNumber: 9\n        }, this)\n    }, void 0, false, {\n        fileName: \"D:\\\\Officel IEEE\\\\frontend\\\\src\\\\pages\\\\_app.js\",\n        lineNumber: 14,\n        columnNumber: 5\n    }, this);\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyApp);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcGFnZXMvX2FwcC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBNEM7QUFDYjtBQUN5QjtBQUV4RCxTQUFTRyxNQUFNLEVBQUVDLFNBQVMsRUFBRUMsU0FBUyxFQUFFO0lBQ3JDLE1BQU0sQ0FBQ0MsVUFBVUMsWUFBWSxHQUFHTiwrQ0FBUUEsQ0FBQztJQUV6QyxrQ0FBa0M7SUFDbENELGdEQUFTQSxDQUFDO1FBQ1JPLFlBQVk7SUFDZCxHQUFHLEVBQUU7SUFFTCxxQkFDRSw4REFBQ0wsaUVBQWFBO2tCQUVYSSx5QkFBVyw4REFBQ0Y7WUFBVyxHQUFHQyxTQUFTOzs7OztpQ0FDbEMsOERBQUNHO1lBQUlDLE9BQU87Z0JBQUVDLFlBQVk7WUFBUztzQkFDakMsNEVBQUNOO2dCQUFXLEdBQUdDLFNBQVM7Ozs7Ozs7Ozs7Ozs7Ozs7QUFLbEM7QUFFQSxpRUFBZUYsS0FBS0EsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2llZWUtY2x1Yi13ZWJzaXRlLy4vc3JjL3BhZ2VzL19hcHAuanM/OGZkYSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgJy4uL3N0eWxlcy9nbG9iYWxzLmNzcyc7XHJcbmltcG9ydCBFcnJvckJvdW5kYXJ5IGZyb20gJy4uL2NvbXBvbmVudHMvRXJyb3JCb3VuZGFyeSc7XHJcblxyXG5mdW5jdGlvbiBNeUFwcCh7IENvbXBvbmVudCwgcGFnZVByb3BzIH0pIHtcclxuICBjb25zdCBbaXNDbGllbnQsIHNldElzQ2xpZW50XSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBcclxuICAvLyBUaGlzIGVmZmVjdCBydW5zIG9ubHkgb24gY2xpZW50XHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIHNldElzQ2xpZW50KHRydWUpO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxFcnJvckJvdW5kYXJ5PlxyXG4gICAgICB7LyogUHJldmVudCBoeWRyYXRpb24gZXJyb3JzIGJ5IGNvbmRpdGlvbmFsbHkgcmVuZGVyaW5nIGNvbXBvbmVudHMgdGhhdCBkZXBlbmQgb24gY2xpZW50LXNpZGUgQVBJcyAqL31cclxuICAgICAge2lzQ2xpZW50ID8gPENvbXBvbmVudCB7Li4ucGFnZVByb3BzfSAvPiA6IFxyXG4gICAgICAgIDxkaXYgc3R5bGU9e3sgdmlzaWJpbGl0eTogJ2hpZGRlbicgfX0+XHJcbiAgICAgICAgICA8Q29tcG9uZW50IHsuLi5wYWdlUHJvcHN9IC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIH1cclxuICAgIDwvRXJyb3JCb3VuZGFyeT5cclxuICApO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBNeUFwcDtcclxuIl0sIm5hbWVzIjpbInVzZUVmZmVjdCIsInVzZVN0YXRlIiwiRXJyb3JCb3VuZGFyeSIsIk15QXBwIiwiQ29tcG9uZW50IiwicGFnZVByb3BzIiwiaXNDbGllbnQiLCJzZXRJc0NsaWVudCIsImRpdiIsInN0eWxlIiwidmlzaWJpbGl0eSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/pages/_app.js\n");

/***/ }),

/***/ "./src/styles/globals.css":
/*!********************************!*\
  !*** ./src/styles/globals.css ***!
  \********************************/
/***/ (() => {



/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./src/pages/_app.js"));
module.exports = __webpack_exports__;

})();