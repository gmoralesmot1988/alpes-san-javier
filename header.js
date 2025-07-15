window.Webflow ||= [];
window.Webflow.push(() => {
  const bgImage = document.querySelector('.header-v7_background-image');
  const overlay = document.querySelector('.image-overlay-layer');
  const heading = document.querySelector('.header-heading');
  const subheading = document.querySelector('.header-subheading');
  const brand = document.querySelector('.header-v6_brand');
  const button = document.querySelector('.button-header');
  const navbar = document.querySelector('.navbar_component'); // NUEVO

  // Quitamos .gsap-hidden
  document.querySelectorAll('.gsap-hidden').forEach(el => el.classList.remove('gsap-hidden'));

  // Split text si existe el heading
  let split;
  if (heading) {
    split = new SplitText(heading, { type: "chars,words", charsClass: "char-split" });
    gsap.set(split.chars, { opacity: 0, y: 40 });
  }

  // Timeline pausado
  const tl = gsap.timeline({
    paused: true,
    defaults: { ease: "power2.out", duration: 1 },
    onComplete: () => {
      if (typeof lenis !== "undefined") lenis.resize();
    }
  });

  tl
    // Imagen de fondo con efecto cinematográfico
    .fromTo(bgImage, { scale: 1.2, opacity: 0, filter: "blur(12px)" }, {
      scale: 1,
      opacity: 1,
      filter: "blur(0px)",
      duration: 1.6,
      ease: "power3.out"
    })

    // Overlay con entrada vertical y suave
    .fromTo(overlay, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1 }, "-=1.2")

    // Escudo o logotipo
    .from(brand, { opacity: 0, scale: 0.8, y: 20 }, "-=0.8")

    // Texto animado por caracteres
    .to(split.chars, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.02
    }, "-=0.6")

    // Subheading
    .from(subheading, { opacity: 0, y: 30, duration: 0.8 }, "-=0.6")

    // Botón final
    .from(button, { opacity: 0, scale: 0.92, duration: 0.6, ease: "back.out(1.7)" }, "-=0.4")

    // Navbar entra al final
    .from(navbar, {
      opacity: 0,
      y: -50,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.2"); // ajustamos para que no sea demasiado tardío

  // Reproduce el timeline cuando cargue la imagen
  if (bgImage?.tagName === "IMG" && !bgImage.complete) {
    bgImage.onload = () => tl.play();
    bgImage.onerror = () => tl.play();
  } else {
    tl.play();
  }
});
