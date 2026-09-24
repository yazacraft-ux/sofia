document.getElementById("year").textContent = new Date().getFullYear();

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", event => {
    const id = link.getAttribute("href");
    if (!id || id === "#") return;
    const target = document.querySelector(id);
    if (!target) return;
    event.preventDefault();
    const header = document.querySelector(".site-header");
    const offset = header ? header.offsetHeight + 26 : 0;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  });
});


// Animations d'apparition au scroll
(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return;

  const groups = [
    {
      selector: ".hero-copy > *",
      mode: "up"
    },
    {
      selector: ".hero-visual",
      mode: "right"
    },
    {
      selector: ".intro-strip",
      mode: "up"
    },
    {
      selector: ".section-heading > *",
      mode: "up"
    },
    {
      selector: ".service-card",
      mode: "up",
      stagger: true
    },
    {
      selector: ".process-card",
      mode: "up",
      stagger: true
    },
    {
      selector: ".contact-copy",
      mode: "left"
    },
    {
      selector: ".contact-form",
      mode: "right"
    },
    {
      selector: ".contact-page-intro",
      mode: "left"
    },
    {
      selector: ".direct-contact-card",
      mode: "up",
      stagger: true
    },
    {
      selector: ".contact-page-form-section .contact-copy",
      mode: "left"
    },
    {
      selector: ".contact-page-form-section .contact-form",
      mode: "right"
    },
    {
      selector: ".saint-dizier-contact-inner > *",
      mode: "up",
      stagger: true
    },
    {
      selector: "footer",
      mode: "up"
    }
  ];

  const revealTargets = [];

  groups.forEach(group => {
    const nodes = [...document.querySelectorAll(group.selector)];

    nodes.forEach((node, index) => {
      node.classList.add("reveal-on-scroll");

      if (group.mode === "left") node.classList.add("reveal-left");
      if (group.mode === "right") node.classList.add("reveal-right");

      if (group.stagger) {
        const delayIndex = Math.min(index + 1, 4);
        node.classList.add(`reveal-delay-${delayIndex}`);
      }

      revealTargets.push(node);
    });
  });

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -6% 0px"
    }
  );

  revealTargets.forEach(node => observer.observe(node));
})();
