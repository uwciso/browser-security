/*****************************************************************************
 Modify this object with your chosen CSP directives
*****************************************************************************/
const csp_directives = {
  'default-src': ['*'],
  /*
  'default-src': ["'self'"], // (1)
  'style-src': ["'self'", 'stackpath.bootstrapcdn.com'], // (2)
  'img-src': ['*'], // (3)
  'upgrade-insecure-requests': true,
  'script-src': ["'self'"] // (4)
  'script-src': ['code.jquery.com'] // (5)
  'script-src': ["'self'", 'code.jquery.com'] // (6)
  'script-src': ["'self'", 'code.jquery.com', "'sha256-CrzKxDeZjGly73yvFozgdRLDihh4SnhePd2pl43gG0o='"] // (7)
  */
};

const express = require('express');
const path = require('path');
const helmet = require('helmet');
const app = express();

app.use(helmet.contentSecurityPolicy({
  directives: csp_directives
}));

app.use(helmet.noSniff());
app.use(helmet.xssFilter());

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.cookie('chipsahoy', 'delicious', {
    /*****************************************************************************
     Cookie directives go here
    *****************************************************************************/
    httpOnly: true,
    secure: true,
    sameSite: 'Strict',
    expires: new Date(Date.now() + 1) 
  });
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(3100, () => console.log('App is running at localhost:3100'));
