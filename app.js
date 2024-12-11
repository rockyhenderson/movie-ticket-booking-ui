function adjustFontSizeToFit(element) {
  const parent = element.parentElement;
  let currentFontSize = 100; // Start with a reasonably large font size
  element.style.fontSize = `${currentFontSize}px`;


  // Reduce the font size until the text fits within the container width and height
  while (
    element.scrollWidth > parent.offsetWidth ||
    element.scrollHeight > parent.offsetHeight
  ) {
    console.log(
      `Text width: ${element.scrollWidth}px, Parent width: ${parent.offsetWidth}px`
    );
    console.log(
      `Text height: ${element.scrollHeight}px, Parent height: ${parent.offsetHeight}px`
    );

    currentFontSize--;
    element.style.fontSize = `${currentFontSize}px`;

    console.log("Adjusting font size to:", currentFontSize);

    // Prevent getting too small
    if (currentFontSize < 5) {
      console.warn("Font size has reached the minimum limit of 5px");
      break;
    }
  }

  console.log("Final font size after adjustment:", currentFontSize);
}

document.addEventListener("DOMContentLoaded", () => {
  const headerElement = document.getElementById("movie-title");
  adjustFontSizeToFit(headerElement);
});

window.addEventListener("resize", () => {
  const headerElement = document.getElementById("movie-title");
  console.log("Window resized. Adjusting font size again...");
  adjustFontSizeToFit(headerElement);
});
// Modal logic
const modal = document.getElementById("content-modal");
const openModalBtn = document.getElementById("showDivButton");
const closeModalBtn = document.querySelector(".close-btn");
const modalBackdrop = document.getElementById("modalBackdrop");

// Open modal
openModalBtn.addEventListener("click", () => {
  modal.style.display = "block";
});

// Close modal
closeModalBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// Close modal when clicking outside
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// Selection logic
let selectedDate = null;
let selectedTime = null;

document.querySelectorAll(".date-item").forEach((item) => {
  item.addEventListener("click", () => {
    if (item.classList.contains("null")) return; // Skip null items

    // Update selected date
    selectedDate = item.dataset.date;

    // Remove "selected" class from all other date items
    document
      .querySelectorAll(".date-item")
      .forEach((date) => date.classList.remove("selected"));

    // Add "selected" class to clicked item
    item.classList.add("selected");

    // Reset selected time
    selectedTime = null;
    document
      .querySelectorAll(".time-item")
      .forEach((time) => time.classList.remove("selected"));

    // Update the confirm button
    updateConfirmButton();
  });
});

document.querySelectorAll(".time-item").forEach((item) => {
  item.addEventListener("click", () => {
    if (item.classList.contains("null")) return; // Skip null items

    // Update selected time
    selectedTime = item.dataset.time;

    // Remove "selected" class from all other time items
    document
      .querySelectorAll(".time-item")
      .forEach((time) => time.classList.remove("selected"));

    // Add "selected" class to clicked item
    item.classList.add("selected");

    // Update the confirm button
    updateConfirmButton();
  });
});

// Update the confirm button and summary
function updateConfirmButton() {
  const confirmBtn = document.getElementById("confirm-btn");
  const summary = document.getElementById("selection-summary");

  if (selectedDate && selectedTime) {
    confirmBtn.disabled = false;
    summary.textContent = `Selected: ${selectedDate} at ${selectedTime}`;
  } else {
    confirmBtn.disabled = true;
    summary.textContent = "";
  }
}
// Enable drag-to-scroll for scrollable containers
document.querySelectorAll(".scrollable-container").forEach((container) => {
  let isDown = false;
  let startX;
  let scrollLeft;

  container.addEventListener("mousedown", (e) => {
    isDown = true;
    container.classList.add("dragging");
    startX = e.pageX - container.offsetLeft;
    scrollLeft = container.scrollLeft;
  });

  container.addEventListener("mouseleave", () => {
    isDown = false;
    container.classList.remove("dragging");
  });

  container.addEventListener("mouseup", () => {
    isDown = false;
    container.classList.remove("dragging");
  });

  container.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 2; // Adjust scrolling speed
    container.scrollLeft = scrollLeft - walk;
  });
});
function openModal() {
  modal.style.display = "block"; // Make modal visible
  modalBackdrop.style.display = "block"; // Make backdrop visible
  modal.classList.add("show");
  modalBackdrop.classList.add("show");
}

function closeModal() {
  modal.classList.remove("show");
  modalBackdrop.classList.remove("show");
  modal.style.display = "none"; // Make modal visible
  modalBackdrop.style.display = "none";

  // Hide modal and backdrop after animation ends
  modal.addEventListener(
    "animationend",
    () => {
      modal.style.display = "none";
      modalBackdrop.style.display = "none";
    },
    { once: true }
  );
}

// Open modal
openModalBtn.addEventListener("click", openModal);

// Close modal
closeModalBtn.addEventListener("click", closeModal);

// Close modal on clicking the backdrop
modalBackdrop.addEventListener("click", closeModal);

// Close modal with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("show")) {
    closeModal();
  }
});
