function Password() {
	this.asciiIgnore = [34,39,44,58,59,60,62,96];
	this.length = 24;
}

Password.prototype.random = function() {
	var rand = Math.floor(Math.random() * 94) + 33; //ASCII Limits: 33-126
	return (this.asciiIgnore.indexOf(rand) < 0) ? rand:this.random(); 
}

Password.prototype.get = function() {
	var str = '';
	for(var i = 0; i < this.length; i++) {
		str += String.fromCharCode(this.random());
	}
	return str;
}

window.onload = function() {
	var password = new Password(), inter = null;

	function applyNewPassword(pass) {
		document.getElementById('password').innerHTML = password.get();
	}

	document.getElementById('new').addEventListener('mousedown', function() {
		inter = setInterval(applyNewPassword, 50);
	});

	document.getElementById('new').addEventListener('mouseup', function() {
		clearInterval(inter);
	});

	document.getElementById('new').addEventListener('mouseout', function() {
		clearInterval(inter);
	});

	applyNewPassword();
}