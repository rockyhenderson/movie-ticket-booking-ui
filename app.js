document.addEventListener("DOMContentLoaded", () => {
  // Date Selection Handling
  const dateItems = document.querySelectorAll(".date-item");
  dateItems.forEach((item) => {
    item.addEventListener("click", () => {
      document
        .querySelector(".date-item.selected")
        ?.classList.remove("selected");
      item.classList.add("selected");
    });
  });

  // Time Selection Handling
  const timeItems = document.querySelectorAll(".time-item");
  timeItems.forEach((item) => {
    item.addEventListener("click", () => {
      document
        .querySelector(".time-item.selected")
        ?.classList.remove("selected");
      item.classList.add("selected");
    });
  });

  // Intersection Observer to add 'in-view' class
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
      }
    });
  });
  document
    .querySelectorAll(
      ".seating-chart, .ticket-info, .ticket-counters, .venue-selector, .date-selector, .time-selector, .price-container, .promo-code-container, .seat-selection-wrapper, .price-breakdown"
    )
    .forEach((el) => {
      observer.observe(el);
    });

  // Seat Selection Handling
  const seats = document.querySelectorAll(".seat:not(.taken):not(.gap)");
  const adultValue = document.querySelector(".adults-counter .value");
  const kidsValue = document.querySelector(".kids-counter .value");

  // Pricing configuration
  const ADULT_TICKET_PRICE = 10.0;
  const KIDS_TICKET_PRICE = 8.0;
  const SERVICE_FEE = 1.25;
  let promoDiscount = 0.0; // Promo discount starts at 0
  let promoCodeApplied = "";

  // Ensure elements are found before proceeding
  if (!adultValue || !kidsValue) {
    console.error(
      "Ticket counters could not be found. Please check the HTML structure."
    );
    return; // Stop execution if elements are not found
  }

  // Initialize ticket counters to 0
  adultValue.textContent = "0";
  kidsValue.textContent = "0";

  // Function to update selected seats text
  const updateSelectedSeatsText = () => {
    const selectedSeats = document.querySelectorAll(".seat.selected");
    const seatsSelectedDiv = document.getElementById("seatsSelected");

    if (seatsSelectedDiv) {
      if (selectedSeats.length > 0) {
        const selectedSeatIds = Array.from(selectedSeats).map((seat) => {
          const rowIndex = Array.from(
            seat.parentNode.parentNode.children
          ).indexOf(seat.parentNode);
          const seatIndex = Array.from(seat.parentNode.children).indexOf(seat);
          return `${String.fromCharCode(65 + rowIndex)}${seatIndex + 1}`;
        });

        seatsSelectedDiv.textContent = `Seats Selected: ${selectedSeatIds.join(
          ", "
        )}`;
      } else {
        seatsSelectedDiv.textContent = "Seats Selected: None";
      }
    }
  };

  // Add click event listener to each seat
  seats.forEach((seat) => {
    seat.addEventListener("click", () => {
      // Toggle the 'selected' class on click
      if (seat.classList.contains("selected")) {
        seat.classList.remove("selected");

        // Remove the Font Awesome icon
        const icon = seat.querySelector(".fa-user");
        if (icon) {
          seat.removeChild(icon);
        }
      } else {
        seat.classList.add("selected");

        // Create the Font Awesome icon and append it to the seat
        const icon = document.createElement("i");
        icon.classList.add("fas", "fa-user");
        icon.style.color = "#d6b6ff";

        seat.appendChild(icon);
      }

      // Update the selected seats text
      updateSelectedSeatsText();

      // Update ticket counters based on selected seats
      updateTicketCounters();
    });
  });

  // Function to update ticket counters based on selected seats
  const updateTicketCounters = () => {
    const selectedSeatsCount =
      document.querySelectorAll(".seat.selected").length;

    // If at least one seat is selected, set adult counter to 1 if it's still at 0
    if (selectedSeatsCount > 0 && parseInt(adultValue.textContent) === 0) {
      adultValue.textContent = "1";
    }

    // Ensure total tickets do not exceed selected seats
    enforceTicketLimits();

    // Update pricing breakdown based on current values
    updatePricingBreakdown();
  };

  // Function to enforce that total tickets do not exceed selected seats
  const enforceTicketLimits = () => {
    const selectedSeatsCount =
      document.querySelectorAll(".seat.selected").length;
    const totalTickets =
      parseInt(adultValue.textContent) + parseInt(kidsValue.textContent);

    if (totalTickets > selectedSeatsCount) {
      const excess = totalTickets - selectedSeatsCount;

      if (parseInt(kidsValue.textContent) >= excess) {
        kidsValue.textContent = parseInt(kidsValue.textContent) - excess;
      } else {
        const remainingExcess = excess - parseInt(kidsValue.textContent);
        kidsValue.textContent = "0";
        adultValue.textContent =
          parseInt(adultValue.textContent) - remainingExcess;
      }
    }
  };

  // Ticket Counter Event Listeners
  document.querySelectorAll(".counter").forEach((counter) => {
    const minusBtn = counter.querySelector(".minus");
    const plusBtn = counter.querySelector(".plus");
    const value = counter.querySelector(".value");

    if (!minusBtn || !plusBtn || !value) {
      console.error("Ticket counter buttons or value could not be found.");
      return;
    }

    minusBtn.addEventListener("click", () => {
      let currentValue = parseInt(value.textContent);
      if (currentValue > 0) {
        value.textContent = currentValue - 1;
        updateTicketCounters();
      }
    });

    plusBtn.addEventListener("click", () => {
      let currentValue = parseInt(value.textContent);
      value.textContent = currentValue + 1;

      // Enforce ticket limit after updating
      enforceTicketLimits();

      // Update pricing breakdown
      updatePricingBreakdown();
    });
  });
  // Buy Now button logic
  const buyNowButton = document.querySelector(".buy-now");
  buyNowButton.addEventListener("click", () => {
    const selectedSeatsCount =
      document.querySelectorAll(".seat.selected").length;
    const adultCount = parseInt(
      document.querySelector(".counter .value").textContent
    );
    const kidsCount = parseInt(
      document.querySelectorAll(".counter .value")[1].textContent
    );
    const totalTickets = adultCount + kidsCount;

    // Check if the number of seats selected matches the total tickets
    if (totalTickets !== selectedSeatsCount) {
      alert(
        `Mismatch! You have selected ${selectedSeatsCount} seat(s), but assigned ${totalTickets} ticket(s). Please correct it.`
      );
    } else {
      alert("Bought!");
      //ADD MORE CODE HEREE!!

    }
  });

  // Promo Code Handling
  const applyCodeButton = document.getElementById("applyCode");
  const promoInput = document.getElementById("promoCode");

  applyCodeButton.addEventListener("click", () => {
    const promoCode = promoInput.value.trim().toLowerCase();

    // Reset promo discount and promo code applied
    promoDiscount = 0.0;
    promoCodeApplied = "";

    // Apply promo code logic
    if (promoCode === "free") {
      promoCodeApplied = "100% off";
    } else if (promoCode === "hell") {
      promoDiscount = -100.0; // Adds £100 to the total price
      promoCodeApplied = "Hell";
    } else if (promoCode === "15off") {
      promoCodeApplied = "15% off";
    } else {
      alert("Invalid Promo Code!");
    }

    // Update the pricing breakdown after applying promo code
    updatePricingBreakdown();
  });

  // function to update the pricing breakdown dynamically
  // Function to update the pricing breakdown dynamically PLEASEEE
  // FUNCITON to update the pricing breakdown dynamically
  const updatePricingBreakdown = () => {
    const adultCount = parseInt(adultValue.textContent);
    const kidsCount = parseInt(kidsValue.textContent);
    const selectedSeatsCount =
      document.querySelectorAll(".seat.selected").length;

    // Calculate prices
    const adultTotalPrice = adultCount * ADULT_TICKET_PRICE;
    const kidsTotalPrice = kidsCount * KIDS_TICKET_PRICE;
    const serviceFee = selectedSeatsCount > 0 ? SERVICE_FEE : 0.0;
    let subtotal = adultTotalPrice + kidsTotalPrice + serviceFee;

    // Apply promo discount
    let discountAmount = 0.0;
    let isDiscount = false; // Flag to determine if we are applying a discount or adding an amount

    if (promoCodeApplied === "100% off") {
      discountAmount = subtotal;
      subtotal = 0.0; // Make everything free
      isDiscount = true;
    } else if (promoCodeApplied === "15% off") {
      discountAmount = subtotal * 0.15;
      subtotal *= 0.85; // Apply 15% discount
      isDiscount = true;
    } else if (promoCodeApplied === "Hell") {
      discountAmount = 100.0; // Adds £100 to the total, so it's a positive adjustment
      subtotal += 100.0; // Increase the subtotal by £100
      isDiscount = false;
    }

    // Update price breakdown section
    const priceBreakdown = document.querySelector(".price-breakdown ul");
    priceBreakdown.innerHTML = `
    <li>
      <span class="item-label"><strong>x${adultCount}</strong> Adult Tickets</span> 
      <span class="item-amount">£${adultTotalPrice.toFixed(2)}</span>
    </li>
    <li>
      <span class="item-label"><strong>x${kidsCount}</strong> Kids Tickets</span> 
      <span class="item-amount">£${kidsTotalPrice.toFixed(2)}</span>
    </li>
    ${
      promoCodeApplied
        ? `
    <li>
      <span class="item-label">Promo <strong>Discount</strong></span> 
      <span class="item-amount discount">${
        isDiscount ? "-" : "+"
      }£${discountAmount.toFixed(2)} (${promoCodeApplied})</span>
    </li>`
        : ""
    }
    ${
      selectedSeatsCount > 0
        ? `
    <li>
      <span class="item-label">Service Fee:</span> 
      <span class="item-amount">£${serviceFee.toFixed(2)}</span>
    </li>`
        : ""
    }
  `;

    // Update the total price in the total price container
    const totalPriceElement = document.querySelector(".total-price .price");
    if (totalPriceElement) {
      totalPriceElement.textContent = `£${subtotal.toFixed(2)}`;
    }
  };
});
