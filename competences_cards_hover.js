window.Webflow ||= [];
window.Webflow.push(() => {
  const cards = document.querySelectorAll('.why-us-v1_card');

  cards.forEach(card => {
    const container = card.querySelector('.image-overlay-layer.withcontent');
    const description = card.querySelector('.why-us-v1_card-text');

    if (!container || !description) return;

    // Estado inicial
    gsap.set(container, { y: 0 });
    gsap.set(description, { opacity: 0, scale: 0.985 });
    description.style.maxHeight = '0px';
    description.style.overflow = 'hidden';

    card.addEventListener('mouseenter', () => {
      // Movimiento más fluido y sutil, sin rebote
      gsap.to(container, {
        y: -24,
        duration: 0.6,
        ease: 'sine.out'
      });

      const fullHeight = description.scrollHeight + "px";
      description.style.maxHeight = fullHeight;

      gsap.to(description, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: 'sine.out',
        delay: 0.05
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(container, {
        y: 0,
        duration: 0.5,
        ease: 'sine.inOut'
      });

      description.style.maxHeight = '0px';

      gsap.to(description, {
        opacity: 0,
        scale: 0.985,
        duration: 0.35,
        ease: 'sine.in'
      });
    });
  });
});
