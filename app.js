const express = require('express');
const path = require('path');
const helmet = require('helmet');
const app = express();

/*****************************************************************************
 Modify this object with your chosen CSP directives
*****************************************************************************/
const csp_directives = {

};

app.use((req, res, next) => {
/*****************************************************************************
 Also, uncomment this res.append statement to use CSP for all requests
*****************************************************************************/
/*
    res.append("Content-Security-Policy", 
    // The full value for our CSP:
    "default-src 'self';"
    );
*/
    next();
});

/*****************************************************************************
 Modify this object with your chosen cookie directives 
*****************************************************************************/
const cookie_directives = {

}
/*****************************************************************************/

app.use(function(req, res, next) {
  res.cookie('foo', 'bar', cookie_directives);
  next();
});

app.use(express.static('public')); 

app.listen(3100, '0.0.0.0', () => console.log('App is now running on port 3100'));
