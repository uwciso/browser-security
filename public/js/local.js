// replace span to reflect script having executed
var new_span = document.createElement('span');
new_span.setAttribute('class', 'allowed');
var new_content = document.createTextNode('allowed');
new_span.appendChild(new_content);
var current_span = document.getElementById('external-msg');
var parent_li = current_span.parentNode;
parent_li.replaceChild(new_span, current_span);

// display source code
var setToSource = function(id, displayId) {
  var e = document.getElementById(id);
  var display = document.getElementById(displayId);
	display.innerText = e.innerHTML;
  hljs.highlightBlock(display);
};

window.onload = function() {
	setToSource("inlineA", "source-inlineA");
	setToSource("inlineB", "source-inlineB");
	setToSource("localScript", "source-localScript");
	setToSource("localImage", "source-localImage");
	setToSource("externalImage", "source-externalImage");
	setToSource("local-stylesheet", "source-local-stylesheet");
	setToSource("bootstrap-cdn", "source-bootstrap-cdn");
	setToSource("jquery-cdn", "source-jquery-cdn");
};
