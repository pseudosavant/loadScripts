/*
`loadScripts` by Paul Ellis (c) 2017
https://pseudosavant.com
License: MIT
*/

(function(global){
'use strict';

/*
loadscripts
url: <string> or <array>
success (optional): <function>
error (optional): <function>
returns <array>Script Elements
*/
  
function loadScripts(url, success, error) {  
  var loaded = 0;

  // This function is the callback for each individual script load.
  // It runs `success()` when all scripts have loaded.
  function resume() {
    loaded++;
    
    if (loaded >= urls.length) {
      success();
    }
  }

  // Load an individual script by URL and call the given callback on a successful load
  function load(url, callback) {
    var script = document.createElement('script');
    document.body.appendChild(script);
    
    // Add an event listener for the *individual* success callback when the script completes loading
    if (typeof callback === 'function') {
      script.addEventListener('load', callback, false);
      script.src = url;
    }
    
    // Add an event listener for the *overall* error callback when the script fails
    if (typeof error === 'function') {
      script.addEventListener('error', function(e) {
        error(new Error('Failed to load url ('+ url +')'));
      }, false);
      
      script.src = url;
    }
    
    // The script is always returned from the function so that you can add more events if wanted
    return script;
  }
  
  // Convert <string>url into <Array>url
  var urls = (Array.isArray(url) ? url : [url]);
  var scriptElements = [];
  
  // Initiate loading of each URL in the `scriptElements` array.
  // Push each  script element into an array.
  urls.forEach(function(url){
    scriptElements.push(
      load(url, resume)
    );
  });

  // Return all of the script elements so more can be done with them: add events, check the `src`, etc.
  return scriptElements;
}

// Add `loadScripts` to the global scope
global.loadScripts = loadScripts;
  
})(this);
