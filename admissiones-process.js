 gsap.registerPlugin(ScrollTrigger);

 gsap.utils.toArray('.timeline-step').forEach(step => {
   gsap.fromTo(step, { opacity: 0, y: 50, scale: 0.95, filter: 'blur(10px)' },
   {
     opacity: 1,
     y: 0,
     scale: 1,
     filter: 'blur(0px)',
     duration: 1,
     ease: 'power3.out',
     scrollTrigger: {
       trigger: step,
       start: 'top 85%',
       toggleActions: 'play none none reverse',
       markers: false
     }
   });
 });

 // Línea vertical animada según scroll (opcional)
 const line = document.querySelector('.timeline-line');
 gsap.to(line, {
   height: '100%',
   ease: 'none',
   scrollTrigger: {
     trigger: '.timeline-container',
     start: 'top 90%',
     end: 'bottom 10%',
     scrub: true,
     markers: false
   }
 });
