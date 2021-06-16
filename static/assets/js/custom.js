// jQuery
var resizeId;

$(document).ready(function($) {
	$(".owl-carousel").owlCarousel({
	    loop:true,
	    margin:10,
	    autoplay:true,
	    autoplayTimeout:3000,
	    autoplayHoverPause:true,
	    nav:true,
	    dots:false,
	    items:1,
	    navText : ['<i class="fa fa-arrow-left" aria-hidden="true"></i>','<i class="fa fa-arrow-right" aria-hidden="true"></i>']
	})

	$(document).ready(function() {
		$('.mobi-overlay').on('click', function() {
            $('.icon-menu').removeClass('hide');
            $(this).removeClass('show');
            $(".menu_section").animate({ left: "-300px" }, 300)
            $('html').removeClass( 'disable-scroll' );
        } );
		$('.icon-menu').on('click', function() {
			$('.icon-menu').addClass('hide');
            $( '.mobi-overlay' ).addClass('show');
	        $('html').addClass( 'disable-scroll' );
	        $(".menu_section").animate({ left: "0"}, 300)
		});
	})
	
})