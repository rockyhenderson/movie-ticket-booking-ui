function adjustFontSizeToFit(element) {
  const parent = element.parentElement;
  let currentFontSize = 100; // Start with a reasonably large font size
  element.style.fontSize = `${currentFontSize}px`;

  console.log("Starting adjustment with font size:", currentFontSize);

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