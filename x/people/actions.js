function setSize() {
	var window_x = window.innerWidth;
	if(window_x < 700) {
		var size = 3;
	} else if(window_x >= 700 && window_x < 1000) {
		var size = 4;
	} else if(window_x >= 1000 && window_x <= 1500) {
		var size = 5;
	} else {
		var size = 6;
	}
	var w = Math.floor(window_x/size);
	$('img, li').css({
		width: w,
		height: w*1.5
	});
}

$(window).resize(function() {
	setSize();
}).load(function() {
	$.getJSON('people.json', function(people) {
		var grid = document.getElementById('grid').children[0], exist = [];
		while(exist.length < people.length) {
			var i = Math.floor(Math.random()*people.length);
			if(exist.indexOf(i) < 0) {
				exist.push(i);
				var li = document.createElement('li');
				li.style.background = "hsl("+(Math.random()*355)+",100%, 50%)";
				var a = document.createElement('a');
				a.href = people[i].link;
				a.target = "_blank";
				var div = document.createElement('div');
				var img = document.createElement('img');
				img.src = "imgs/"+people[i].name.toLowerCase().replace(/\s/g,"_").replace(/\W/g,"")+".jpg";
				div.appendChild(img);
				a.appendChild(div);
				li.appendChild(a);
				grid.appendChild(li);
			}
		}

		//Determine size
		setSize();
	});	
});