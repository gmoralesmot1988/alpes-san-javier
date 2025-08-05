(function () {
  function waitForElements(selectors, callback, interval = 100, timeout = 5000) {
    const start = Date.now();

    const check = () => {
      const elements = selectors.map(sel => document.querySelector(sel));
      const allExist = elements.every(el => el);

      if (allExist) {
        console.log("✅ Elementos encontrados, iniciando animación.");
        callback();
      } else if (Date.now() - start < timeout) {
        setTimeout(check, interval);
      } else {
        console.warn("❌ Timeout esperando elementos. No se encontró todo lo necesario.");
      }
    };

    check();
  }

  function initHeroHeader() {
    console.log("🚀 Hero Header INIT");

    const bgWrapper = document.querySelector('.header-v7_background-image-wrapper');
    const bgImage = document.querySelector('.header-v7_background-image');
    const overlay = document.querySelector('.image-overlay-layer');
    const heading = document.querySelector('.home-hero-heading');
    const subheading = document.querySelector('.home-hero-subheading');
    const buttonGroup = document.querySelector('.button-group');
    const navbar = document.querySelector('.navbar_component');

    gsap.set([bgImage, overlay, heading, subheading, buttonGroup, navbar], {
      clearProps: "transform"
    });

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

  // Espera específica para DOM dinámico
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
