const express = require('express');
const app = express();

app.use((req, res, next) => {
/*****************************************************************************
 Uncomment this res.append statement to use CSP for all requests
*****************************************************************************/
    /*
    res.append("Content-Security-Policy", 
    // CSP here
    );
    */
    next();
});

/*****************************************************************************
 Modify this object with your chosen cookie properties 
*****************************************************************************/
const cookie_props = {

}
/*****************************************************************************/

app.use((req, res, next) => {
  res.cookie('foo', 'bar', cookie_props);
  next();
});

app.use(express.static('public')); 

app.listen(3100, '0.0.0.0', () => console.log('App is now running on port 3100'));