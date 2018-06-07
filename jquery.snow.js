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
 * @oaram direction - numeric value, 0 to 360, describing direction the icons move (270 -> top to bottom, 0 -> right to left)
 * @params spawnInterval - interval (miliseconds) between new element spawns (default: 500)
 * @params target - jQuery element to apply snow effect on (should work on any block element) (default: body)
 * @params elements - elements to use in generating snow effect
 *
 * @return interval - returns the interval so that the snow effect can be "paused"
 * 
 * Example usage in the README file
 */
(function ($) {
	
	$.fn.snow = function (userSettings) {
		
		var defaults = {
				minSize: 20,
				maxSize: 50,
				fallTimeMultiplier: 20,
				fallTimeDifference: 10000,
				spawnInterval: 500,
				target: $('body'),
				direction: 270,
				elements: [
					{
						html: '<i class="fa fa-snowflake-o" aria-hidden="true"></i>',
						color: '#ffffff'
					}
				]
			},
			settings = $.extend(defaults, userSettings),
			spawnLineStarts = {},
			spawnLineEnds = {},
			endLineStarts = {},
			endLineEnds = {},
			originOffset = {},
			$element = $('<div class="flake" />').css({'position': 'absolute', 'top': '-50px'}).html('')
		;
		
		var remapRange = function (val, r1s, r1e, r2s, r2e) {
			return r2s + (val - r1s) * (r2e - r2s) / (r1e - r1s);
		};
		
		var getPointOnRect = function (angle, w, h) {
			// Calculate once and store, to make quicker and cleaner
			var sine = Math.sin(angle), cosine = Math.cos(angle);
			// Distance to top or bottom edge (from center)
			var dy = sine > 0 ? h / 2 : h / -2;
			// Distance to left or right edge (from center)
			var dx = cosine > 0 ? w / 2 : w / -2;
			// if: (distance to vertical line) < (distance to horizontal line)
			if (Math.abs(dx * sine) < Math.abs(dy * cosine)) {
				// calculate distance to vertical line
				dy = (dx * sine) / cosine;
			}
			// else: (distance to top or bottom edge) < (distance to left or right edge)
			else {
				// move to top or bottom line
				dx = (dy * cosine) / sine;
			}
			
			// Return point on rectangle edge
			return {x: dx, y: dy};
		};
		
		var getPointOnLine = function (distance, p1, p2) {
			// Create vector between 2 points
			var dirV = {
				x: p2.x - p1.x,
				y: p2.y - p1.y
			};
			
			// Calculate vector length
			var dirVLength = Math.sqrt(Math.pow(dirV.x, 2) + Math.pow(dirV.y, 2));
			// Normalize vector
			dirV = {
				x: dirV.x / dirVLength,
				y: dirV.y / dirVLength
			};
			
			// Return point at given distance from P1 on P1P2 line
			return {
				x: dirV.x * distance + p1.x,
				y: dirV.y * distance + p1.y
			};
		};
		
		var getCircleIntersectionPoints = function (x1, y1, d1, x2, y2, d2) {
			if(d1 < 0 || d2 < 0) return;
			var a = d2;
			var b = d1;
			var c = Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
			var d = (b*b+c*c-a*a)/(2*c);
			var h = Math.sqrt(b*b-d*d);
			
			var x3 = (x2-x1)*d/c + (y2-y1)*h/c +  x1;
			var y3 = (y2-y1)*d/c - (x2-x1)*h/c +  y1;
			var x4 = (x2-x1)*d/c - (y2-y1)*h/c +  x1;
			var y4 = (y2-y1)*d/c + (x2-x1)*h/c +  y1;
			
			return [
				{x: x3, y: y3},
				{x: x4, y: y4}
			];
		};
		
		var degToRad = function (deg) {
			return Math.PI / 180 * deg;
		};
		
		var calculateLimitLines = function(width, height) {
			originOffset = {
				x: width/2,
				y: height/2
			};
			
			return calculateSpawnLine(width, height) && calculateEndLine(width, height);
		};
		
		var calculateLimitLine = function(width, height, direction) {
			// Get point on rect at given angle for given width & height
			var rectPoint = getPointOnRect(degToRad(direction), width, height);
			
			// Get line distance from origin of rect
			var lineDistance = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2));
			
			// Get line center point
			var lineCenter = getPointOnLine(
				lineDistance,
				{x: 0, y: 0},
				rectPoint
			);
			
			// Calculate length of line and half it
			var lineRadius = (Math.max(width, height) - 100) / 2;
			
			// Calculate distance from rect origin to spawn line end
			var originToSpawnEndDistance = Math.sqrt(Math.pow(lineDistance, 2) + Math.pow(lineRadius, 2));
			return getCircleIntersectionPoints(
				0, 0, originToSpawnEndDistance,
				lineCenter.x, lineCenter.y, lineRadius
			);
		};
		
		var calculateSpawnLine = function (width, height) {
			spawnLineEnds = calculateLimitLine(width, height, settings.direction);
			spawnLineStarts = spawnLineEnds[0];
			spawnLineEnds = spawnLineEnds[1];
			
			return true;
		};
		
		var calculateEndLine = function (width, height) {
			endLineEnds = calculateLimitLine(width, height, settings.direction + 180);
			endLineStarts = endLineEnds[0];
			endLineEnds = endLineEnds[1];
			
			return true;
		};
		
		return function () {
			settings.target.css("overflow", "hidden");
			var targetHeight = settings.target.outerHeight(true);
			var targetWidth = settings.target.outerWidth(true);
			if (calculateLimitLines(targetWidth, targetHeight)) {
				setInterval(function () {
					var opacity = 0.5 + Math.random(),
						zIndex = remapRange(opacity, 0.5, 1, -1000, -900),
						sizeFlake = settings.minSize + Math.random() * settings.maxSize,
						fallTime = targetHeight * settings.fallTimeMultiplier + Math.random() * settings.fallTimeDifference,
						currentElement = settings.elements[Math.floor(Math.random() * settings.elements.length)];
					
					var spawnOffsetX = Math.random() * targetWidth;
					
					var spawnPos = getPointOnLine(spawnOffsetX, spawnLineStarts, spawnLineEnds);
					spawnPos = {
						x: spawnPos.x + originOffset.x,
						y: spawnPos.y + originOffset.y
					};
					
					var endPos = getPointOnLine(targetWidth - spawnOffsetX, endLineStarts, endLineEnds);
					endPos = {
						x: endPos.x + originOffset.x,
						y: endPos.y + originOffset.y
					};
					
					$element
						.clone()
						.html(currentElement.html)
						.appendTo(settings.target)
						.css({
							'left': spawnPos.x,
							'top': spawnPos.y,
							'opacity': opacity,
							'font-size': sizeFlake,
							'width': sizeFlake,
							'height': sizeFlake,
							'color': currentElement.color,
							'z-index': zIndex
						})
						.animate(
							{
								top: endPos.y,
								left: endPos.x,
								opacity: 1
							},
							fallTime,
							'linear',
							function () {
								// Change this to handle fall end action
								$(this).fadeOut('fast', function () {
									$(this).remove();
								})
							}
						);
				}, settings.spawnInterval);
			} else {
				console.error("Could not calculate spawn line!");
			}
		}()
	};
	
})(jQuery);
