var ready = (callback) => {
	if (document.readyState != "loading") callback();
	else document.addEventListener("DOMContentLoaded", callback);
}
ready(() => { 
	var icon_menu = document.querySelector(".icon-menu");
	var mobi_overlay = document.querySelector(".mobi-overlay");
	var menu_section = document.querySelector(".menu_section");
	var html = document.querySelector("html");
	var dropdown_caret = document.querySelector(".dropdown .caret");
	var dropdown = document.querySelector(".dropdown");
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
	document.querySelector(".dropdown-toggle").addEventListener("click", (e) => { 
		dropdown.classList.toggle("open");
	});
});
	
