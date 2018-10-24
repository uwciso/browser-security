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

app.use(helmet.noSniff());

app.use(express.static('public'));

app.get('/example.html', (req, res) => {
  res.cookie('chipsahoy', 'delicious', {
    /*****************************************************************************
     Cookie directives go here
    *****************************************************************************/
  });
  res.sendFile(path.join(__dirname + '/example.html'));
});

app.listen(3100, () => console.log('App is running at localhost:3100'));
