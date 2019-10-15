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
	var xpath = '//text()[contains(., \"//\")]';
	var xpe = document.evaluate(xpath, display, null, XPathResult.ANY_TYPE, null);
	var value = xpe.iterateNext();
	var comments = [];
	while (value != null) {
		if (value.textContent.indexOf("\n") == -1 && value.textContent.trim().indexOf('//') == 0) {
			comments.push(value);
		}
		value = xpe.iterateNext();
	}
	comments.forEach(function(e) {
		var wrapper = document.createElement('span');
                e.parentNode.insertBefore(wrapper, e);
                wrapper.appendChild(e);
                wrapper.setAttribute("class", "code-comment");	
	});
};

setTimeout(function() {
	console.log("document loaded");
	setToSource("inlineA", "source-inlineA");
	setToSource("inlineB", "source-inlineB");
	setToSource("localScript", "source-localScript");
	setToSource("localImage", "source-localImage");
	setToSource("externalImage", "source-externalImage");
        
}, 500);
