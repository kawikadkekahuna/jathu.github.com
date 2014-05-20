function Pomodoro() {
	this.timer = 1500000; //25 minutes -> milliseconds
	this.song = "https://www.youtube.com/watch?v=vj5i8s6icsQ"; //Celebration songs
	this.running = false;
	this.count = 0;
	this.dom = {
		"action": document.getElementById('action'),
		"count": document.getElementById('count')
	}
	//Start methods
	this.startEvents();
	this.loadCount();
}

Pomodoro.prototype.loadCount = function() {
	if(typeof(Storage) !== undefined) {
		var storeDate = (localStorage.day == undefined) ? 0:parseInt(localStorage.day);
		if((new Date()).getDate() == storeDate) {
			this.count = (localStorage.count == undefined) ? 0:parseInt(localStorage.count);
			this.setCount();
		}
	} else {
		alert('Get Chrome.');
	}	
}

Pomodoro.prototype.start = function() {
	if(!this.running) {
		var that = this;
		this.running = true;
		this.dom.action.innerHTML = "Stop";
		$('iframe').remove();
		$('#bar').animate({
			height: 0
		}, this.timer, function() {
			that.complete();
		});
	}
}

Pomodoro.prototype.setCount = function() {
	this.dom.count.innerHTML = (this.count > 0) ? this.count:"";
}

Pomodoro.prototype.play = function() {
	var songId = this.song.substring(this.song.indexOf("?v=")+3), iframe = document.createElement('iframe');
	iframe.id = "play";
	iframe.src = "http://www.youtube.com/v/"+songId+"?autoplay=1&controls=0";
	iframe.frameborder = 0;
	document.getElementsByTagName('body')[0].appendChild(iframe);
}

Pomodoro.prototype.complete = function() {
	this.play(); //Play victory song
	this.count += 1;
	localStorage.setItem('day',(new Date()).getDate());
	localStorage.setItem('count', this.count);
	this.setCount();
	this.reset();
}

Pomodoro.prototype.reset = function() {
	var that = this;
	$('#bar').stop().animate({
		height: "100%"
	}, 250, function() {
		that.running = false;
		that.dom.action.innerHTML = "Start";
		$('#done').fadeIn(250, function() {
			setTimeout(function() {
				$('#done').fadeOut();
			}, 300000); //5 Minute rest
		});
	});
}

Pomodoro.prototype.startEvents = function() {
	var that = this;
	this.dom.action.addEventListener('click', function() {
		if(that.running) {
			that.reset();
		} else {
			that.start();
		}
	});
}

window.onload = function() {
	var P = new Pomodoro();
}