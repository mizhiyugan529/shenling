function loadFickle() {
function insertAfter(el, referenceNode) {
 referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
}

var newEl = document.createElement('div');
newEl.setAttribute("id", "fickle");

var xhr = typeof XMLHttpRequest != 'undefined' ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
xhr.open('get', '/assets/extensions/zerosonesfun-fickle-announcement/fickle.txt', true);
xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) { 
        newEl.innerHTML = xhr.responseText;
    } 
}
xhr.send();

var ref = document.querySelector('div.IndexPage-toolbar');
if (ref !== null) {
insertAfter(newEl, ref);
}
}
window.onload = setTimeout(loadFickle, 1500);
