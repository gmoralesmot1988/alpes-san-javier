gsap.registerPlugin(SplitText);

document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll('.toggle-item');

  items.forEach((item) => {
    const header = item.querySelector('.toggle-header');
    const content = item.querySelector('.toggle-content');
    const text = item.querySelector('.toggle-text');

    gsap.set(content, { height: 0, opacity: 0, display: "none" });

    header.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      items.forEach((i) => {
        if (i !== item) {
          i.classList.remove('open');
          const c = i.querySelector('.toggle-content');
          gsap.to(c, {
            height: 0,
            opacity: 0,
            duration: 0.3,
            display: "none",
            ease: "power2.inOut"
          });
        }
      });

      if (!isOpen) {
        item.classList.add('open');
        content.style.display = "block";
        gsap.fromTo(content, { height: 0, opacity: 0 },
        {
          height: "auto",
          opacity: 1,
          duration: 0.4,
          ease: "power2.out"
        });
      } else {
        item.classList.remove('open');
        gsap.to(content, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          display: "none",
          ease: "power2.inOut"
        });
      }
    });
  });
});
