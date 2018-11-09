/*****************************************************************************
Content Security Policy
*****************************************************************************/

// (1)
const csp_directives = {
  'default-src': ["'self'"],
};

// (2)
const csp_directives = {
  'default-src': ["'self'"],
  'style-src': ["'self'", 'stackpath.bootstrapcdn.com'],
  /* 
    Note: The asset page's request for the Bootstrap stylesheet will NOT be a CORS request. You can
    verify this by observing that the request will have no "Origin" header, and, you'll have no
    access to the resource's data (which, in this case, is the CSS object model). 
    But, because Bootstrap does provide an Access-Control-Allow-Origin header with a value 
    of "*", you could make this a CORS request by simply adding a crossorigin="anonymous" 
    attribute to the respective <link> tag on the asset page. Once a CORS request, you'll
    see an "Origin" header on the request, and, you'll have access to the CSS object model 
    (you can verify this by inspecting document.styleSheets[0].rules at the console, which
    will now show you all the rules in the CSS object model of the Bootstrap stylesheet).
  */
};

// (3)
const csp_directives = {
  'default-src': ["'self'"],
  'style-src': ["'self'", 'stackpath.bootstrapcdn.com'],
  'img-src': ['*'],
};

// (4)
const csp_directives = {
  'default-src': ["'self'"],
  'style-src': ["'self'", 'stackpath.bootstrapcdn.com'],
  'img-src': ['*'],
  'script-src': ['code.jquery.com'],
};

// (5)
const csp_directives = {
  'default-src': ["'self'"],
  'style-src': ["'self'", 'stackpath.bootstrapcdn.com'],
  'img-src': ['*'],
  'script-src': ["'self'", 'code.jquery.com'],
};

// (6)
const csp_directives = {
  'default-src': ["'self'"],
  'style-src': ["'self'", 'stackpath.bootstrapcdn.com'],
  'img-src': ['*'],
  'script-src': ["'self'", 'code.jquery.com', "'sha256-P6J4rdeeZW5IM5/jC6tfP9TdUnvOLXn1WuL2HDBlVaI='"],
};

// (7)
const csp_directives = {
  'default-src': ["'self'"],
  'style-src': ["'self'", 'stackpath.bootstrapcdn.com'],
  'img-src': ['*'],
  'script-src': ["*", 'code.jquery.com', "'sha256-P6J4rdeeZW5IM5/jC6tfP9TdUnvOLXn1WuL2HDBlVaI='", "'sha256-Xug6E/AiwGZUawBd+oAJTiLje3HICQrEKWVAnR8+qRg='"],
};

// (7, alternate)
const csp_directives = {
  'default-src': ["'self'"],
  'style-src': ["'self'", 'stackpath.bootstrapcdn.com'],
  'img-src': ['*'],
  'script-src': ["*", 'code.jquery.com', "'unsafe-inline'"],
};

