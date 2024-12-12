// Select DOM elements
const countdownTimerElement = document.querySelector(".countdown-timer");
const timeLimit = 10 * 60; // 10 minutes in seconds
const timerKey = "countdown-timer"; // Key for localStorage

// Function to initialize or resume the timer
function initializeTimer() {
  let remainingTime = parseInt(localStorage.getItem(timerKey), 10);

  if (isNaN(remainingTime) || remainingTime <= 0) {
    // If no timer exists or expired, start a new one
    remainingTime = timeLimit;
    localStorage.setItem(timerKey, remainingTime);
  }

  startCountdown(remainingTime);
}

// Function to start the countdown
function startCountdown(initialTime) {
  let remainingTime = initialTime;

  const timerInterval = setInterval(() => {
    if (remainingTime > 0) {
      remainingTime--;
      localStorage.setItem(timerKey, remainingTime); // Save the time to localStorage
      updateTimerDisplay(remainingTime);
    } else {
      clearInterval(timerInterval); // Stop the timer
      localStorage.removeItem(timerKey); // Clear the timer from storage
      disableUserActions(); // Handle expired timer actions
    }
  }, 1000);
}

// Function to update the timer display
function updateTimerDisplay(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  countdownTimerElement.textContent = `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
}

// Function to disable user actions when time is up
function disableUserActions() {
  alert("Time is up! Please start again.");
  document.querySelector("body").classList.add("no-actions"); // Example: Add a class to prevent actions
}

// Initialize the timer when the page loads
initializeTimer();
