// iScroll
function isPassive() {
    var supportsPassiveOption = false;
    try {
        addEventListener("test", null, Object.defineProperty({}, 'passive', {
            get: function() {
                supportsPassiveOption = true;
            }
        }));
    } catch (e) {}
    return supportsPassiveOption;
}

document.addEventListener('touchmove', function(e) {
    e.preventDefault();
}, isPassive() ? {
    capture: false,
    passive: false
} : false);

var mainScroll;
var bottomModalScroll;

// nprogress
NProgress.start();

function loaded() {

    // nprogress
    NProgress.done();
    $('.nprogress-fade').removeClass('nprogress-out');

    mainScroll = new IScroll('.main', {
        scrollbars: 'custom',
        fadeScrollbars: true,
        shrinkScrollbars: 'scale',
        preventDefaultException: {tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|IMG)$/ },
        probeType: 2,
        tap: true
    });

}

// swiper
var iamgeSlide = new Swiper('#image-slide', {
    loop: true,
    autoplay: 5000,
    lazyLoading: true,
    lazyLoadingInPrevNext: true,
    pagination: '.swiper-pagination'
});

// photo swiper
var roleImage = new Swiper('#photo-slide', {
    effect: 'coverflow',
    coverflow: {
        rotate: 0,
        stretch: -10,
        depth: 150,
        modifier: 1,
        slideShadows: true
    },
    slidesPerView: 'auto',
    centeredSlides: true,
    slideTotapedSlide: true,
    lazyLoading: true,
    lazyLoadingInPrevNext: true
});

// waves
Waves.displayEffect();

// delayed spik
function delayedSpik() {

    var href = [];
    $("[data-href]").each(function(i) {
        href[i] = $(this).data('href');
        if ($(this).hasClass('waves-effect')) {
            $(this).bind("tap", function() {
                window.setTimeout(function() {
                    location.href = href[i];
                }, 300);
            });
        } else {
            $(this).bind("tap", function() {
                location.href = href[i];
            });
        }
    });

    $("footer [data-href]").each(function(i) {
        href[i] = $(this).data('href');
        if ($(this).hasClass('waves-effect')) {
            $(this).bind("click", function() {
                window.setTimeout(function() {
                    location.href = href[i];
                }, 300);
            });
        } else {
            $(this).bind("click", function() {
                location.href = href[i];
            });
        }
    });

};
delayedSpik();

// toast
function toast(message, duration, position, align) {
    if (typeof(position) != "undefined" && position != "") {
        position = "toast-" + position;
    } else {
        position = "";
    }
    if (typeof(align) != "undefined" && align != "") {
        align = "align-" + align;
    } else {
        align = "";
    }
    duration = duration || 3000;
    duration = isNaN(duration) ? 3000 : duration;
    var m = document.createElement('div');
    m.setAttribute("class", "toast " + position + " " + align);
    m.innerHTML = message;
    document.body.appendChild(m);
    setTimeout(function() {
        m.setAttribute("class", "toast show " + position + " " + align);
        setTimeout(function() {
            m.setAttribute("class", "toast  " + position + " " + align);
            setTimeout(function() {
                document.body.removeChild(m);
            }, 300);
        }, duration);
    }, 100);
}

// jQuery
jQuery(document).ready(function($) {

    // searchbar
    $('.searchbar .search').focus(function() {
        $('.searchbar .icon-search').addClass('focus');
        $(this).blur(function() {
            $('.searchbar .icon-search').removeClass('focus');
        })
    })

    // button
    $('.button').on('tap', function() {
        $(this).removeClass('active').addClass('active');
        var set = setTimeout(function() {
            $('.button').removeClass('active');
        }, 100)
    });

});
