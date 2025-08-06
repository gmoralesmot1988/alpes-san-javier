(function () {
  'use strict';

  console.log('🎬 [SLATER] Inicializando animación de acordeón...');

  let animationsInitialized = false;

  function initAccordionAnimations() {
    if (animationsInitialized) return;

    const items = document.querySelectorAll('.accordion-item');
    if (!items.length) {
      console.log('❌ [SLATER] No se encontraron elementos .accordion-item');
      return false;
    }

    items.forEach(item => {
      const header = item.querySelector('.accordion-header');
      const content = item.querySelector('.accordion-content');
      const icon = item.querySelector('.icon');

      if (!header || !content || !icon) return;

      gsap.set(content, {
        height: 0,
        opacity: 0,
        scaleY: 0.95,
        filter: "blur(4px)",
        display: "none"
      });
      gsap.set(icon, { rotate: 0 });

      header.addEventListener('click', () => {
        const isOpen = item.classList.contains("open");

        document.querySelectorAll('.accordion-item.open').forEach(openItem => {
          if (openItem !== item) {
            const openContent = openItem.querySelector('.accordion-content');
            const openIcon = openItem.querySelector('.icon');
            openItem.classList.remove("open");

            gsap.to(openContent, {
              height: 0,
              opacity: 0,
              scaleY: 0.95,
              filter: "blur(4px)",
              duration: 0.6,
              ease: "power2.inOut",
              onComplete: () => {
                openContent.style.display = "none";
              }
            });

            gsap.to(openIcon, {
              rotate: 0,
              duration: 0.5,
              ease: "power2.inOut"
            });
          }
        });

        if (!isOpen) {
          item.classList.add("open");
          content.style.display = "block";

          gsap.fromTo(content, {
            height: 0,
            opacity: 0,
            scaleY: 0.95,
            filter: "blur(4px)"
          }, {
            height: "auto",
            opacity: 1,
            scaleY: 1,
            filter: "blur(0px)",
            duration: 0.7,
            ease: "back.out(1.4)"
          });

          gsap.from(content.querySelectorAll('.accordion-inner > *'), {
            opacity: 0,
            y: 20,
            duration: 0.5,
            stagger: 0.1,
            delay: 0.15,
            ease: "power2.out"
          });

          gsap.to(icon, {
            rotate: 90,
            duration: 0.5,
            ease: "back.out(1.7)"
          });

          header.scrollIntoView({ behavior: "smooth", block: "center" });
        } else {
          item.classList.remove("open");

          gsap.to(content, {
            height: 0,
            opacity: 0,
            scaleY: 0.95,
            filter: "blur(4px)",
            duration: 0.6,
            ease: "power2.inOut",
            onComplete: () => {
              content.style.display = "none";
            }
          });

          gsap.to(icon, {
            rotate: 0,
            duration: 0.5,
            ease: "power2.inOut"
          });
        }
      });
    });

    animationsInitialized = true;
    console.log('✅ [SLATER] Animación de acordeón inicializada');
    return true;
  }

  // Escuchamos eventos del inyector
  document.addEventListener('injector:content-ready', (event) => {
    console.log('📦 [SLATER] injector:content-ready para slot:', event.detail.slotKey);
    setTimeout(initAccordionAnimations, 100);
  });

  document.addEventListener('injector:all-content-ready', (event) => {
    console.log('📦 [SLATER] injector:all-content-ready');
    setTimeout(initAccordionAnimations, 200);
  });

  // Fallback: por si acaso el DOM ya está listo
  setTimeout(initAccordionAnimations, 300);
})();
