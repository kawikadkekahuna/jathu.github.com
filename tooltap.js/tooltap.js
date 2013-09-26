/*
* tooltap.js
* Creation: 2013 - Torono, Ontario
* Original Author: Jathu Satkunarajah - www.jathu.me
* 
* A jQuery library to enable tooltips for elements.
*
* License: none. Use it, break it, hack it ... do whatever you want. 
* If you create a derivative, please leave this intact and sign your name.
* "Real artists sign their work" - Steve Jobs
*/
(function($) {
	$.fn.tooltap = function(options) {

		//The base variable will be equivalent to "this", the trigger element
		var base = $(this), setting = $.extend({
			//Presets for style and properties of tooltap
			write: "Hello World",
			id: null, 
			background: "#fff",
			color: "#000",
			borderRadius: 4,
			borderColor: "#c5c5c5",
			shadow: "0px 2px 15px rgba(0,0,0,0.2)",
			width: "auto",
			maxWidth: 500,
			padding: 20,
			triangleSize: 10,
			triangleOffset: 10,
			speed: 250,
			position: null //Position takes in a string in the form "X Y". i.e. "Left Top". Options are X:left/right/center and Y:top/bottom/center
      	}, options), tool = null, triangleOut = null, triangleIn = null, originalPosition = setting.position;

		//We initially create the div element, this will be the actual tooltap
		base.active = function() {
			tool = document.createElement("div");
			tool.appendChild(document.createTextNode(setting.write));
			base.parent().append(tool);

			base.styleTool();	
		}
		
		/*Method to stylize the tooltap box... I did not want to create an extra css file just for this
		* This also allows each tooltap to have various style and properties. Of course if you want
		* them to act all the same, you can delete this whole method and stylize the #id tag.
		*/	
		base.styleTool = function() {
			$(tool).css({
				"position": "absolute",
				"display" : "none",
				"height" : "auto",
				"width" : setting.width,
				"max-width": setting.maxWidth+"px",
				"padding": setting.padding,
				"background": setting.background,
				"color": setting.color,
				"-wekbit-border-radius": setting.borderRadius,
				"-moz-border-radius": setting.borderRadius,
				"border-radius": setting.borderRadius,
				"border": "1px solid "+setting.borderColor,
				"box-shadow": setting.shadow,
				"text-align": "left",
				"z-index": "9999"
			});

			//This gives the created tooltap div and id, if you provided one
			if(setting.id != null) {
				$(tool).attr("id",setting.id);
			}

			base.positionGeometry();	
		}

		//Does all the math and positions the tooltap
		base.positionGeometry = function() {

			//Variables needed to do the math. Note: parent refers to the trigger element.
			var windowHeight = $(window).height(), windowWidth = $(window).width();
			var parentWidth = base.width(), parentHeight = base.height();
			var parentX = base.offset().left, parentY = base.offset().top;
			var thisWidth = $(tool).width() + parseInt($(tool).css("padding-left")) + parseInt($(tool).css("padding-right"));
			var thisHeight = $(tool).height() + parseInt($(tool).css("padding-top")) + parseInt($(tool).css("padding-bottom"));
			
			var pos = (setting.position == null) ? ["center","bottom"]:setting.position.split(" "), newX=0, newY=0;

			/*If the user doesn't provide a position, the default of "center bottom" is selected.
			* Note, this portion of the code deals with the "auto" feature of placing the tooltap
			* either at the bottom or top, given the space the broswer has at the top and bottom
			* of the parent element.
			*/
			if(setting.position == null || pos.length < 2) {
				if((windowHeight - (parentY+parentHeight)) > (thisHeight+setting.triangleSize)) {
					pos[1] = "bottom";
				} else if(parentY > (thisHeight+setting.triangleSize)) {
					pos[1] = "top";
				}
				setting.position = pos[0]+" "+pos[1];
			}

			//More math stuff...
			if(pos[0] == "left") {
				newX = parentX;
			} else if(pos[0] == "right") {
				newX = (parentWidth+parentX) - thisWidth;
			} else {
				newX = parentX + (parentWidth-thisWidth)/2;
			}

			if(pos[1] == "center") {
				newY = parentY + (parentHeight - thisHeight)/2;
			} else if(pos[1] == "top") {
				newY = parentY - thisHeight - (setting.triangleSize+2);
			} else {
				//Bottom
				newY = parentY + parentHeight + setting.triangleSize;
			}

			//Apply all that math to position the tooltap
			$(tool).css({
				"left": newX+"px",
				"top": newY+"px"
			}).fadeIn(setting.speed).css("display","inline");

			base.triangleGeometry();
		}

		//Creates the triangle portion of the tooltap. Also does the positioning
		base.triangleGeometry = function() {
			var triangleOut = document.createElement("div");
			var triangleIn = document.createElement("div");
			triangleOut.appendChild(triangleIn);
			tool.appendChild(triangleOut);

			var pos = setting.position.split(" ");

			//We create the triangles using CSS. To learn about it, please read: http://css-tricks.com/snippets/css/css-triangle/

			$(triangleOut).css({
				"position": "absolute",
				"width": "0px",
				"height": "0px",
				"border-left": setting.triangleSize+"px solid transparent",
				"border-right": setting.triangleSize+"px solid transparent"
			});
			$(triangleIn).css({
				"width": "0px",
				"height": "0px",
				"border-left": (setting.triangleSize-2)+"px solid transparent",
				"border-right": (setting.triangleSize-2)+"px solid transparent",
				"position": "absolute",
				"left": ((setting.triangleSize*-1)+2)+"px"
			});

			if(pos[1] == "top") {
				$(triangleOut).css({
					"bottom": (setting.triangleSize*-1)+"px",
					"border-top": setting.triangleSize+"px solid "+setting.borderColor
				});
				$(triangleIn).css({
					"box-shadow": "0px -1px 0px "+setting.background,
					"border-top": (setting.triangleSize-2)+"px solid "+setting.background,
					"bottom": "1px"
				});
			} else {
				$(triangleOut).css({
					"top": (setting.triangleSize*-1)+"px", 
					"border-bottom": setting.triangleSize+"px solid "+setting.borderColor
				});
				$(triangleIn).css({
					"box-shadow": "0px 1px 0px "+setting.background,
					"border-bottom": (setting.triangleSize-2)+"px solid "+setting.background,
					"top": "1px"
				});
			}

			if(pos[0] == "left") {
				$(triangleOut).css({
					"left": setting.triangleOffset+"px"
				});			
			} else if(pos[0] == "right") {
				$(triangleOut).css({
					"right": setting.triangleOffset+"px"
				});					
			} else {
				var thisWidth = $(tool).width() + parseInt($(tool).css("padding-left")) + parseInt($(tool).css("padding-right"));
				$(triangleOut).css({
					"left": ((thisWidth/2) - setting.triangleSize) + "px"
				});				
			}
		}

		//Deletes the tooltap
		base.deactive = function() {
			$(tool).fadeOut(setting.speed, function() {
				$(this).remove();
				//Since we changed the position value for "auto", we need to set it back to null or whatever the original value was
				setting.position = originalPosition;
			});
		}

		base.main = function() {
			base.mouseenter(function(event) {
				event.stopPropagation();
				base.active();
			}).mouseleave(function(event) {
				event.stopPropagation();
				base.deactive();
			});
		}

		//Start
		base.main();
		//Allows chaining
		return this;
	};
}(jQuery));