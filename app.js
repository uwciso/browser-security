/*****************************************************************************
 Modify this object with your chosen CSP directives
*****************************************************************************/
const csp_directives = {
  'default-src': ["*"],
};

const express = require('express');
const path = require('path');
const helmet = require('helmet');
const app = express();

app.use(helmet.contentSecurityPolicy({
  directives: csp_directives
}));

app.use(express.static('public'));

app.get('/assets.html', (req, res) => {
  res.cookie('foo', 'bar', {
   /*****************************************************************************
     Cookie directives go here
    *****************************************************************************/
    httpOnly: true,
    secure: true,
  });
  res.sendFile(path.join(__dirname + '/assets.html'));
});

app.listen(3100, () => console.log('App is running at localhost:3100'));
