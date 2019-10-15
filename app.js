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

app.use(function(req, res, next) {
  res.cookie('foo', 'bar', cookie_directives);
  next();
});

app.use(express.static('public')); 

app.listen(3100, '0.0.0.0', () => console.log('App is running at localhost:3100'));
