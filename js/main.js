const display = $('.maincontent');
const sections = $('.section');

let inScroll = false;

const mobileDetect = new MobileDetect(window.navigator.userAgent);
const isMobile = mobileDetect.mobile();

const switchMenuActiveClass = sectionEq => {
  $('.fixed-menu__item').eq(sectionEq).addClass('active')
    .siblings().removeClass('active');
}

const performTransition = sectionEq => {
  if (inScroll) return
  inScroll = true

  const position = (sectionEq * -100) + '%';

  display.css({
    'transform': `translate(0, ${position})`,
    '-webkit-transform': `translate(0, ${position})`
  })

  sections.eq(sectionEq).addClass('active')
    .siblings().removeClass('active');

  setTimeout(() => {
    inScroll = false;
    switchMenuActiveClass(sectionEq);
  }, 1300);
}

const difineSections = sections => {
  const activeSection = sections.filter('.active');
  return {
    activeSection: activeSection,
    nextSection: activeSection.next(),
    prevSection: activeSection.prev()
  }
}

const scrollToSection = direction => {
  const section = difineSections(sections)

  if (inScroll) return;

  if (direction === 'up' && section.nextSection.length) { // вниз
    performTransition(section.nextSection.index())
  }

  if (direction === 'down' && section.prevSection.length) { // вверх
    performTransition(section.prevSection.index())
  }
}

$('.wrapper').on({
  wheel: e => {
    const deltaY = e.originalEvent.deltaY;
    let direction = (deltaY > 0) 
      ? 'up' 
      : 'down'

    scrollToSection(direction);
  },
  touchmove: e => (e.preventDefault())
});


$(document).on('keydown', e => {
  const section = difineSections(sections);

  if (inScroll) return

  switch (e.keyCode) {
    case 40: // вверх
      if (!section.nextSection.length) return;
      performTransition(section.nextSection.index());
      break;

    case 38: //вниз
      if (!section.prevSection.length) return;
      performTransition(section.prevSection.index());
      break;
  }
});

if (isMobile) {
  $(window).swipe({
    swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
      console.log(direction);
      scrollToSection(direction);
    }
  })
}


$('[data-scroll-to]').on('click touchstart', e => {
  e.preventDefault();
  const $this = $(e.currentTarget);
  const sectionIndex = parseInt($this.attr('data-scroll-to'));

  performTransition(sectionIndex);
});

$(document).ready(function() {
    $('.opinion__btn').on('click touchstart', function(e){
        e.preventDefault();
        $('.modal-bg').fadeIn(400,
            function(){
                $('.modal')
                    .css('display', 'block')
                    .animate({opacity: 1, top: '40%'}, 200);
            });
    });

    $('#modal_close, .modal-bg').on('click touchstart', function(e){
        e.preventDefault();
        $('.modal').animate({opacity: 0, top: '35%'}, 200,
            function(){
                $(this).css('display', 'none');
                $('.modal-bg').fadeOut(400);
            }
        );
    });
});

$(document).ready(function() {
    let fullscreen = $('#fullscreen');
    let ham = $('#hamburger-menu');

    ham.on('click touchstart', e =>{
        e.preventDefault();
    fullscreen.addClass('fullscreen_shown');
    ham.addClass('hamburger-menu-active');
}); //click END

    $('#close').on('click touchstart', e =>{
        e.preventDefault();
    fullscreen.removeClass('fullscreen_shown');
    ham.removeClass('hamburger-menu-active');
}); //click END

}); //ready END

// let hamburger = document.getElementById('hamburger-menu');
// let fullscreen = document.getElementById('fullscreen');
// let close = document.getElementById('close');

// hamburger.addEventListener('click', e => {
//     e.preventDefault();
//     fullscreen.classList.add('fullscreen_shown');
// });

// close.addEventListener('click', e => {
//     e.preventDefault();
//     fullscreen.classList.remove('fullscreen_shown');
// });

$(document).ready(function() {

    $('.slider__button').on('click touchstart', e => {
        e.preventDefault();
    let $this = $(e.currentTarget);
    let composition = $('.slider__composition', $this);
    let main = $this.closest('.slider__main');
    let products = $('.slider__products', main);

    composition.toggleClass('slider__composition_active');
    products.toggleClass('slider__products_shown');

}); //click END

    $('.slider__close').on('click touchstart', e => {
        e.preventDefault();
    let $this = $(e.currentTarget);
    let main = $this.closest('.slider__main');
    let composition = $('.slider__composition', main);
    let products = $('.slider__products', main);

    composition.toggleClass('slider__composition_active');
    products.toggleClass('slider__products_shown');

    console.log($this);
}); //click END

}); //ready END

//  burgers slider

$(document).ready(function() {

    $('.slider__arrow').on('click touchstart', function(e) {
        e.preventDefault();

        let $this = $(this);
        let container = $this.closest('.slider');
        let items = container.find('.slider__main');
        let activeSlide = items.filter('.slider__main-active');
        let existedItem, edgeItem, reqItem;
        items.first().removeClass('slider__main-first');

        if ($this.hasClass('slider__arrow-right')) {
            existedItem = activeSlide.next();
            edgeItem = items.first();
        }

        if ($this.hasClass('slider__arrow-left')) {
            existedItem = activeSlide.prev();
            edgeItem = items.last();
        }

        if (existedItem.length) {
            showSlide(container, existedItem.index());
        } else {
            showSlide(container, edgeItem.index())
        }

    }); //click END


    function showSlide(container, reqIndex) {

        let items = container.find('.slider__main');
        let activeSlide = items.filter('.slider__main-active');
        let reqItem = $(items[reqIndex]);


        if (reqIndex >= 0) {
            activeSlide.animate({'opacity' : 0 },250 , () => {
              activeSlide.removeClass('slider__main-active')});
            // activeSlide.removeClass('slider__main-active').css({'opacity' : 0 });
            reqItem.addClass('slider__main-active').animate({'opacity' : 1 }, 500);
            // activeSlide.animate({'opacity' : 0 },400 , () => {activeSlide.removeClass('slider__main-active')});
            // reqItem.animate({'opacity' : 1 }, 400 , () => {reqItem.addClass('slider__main-active')});
        }
    }

}); //ready END





// team acordion


$(document).ready(function() {
    let teamClass = 'teammates__trigger_active';

    $('.teammates__trigger').on('click touchstart', function(e) {
        e.preventDefault();

        let $this = $(this);
        let $teamLinks = $('.teammates__trigger');
        let item = $this.closest('.teammates__item');
        let container = item.find('.teammates__container');
        let otherContainers =$('.teammates__container');
        let desc = $('.teammates__desc', container);
        let reqHeight = desc.outerHeight();

        if (!$this.hasClass(teamClass)) {
            $teamLinks.removeClass(teamClass);
            $this.addClass(teamClass);

            otherContainers.css({
                'height': 0
            });

            container.css({
                'height': reqHeight
            });

        } else {
            $this.removeClass(teamClass);
            container.css({
                'height' : 0
            });
        }
    }); //click END
}); //ready END


$(document).ready(function() {
    let menuClass = 'menu__trigger_active';

    $('.menu__trigger').on('click touchstart', function(e) {
        e.preventDefault();

        let $this = $(this);
        let $menuLinks = $('.menu__trigger');
        let item = $this.closest('.menu__item');
        let container = item.find('.menu__container');
        let otherContainers =$('.menu__container');
        let desc = $('.menu__desc', container);
        let otherDesc = $('.menu__desc');
        reqwidth = $('.menu__accordeon').outerWidth() - $this.outerWidth() * 3 ;

        if (!$this.hasClass(menuClass)) {
            $menuLinks.removeClass(menuClass);
            $this.addClass(menuClass);

            otherDesc.fadeOut(50);

            otherContainers.css({
                'width': 0
            });

            container.css({
                'width': reqwidth
            });
            desc.delay(300).fadeIn(300);

        } else {
            $this.removeClass(menuClass);

            desc.fadeOut(50 , function() {
                container.css({
                    'width' : 0
                });
            });
        }
    }); //click END
}); //ready END


// Yandex карта


$(document).ready(function() {


    ymaps.ready(init);
    var myMap, burger1, burger2, burger3, burger4;


    function init(){
        myMap = new ymaps.Map ("map", {
            center: [59.939095, 30.315868],
            zoom: 11
        });

        var burger1 = new ymaps.Placemark([59.970609, 30.310975], {}, {
            iconLayout: 'default#image',
            iconImageHref: '../img/icons/map-marker.png',
            iconImageSize: [46, 57],
            iconImageOffset: [-23, -57]
        }); // burger 1

        var burger2 = new ymaps.Placemark([59.945041, 30.382558], {}, {
            iconLayout: 'default#image',
            iconImageHref: '../img/icons/map-marker.png',
            iconImageSize: [46, 57],
            iconImageOffset: [-23, -57]
        }); // burger 2

        var burger3 = new ymaps.Placemark([59.915834, 30.492936], {}, {
            iconLayout: 'default#image',
            iconImageHref: '../img/icons/map-marker.png',
            iconImageSize: [46, 57],
            iconImageOffset: [-23, -57]
        }); // burger 3

        var burger4 = new ymaps.Placemark([59.888039, 30.315425], {}, {
            iconLayout: 'default#image',
            iconImageHref: '../img/icons/map-marker.png',
            iconImageSize: [46, 57],
            iconImageOffset: [-23, -57]
        }); // burger 4

        myMap.geoObjects.add(burger1);
        myMap.geoObjects.add(burger2);
        myMap.geoObjects.add(burger3);
        myMap.geoObjects.add(burger4);

    }



}); //ready END
