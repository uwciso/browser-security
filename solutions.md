# Solutions
---
## Content Security Policy

### (1)
```
const csp_directives = {
  'default-src': ["'self'"],
};
```
The web page itself will show you whether the inline scripts execute or not, but you can also verify this by inspecting the "Console" tab of Dev Tools, which will provide you more detailed info about the blocked script and how to allow it if you choose to.

### (2)
```
const csp_directives = {
  'default-src': ["'self'"],
  'style-src': ["'self'", 'stackpath.bootstrapcdn.com'],
};
```
The asset page's request for the Bootstrap stylesheet will NOT be a CORS request. You can verify this by observing that the request will have no "Origin" header, and, you'll have no access to the resource's data (which, in this case, is the CSS object model). But, because Bootstrap does provide an `Access-Control-Allow-Origin` header with a value of "*", you could make this a CORS request by simply adding a `crossorigin="anonymous"` attribute to the respective [`<link>` tag on the assets page](https://github.com/uwciso/browser-security/blob/master/public/assets.html#L7). Once a CORS request, you'll see an "Origin" header on the request, and, you'll have access to the CSS object model (you can verify this by inspecting `document.styleSheets[0].rules` at the console, which will now show you all the rules in the CSS object model of the Bootstrap stylesheet).

### (3)
```
const csp_directives = {
  'default-src': ["'self'"],
  'style-src': ["'self'", 'stackpath.bootstrapcdn.com'],
  'img-src': ['*'],
};
```

### (4)
```
const csp_directives = {
  'default-src': ["'self'"],
  'style-src': ["'self'", 'stackpath.bootstrapcdn.com'],
  'img-src': ['*'],
  'script-src': ['code.jquery.com'],
};
```

### (5)
```
const csp_directives = {
  'default-src': ["'self'"],
  'style-src': ["'self'", 'stackpath.bootstrapcdn.com'],
  'img-src': ['*'],
  'script-src': ["'self'", 'code.jquery.com'],
};
```

### (6)
```
const csp_directives = {
  'default-src': ["'self'"],
  'style-src': ["'self'", 'stackpath.bootstrapcdn.com'],
  'img-src': ['*'],
  'script-src': ["'self'", 'code.jquery.com', "'sha256-P6J4rdeeZW5IM5/jC6tfP9TdUnvOLXn1WuL2HDBlVaI='"],
};
```

### (7)
```
const csp_directives = {
  'default-src': ["'self'"],
  'style-src': ["'self'", 'stackpath.bootstrapcdn.com'],
  'img-src': ['*'],
  'script-src': ["*", 'code.jquery.com', "'sha256-P6J4rdeeZW5IM5/jC6tfP9TdUnvOLXn1WuL2HDBlVaI='", "'sha256-Xug6E/AiwGZUawBd+oAJTiLje3HICQrEKWVAnR8+qRg='"],
};
```

### (7, alternate)
```
const csp_directives = {
  'default-src': ["'self'"],
  'style-src': ["'self'", 'stackpath.bootstrapcdn.com'],
  'img-src': ['*'],
  'script-src': ["*", 'code.jquery.com', "'unsafe-inline'"],
};
```
Of the two methods to allow inline scripts (which, again, is not advisable), the first (7) is preferable, in that it allows only two specific inline scripts by supplying their hashes. Any other inline scripts would be blocked. Using the `unsafe-inline` method is, of course, unsafe because it opens the page up to *any* inline script.

## Subresource Ingegrity (SRI)

### (1)
```
<script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha384-tsQFqpEReu7ZLhBV2VZlAu7zcOV+rXbYlF2cqB8txI/8aZajjp4Bqd+V6D5IgvKT" crossorigin="anonymous"></script>
```
This is a CORS request, since a `crossorigin="anonymous"` attribute is included on the script tag, and the jQuery CDN provided an  `Access-Control-Allow-Origin: *` header. You can verify CORS by inspecting the request for the presence of an "Origin" header.

### (2)
To verify that the script has been blocked because its integrity value doesn't match, you can:
1. Try to execute a jQuery selection in the Dev Tools Console tab
2. Observe the "Failed to find a valid" error message in the Console tab (Chrome)
3. Use the (Chrome) Sources tab to see whether the jQuery resource is available

### (3)
You'll see that the file does not load, because the request must be CORS enabled. This makes sense when you consider that in order for the integrity value of the resource to be checked by the browser, it (the browser) must have full programmatic access to the resource.

## MIME Types 
### (2)
In the app.js file, use `app.use(helmet.noSniff())` after the `attach_cookie` method, then verify the presence of the `X-ContentT-Type-Options: nosniff` response header.

## Safer Cookies
### (1)
Access the cookie initially by using `document.cookie` in the Dev Tools console. The console should return `foo: bar`. Update the cookie directives object:
```
const cookie_directives = {
  httpOnly: true
}
```
Now, issue the `document.cookie` command in the Dev Tools console again, and see that the result is now only `""`.

### (2)
To verify the cookie is being sent on other same-origin resource requests, on the Dev Tools Network tab, select the resource, then look for the `Cookie: foo=bar` request header (you can also check the "Cookies" sub menu in the Network tab).
Now, add the "secure" directive to the cookie_directives object to allow cookies *only* on https requests:
```
const cookie_directives = {
  secure: true
}
```
Check same-origin requests to verify that this cookie is no longer being sent.

### (3)
```
const cookie_directives = {
  path: '/assets.html'
}
```
Note that on the initial page load, each asset's response will have a `Set-Cookie` header. But, on subsequent page loads, you should see that only the assets.html will have a `Cookie` header. 

At any time, you can clear the cookies from your browser for this specific app by using the "Storage" tab in Firefox's Dev Tools, or "Application" in Chrome.

### (4)
```
const cookie_directives = {
  sameSite: 'Strict'
}
```

### (5)
Use JS to create a new Date object set to one minute in the future:
```
const cookie_directives = {
  expires: new Date(Date.now() + 60000)
}
```