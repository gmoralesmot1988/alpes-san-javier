const overlay = document.querySelector(".admissions-modal-overlay");
const modal = document.querySelector(".modal-admissions_container");
const closeBtn = document.querySelector(".modal-admissions_close");

// Mostrar modal
document.querySelectorAll('[data-modal="open"]').forEach((btn) => {
  btn.addEventListener("click", function (e) {
    e.preventDefault(); // evita que el enlace navegue a #
    document.body.classList.add("modal-open");
    if (window.lenis && typeof lenis.stop === "function") lenis.stop();

    overlay.style.display = "block";
    gsap.fromTo(overlay, { autoAlpha: 0 }, { duration: 0.3, autoAlpha: 1 });
    gsap.fromTo(modal, { x: 500, autoAlpha: 0 }, { duration: 0.5, x: 0, autoAlpha: 1 });
  });
});

// Función de cierre
function closeModal() {
  gsap.to(modal, {
    duration: 0.4,
    x: 500,
    autoAlpha: 0,
    ease: "power2.in",
    onComplete: () => {
      gsap.to(overlay, {
        duration: 0.3,
        autoAlpha: 0,
        onComplete: () => {
          overlay.style.display = "none";
          document.body.classList.remove("modal-open");
          if (window.lenis && typeof lenis.start === "function") lenis.start();
        }
      });
    }
  });
}

// Cerrar con botón
closeBtn.addEventListener("click", closeModal);

// Cerrar al hacer clic en el fondo (overlay)
overlay.addEventListener("click", function (e) {
  // Solo cerramos si se da clic fuera del modal
  if (e.target === overlay) {
    closeModal();
  }
});
