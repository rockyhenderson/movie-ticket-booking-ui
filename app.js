document.addEventListener("DOMContentLoaded", () => {
    const dateItems = document.querySelectorAll(".date-item");
  
    dateItems.forEach((item) => {
      item.addEventListener("click", () => {
        // Remove the 'selected' class from any previously selected item
        document
          .querySelector(".date-item.selected")
          ?.classList.remove("selected");
        // Add the 'selected' class to the clicked item
        item.classList.add("selected");
      });
    });
  });
  document.addEventListener("DOMContentLoaded", () => {
    const timeItems = document.querySelectorAll(".time-item");
  
    timeItems.forEach((item) => {
      item.addEventListener("click", () => {
        // Remove the 'selected' class from any previously selected item
        document
          .querySelector(".time-item.selected")
          ?.classList.remove("selected");
        // Add the 'selected' class to the clicked item
        item.classList.add("selected");
      });
    });
  });
  document.addEventListener("DOMContentLoaded", function () {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
        }
      });
    });
  
    document
      .querySelectorAll(
        ".seating-chart, .ticket-info, .ticket-counters, .venue-selector, .date-selector, .time-selector, .price-container"
      )
      .forEach((el) => {
        observer.observe(el);
      });
  });
  