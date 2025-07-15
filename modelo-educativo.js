gsap.registerPlugin(Draggable, InertiaPlugin, ScrollTrigger);

window.Webflow ||= [];
window.Webflow.push(() => {
  // === CARRUSEL DE FRASES ===
  const carousels = document.querySelectorAll(".carousel-wrapper");

  carousels.forEach((carouselWrapper) => {
    const phraseContainer = carouselWrapper.querySelector(".phrase-carousel");
    const phrases = gsap.utils.toArray(".phrase", phraseContainer);
    const phraseInner = phrases.map((p) => p.querySelector("div"));

    if (!phraseInner.length) return;

    gsap.set(phraseInner, {
      opacity: 0,
      filter: "blur(6px)",
      scale: 0.98
    });
    gsap.set(phraseInner[0], {
      opacity: 1,
      filter: "blur(0px)",
      scale: 1
    });

    const tl = gsap.timeline({ repeat: -1 });

    phrases.forEach((_, i) => {
      const nextIndex = (i + 1) % phrases.length;

      tl.to(phrases, {
          yPercent: -100 * (i + 1),
          duration: 1.2,
          ease: "power3.inOut"
        })
        .to(
          phraseInner,
          {
            opacity: 0,
            filter: "blur(6px)",
            scale: 0.98,
            duration: 0.6,
            stagger: 0.04,
            ease: "power3.out"
          },
          "<"
        )
        .to(
          phraseInner[nextIndex],
          {
            opacity: 1,
            filter: "blur(0px)",
            scale: 1,
            duration: 1,
            ease: "expo.out"
          },
          "<0.3"
        )
        .to({}, { duration: 3 });
    });
  });

  // === MARQUEE INFINITO (pausa en hover) ===
  const scrollSection = document.querySelector(".scroll-section");
  const scrollOuter = scrollSection?.querySelector(".scroll-outer");
  const scrollInner = scrollSection?.querySelector(".scroll-inner");
  const scrollClone = scrollSection?.querySelector(".scroll-inner-clone");

  if (!scrollSection || !scrollOuter || !scrollInner || !scrollClone) return;

  scrollClone.innerHTML = scrollInner.innerHTML;

  scrollOuter.style.overflowX = "auto";
  scrollOuter.style.overflowY = "hidden";
  scrollOuter.style.webkitOverflowScrolling = "touch";
  scrollOuter.style.scrollBehavior = "smooth";
  scrollOuter.scrollLeft = 0;

  let scrollAmount = scrollInner.scrollWidth;
  let currentScroll = 0;
  let isScrolling = true;

  function animateScroll() {
    if (!isScrolling) return requestAnimationFrame(animateScroll);

    currentScroll += 0.3; // Velocidad lenta
    if (currentScroll >= scrollAmount) {
      currentScroll = 0;
    }

    scrollOuter.scrollLeft = currentScroll;
    requestAnimationFrame(animateScroll);
  }

  animateScroll();

  // Pausar con hover
  scrollOuter.addEventListener("mouseenter", () => (isScrolling = false));
  scrollOuter.addEventListener("mouseleave", () => {
    isScrolling = true;
    animateScroll();
  });
});
