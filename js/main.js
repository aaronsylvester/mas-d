DOMCACHESTORE = {};
DOMCACHE = {
    get: function(selector, force) {
        if (DOMCACHESTORE[selector] !== undefined && force === undefined) {
            return DOMCACHESTORE[selector];
        }

        DOMCACHESTORE[selector] = $(selector);
        return DOMCACHESTORE[selector];
    }
};

$(document).ready(function () {

    var tsa, sn, outer, which_slider, which_index, which_slides;

    DOMCACHE.get('.text_sizes a').on('click', function(e) {
        e.preventDefault();
        tsa = $(this);
        outer = DOMCACHE.get('#outer');
        $(outer).removeClass('text_small text_medium text_large');
        $(outer).addClass('text_' + $(tsa).data('size'));
        DOMCACHE.get('.text_sizes a').removeClass('text_size_active');
        $(tsa).addClass('text_size_active');
        update_diagrams();
    });

    DOMCACHE.get('header nav a').on('click', function (e) {
        e.preventDefault();
        if ($(this).hasClass('nav_page_1')) {
            DOMCACHE.get('.nav_page_1').addClass('nav_active');
            DOMCACHE.get('.nav_page_2').removeClass('nav_active');
            DOMCACHE.get('.flexslider').flexslider(0);
            DOMCACHE.get('.flexslider2, .flexslider3, .flexslider4').hide();
        }
    });

    DOMCACHE.get(".choice").each(function(index) {
        $(this).delay(400*index).fadeIn(300);
    });
    DOMCACHE.get('.choice a').on('click', function (e) {
        which_slider = $(this).data('which-slider');
        which_index  = $(this).data('which-index');
        which_slides = $(this).data('which-slides');
        DOMCACHE.get('.flexslider' + which_slider).flexslider({ animation: "slide", selector: ".slides" + which_slides + " > li", touch: false, controlNav: false, animationLoop: false, directionNav: false, slideshow: false, smoothHeight: true });
        e.preventDefault();
        DOMCACHE.get('.nav_page_1').removeClass('nav_active');
        DOMCACHE.get('.nav_page_2').addClass('nav_active');
        DOMCACHE.get('.flexslider').flexslider(which_index);
        update_diagrams();
        DOMCACHE.get('.flexslider' + which_slider).flexslider(0);
        DOMCACHE.get('a.slider_nav_' + which_slider).removeClass('slider_active').first().addClass('slider_active');
        DOMCACHE.get('.flexslider' + which_slider).show();

    });

    DOMCACHE.get('.flexslider2, .flexslider3, .flexslider4').hide();
    DOMCACHE.get('.flexslider').flexslider({
        animation: "fade",
        selector: ".slides > li",
        touch: false,
        controlNav: false,
        animationLoop: false,
        directionNav: false,
        slideshow: false,
        smoothHeight: true
    });

    DOMCACHE.get('a.slider_nav').on('click', function(e) {
        e.preventDefault();
        sn = $(this);
        which_slider = $(this).data('which-slider');
        which_index = $(this).data('which-index');
        DOMCACHE.get('.flexslider' + which_slider).flexslider(which_index);
        DOMCACHE.get('a.slider_nav').removeClass('slider_active');
        $(sn).addClass('slider_active');

    });

    var update_diagrams = function() {
        DOMCACHE.get('.diagram_middle').each(function() {
            var h = 0;
            var elem = $(this);
            var e_h = elem.height();
            if ($(document).width() < 400) {
                DOMCACHE.get('.diagram_box').removeClass('autoHeight').addClass('minAutoHeight');
            } else {
                DOMCACHE.get('.diagram_box').each(function() {
                    DOMCACHE.get('.diagram_box').removeClass('minAutoHeight').addClass('autoHeight');
                    if ($(this).height() > h) { h = $(this).height(); }
                });
                DOMCACHE.get('.diagram_box').css({'min-height': h});
                elem.find('.diagram_behind').height(h + 60);
            }
        });
    }

    window.addEventListener("resize", resizeThrottler, false);
    var resizeTimeout;
    function resizeThrottler() {
        if ( !resizeTimeout ) {
          resizeTimeout = setTimeout(function() {
            resizeTimeout = null;
            update_diagrams();
           }, 66);
        }
    }

});
