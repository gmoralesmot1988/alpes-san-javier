window.Webflow ||= [];
window.Webflow.push(() => {
  const items = document.querySelectorAll('.accordion-item');

  items.forEach(item => {
    const header = item.querySelector('.accordion-header');
    const content = item.querySelector('.accordion-content');
    const icon = item.querySelector(
      '.icon'); // asumiendo que tienes un icon dentro del header

    // Estado inicial: cerrado
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

      // Cerramos todos los demás
      items.forEach(otherItem => {
        if (otherItem !== item) {
          const otherContent = otherItem.querySelector('.accordion-content');
          const otherIcon = otherItem.querySelector('.icon');
          otherItem.classList.remove("open");

          gsap.to(otherContent, {
            height: 0,
            opacity: 0,
            scaleY: 0.95,
            filter: "blur(4px)",
            duration: 0.6,
            ease: "power2.inOut",
            onComplete: () => {
              otherContent.style.display = "none";
            }
          });

          gsap.to(otherIcon, {
            rotate: 0,
            duration: 0.5,
            ease: "power2.inOut"
          });
        }
      });

      // Alternamos el actual
      if (!isOpen) {
        item.classList.add("open");
        content.style.display = "block";

        gsap.fromTo(content, {
          height: 0,
          opacity: 0,
          scaleY: 0.95,
          filter: "blur(4px)"
        },
        {
          height: "auto",
          opacity: 1,
          scaleY: 1,
          filter: "blur(0px)",
          duration: 0.7,
          ease: "back.out(1.4)"
        });

        // Animación escalonada del contenido interno
        gsap.from(content.querySelectorAll('.accordion-inner > *'), {
          opacity: 0,
          y: 20,
          duration: 0.5,
          stagger: 0.1,
          delay: 0.15,
          ease: "power2.out"
        });

        // Rotamos el icono
        gsap.to(icon, {
          rotate: 90,
          duration: 0.5,
          ease: "back.out(1.7)"
        });

        // Opcional: Snap al header si está fuera de viewport (nivel PRO)
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
});
