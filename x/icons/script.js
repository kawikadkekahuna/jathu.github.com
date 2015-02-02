var ICON = {
	"64": {
		"artist": "Panic Candybar",
		"link": "http://panic.com/"
	},
	"355": {
		"artist": "Jonas Rask",
		"link": "https://twitter.com/jonasrask"
	}
}




// STUFF BELOW
var UL = document.getElementById("icons");

function Con(num) {
	var self = this;

	this.init = function() {
		self.number = num;
		self.el = document.createElement("li");
		self.img = document.createElement("img");
		self.img.setAttribute("title", self.number);
		self.img.src = "icons/"+self.number+".png";
		self.div = document.createElement("div");
		self.div.className = "info";
		var info = self.getInfo();
		self.div.innerHTML = "<br /><br /><a target='_blank' href='"+self.img.src+"'>Download</a>";
		if(info != null) {
			self.div.innerHTML += "<br />By: <a target='_blank' href='"+info.link+"'>"+info.artist+"</a>";
		}
		self.el.appendChild(self.img);
		self.el.appendChild(self.div);
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