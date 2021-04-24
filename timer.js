var timer = 0;
var pause_is_on = false;

function bind_listeners () {
  var form = document.querySelector("form");
  form.addEventListener("submit", start_timer);

  var pbutton = document.querySelector("#pause");
  pbutton.addEventListener("click", pause);
}

function pause() {
  pause_is_on = true;
}

function start_timer (event) {
  event.preventDefault();
  var hours = document.querySelector("#hours").value;
  var minutes = document.querySelector("#minutes").value;
  var seconds = document.querySelector("#seconds").value;

  hours = parseInt(hours);
  minutes = parseInt(minutes);
  seconds = parseInt(seconds);

  if (seconds || minutes || hours) {
    pause_is_on = false;
    timer = hours * 60 * 60 + minutes * 60 + seconds;
    display_time();
    setTimeout(countdown, 1000);
  }
}

function display_time() {
  var display = document.querySelector("#display");
  var ts = new Date(timer * 1000).toISOString().substr(11, 8);
  display.innerHTML = `${ts}`;
}

function countdown() {
  if (pause_is_on) {
    return;
  }

  timer = timer - 1;
  display_time();

  if (timer == 0) {
    var alarm = document.querySelector("#alarm");
    alarm.play();
  } else {
    setTimeout(countdown, 1000);
  }
}

document.addEventListener("DOMContentLoaded", (event) => {
  bind_listeners();
});
