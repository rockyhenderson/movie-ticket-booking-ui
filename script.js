// Modal logic
const modal = document.getElementById("content-modal");
const openModalBtn = document.getElementById("open-modal-btn");
const closeModalBtn = document.querySelector(".close-btn");
const modalBackdrop = document.getElementById("modal-backdrop");

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
    document.querySelectorAll(".date-item").forEach((date) => date.classList.remove("selected"));

    // Add "selected" class to clicked item
    item.classList.add("selected");

    // Reset selected time
    selectedTime = null;
    document.querySelectorAll(".time-item").forEach((time) => time.classList.remove("selected"));

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
    document.querySelectorAll(".time-item").forEach((time) => time.classList.remove("selected"));

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
document.querySelectorAll('.scrollable-container').forEach((container) => {
    let isDown = false;
    let startX;
    let scrollLeft;
  
    container.addEventListener('mousedown', (e) => {
      isDown = true;
      container.classList.add('dragging');
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    });
  
    container.addEventListener('mouseleave', () => {
      isDown = false;
      container.classList.remove('dragging');
    });
  
    container.addEventListener('mouseup', () => {
      isDown = false;
      container.classList.remove('dragging');
    });
  
    container.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 2; // Adjust scrolling speed
      container.scrollLeft = scrollLeft - walk;
    });
  });
function openModal() {
  modal.classList.add("show");
  modalBackdrop.classList.add("active");
}

function closeModal() {
  modal.classList.remove("show");
  modalBackdrop.classList.remove("active");
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

modalBackdrop.addEventListener("click", closeModal);

