/* ============================================================
   Navigation: scroll-aware navbar + mobile menu toggle
   ============================================================ */
const navbar = document.getElementById("navbar");
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

window.addEventListener("scroll", () => {
  navbar.classList.toggle("is-scrolled", window.scrollY > 40);
});

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("is-open");
  navToggle.classList.toggle("is-open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

// Close the mobile menu after a link is tapped
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("is-open");
    navToggle.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

/* ============================================================
   Scroll reveal: fade+rise sections in as they enter the viewport
   ============================================================ */
const revealTargets = document.querySelectorAll(
  ".about, .rooms, .amenities, .gallery, .testimonials, .booking, .contact"
);
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "none";
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
revealTargets.forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(24px)";
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  revealObserver.observe(el);
});

document.getElementById("year").textContent = new Date().getFullYear();

/* ============================================================
   Gallery lightbox
   ============================================================ */
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxClose = document.getElementById("lightboxClose");

document.getElementById("galleryGrid").addEventListener("click", (e) => {
  if (e.target.tagName !== "IMG") return;
  lightboxImg.src = e.target.src;
  lightboxImg.alt = e.target.alt;
  lightbox.classList.add("is-open");
});

function closeLightbox() {
  lightbox.classList.remove("is-open");
  lightboxImg.src = "";
}
lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeLightbox(); });

/* ============================================================
   Testimonial carousel — auto-advances, with dot navigation
   ============================================================ */
const slides = document.querySelectorAll(".testimonial-slide");
const dotsWrap = document.getElementById("testimonialDots");
let activeSlide = 0;
let slideTimer;

slides.forEach((_, i) => {
  const dot = document.createElement("button");
  if (i === 0) dot.classList.add("is-active");
  dot.setAttribute("aria-label", `Show testimonial ${i + 1}`);
  dot.addEventListener("click", () => showSlide(i));
  dotsWrap.appendChild(dot);
});
const dots = dotsWrap.querySelectorAll("button");

function showSlide(index) {
  slides[activeSlide].classList.remove("is-active");
  dots[activeSlide].classList.remove("is-active");
  activeSlide = index;
  slides[activeSlide].classList.add("is-active");
  dots[activeSlide].classList.add("is-active");
  resetSlideTimer();
}
function resetSlideTimer() {
  clearInterval(slideTimer);
  slideTimer = setInterval(() => showSlide((activeSlide + 1) % slides.length), 6000);
}
resetSlideTimer();

/* ============================================================
   Booking form validation — client-side only, no backend
   ============================================================ */
const bookingForm = document.getElementById("bookingForm");
const formSuccess = document.getElementById("formSuccess");

function setFieldError(field, message) {
  const errorEl = bookingForm.querySelector(`[data-error-for="${field.name}"]`);
  const wrapper = field.closest(".form-field");
  if (message) {
    wrapper.classList.add("has-error");
    if (errorEl) errorEl.textContent = message;
  } else {
    wrapper.classList.remove("has-error");
    if (errorEl) errorEl.textContent = "";
  }
}

function validateBookingForm() {
  let isValid = true;
  const name = bookingForm.fullName;
  const email = bookingForm.email;
  const checkIn = bookingForm.checkIn;
  const checkOut = bookingForm.checkOut;

  if (name.value.trim().length < 2) { setFieldError(name, "Enter your full name."); isValid = false; }
  else setFieldError(name, "");

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email.value.trim())) { setFieldError(email, "Enter a valid email."); isValid = false; }
  else setFieldError(email, "");

  if (!checkIn.value) { setFieldError(checkIn, "Pick a check-in date."); isValid = false; }
  else setFieldError(checkIn, "");

  if (!checkOut.value || (checkIn.value && checkOut.value <= checkIn.value)) {
    setFieldError(checkOut, "Must be after check-in.");
    isValid = false;
  } else setFieldError(checkOut, "");

  return isValid;
}

bookingForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!validateBookingForm()) return;
  formSuccess.hidden = false;
  bookingForm.reset();
  setTimeout(() => { formSuccess.hidden = true; }, 6000);
});
