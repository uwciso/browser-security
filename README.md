# Browser Security

This simple Node/Express.js app provides an easy way to interactively learn about browser security features. 

In addition to [Express.js](https://expressjs.com/), it uses [Helmet.js](https://helmetjs.github.io/) middleware to provide a simple means of modifying server response headers and other HTTP server configurations.

## Installation

Make sure you have [Node](https://nodejs.org/en/) installed (and npm, which automatically installs with Node).

1. `git clone https://github.com/uwciso/browser-security.git`

2. `cd browser-security`

3. `npm install` 

## Usage
1. `npm run start` 

2. Point your browser to [localhost:3100](http://localhost:3100) 

3. To do the exercises, you'll need to open up the app.js (and, eventually, example.html) files in your text editor of choice. This app uses [nodemon](https://nodemon.io/), so as you make changes to files, your browser should automatically reload.

## Resources
* [CSP with Helmet.js](https://helmetjs.github.io/docs/csp/)
* [Setting response cookies with Express](https://expressjs.com/en/4x/api.html#res.cookie)
