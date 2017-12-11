# jquery-snow
A simple jQuery snow plugin with customizable options and elements. Works with pure HTML elements. Can be used with FontAwesome or any other icon font as well as images.

# EXAMPLE USAGE (REQUIRES FONT AWESOME):

```
var snowEffectInterval = jQuery.fn.snow({
  minSize: 10, // min size of element (default: 20), works only for font base icons
  maxSize: 20, // max size of element (default: 50), works only for font base icons
  fallTimeMultiplier: 20, // flake fall time multiplier (default: 20)
  fallTimeDifference: 10000, // flake fall time difference (default: 10000)
  spawnInterval: 100, // interval (miliseconds) between new element spawns
  target: jQuery("body"), // jQuery element to apply snow effect on (should work on any block element)
  elements	: [ //elements to use in generating snow effect
    { // Element #1
      html: '<i class="fa fa-snowflake-o" aria-hidden="true"></i>', // html element to be spawned for this element
      color: '#ffffff' // hex color for this element - works only for font based icons
    },
    { // Element #2
      html: '<i class="fa fa-bell-o" aria-hidden="true"></i>', // html element to be spawned for this element
      color: '#ed9b40' // hex color for this element - works only for font based icons
    },
    { // Element #3
      html: '<i class="fa fa-snowflake-o" aria-hidden="true"></i>', // html element to be spawned for this element
      color: '#ffffff' // hex color for this element - works only for font based icons
    },
    { // Element #4
      html: '<i class="fa fa-music" aria-hidden="true"></i>', // html element to be spawned for this element
      color: '#cc2037' // hex color for this element - works only for font based icons
    },
    { // Element #5
      html: '<i class="fa fa-snowflake-o" aria-hidden="true"></i>', // html element to be spawned for this element
      color: '#ffffff' // hex color for this element - works only for font based icons
    }
  ]
});
```

# Tested on jQUery 2.7 and 3.1.
