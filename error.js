"use strict";

function queryObj() {

    var result = {}, keyValuePairs = location.search.slice(1).split('&');

    keyValuePairs.forEach(function(keyValuePair) {
        keyValuePair = keyValuePair.split('=');
        result[keyValuePair[0]] = keyValuePair[1] || '';
    });

    return result;
}

var datLink = queryObj()["dat"];

var datUrl = unescape(datLink);

if (datUrl.substring(0, 4) == "web+") {
	datUrl = datUrl.substring(4, datUrl.length);
}

var retryLink = document.createElement('a');
retryLink.href = "http://"+datUrl.substring(6, 70)+".i2p"+datUrl.substring(70, datUrl.length);
retryLink.innerText = "Retry";
retryLink.title = "Try loading the page again";
retryLink.className = "button";
document.body.appendChild(retryLink);

document.body.appendChild(document.createElement('br'));
document.body.appendChild(document.createElement('br'));

var datLink = document.createElement('a');
datLink.href = datUrl;
datLink.innerText = "dat:// link";
datLink.className = "button";
document.body.appendChild(datLink);