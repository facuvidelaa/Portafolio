const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelectorAll(".site-nav a");
const revealItems = document.querySelectorAll(".reveal, .reveal-list");
const heroVisual = document.querySelector(".hero-visual");
const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector(".form-status");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

menuButton?.addEventListener("click", () => {
  const isOpen = header.classList.toggle("nav-open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    header.classList.remove("nav-open");
    menuButton?.setAttribute("aria-expanded", "false");
  });
});

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(contactForm);
  const name = formData.get("name").trim();
  const email = formData.get("email").trim();
  const message = formData.get("message").trim();
  const whatsappMessage = [
    "Hola Facundo, te contacto desde tu portfolio.",
    "",
    `Nombre: ${name}`,
    `Email: ${email}`,
    "",
    `Proyecto: ${message}`,
  ].join("\n");

  formStatus.textContent = "Abriendo WhatsApp...";
  window.open(
    `https://wa.me/5491134208953?text=${encodeURIComponent(whatsappMessage)}`,
    "_blank",
    "noopener,noreferrer",
  );
});

if (reduceMotion) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      rootMargin: "0px 0px -12% 0px",
      threshold: 0.16,
    },
  );

  revealItems.forEach((item) => revealObserver.observe(item));
}

if (heroVisual && !reduceMotion) {
  heroVisual.addEventListener("pointermove", (event) => {
    const bounds = heroVisual.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;

    heroVisual.style.transform = `rotateX(${y * -5}deg) rotateY(${x * 7}deg)`;
  });

  heroVisual.addEventListener("pointerleave", () => {
    heroVisual.style.transform = "";
  });
}
