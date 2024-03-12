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

const body = document.querySelector('body');
const headerEl = document.querySelector('.header');
let windowWidth = 0;
let scrollPosition = 0;

// body fixed
function enable() {
  scrollPosition = window.pageYOffset;
  body.style.overflow = 'hidden';
  body.style.position = 'fixed';
  // body.style.top = `-${scrollPosition}px`;
  body.style.width = '100%';
}

function disable() {
  body.style.removeProperty('overflow');
  body.style.removeProperty('position');
  body.style.removeProperty('top');
  body.style.removeProperty('width');
  // window.scrollTo(0, scrollPosition);
}

headerEl.addEventListener('click', function(event) {
  if(event.target.classList.contains('nav-menu__btn')) {
    globalNavMenuBtnToggle();
  }
});

window.addEventListener('resize', function() {
  windowWidth = window.innerWidth;

  if((windowWidth > 991) && (headerEl.classList.contains('is-open'))) {
    navigationClose();
  } else {
    return;
  }
});

function globalNavMenuBtnToggle() {
    if(headerEl.classList.contains('is-open')) {
      navigationClose();
    } else {
      navigationOpen();
    }
}

function navigationOpen() {
  const globalNavMenuBtn = document.querySelector('.nav-menu__btn');

  headerEl.classList.add('is-open');
  // enable();
  globalNavMenuBtn.setAttribute('aria-label', 'menu close');
}

function navigationClose() {
  const globalNavMenuBtn = document.querySelector('.nav-menu__btn');

  headerEl.classList.remove('is-open');
  // disable();
  globalNavMenuBtn.setAttribute('aria-label', 'menu open');
}