// replace span to reflect script having executed
var new_span = document.createElement('span');
new_span.setAttribute('class', 'allowed');
var new_content = document.createTextNode('allowed');
new_span.appendChild(new_content);
var current_span = document.getElementById('external-msg');
var parent_li = current_span.parentNode;
parent_li.replaceChild(new_span, current_span);
