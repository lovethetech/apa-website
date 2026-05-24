document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("js-enabled");
  const header = document.querySelector(".site-header");
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    reveals.forEach((element) => observer.observe(element));
  } else {
    reveals.forEach((element) => element.classList.add("in-view"));
  }

  const updateHeaderState = () => {
    if (!header) {
      return;
    }

    header.classList.toggle("scrolled", window.scrollY > 24);
  };

  updateHeaderState();
  window.addEventListener("scroll", updateHeaderState, { passive: true });

  const stage = document.querySelector(".kinetic-stage");
  const parallaxItems = document.querySelectorAll("[data-depth]");

  if (stage && parallaxItems.length > 0 && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    stage.addEventListener("pointermove", (event) => {
      const bounds = stage.getBoundingClientRect();
      const offsetX = (event.clientX - bounds.left) / bounds.width - 0.5;
      const offsetY = (event.clientY - bounds.top) / bounds.height - 0.5;

      parallaxItems.forEach((item) => {
        const depth = Number(item.getAttribute("data-depth")) || 0;
        const moveX = offsetX * depth * 120;
        const moveY = offsetY * depth * 120;
        item.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
      });
    });

    stage.addEventListener("pointerleave", () => {
      parallaxItems.forEach((item) => {
        item.style.transform = "";
      });
    });
  }

  const form = document.querySelector(".contact-form");
  const status = document.querySelector(".form-status");
  if (form && status && form.dataset.service === "local") {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      status.textContent =
        "Thanks for reaching out to APA. We will follow up within 2-3 business days.";
      status.classList.add("visible");
      form.reset();
    });
  }
});
