// lenis
const lenis = new Lenis()

lenis.on('scroll', (e) => {

})

lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time)=>{
  lenis.raf(time * 1000)
})

gsap.ticker.lagSmoothing(0)

// 새로고침 시 사용자 스크롤 위치 저장하지 않음
if (history.scrollRestoration) {
  history.scrollRestoration = "manual";
}

// a태그 기본동작 방지
$(document).on('click', 'a[href="#"]', function (e) {
  e.preventDefault();
});

// loading
const introMotion = gsap.timeline({
  onStart: function() {
    $('body').css('overflow', 'hidden');
    lenis.stop();
  },
  onComplete: function() {
    $('body').removeAttr('style');
    lenis.start();
    homeMotion.play();
  }
});
introMotion.to('.loading', {
    opacity: 0,
    duration: 1,
    onComplete: function() {
    gsap.set('.loading', {display: 'none'})
  }
}, 'a+=1')

const homeMotion = gsap.timeline({
  paused: true,
  defaults: {
    delay: 0.2,
    duration: 1,
    ease: 'power1.inOut'
  }
});
homeMotion
.from('.section-home__headline', {opacity: 0}, 'a')
.from('.section-home__description', {opacity: 0}, 'a+=0.1')
.from('.horizontal-section__cta', {opacity: 0}, 'a+=0.2')

// nav
gsap.set('.global-nav__inner', {x: 0, xPercent: 100}); // 반응형 대응을 위해 초기세팅
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
.to('.global-nav__dim', {opacity: 1, 'pointer-events': 'auto'}, 'a')
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

setContentHeight();
window.addEventListener('resize', setContentHeight);
function setContentHeight() {
  const content = document.querySelector('.sticky__inner');
  const contentWidth = content.getBoundingClientRect().width;
  const contentWrapper = document.querySelector('.horizontal-page');
  const windowWidth = window.innerWidth;

  if(windowWidth > 991) {
    contentWrapper.style.height = contentWidth + 'px';
  } else {
    contentWrapper.removeAttribute('style');
  }
}

// horizontal
let mm = gsap.matchMedia();
mm.add("(min-width: 992px)", () => {
  const horizontalMotion = gsap.to('.sticky__inner', {
    ease: 'none',
    xPercent: -100,
    x: function() {
      return window.innerWidth;
    },
    scrollTrigger: {
      trigger: '.horizontal-page',
      start: '0% 0%',
      end: '100% 100%',
      scrub: 1,
      invalidateOnRefresh: true,
      // markers: true,
    }
  })
  
  // 자식 모션
  $('[data-motion]').each(function(index, el) {
    const value = ($(this).data('motion-value')) ? $(this).data('motion-value') : 0;

    if($(this).data('motion') === 'x') {
      if($(this).data('motion-direction') === 'fromTo') {
        gsap.fromTo($(this).find('img'), {
         xPercent: value
        },
        {
          scrollTrigger: {
           trigger: el,
           containerAnimation: horizontalMotion,
           start: 'left right',
           end: 'right left',
           scrub: true,
          //  markers: true,
         },
         xPercent: -value,
         ease: 'none'
        });
      } else {
        gsap.to($(this).find('img'), {
          xPercent: value,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            containerAnimation: horizontalMotion,
            start: 'left right',
            end: 'right left',
            scrub: true,
            // markers: true,
          }
        });
      }
    }
  
    if($(this).data('motion') === 'text') {
      const staggerValue = ($(this).data('motion-stagger') ? $(this).data('motion-stagger') : 0.2);

      gsap.from($(this).find('> *'), {
        opacity: 0,
        stagger: staggerValue,
        ease: 'power1.inOut',
        duration: 1,
        scrollTrigger: {
          trigger: el,
          containerAnimation: horizontalMotion,
          start: 'left right',
          end: 'right left',
          toggleActions: 'play none none reverse', // onEnter 도달 onLeave 떠남 onEnterBack 떠났다가 돌아옴 onLeaveBack 도달했다가 다시 나감
          // markers: true,
        }
      });
    }

    if($(this).data('motion') === 'scale') {
      gsap.from($(this).find('img'), {
        scale: value,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          containerAnimation: horizontalMotion,
          start: 'left right',
          end: 'right left',
          scrub: true,
          // markers: true,
        }
      });
    }
  });
})