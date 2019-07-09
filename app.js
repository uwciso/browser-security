const express = require('express');
const path = require('path');
const helmet = require('helmet');
const app = express();

/*****************************************************************************
 Modify this object with your chosen CSP directives
*****************************************************************************/
const csp_directives = {
};
/*****************************************************************************
 Also, uncomment the following app.use statement to use CSP for all requests
*****************************************************************************/
/*
app.use(helmet.contentSecurityPolicy({
  directives: csp_directives
}));
*/

/*****************************************************************************
 Modify this object with your chosen cookie directives 
*****************************************************************************/
const cookie_directives = {

}
/*****************************************************************************/

function attach_cookie(url, cookie, value) {
  return function(req, res, next) {
    if (req.url === url) {
      if (cookie_directives.path) {
        if (req.url.includes(cookie_directives.path)) {
          res.cookie(cookie, value, cookie_directives);
        }
      } else {
        res.cookie(cookie, value, cookie_directives);
      }
    }
    next();
  }
}

const cookie_name = 'newcookie';
const cookie_val = 'chocolate-chip';
const static_urls = ['/assets.html', '/img/uw-suz.jpg', '/js/local.js', '/stylesheets/styles.css'];
// set a cookie for each of the static assets
for (let i = 0; i < static_urls.length; i++) {
  app.use(attach_cookie(static_urls[i], cookie_name, cookie_val));
}

app.use(express.static('public'));

app.listen(3100, () => console.log('App is running at localhost:3100'));
