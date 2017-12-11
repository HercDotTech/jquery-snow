/**
 * A simple jQuery snow plugin.
 *
 * Available under GPL licence
 *
 * In order to compensate for not having a ratio mechanism built-in you can just add a proportionate number of copies to the elements array, see example.
 *
 * @version 2.0 (11/12/17)
 * @author Vlad-Andrei Erculescu
 * @requires jQuery
 *
 * @params minSize - min size of element (default: 20)
 * @params maxSize - max size of element (default: 50)
 * @param fallTimeMultiplier - flake fall time multiplier, the larger the number the longer *all* flakes will take to "land" (default: 20)
 * @param fallTimeDifference - flake fall time difference, the larger the number the bigger the difference in fall time between flakes (default: 10000)
 * @params spawnInterval - interval (miliseconds) between new element spawns (default: 500)
 * @params target - jQuery element to apply snow effect on (should work on any block element) (default: body)
 * @params elements - elements to use in generating snow effect
 *
 * @return interval - returns the interval so that the snow effect can be "paused"
 * 
 * Example usage in the README file
 */
(function($){
	
	$.fn.snow = function(settings){
		
		var defaults = {
				minSize				: 20,
				maxSize				: 50,
				fallTimeMultiplier	: 20,
				fallTimeDifference 	: 10000,
				spawnInterval		: 500,
				target				: $('body'),
				elements			: [
					{
						html: '<i class="fa fa-snowflake-o" aria-hidden="true"></i>',
						color: '#ffffff'
					}
				]
			},
			settings		= $.extend({}, defaults, settings),
			targetHeight 	= settings.target.outerHeight(),
			targetWidth		= settings.target.outerWidth(),
			$element 		= $('<div class="flake" />').css({'position': 'absolute', 'top': '-50px'}).html('')
		;
		
		
		return setInterval( function(){
			var startPosX 		= Math.random() * targetWidth - 100,
				opacity			= 0.5 + Math.random(),
				sizeFlake		= settings.minSize + Math.random() * settings.maxSize,
				startPosY		= targetHeight - 20,
				endPosX			= startPosX - 100 + Math.random() * 200,
				fallTime		= targetHeight * settings.fallTimeMultiplier + Math.random() * settings.fallTimeDifference,
				currentElement 	= settings.elements[Math.floor(Math.random()*settings.elements.length)];
			
			$element
				.clone()
				.html(currentElement.html)
				.appendTo(settings.target)
				.css({
					'left': startPosX,
					'opacity': opacity,
					'font-size': sizeFlake,
					'width' : sizeFlake,
					'height': sizeFlake,
					'color': currentElement.color
				})
				.animate(
					{
						top: startPosY,
						left: endPosX,
						opacity: 1
					},
					fallTime,
					'linear',
					function() {
						// Change this to handle fall end action
						$(this).fadeOut('fast', function() {
							$(this).remove();
						})
					}
				);
		}, settings.spawnInterval);
	};
	
})(jQuery);
