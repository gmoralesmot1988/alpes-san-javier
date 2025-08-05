(function () {
  function initHeroHeader() {
    console.log("🎬 Hero Header Animation INIT");

    const bgWrapper = document.querySelector('.header-v7_background-image-wrapper');
    const bgImage = document.querySelector('.header-v7_background-image');
    const overlay = document.querySelector('.image-overlay-layer');
    const heading = document.querySelector('.home-hero-heading');
    const subheading = document.querySelector('.home-hero-subheading');
    const buttonGroup = document.querySelector('.button-group');
    const navbar = document.querySelector('.navbar_component');

    if (!bgWrapper || !bgImage || !overlay || !navbar) {
      console.warn("⚠️ No se encontraron los elementos del header.");
      return;
    }

    // Reset de estilos
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

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      console.log("🚀 DOMContentLoaded disparado");
      initHeroHeader();
    });
  } else {
    console.log("⚡️ DOM ya listo");
    initHeroHeader();
  }
})();
