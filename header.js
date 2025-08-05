(function () {
  // 🔁 Esperar a que todos los elementos estén disponibles en el DOM
  function waitForElements(selectors, callback, timeout = 5000) {
    const interval = 100;
    const maxAttempts = timeout / interval;
    let attempts = 0;

    const check = () => {
      const elements = selectors.map(selector => document.querySelector(selector));
      if (elements.every(el => el)) {
        console.log("✅ Todos los elementos del header están disponibles.");
        callback();
      } else if (attempts++ < maxAttempts) {
        setTimeout(check, interval);
      } else {
        console.warn("⚠️ No se encontraron todos los elementos para la animación del header.");
      }
    };

    check();
  }

  // 🎬 Animación del Hero Header
  function initHeroHeader() {
    console.log("🎬 Hero Header Animation INIT");

    const bgWrapper = document.querySelector('.header-v7_background-image-wrapper');
    const bgImage = document.querySelector('.header-v7_background-image');
    const overlay = document.querySelector('.image-overlay-layer');
    const heading = document.querySelector('.home-hero-heading');
    const subheading = document.querySelector('.home-hero-subheading');
    const buttonGroup = document.querySelector('.button-group');
    const navbar = document.querySelector('.navbar_component');

    // Reset de transformaciones para evitar conflictos
    gsap.set([bgImage, overlay, heading, subheading, buttonGroup, navbar], {
      clearProps: "transform"
    });

    // Timeline de entrada
    const introTl = gsap.timeline({
      defaults: { ease: "power3.out", duration: 1.4 }
    });

    introTl
      .fromTo(bgImage, { scale: 1.15, opacity: 0, filter: "blur(10px)" }, {
        scale: 1,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1.6
      })
      .fromTo(overlay, { opacity: 0 }, { opacity: 1 }, "-=1.4")
      .from([heading, subheading, buttonGroup], {
        opacity: 0,
        y: 30,
        stagger: 0.15
      }, "-=1")
      .from(navbar, {
        y: -60,
        opacity: 0,
        duration: 1
      });

    // Scroll-trigger para paralaje
    gsap.to(bgImage, {
      y: 40,
      ease: "none",
      scrollTrigger: {
        trigger: bgWrapper,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.6
      }
    });
  }

  // 🚀 Ejecutar cuando todos los elementos estén listos
  waitForElements([
    '.header-v7_background-image-wrapper',
    '.header-v7_background-image',
    '.image-overlay-layer',
    '.home-hero-heading',
    '.home-hero-subheading',
    '.button-group',
    '.navbar_component'
  ], initHeroHeader);
})();
