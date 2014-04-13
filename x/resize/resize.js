/*****************************************************************************/

function Resizer(img) {
	this.img = img;
	this.can = document.createElement('canvas');
	this.ctx = this.can.getContext('2d');
}

Resizer.prototype.resize = function(x, y) {
	this.can.width = this.img.width;
	this.can.height = this.img.height;
	this.canImg = this.ctx.drawImage(this.img, 0, 0, this.img.width, this.img.height);
	return this;
}


Resizer.prototype.save = function() {
	window.location.href = this.can.toDataURL('image/png');
}

/*****************************************************************************/

function X(data) {
	this.img = data;
	this.size = {
		'x': document.getElementById('size-x'),
		'y': document.getElementById('size-y')
	}
	this.ratio = data.width/data.height;
	this.width = data.width;
	this.height = data.height;

	this.rzr = new Resizer(data);

	var that = this;
	$(this.size.x).keyup(function() {
		that.changeWidth();
	});
	$(this.size.y).keyup(function() {
		that.changeHeight();
	});
	$('#do-resize').click(function() {
		that.rzr.resize().save();
	});

	this.paint();
}

X.prototype.paint = function() {
	this.img.style.width = this.width+"px";
	this.img.style.height = this.height+"px";
	this.img.style.marginLeft = (this.width/(-2))+"px";
	this.img.style.marginTop = (this.height/(-2))+"px";

	this.size.x.innerHTML = this.width;
	this.size.y.innerHTML = this.height;
}

X.prototype.changeWidth = function() {
	this.width = this.size.x.innerHTML;
	this.height = Math.floor(this.width/this.ratio);
	this.paint();
}

X.prototype.changeHeight = function() {
	this.height = this.size.y.innerHTML;
	this.width = Math.floor(this.height*this.ratio);
	this.paint();
}

/*****************************************************************************/

$(document).ready(function() {
	$('#picFormInput').change(function() {
		$('#userPic').remove();
		$('#size-x,#size-y,#do-resize').unbind();
		if(this.files && this.files[0]) {
			var reader = new FileReader();
			reader.onload = function(e) {
				var userPic = document.createElement('img');
				userPic.id = 'userPic';
				userPic.src = e.target.result;
				document.getElementsByTagName('body')[0].appendChild(userPic);
				var cont = new X(userPic);
			}
			reader.readAsDataURL(this.files[0]);
		}
	});

	$('#do-choose').click(function() {
		$('#picFormInput').click();
	});
});