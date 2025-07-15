 window.Webflow ||= [];
 window.Webflow.push(() => {
   gsap.registerPlugin(ScrollTrigger);

   gsap.to(".level-split-word", {
     scrollTrigger: {
       trigger: ".level-split-word",
       start: "top 85%",
       end: "top 40%",
       scrub: true,
     },
     opacity: 1,
     y: 0,
     scale: 1,
     filter: "blur(0px)",
     ease: "power4.out",
     duration: 1.5,
   });
 });
