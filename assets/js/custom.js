// lenis
const lenis = new Lenis()

lenis.on('scroll', (e) => {

})

lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time)=>{
  lenis.raf(time * 1000)
})

gsap.ticker.lagSmoothing(0)

let sections = gsap.utils.toArray('section');


let mm = gsap.matchMedia();
mm.add("(min-width: 992px)", () => {
  const horiMotion = gsap.to('.sticky__inner', {
    ease: 'none',
    xPercent: -100,
    x: function() {
      return window.innerWidth;
    },
    scrollTrigger: {
      trigger: '.horizontal-page',
      start: '0% 0%',
      end: '100% 100%',
      scrub: 0,
      invalidateOnRefresh: true
    }
  })
  
  // 자식 모션
  gsap.from('.section-home__thumbnail img', {
    scale: 1.7,
    ease: 'none',
    scrollTrigger: {
      trigger: '.section-home__thumbnail',
      containerAnimation: horiMotion,
      start: 'left right',
      end: 'right left',
      scrub: 0,
      // markers: true,
    }
  });
  
  $('[data-motion]').each(function(index, el) {
    const value = ($(this).data('motion-value')) ? $(this).data('motion-value') : 0;
  
    if($(this).data('motion') === 'x') {
      gsap.to($(this).find('img'), {
        xPercent: value,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          containerAnimation: horiMotion,
          start: 'left right',
          end: 'right left',
          scrub: 0,
          // markers: true,
        }
      });
    }
  
    if($(this).data('motion') === 'text') {
      gsap.from($(this).find('> *'), {
        opacity: 0,
        ease: 'none',
        stagger: 0.1,
        scrollTrigger: {
          trigger: el,
          containerAnimation: horiMotion,
          start: 'left right',
          end: 'right left',
          toggleActions: 'play none none reverse',
          // onEnter 도달
          // onLeave 떠남
          // onEnterBack 떠났다가 돌아옴
          // onLeaveBack 도달했다가 다시 나감
          markers: true,
        }
      });
    }
  });
})

// a태그 기본동작 방지
$(document).on('click', 'a[href="#"]', function (e) {
  e.preventDefault();
});

$('.nav-menu__btn').on('click', function() {
  const menuBtn = $('.nav-menu__btn');
  const headerEl = $('.header');
  const CLASSNAME = 'is-open';

  headerEl.toggleClass(CLASSNAME);

  if(headerEl.hasClass(CLASSNAME)) {
    menuBtn.attr('aria-label', 'menu close');
    lenis.stop();
  } else {
    menuBtn.attr('aria-label', 'menu open');
    lenis.start();
  }
});

// $(window).on('resize', function() {
//   const windowWidth = $(window).width();

//   if((windowWidth > 991) && (headerEl.classList.contains('is-open'))) {
//     $('.header').removeClass('is-open');
//     $('.nav-menu__btn').attr('aria-label', 'menu open');
//   }
// });
