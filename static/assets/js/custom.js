// jQuery
// var resizeId;

// $(document).ready(function($) {
	// $(".owl-carousel").owlCarousel({
	//     loop:true,
	//     margin:10,
	//     autoplay:true,
	//     autoplayTimeout:3000,
	//     autoplayHoverPause:true,
	//     nav:true,
	//     dots:false,
	//     items:1,
	//     navText : ['<i class="fa fa-arrow-left" aria-hidden="true"></i>','<i class="fa fa-arrow-right" aria-hidden="true"></i>']
	// })

	// $(document).ready(function() {
	// 	// $('.mobi-overlay').on('click', function() {
    //     //     $('.icon-menu').removeClass('hide');
    //     //     $(this).removeClass('show');
    //     //     $(".menu_section").css({ left: "-300px" });
    //     //     $('html').removeClass( 'disable-scroll' );
    //     // } );
	// 	// $('.icon-menu').on('click', function() {
	// 	// 	$('.icon-menu').addClass('hide');
    //     //     $( '.mobi-overlay' ).addClass('show');
	//     //     $('html').addClass( 'disable-scroll' );
	//     //     $(".menu_section").css({ left: "0"});
	// 	// });
	// 	$(".sidebar-left .menu_section .side-menu li a").click(function(){
	// 		if($(".mobi-overlay").hasClass("show")){
	// 			$(".mobi-overlay").removeClass("show");
	// 		}
	// 		$(".menu_section").css({left: "-300px"});
	// 		$('html').removeClass( 'disable-scroll' );
	// 	});
		   
	// })
// })
var ready = (callback) => {
	if (document.readyState != "loading") callback();
	else document.addEventListener("DOMContentLoaded", callback);
}
ready(() => { 
	var icon_menu = document.querySelector(".icon-menu");
	var mobi_overlay = document.querySelector(".mobi-overlay");
	var menu_section = document.querySelector(".menu_section");
	var html = document.querySelector("html");
	var item = document.querySelectorAll(".sidebar-left .menu_section .side-menu li")
	document.querySelector(".mobi-overlay").addEventListener("click", (e) => { 
		icon_menu.classList.remove("hide");
		mobi_overlay.classList.remove("show");
		menu_section.style.left = "-300px";
		html.classList.remove("disable-scroll");
	});
	document.querySelector(".icon-menu").addEventListener("click", (e) => { 
		icon_menu.classList.add("hide");
		mobi_overlay.classList.add("show");
		menu_section.style.left = "0";
		html.classList.add("disable-scroll");
	});
	for(i = 0; i < item.length; i++){
		item[i].addEventListener("click", (e) => { 
			mobi_overlay.classList.remove("show");
			menu_section.style.left = "-300px";
			html.classList.remove("disable-scroll");
		});
	}
	
});
	
