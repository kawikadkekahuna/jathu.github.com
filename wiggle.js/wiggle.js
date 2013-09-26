/*

	Original Developer: Jathu Satkunarajah (www.jathu.me)
	Original Creation: May 2013
	Description: A framework that mimics the click->hold->wiggle feature
	in Apple's iOS.
	License: Use it however you want, wherever you want.

*/

function Wiggle(div) {
	/*Developer Preferences - Global Variables*/
	var hold_time = 1000; //Higher number => Longer hold to activate wiggle
	var wiggle_speed = 25; //Lower number => Faster wiggle

	this.div = div; //This is so the developer can access the object's div element
	this.interval = null; //Used for wiggle animation interval
	this.timer = null;	//Used for hold timer

	//Events
	this.clickEvent = null;
	this.duringEvent = null;
	this.doneEvent = null;

	Wiggle.prototype.enable = function() {
		/*	(None) -> None
			Method that enables mousedown, mouseup, mouseleave and click events.
		*/
		var that = this;
		
		//If the user holds down the mouse, start the timeout for hold_time miliseconds.
		//However, if the mouse is let go or leaves the element, cancel the timer.
		$(this.div).bind("mousedown", function() {
			that.timer = setTimeout(function() {
				that.start();
			}, hold_time);
		}).bind("mouseup mouseleave", function() {
			clearTimeout(that.timer);
		}).bind("click", function() {
			//Allows click event
			that.clickEvent();
		});

		return this;
	}


	Wiggle.prototype.disable = function() {
		/* (None) -> None
			Method that disables mousedown, mouseup, mouseleave and click events.
		*/
		$(this.div).unbind("mouseleave mouseup mousedown click");

		return this;
	}

	Wiggle.prototype.start = function() {
		/* (None) -> None
			Starts wiggling the objecct. Disables events for the object.
		*/

		var deg = 0, range = new Array(-2, -1, 0, 1, 2, 1, 0, -1), that = this;

		//Runs any funtions the user wants durign the wiggle, if any is present.
		this.duringEvent();

		//Disables all other events to the object. This is so the events do no
		//get triggered accidently.
		this.disable();

		//Interval to do the wiggle animation
		this.interval = setInterval(function() {
			that.rotate(range[deg]);
			deg += (deg >= 7) ? -7:1;
		}, wiggle_speed);

		return this;
	}

	Wiggle.prototype.stop = function() {
		/* (None) -> None
			Stops the wiggle animation and resets the rotation to 0. Also enables
			the events for the object.
		*/

		//Stops the wiggle interval
		clearInterval(this.interval);
		//Resets the rotation to 0 degrees
		this.rotate(0);
		//Re-enable the events
		this.enable();
		
		if(this.doneEvent != null) {
			//If there are any functions to be run after the wiggling stops, then run it
			this.doneEvent();
		}

		return this;
	}

	Wiggle.prototype.rotate = function(deg) {
		/* (int) -> None
			Rotates the object deg degrees.
		*/

		//Multiple css statements to work with various browsers
		$(this.div).css({
			'-webkit-transform': 'rotate('+deg+'deg)',
			'-moz-transform': 'rotate('+deg+'deg)',
			'-o-transform': 'rotate('+deg+'deg)',
			'-sand-transform': 'rotate('+deg+'deg)',
			'transform': 'rotate('+deg+'deg)'
		});

		return this;
	}
	
	//The following are all methods to deal with various events the developer
	//can choose to have. Notice we return this object on each method to allow chaining.

	Wiggle.prototype.click = function(fnc) {
		this.clickEvent = fnc;
		return this;
	}

	Wiggle.prototype.during = function(fnc) {
		this.duringEvent = fnc;
		return this;
	}

	Wiggle.prototype.done = function(fnc) {
		this.doneEvent = fnc;
		return this;
	}

	//When the object is created, enable the event listeners.
	this.enable();
}