// 📦 Registrar GSAP plugins
gsap.registerPlugin(ScrollTrigger, SplitText);

// ✅ Espera fuentes y DOM cargado antes de aplicar SplitText
window.addEventListener('load', () => {
  document.fonts.ready.then(() => {
    // ✨ Animación de títulos
    document.querySelectorAll('.titulo-animado').forEach((el) => {
      const split = new SplitText(el, {
        type: 'words,chars',
        charsClass: 'char-titulo'
      });

      const chars = split.chars.filter(
        (char) => char.textContent.trim() !== ''
      );

      gsap.set(chars, {
        opacity: 0,
        y: 40,
        rotateX: 40,
        transformOrigin: 'center bottom'
      });

      ScrollTrigger.create({
        trigger: el,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to(chars, {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1,
            ease: 'power3.out',
            stagger: 0.03
          });
        }
      });
    });

    // 🛠️ Refresca scrolltrigger después de cargar todo
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  });

  // 🎯 Animación CTA buttons
  const buttons = document.querySelectorAll('.contact-button');

  if (buttons.length) {
    buttons.forEach((button) => {
      const text = button.querySelector('.contact-button-text');
      if (!text) return;

      gsap.set(text, { opacity: 0, x: -10, display: 'none' });
      button.style.justifyContent = 'center';

      button.addEventListener('mouseenter', () => {
        gsap.set(text, { display: 'inline-block' });

        const tlIn = gsap.timeline();
        tlIn
          .to(button, {
            width: '10rem',
            duration: 0.3,
            ease: 'power2.out',
            onStart: () => {
              button.style.justifyContent = 'flex-start';
            }
          })
          .to(
            text,
            {
              opacity: 1,
              x: 0,
              duration: 0.3,
              ease: 'power2.out'
            },
            '-=0.2'
          );
      });

      button.addEventListener('mouseleave', () => {
        const tlOut = gsap.timeline();
        tlOut
          .to(text, {
            opacity: 0,
            x: -10,
            duration: 0.2,
            ease: 'power2.out',
            onComplete: () => {
              gsap.set(text, { display: 'none' });
            }
          })
          .to(
            button,
            {
              width: '3.5rem',
              duration: 0.3,
              ease: 'power2.out',
              onComplete: () => {
                button.style.justifyContent = 'center';
              }
            },
            '-=0.1'
          );
      });
    });
  }
});
