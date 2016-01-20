/* jQuery Session vars v.0.3
 * by Jay Salvat
 * http://www.jaysalvat.com
 * -----------------------------------------------
 * Inspired by an idea from Mario Heiderich
 * http://code.google.com/p/quipt/
 * -----------------------------------------------
 * Requires jquery.json.js by DeadWisdom
 * http://code.google.com/p/jquery-json/
 * -----------------------------------------------
 * CHANGELOG
 * 0.3 -- 11-JUL-08
 * Security improvements
 * Calling manually sessionStart and sessionStop is not required anymore
 * Window.name is keept between pages
 * 0.2 -- 10-JUL-08
 * Now works with functions, objects and arrays
 * 0.1 -- 08-JUL-08
 * First draft
 * -----------------------------------------------
 * USAGE
 * - To Store
 * $(function() {
 *      $.session("myVar, "value");
 * });
 *
 * - To Read
 * $(function() {
 *      alert( $.session("myVar) );    
 * });
*/
(function($j) {
	var sessionData = {};
	var windowName  = "";
	var domain                      = location.href.match(/\w+:\/\/[^\/]+/)[0];
	var referrer            = (document.referrer) ? document.referrer.match(/\w+:\/\/[^\/]+/)[0] : "";

	if(referrer == "" || referrer !== domain) {
			window.name = window.name.replace("#"+domain+"#", "");
	}
		   
	function loadData() {
			stored = window.name.split("#"+domain+"#");
			windowName = window.name = stored[0];
			if (data = stored[1]) {
					$j.each(data.split(";"), function(i, data) {
											parts           = data.split("=");
											varName         = parts[0];
											varValue        = unescape(parts[1]);
											sessionData[varName] = varValue;
					});
			}
	}
   
	function saveData() {
			var dataToStore = windowName+"#"+domain+"#";
			$j.each(sessionData, function(varName, varValue) {              
							if (varName && varValue) {
									dataToStore += ( varName + "=" + escape( varValue ) + ";" );
							}
			});
			window.name = dataToStore;
	}
   
	$j.session = function(name, value) {
			if (value) {
					if ($j.isFunction(value)) {
									value = value();
					}
					if ( $j.toJSON ) {
							sessionData[name] = $j.toJSON(value);
					} else {
							sessionData[name] = value;
					}
			} else {
					if ( $j.evalJSON ) {
							return $j.evalJSON(sessionData[name]);
					} else {
							return sessionData[name];
					}
			}
	}
   
	$j.sessionStop = function() {
			saveData();
	}              
   
	$j.sessionStart = function() {
			loadData();
	}

	$j.sessionStart();
	window.onunload = function() { $j.sessionStop(); };
	   
})($j);
