function centerContainer() {
	var container = document.getElementById('container');
	container.style.marginLeft = Math.floor(container.offsetWidth/-2)+"px";
	container.style.marginTop = Math.floor(container.offsetHeight/-2)+"px";
}

window.onload = function() {
	centerContainer();

	var H = Math.floor(Math.random() * 358) + 1, B = 1;
	var el = document.getElementsByTagName('a');

	setInterval(function() {
		for(var i = 0; i < el.length; i++) {
			el[i].style.color = "hsl("+H+", 100%, 95%)";
		}
		if(H == 360) {
			B = -1;
		} else if(H == 0) {
			B = 1;
		}
		H += B;
	}, 10);
}

window.onresize = centerContainer;
