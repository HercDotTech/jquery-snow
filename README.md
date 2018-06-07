# jQuery Snow Plugin
A simple jQuery snow plugin with customizable options and elements. Works with pure HTML elements. Can be used with FontAwesome or any other icon font as well as images.

# Project has been moved
Project moved to GitLab [ https://gitlab.com/VladERC/jquery-snow ] (07/06/2018)

# Usage (example uses fontAwesome):

In order to compensate for not having a ratio mechanism built-in you can just add a proportionate number of copies to the elements array, see below:

```
var snowEffectInterval = jQuery.fn.snow({
  // min size of element (default: 20)
  minSize: 10,
  
  // max size of element (default: 50)
  maxSize: 20,
  
  // flake fall time multiplier (default: 20)
  fallTimeMultiplier: 20, 
  
  // flake fall time difference (default: 10000)
  fallTimeDifference: 10000, 
  
  // Fall top-left to bottom-right (default: 270)
  direction: 225,
  
  // interval (miliseconds) between new element spawns (default: 500)
  spawnInterval: 100, 
  
  // jQuery element to apply snow effect on (should work on any block element) (default: body)
  target: jQuery("body"),
  
  //elements to use in generating snow effect
  elements	: [
  
    // Element #1
    { 
      // html element to be spawned for this element
      html: '<i class="fa fa-snowflake-o" aria-hidden="true"></i>',
      // hex color for this element - works only for font based icons
      color: '#ffffff'
    },
    
    // Element #2
    { 
      // html element to be spawned for this element
      html: '<i class="fa fa-bell-o" aria-hidden="true"></i>',
      // hex color for this element - works only for font based icons
      color: '#ed9b40'
    },
    
    // Element #3
    { 
      // html element to be spawned for this element
      html: '<i class="fa fa-snowflake-o" aria-hidden="true"></i>',
      // hex color for this element - works only for font based icons
      color: '#ffffff'
    },
    
    // Element #4
    {
      // html element to be spawned for this element
      html: '<i class="fa fa-music" aria-hidden="true"></i>',
      // hex color for this element - works only for font based icons
      color: '#cc2037'
    },
    
    // Element #5
    { 
      // html element to be spawned for this element
      html: '<i class="fa fa-snowflake-o" aria-hidden="true"></i>',
      // hex color for this element - works only for font based icons
      color: '#ffffff'
    },
  ]
});
```
# Additional info

Tested on jQuery 2.7 and 3.1.
