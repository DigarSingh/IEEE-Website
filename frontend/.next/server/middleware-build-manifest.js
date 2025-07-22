self.__BUILD_MANIFEST = {
  "polyfillFiles": [
    "static/chunks/polyfills.js"
  ],
  "devFiles": [
    "static/chunks/react-refresh.js"
  ],
  "ampDevFiles": [],
  "lowPriorityFiles": [],
  "rootMainFiles": [
    "static/chunks/webpack.js",
    "static/chunks/main-app.js"
  ],
  "pages": {
    "/_app": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/_app.js"
    ],
    "/_error": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/_error.js"
    ],
<<<<<<< HEAD
    "/events": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/events.js"
=======
    "/contact": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/contact.js"
>>>>>>> 6ab1b231e7c9d4f9384f0552f446877d526bf92e
    ]
  },
  "ampFirstPages": []
};
self.__BUILD_MANIFEST.lowPriorityFiles = [
"/static/" + process.env.__NEXT_BUILD_ID + "/_buildManifest.js",
,"/static/" + process.env.__NEXT_BUILD_ID + "/_ssgManifest.js",

];