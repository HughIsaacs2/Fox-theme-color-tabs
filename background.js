/*!
 * Get the contrasting color for any hex color
 * (c) 2019 Chris Ferdinandi, MIT License, https://gomakethings.com
 * Derived from work by Brian Suda, https://24ways.org/2010/calculating-color-contrast/
 * @param  {String} A hexcolor value
 * @return {String} The contrasting color (black or white)
 */
var getContrast = function (hexcolor){

	// If a leading # is provided, remove it
	if (hexcolor.slice(0, 1) === '#') {
		hexcolor = hexcolor.slice(1);
	}

	// If a three-character hexcode, make six-character
	if (hexcolor.length === 3) {
		hexcolor = hexcolor.split('').map(function (hex) {
			return hex + hex;
		}).join('');
	}

	// Convert to RGB value
	var r = parseInt(hexcolor.substr(0,2),16);
	var g = parseInt(hexcolor.substr(2,2),16);
	var b = parseInt(hexcolor.substr(4,2),16);

	// Get YIQ ratio
	var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;

	// Check contrast
	return (yiq >= 128) ? 'black' : 'white';

};

var getImgDataUrl = function (imgUrl) {
	fetch(imgUrl).then(response => response.blob()).then(function(myBlob) {
	  var newImgUrl = URL.createObjectURL(myBlob);
	  return newImgUrl
	});
}

var tabTheme = {};
var oldTab = {};

async function oldTabColor() 
{
  var realTheme = await browser.theme.getCurrent();
  oldTab = realTheme;
  updateThemeForCurrentWindow(realTheme);
}

oldTabColor();

browser.theme.onUpdated.addListener(function(details){
	//
});

async function updateThemeForCurrentWindow(windowTheme) {
  let currentWindow = await browser.windows.getLastFocused();
  browser.theme.update(currentWindow.id, windowTheme);
}

browser.runtime.onMessage.addListener(function(message){
	console.log("Message received!");
	console.log(message);
	var theColor = message["themeColor"];
	console.log("theme-color: "+theColor);
	
	if(theColor != "none"){
		tabTheme = {
			colors: {
				tab_text: getContrast(theColor),
				tab_line: getContrast(theColor),
				tab_selected: theColor
			}
		};
		console.log(tabTheme);
		updateThemeForCurrentWindow(tabTheme);
	} else {
		//console.log(realTheme);
		oldTabColor();
	}
});

browser.tabs.onActivated.addListener(function(tab) {
    console.log(tab);
	/*
	var currentTheme = browser.theme.getCurrent().then(function(e){
		browser.theme.update(currentTheme.colors.tab_selected = "red");
	});
	*/
    browser.tabs.query({
            currentWindow: true,
            active: true
        },
        function(tabs) {
			//console.log(tabs);
            var activeTab = tabs[0];
			console.log(activeTab);
            //console.log(JSON.stringify(activeTab));
			//updateThemeForCurrentWindow(realTheme);
			
			  /*
			  var executing = browser.tabs.executeScript({
				file: "/get_theme_color.js",
				runAt: "document_end"
				});
				
			  executing.then(function(result){
				  
			  });
			  */
		});
});