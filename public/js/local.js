// update span to reflect script having executed
var elem = document.getElementById('local-script-msg');
elem.innerText = 'allowed';
elem.setAttribute('class', 'allowed');

// display source code
var setToSource = function(id, displayId) {
	var code = String(document.getElementById(id).innerHTML);
	var init_spaces = code.match(/^\s*/)[0].length;
	var code_array = code.split('\n');
	var formatted_code = '';
	code_array.forEach(function (str) {
		formatted_code += str.slice(init_spaces-3, str.length) + '\n';
	});
	var display = document.getElementById(displayId);
	display.innerText = formatted_code;
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
