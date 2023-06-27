const time = document.getElementById("time");
const start = document.getElementById("start");
const pause = document.getElementById("pause");
const reset = document.getElementById("reset");
const sesSub = document.getElementById("sesSub");
const sesAdd = document.getElementById("sesAdd");
const breSub = document.getElementById("breSub");
const breAdd = document.getElementById("breAdd");
const sesText = document.querySelector(".sesText");
const brekText = document.querySelector(".brekText");
const sessionValues = document.getElementById("sessionValues");

//Variables
let sesionTime = 0.5;
let breakTime = 1;
let clearTimer = false;
let pauseTimer = true;
let timerRunning = false;

//Load function
function load() {
	clearTimer = false;
	pauseTimer = true;
}

//Run timer function run time in reverse order and change session and break time
let timer;
let session = true;
function runSessionTimer() {
	let sesTime = sesionTime * 60;
	let breTime = breakTime * 60;
	//Start timer
	if (!timerRunning) {
		timer = sesTime;
		sesTime = sesionTime * 60;
		breTime = breakTime * 60;
		timerRunning = true;
		session = true;
	}

	let interval = setInterval(() => {
		if (clearTimer) {
			clearInterval(interval);
			return;
		}
		if (pauseTimer) {
			clearInterval(interval);
			return;
		}
		if (timerRunning) {
			timer--;
			let min = Math.floor(timer / 60);
			let sec = timer % 60;
			min = min < 10 ? "0" + min : min;
			sec = sec < 10 ? "0" + sec : sec;
			time.innerHTML = `${min}:${sec}`;
			if (timer == 0) {
				session = !session;
				timer = session ? sesTime : breTime;
			}
		}
	}, 1000);
}

//Session to break

//Break to Session

//Function to add and sub session time
sesAdd.addEventListener("click", () => {
	sesionTime += 10;
	sesText.innerHTML = `${sesionTime}min`;
});
sesSub.addEventListener("click", () => {
	sesionTime -= 10;
	sesionTime = sesionTime < 0 ? 0 : sesionTime;
	sesText.innerHTML = `${sesionTime}min`;
});

//Function to add and sub break time
breAdd.addEventListener("click", () => {
	breakTime += 5;
	brekText.innerHTML = `${breakTime}min`;
});
breSub.addEventListener("click", () => {
	breakTime -= 5;
	breakTime = breakTime < 0 ? 0 : breakTime;
	brekText.innerHTML = `${breakTime}min`;
});

//Start timer
start.addEventListener("click", () => {
	startFun();
});

//pause timer
pause.addEventListener("click", () => {
	pauseTimer = true;
});

//reset timer
reset.addEventListener("click", () => {
	resetFun();
});

//disable divs
function disable() {
	var nodes = sessionValues.getElementsByTagName("*");
	for (var i = 0; i < nodes.length; i++) {
		nodes[i].disabled = true;
	}
}

//enable divs
function enable() {
	var nodes = sessionValues.getElementsByTagName("*");
	for (var i = 0; i < nodes.length; i++) {
		nodes[i].disabled = false;
	}
}

//start
function startFun() {
	clearTimer = false;
	pauseTimer = false;
	disable();
	runSessionTimer();
}

//reset
function resetFun() {
	timerRunning = false;
	enable();
	clearTimer = true;
	time.innerText = "00:00:00";
}
