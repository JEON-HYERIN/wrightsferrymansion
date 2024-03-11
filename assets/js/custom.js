let sections = gsap.utils.toArray("section");

// gsap.to(sections, {
//     xPercent: -100 * (sections.length - 1),
//     ease: "none",
//     scrollTrigger: {
//         trigger: ".main",
//         pin: true,
//         scrub: 1,
//         snap: 1 / (sections.length - 1),
//         // end: "+=30000",
//         end: document.querySelector(".main").offsetWidth,
//     }
// });

  // a태그 기본동작 방지
  $(document).on('click', 'a[href="#"]', function (e) {
    e.preventDefault();
  });

const globalNav = document.querySelector('.global-nav');
const globalNavMenu = globalNav.querySelector('.global-nav__menu');

globalNavMenu.addEventListener('click', function() {
  globalNav.classList.toggle('is-open');
});