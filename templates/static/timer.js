let timerInterval;
let startTime;
let elapsedTime = 0;
let isTimerRunning = false;

function formatTime(milliseconds) {
  const date = new Date(milliseconds);
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');
  const millisecondsFormatted = String(date.getUTCMilliseconds()).padStart(3, '0');
  return `${minutes}:${seconds}.${millisecondsFormatted}`;
}

function updateTimer() {
  const currentTime = Date.now();
  elapsedTime = currentTime - startTime;
  document.getElementById('timerDisplay').textContent = formatTime(elapsedTime);
}

function toggleTimer() {
  if (!isTimerRunning) {
    // Start the timer
    isTimerRunning = true;
    if (elapsedTime === 0) {
      startTime = Date.now();
    } else {
      startTime = Date.now() - elapsedTime;
    }
    timerInterval = setInterval(updateTimer, 10); // Update every 10 milliseconds (miliseconds)
  } else {
    // Stop the timer
    isTimerRunning = false;
    clearInterval(timerInterval);
  }
}

function resetTimer() {
  isTimerRunning = false;
  clearInterval(timerInterval);
  elapsedTime = 0;
  document.getElementById('timerDisplay').textContent = formatTime(elapsedTime);
}
