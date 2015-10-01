
/* Canvas */
var c = document.getElementById("demoCanvas");
var ctx = c.getContext("2d");
ctx.fillStyle = "#AADD44";
ctx.fillRect(10, 10, 450, 280);

var grd = ctx.createLinearGradient(450, 0, 880, 0);
grd.addColorStop(0, "red");
grd.addColorStop(1, "blue");
ctx.fillStyle = grd;
ctx.fillRect(450, 10, 440, 280);

ctx.moveTo(10, 10);
ctx.lineTo(890, 290);
ctx.stroke();

ctx.beginPath();
grd = ctx.createRadialGradient(550, 150, 150, 500, 150, 0);
grd.addColorStop(0, "white");
grd.addColorStop(1, "blue");
ctx.fillStyle = grd;
ctx.arc(450, 150, 50, 0, 2*Math.PI);
ctx.fill();

ctx.font = "50px Arial";
ctx.strokeText("Test Application", 10, 290);

/* Geolocation */
var x = document.getElementById("geoLocation");
function getLocation() {
	if (navigator.geolocation) {
		//navigator.geolocation.getCurrentPosition(showPosition, handleError);
		navigator.geolocation.watchPosition(showPosition, handleError);
	} else {
		x.innerHTML = "Geolocation is not supported";
	}
}

function showPosition(position) {
	x.innerHTML = "Latitude: " + position.coords.latitude + 
		"<br>Longitude: " + position.coords.longitude;
}

function handleError(error) {
	x.innerHTML = error.message;
}

getLocation();

/* Storage */

var s = document.getElementById("localStorage");
var t = document.getElementById("sessionStorage");

if (typeof(Storage) !== "undefined") {
	localStorage.setItem("Name", "Brady");
	if (localStorage.count) {
		localStorage.count = Number(localStorage.count) + 1;
	} else {
		localStorage.count = 1;
	}
	s.innerHTML = "Local Storage Count: " + localStorage.count;

	sessionStorage.setItem("Name", "Brady");
	if (sessionStorage.count) {
		sessionStorage.count = Number(sessionStorage.count) + 1;
	} else {
		sessionStorage.count = 1;
	}
	t.innerHTML = "Session Storage Count: " + sessionStorage.count;
} else {
	s.innerHTML = "Storage not available";
	t.innerHTML = "Storage not available";
}

/* Arrays */
var cars = ["Saab", "Volvo", "BMW"];
cars[cars.length] = "Mazda";

var array1 = document.getElementById("array1");
var ul = document.createElement("ul")
array1.appendChild(ul);
for (var i = 0; i < cars.length; i++) {
	var li = document.createElement("li");
	var text = document.createTextNode(cars[i]);
	li.appendChild(text);
	ul.appendChild(li);
}

var array2 = document.getElementById("array2");
array2.innerHTML = cars.valueOf();

var array3 = document.getElementById("array3");
array3.innerHTML = cars.toString();

cars.sort();
var array4 = document.getElementById("array4");
array4.innerHTML = cars.join("|");

cars.sort(function(a,b) {
	var lastA = a.substring(a.length - 1, a.length);
	var lastB = b.substring(b.length - 1, b.length);
	return lastA > lastB ? -1 : 1;
});
var array5 = document.getElementById("array5");
array5.innerHTML = cars.join("|");

/* Drag/Drop */

function allowDrop(ev) {
	ev.preventDefault();
}

function drag(ev) {
	ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
	ev.preventDefault();
	var data = ev.dataTransfer.getData("text");
	ev.target.appendChild(document.getElementById(data));
}

/* WebSockets */

var ws = new WebSocket('ws://localhost:8080');

ws.onerror = function (error) {
	console.log(error);
};

ws.onmessage = function(e) {
	console.log(e.data);
};

ws.onopen = function() {
	console.log("Connected");
};

var btn = document.getElementById("websocket");
btn.addEventListener('click', function(event) {
	var result = ws.send('Ping');
	console.log(result);
});

/* Web Worker */
var w;

function startWorker() {
	w = new Worker("worker.js");
	w.onmessage = function(event) {
		document.getElementById("webworker").innerHTML = event.data;
	};
}

function stopWorker() {
	w.terminate();
}

/* XMLHttpRequest */

var xmlData = document.getElementById("xmlData");

function handleXML() {
	if (this.readyState == this.DONE) {
		if (this.status == 200) {
			xmlData.innerHTML = "XML Successfully Loaded.";
		}
	}
}

var client = new XMLHttpRequest();
client.onreadystatechange = handleXML;
client.open("GET", "/xml");
client.send();

/* Encoding */

var url = "http://localhost/my test.asp?name=test"
document.getElementById("original").innerHTML = "Original: " + url;
document.getElementById("encodeURI").innerHTML = "encodeURI: " + encodeURI(url);
document.getElementById("encodeURIComp").innerHTML = "encodeURIComp: " + encodeURIComponent(url);