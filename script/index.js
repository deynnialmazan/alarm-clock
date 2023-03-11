'use strict';

const setAlarmBtn = document.querySelector('.set-alarm');
const clockDisplay = document.querySelector('.clock');
const output = document.querySelector('.output');
const alarmTime = document.querySelector('.alarm-time');
const feedback = document.querySelector('.feedback');

const alarmSound = new Audio('./sounds/alarm.mp3');
alarmSound.type = 'audio/mp3';
alarmSound.loop = true;


//Display time
function clock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    clockDisplay.innerText = (`${hours}:${minutes}:${seconds}`);
 }

let timerId = setInterval(clock, 1000);  // Executed every 1000 milliseconds = 1 second

//Validating time input

function validateTime(alarmTime) {
  var isValid = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(alarmTime.value);

  if (!isValid) {
    feedback.innerText = 'Time is invalid! Please add a correct time (hh:mm).';
    alarmTime.value = '';

  } else {
    feedback.innerText = '';
    output.style.visibility = 'visible';
    output.innerText = alarmTime.value;

  }
  return isValid;
};

function setAlarm() {
  // Get the input value and split it into hours and minutes
  const inputTime = alarmTime.value;
  const [hours, minutes] = inputTime.split(":");

  // Create a new date object
  const newalarmTime = new Date();
  newalarmTime.setHours(hours);
  newalarmTime.setMinutes(minutes);
  newalarmTime.setSeconds(0);

  // Calculate the number of milliseconds until the alarm should go off
  const timeUntilAlarm = newalarmTime.getTime() - Date.now();

  // Set a timeout that will go off when the alarm should go off
  setTimeout(() => {
    alarmSound.play();
    
    const stopAlarm = setTimeout(() => {
      alarmSound.pause();
    }, 60000); // Stop after 1 minute in milliseconds
  }, timeUntilAlarm);
}

setAlarmBtn.addEventListener('click', () => {
  validateTime(alarmTime);
  setAlarm();
  
});


  











