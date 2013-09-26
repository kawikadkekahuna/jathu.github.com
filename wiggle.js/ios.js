$(document).ready(function() {

	//Array to hold all the icon objects
	var icons = new Array();

	for(var i = 0; i < 10; i++) {

		//Create a new html element, append it to the DOM and create a new object in icons.
		var temp = "<div class='icons' id='icon_"+i+"'><img src='icons/"+(i+1)+".jpg' /></div>";
		$("#screen").append(temp);
		icons.push(new Wiggle("#icon_"+i));

		//To the recently created object, add the following methods
		icons[i].during(function() {
			//While wiggling, create a new delete element, so the icons can be deleted.
			$(this.div).append("<div class='delete'></div>");

			//Give those new delete elements a click event to delete their parents
			//Which would be the whole div.
			$(".delete").click(function() {
				$(this).parent().remove();
			});
		}).done(function() {
			//When the wiggling has stoped, remove those delete elements.
			$(this.div).children(".delete").remove();
		}).disable();
	}

	function wiggleAll() {
		//Function to start all wiggling
		for(var i = 0; i < icons.length; i++) {
			icons[i].start();
		}
	}

	function stopAllWiggle() {
		//Function to stop all wiggling. Notice we disable each object's events.
		for(var i = 0; i < icons.length; i++) {
			icons[i].stop();
			icons[i].disable();
		}

		//We reset our global event		
		setAllEvents();
	}

	function setAllEvents() {

		//As the objects have individual events, click->hold will only wiggle themselves.
		//So we recreate a new event listener here by wiggling ALL the icons. The events
		//are similar to that of the object.

		var timer = null;
		$(".icons").mousedown(function(){
			timer = setTimeout(function() {
				wiggleAll();
			}, 1000);
		}).bind("mouseleave mouseup",function() {
			clearTimeout(timer);
		});
	}

	//We need to set all the events
	setAllEvents();

	//Stop the wiggling once the iOS background is clicked
	$("body").click(function(e) {
		if($(e.target).attr('id') == "iOS") {
			stopAllWiggle();
		}
	});

});