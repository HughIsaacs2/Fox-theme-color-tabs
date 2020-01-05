function getThemeColor() {
	if(document.visibilityState === 'visible' && document.querySelector('meta[name=theme-color][content]') !== null){
		var themeColor = document.querySelectorAll('meta[name=theme-color][content]')[document.querySelectorAll('meta[name=theme-color][content]').length - 1].content;
		browser.runtime.sendMessage({"themeColor": themeColor});
	} else {
		browser.runtime.sendMessage({"themeColor": "none"});
	}
}

document.addEventListener("visibilitychange", getThemeColor);
document.addEventListener("load", getThemeColor);
document.addEventListener("readystatechange", getThemeColor);

getThemeColor();

if(document.querySelector('meta[name=theme-color][content]') !== null && document.visibilityState === 'visible'){
	let mList = document.querySelector('meta[name=theme-color][content]'),
	options = {
	  attributes: true
	},
	observer = new MutationObserver(mCallback);

	function mCallback(mutations) {
	  for (let mutation of mutations) {
		if (mutation.type === 'attributes') {
		  getThemeColor();
		}
	  }
	}
	observer.observe(mList, options);
}

/*
browser.runtime.onMessage.addListener(function(message){
	getThemeColor();
});
*/