/*****************************************************************************
 Modify this object with your chosen CSP directives
*****************************************************************************/
const csp_directives = {
  'default-src': ["*"],
};

/*****************************************************************************
 Modify this object with your chosen cookie options 
*****************************************************************************/
const cookie_options = {

}

const express = require('express');
const path = require('path');
const helmet = require('helmet');
const app = express();

app.use(helmet.contentSecurityPolicy({
  directives: csp_directives
}));

function attach_cookie(url, cookie, value) {
  return function(req, res, next) {
    if (req.url === url) {
      res.cookie(cookie, value, cookie_options);
    }
    next();
  }
}

// set cookies for specific static assets
app.use(attach_cookie('/assets.html', 'anothertest', 'anothervalue'));
app.use(attach_cookie('/img/uw-suz.jpg', 'imgtest', 'anothervalue'));

app.use(express.static('public'));

app.listen(3100, () => console.log('App is running at localhost:3100'));
