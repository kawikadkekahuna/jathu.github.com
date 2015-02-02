var ICON = {
	"355": {
		"artist": "Jonas Rask",
		"link": "https://twitter.com/jonasrask"
	}
}




// STUFF BELOW

function setSelected(obj) {
	document.getElementById("selected").style.display = "inline";
	document.getElementById("selected-img").src = obj.getImgSrc();
	document.getElementById("selected-download").href = obj.getImgSrc();

	var a = document.getElementById("selected-artist");
	if(obj.getInfo() != null) {
		a.innerHTML = "By: "+obj.getInfo().artist;
		a.href = obj.getInfo().link;
		a.setAttribute("target","_blank");
	} else {
		a.innerHTML = "By: Unknown";
		a.href = "#";
		a.setAttribute("target","");
	}
}

var UL = document.getElementById("icons");

function Con(num) {
	var self = this;

	this.init = function() {
		self.number = num;
		self.el = document.createElement("li");
		self.el.setAttribute("title", self.number);
		self.img = document.createElement("img");
		self.img.src = "icons/"+self.number+".png";
		self.el.appendChild(self.img);
		self.el.addEventListener("click", function() {
			setSelected(self);
		});
		UL.appendChild(self.el);
	}

	this.getImgSrc = function() {
		return self.img.src;
	}

	this.getInfo = function() {
		if(ICON.hasOwnProperty(self.number)) {
			return ICON[self.number];
		} else {
			return null;
		}
	}

	this.init();
}

window.onload = function() {
	var MAX = 541, container = [];
	for(var i = 1; i <= MAX; i++) {
		container.push(new Con(i));
	}
}