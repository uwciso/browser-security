# Solutions
---
## Content Security Policy

Note that for all CSP solutions below, the second argument of the `res.append` method must be a double-quoted string, inside of which there may be single-quoted keywords (such as `'self'`, for example).

### (1)
```
  res.append("Content-Security-Policy", 
  "default-src 'self';"
  );
```
The web page itself will show you whether the inline scripts execute or not, but you can also verify this by inspecting the "Console" tab of Dev Tools, which will provide you more detailed info about the blocked script and how to allow it if you choose to.

### (2)
```
  res.append("Content-Security-Policy", 
  "default-src 'self'; style-src 'self' stackpath.bootstrapcdn.com;"
  );
```
The asset page's request for the Bootstrap stylesheet will NOT be a CORS request. You can verify this by observing that the request will have no `Origin` header, and, you'll have no access to the resource's data (which, in this case, is the CSS object model). But, because Bootstrap does provide an `Access-Control-Allow-Origin` header with a value of "*", you could make this a CORS request by simply adding a `crossorigin="anonymous"` attribute to the respective [`<link>` tag on the assets page](https://github.com/uwciso/browser-security/blob/master/public/assets.html#L8). Once a CORS request, you'll see an "Origin" header on the request, and, you'll have access to the CSS object model (you can verify this by inspecting `document.styleSheets[0].rules` at the console, which will now show you all the rules in the CSS object model of the Bootstrap stylesheet).

### (3)
```
  res.append("Content-Security-Policy", 
  "default-src 'self'; style-src 'self' stackpath.bootstrapcdn.com; img-src *"
  );
```

### (4)
```
  res.append("Content-Security-Policy", 
  "default-src 'self'; style-src 'self' stackpath.bootstrapcdn.com; img-src *; script-src code.jquery.com"
  );
```

### (5)
```
  res.append("Content-Security-Policy", 
  "default-src 'self'; style-src 'self' stackpath.bootstrapcdn.com; img-src *; script-src 'self' code.jquery.com"
  );
```

### (6)
```
  res.append("Content-Security-Policy", 
  "default-src 'self'; style-src 'self' stackpath.bootstrapcdn.com; img-src *; script-src 'self' code.jquery.com 'sha256-h1cwFPKTk2NoBlhgjC+PVpyHwrmO1lKm3LKvZNeaAjk='"
  );
```

### (7)
```
  res.append("Content-Security-Policy", 
  "default-src 'self'; style-src 'self' stackpath.bootstrapcdn.com; img-src *; script-src 'self' code.jquery.com 'sha256-h1cwFPKTk2NoBlhgjC+PVpyHwrmO1lKm3LKvZNeaAjk=' 'sha256-ktXNNbajyvb1elC7TIqtLmLapqNler4nyCe5KEGgSG8='"
  );
```

### (7, alternate)
```
  res.append("Content-Security-Policy", 
  "default-src 'self'; style-src 'self' stackpath.bootstrapcdn.com; img-src *; script-src 'self' code.jquery.com 'unsafe-inline'"
  );
```
Of the two methods to allow inline scripts (which, again, is not advisable), the first (7) is preferable, in that it allows only two specific inline scripts by supplying their hashes. Any other inline scripts would be blocked. Using `unsafe-inline` is, of course, unsafe because it opens the page up to *any* inline script.

## Subresource Ingegrity (SRI)

### (1)
```
<script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha384-tsQFqpEReu7ZLhBV2VZlAu7zcOV+rXbYlF2cqB8txI/8aZajjp4Bqd+V6D5IgvKT" crossorigin="anonymous"></script>
```
This is a CORS request, since a `crossorigin="anonymous"` attribute is included on the script tag, and the jQuery CDN provided an  `Access-Control-Allow-Origin: *` header. You can verify CORS by inspecting the request for the presence of an `Origin` header.

### (2)
To verify that the script has been blocked because its integrity value doesn't match, you can:
1. Try to execute a jQuery selection in the Dev Tools Console tab
2. Observe the "Failed to find a valid" error message in the Console tab (Chrome)
3. Use the Sources tab (Chrome) or Debugger > Sources (Firefox) to see whether the jQuery resource is available

### (3)
You'll see that the file does not load, because the request must be CORS enabled. This makes sense when you consider that in order for the integrity value of the resource to be checked by the browser, it (the browser) must have full programmatic access to the resource.

## MIME Types 
### (2)
In the app.js file, add another <code>res.append</code> statement in the first <code>app.use</code> function
```
res.append("X-Content-Type-Options", "nosniff");
```
Then, verify the presence of the `X-Content-Type-Options: nosniff` response header.

## Safer Cookies
### (1)
Access the cookie initially by using `document.cookie` in the Dev Tools console. The console should return `foo: bar` Update the cookie props object:
```
const cookie_props = {
  httpOnly: true
}
```
Now, issue the `document.cookie` command in the Dev Tools console again, and see that the `foo=bar` value is no longer accessible.

### (2)
```
const cookie_props = {
  path: '/assets.html'
}
```
Note that on the initial page load, each asset's response will have a `Set-Cookie` header. But, on subsequent page loads, you should see that only the assets.html will have a `Cookie` request header. 

At any time, you can clear the cookies from your browser for this specific app by using the "Storage" tab in Firefox's Dev Tools, or "Application" in Chrome.

### (3)
```
const cookie_props = {
  sameSite: 'Strict'
}
```

### (4)
Use JS to create a new Date object set to one minute in the future:
```
const cookie_props = {
  expires: new Date(Date.now() + 60000)
}
```

Reload the page, and observe that the cookie was sent on the initial response with assets.html (with the `Set-Cookie` response header). Similarly, all subsequent asset requests will include this cookie (with the `Cookie` request header). After a minute elapses, reload the page again, and observe that the cookie is no longer sent along with asset requests.

### (5)
To verify the cookie is being sent on requests to assets.html, on the Dev Tools Network tab, select the assets.html resource, then look for the `Cookie` request header (you can also check the "Cookies" sub menu in the Network tab).
Now, add the `secure` property to the cookie to allow cookies *only* on https requests:
```
const cookie_props = {
  secure: true
}
```
Check same-origin requests to verify that this cookie is no longer being sent (there should be no `Cookie` request header).
