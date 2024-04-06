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
          // markers: true,
        }
      });
    }
  });
})

// a태그 기본동작 방지
$(document).on('click', 'a[href="#"]', function (e) {
  e.preventDefault();
});

// 반응형 대응을 위해 초기세팅
gsap.set('.global-nav__inner', {x: 0, xPercent: 100}); 
const navTl = gsap.timeline({
  paused: true,
  defaults : {
    ease: 'none',
    duration: 0.3
  },
  onStart: function() {
    lenis.stop();
    $('.nav-menu').attr('aria-label', 'menu close');
  }
});
navTl
.to('.global-nav__inner', {xPercent: 0, 'pointer-events': 'auto'}, 'a')
.to('.nav-menu__line:nth-child(1)', {y: 6, rotate: 45}, 'a')
.to('.nav-menu__line:nth-child(3)', {y: -6, rotate: -45}, 'a')
.to('.nav-menu__line:nth-child(2)', {opacity: 0}, 'a')
.to('.global-nav__dim', {opacity: 1}, 'a')
.to('.header', {'mix-blend-mode': 'normal'}, 'a')

$('.nav-menu').on('click', toggleNav);

function toggleNav() {
  const menuBtn = $('.nav-menu');
  const bodyEl = $('body');
  const CLASSNAME = 'is-open';

  bodyEl.toggleClass(CLASSNAME);

  if(bodyEl.hasClass(CLASSNAME)) {
    navTl.play();
  } else {
    lenis.start();
    navTl.reverse();
    menuBtn.attr('aria-label', 'menu open');
  }
}