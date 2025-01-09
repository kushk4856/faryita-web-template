// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger");
const mobileNav = document.querySelector(".mobile-nav");
const overlay = document.querySelector(".overlay");
const closeBtn = document.querySelector(".mobile-nav-close");
const mobileNavLinks = document.querySelectorAll(".mobile-nav-links a");

function openMobileNav() {
  mobileNav.classList.add("active");
  overlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeMobileNav() {
  mobileNav.classList.remove("active");
  overlay.classList.remove("active");
  document.body.style.overflow = "";
}

hamburger.addEventListener("click", openMobileNav);
closeBtn.addEventListener("click", closeMobileNav);
overlay.addEventListener("click", closeMobileNav);

// Close mobile nav when clicking on links
mobileNavLinks.forEach((link) => {
  link.addEventListener("click", closeMobileNav);
});

// Sticky Navigation
window.addEventListener("scroll", function () {
  const nav = document.querySelector("nav");
  if (window.scrollY > 50) {
    nav.style.background = "rgba(255, 255, 255, 0.95)";
    nav.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
  } else {
    nav.style.background = "white";
    nav.style.boxShadow = "none";
  }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Add touch support for mobile navigation
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener(
  "touchstart",
  (e) => {
    touchStartX = e.changedTouches[0].screenX;
  },
  false
);

document.addEventListener(
  "touchend",
  (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  },
  false
);

function handleSwipe() {
  const swipeThreshold = 100;
  const diff = touchStartX - touchEndX;

  if (Math.abs(diff) < swipeThreshold) return;

  if (diff > 0) {
    // Swipe left to open
    openMobileNav();
  } else {
    // Swipe right to close
    closeMobileNav();
  }
}

// ?== Marquee Slidr loop
// ===continoue slider ==
const sliderLogo = document.getElementById("slider_logo");
console.log(sliderLogo);
// const sliderLogo2 = document.getElementById("slider_logo2");
const cardWidthLogo = sliderLogo.children[0].offsetWidth + 20;
const intervalSpeed = 2000;

function startSlider(slider, direction) {
  let position = 0;
  const speed = 1.5;
  let isAnimating = true;

  function slide() {
    if (!isAnimating) return;

    if (direction === "reverse") {
      position += speed;
      slider.style.transform = `translateX(${position}px)`;

      if (position >= cardWidthLogo) {
        position = 0;
        slider.style.transition = "none";
        slider.style.transform = "translateX(0)";
        slider.prepend(slider.children[slider.children.length - 1]);
      }
    } else {
      position -= speed;
      slider.style.transform = `translateX(${position}px)`;

      if (position <= -cardWidthLogo) {
        position = 0;
        slider.style.transition = "none";
        slider.style.transform = "translateX(0)";
        slider.appendChild(slider.children[0]);
      }
    }
    requestAnimationFrame(slide);
  }

  slide();
}

startSlider(sliderLogo, "forward");

// Accordion functionality
const accordionButtons = document.querySelectorAll(".accordion-button");

accordionButtons[0].classList.add("active");
accordionButtons[0].nextElementSibling.style.maxHeight =
  accordionButtons[0].nextElementSibling.scrollHeight + "px";

accordionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const currentContent = button.nextElementSibling;
    const isActive = button.classList.contains("active");

    // Close all accordions
    accordionButtons.forEach((btn, i) => {
      // if (i !== 0) {
      //   btn.classList.remove("active");
      //   btn.nextElementSibling.style.maxHeight = null;
      // }
      btn.classList.remove("active");
      btn.nextElementSibling.style.maxHeight = null;
    });

    // Open clicked accordion if it wasn't active
    if (!isActive) {
      button.classList.add("active");
      currentContent.style.maxHeight = currentContent.scrollHeight + "px";
    }
  });
});
