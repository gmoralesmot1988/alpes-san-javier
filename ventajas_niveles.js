window.Webflow ||= [];
window.Webflow.push(() => {
  const items = document.querySelectorAll('.toggle-item');

  items.forEach((item) => {
    const header = item.querySelector('.toggle-header');
    const icon = header.querySelector('.toggle-icon');
    const content = item.querySelector('.toggle-content');
    const inner = content.querySelector('.toggle-text');

    gsap.set(content, { height: 0, opacity: 0, display: "none" });
    gsap.set(icon, { rotate: 0 });

    header.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      items.forEach((otherItem) => {
        if (otherItem !== item && otherItem.classList.contains('open')) {
          otherItem.classList.remove('open');
          const otherContent = otherItem.querySelector('.toggle-content');
          const otherIcon = otherItem.querySelector('.toggle-icon');
          const otherInner = otherContent.querySelector('.toggle-text');
          gsap.to(otherContent, {
            height: 0,
            opacity: 0,
            duration: 0.4,
            ease: "power2.inOut",
            onComplete: () => {
              otherContent.style.display = "none";
              if (otherInner._split) otherInner._split.revert();
              gsap.set(
                otherInner, { opacity: 1 }); // 🔥 aseguramos visibilidad
            }
          });
          gsap.to(otherIcon, { rotate: 0, duration: 0.4, ease: "power2.inOut" });
        }
      });

      if (!isOpen) {
        item.classList.add('open');
        content.style.display = "block";
        gsap.to(icon, { rotate: 90, duration: 0.4, ease: "power2.out" });

        // Revertir anterior y ocultar texto antes de animar
        if (inner._split) inner._split.revert();
        gsap.set(inner, { opacity: 1 }); // reset base por si algo falla

        const split = new SplitText(inner, { type: "lines" });
        inner._split = split;

        gsap.fromTo(content, {
          height: 0,
          opacity: 0,
          clipPath: "inset(10% 0% 90% 0%)"
        },
        {
          height: "auto",
          opacity: 1,
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 0.5,
          ease: "power2.out"
        });

        gsap.fromTo(split.lines, { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.05,
          ease: "power2.out"
        });

      } else {
        item.classList.remove('open');
        gsap.to(icon, { rotate: 0, duration: 0.4, ease: "power2.inOut" });

        gsap.to(content, {
          height: 0,
          opacity: 0,
          duration: 0.4,
          ease: "power2.inOut",
          onComplete: () => {
            content.style.display = "none";
            if (inner._split) inner._split.revert();
            gsap.set(
              inner, { opacity: 1 }
            ); // 👈 aseguramos que el texto no quede invisible
          }
        });
      }
    });
  });
});
