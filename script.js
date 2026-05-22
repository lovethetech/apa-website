document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("js-enabled");
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
