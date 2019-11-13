// update link to File Browser files for each instance
const port = parseInt(window.location.port);
window.onload = function() {
  if(port >= 4000) {
    const filebrowser_url = 'http://' + window.location.hostname + ':' + (port + 1);
    
    if(document.getElementById('filebrowser_app') !== null) {
      document.getElementById('filebrowser_app').setAttribute('href', filebrowser_url + '/app.js');
    }
    if(document.getElementById('filebrowser_assets') !== null) {
      document.getElementById('filebrowser_assets').setAttribute('href', filebrowser_url + '/assets.html');
    }
  }
}