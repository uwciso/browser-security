# Browser Security

This simple Node/Express.js app provides an easy way to interactively learn about browser security features. 

In addition to Express, it uses Helmet.js middleware to provide a simple means of modifying server response headers and other HTTP server configurations.

## Installation

Make sure you have [Node (and npm)](https://www.npmjs.com/get-npm) installed.

`git clone ssh://git@git.s.uw.edu/aware/browser-security.git`

`cd browser-security`

`npm install` 

## Usage
`npm run start` 

Point your browser to [localhost:3100](http://localhost:3100) 

To do the exercises, you'll need to open up the app.js (and, eventually, index.html) files in your text editor of choice. This app uses [nodemon](https://nodemon.io/), so as you make changes, your browser should automatically update.

## Resources
* [CSP with Helmet.js](https://helmetjs.github.io/docs/csp/)
* [Setting response cookies with Express](https://expressjs.com/en/4x/api.html#res.cookie)
