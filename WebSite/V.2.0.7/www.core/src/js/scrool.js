/*
/ @autor = Mister Papaye
/ @autor = SivlerCore
*/

// non fonctionel

let isScrolling = false;
let lastScrollY = window.scrollY;
let scrollTimeout;
let scrollSpeed = -10;

function smoothScroll() {
  const currentScrollY = window.scrollY;
  const scrollDistance = currentScrollY - lastScrollY;

  if (Math.abs(scrollDistance) > 0) {
    scrollSpeed += scrollDistance * 0.15;
    scrollSpeed *= 0.9;
    window.scrollBy(0, scrollSpeed);
  }

  lastScrollY = window.scrollY;
  scrollTimeout = setTimeout(smoothScroll, 10);
}

window.addEventListener('wheel', (event) => {
  event.preventDefault();
  clearTimeout(scrollTimeout);
  isScrolling = true;

  const scrollAmount = event.deltaY || event.detail || event.wheelDelta;
  window.scrollBy(0, scrollAmount);

  setTimeout(() => {
    if (isScrolling) {
      smoothScroll();
    }
  }, 100);
});

window.addEventListener('wheel', () => {
  isScrolling = false;
});
