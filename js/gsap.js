$(function () {
  gsap.registerPlugin(ScrollTrigger);

  ScrollTrigger.matchMedia({
    "(min-width: 1024px)": function () {
      // horizontal scroll
      let list = gsap.utils.toArray(".gallery ul li");
      let scrollTween = gsap.to(list, {
        xPercent: -100 * (list.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: ".gallery",
          pin: true,
          scrub: 1,
          start: "center center",
          end: "300%",
          markers: true,
        },
      });

      gsap.utils.toArray(".imgBox").forEach(function (imgBox) {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: imgBox,
              containerAnimation: scrollTween,
              start: "center right",
              end: "center center",
              scrub: true,
              //   markers: true,
            },
          })
          .to(
            imgBox,
            { "clip-path": "inset(0%)", ease: "none", duration: 1 },
            0
          );
      });
    },
  });
});
