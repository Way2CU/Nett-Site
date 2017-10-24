/**
 * Main JavaScript
 * Site Name
 *
 * Copyright (c) 2016. by Way2CU, http://way2cu.com
 * Authors:
 */

// create or use existing site scope
var Site = Site || {};

// make sure variable cache exists
Site.variable_cache = Site.variable_cache || {};


/**
 * Check if site is being displayed on mobile.
 * @return boolean
 */
Site.is_mobile = function() {
	var result = false;

	// check for cached value
	if ('mobile_version' in Site.variable_cache) {
		result = Site.variable_cache['mobile_version'];

	} else {
		// detect if site is mobile
		var elements = document.getElementsByName('viewport');

		// check all tags and find `meta`
		for (var i=0, count=elements.length; i<count; i++) {
			var tag = elements[i];

			if (tag.tagName == 'META') {
				result = true;
				break;
			}
		}

		// cache value so next time we are faster
		Site.variable_cache['mobile_version'] = result;
	}

	return result;
};

//Scroll function definition
Site.scroll = function(event) {
	if(window.scrollY > Site.animationTrigger) {
		Site.body.classList.add('floating');
	} else {
		Site.body.classList.remove('floating');
	}

};

//Dialog form handle click event and show dialog form
handle_laptop_link_click = function(event) {
	event.preventDefault();
	Site.dialog_form.open();
};


/**
 * Function called when document and images have been completely loaded.
 */
Site.on_load = function() {
	if (Site.is_mobile())
		Site.mobile_menu = new Caracal.MobileMenu();

	//Definition of global var Header
	Site.body = document.querySelector('body');

	Site.animationTrigger = document.querySelector('body').children[2].clientHeight;

	//event listener and function call
	window.addEventListener('scroll', Site.scroll);

	if(document.querySelector('section.showcase')) {
		//Page controll for animation of Show_case gallery desktop and img with description and img
		Site.show_case_gallery_tablet = new PageControl('section.showcase', 'div.desktop');
		Site.show_case_gallery_tablet
			.setInterval(3000)
			.setWrapAround(true)
			.attachNextControl($('a.next'))
			.attachPreviousControl($('a.previous'))
			.setPauseOnHover(true);

		//Page controll for animation of Show_case gallery mobile
		Site.show_case_gallery_mobile = new PageControl('section.showcase', 'div.mobile');
		Site.show_case_gallery_mobile
			.setInterval(3000)
			.setWrapAround(true)
			.attachNextControl($('a.next'))
			.attachPreviousControl($('a.previous'))
			.setPauseOnHover(true);
	}

	//Light box gallery Testimonials customers
	Site.galleryTestimonials = new Caracal.Gallery.LightBox();
	Site.galleryTestimonials
			.set_show_controls(true)
			.set_show_thumbnails(true)
			.images.add('a.testimonial');

	//Active class in gallery page
	Site.thumbnail = document.querySelectorAll('a.large_tumb');

	if ('section.gallery_list') {
	Site.thumbnail.forEach(function(element) {
			element.addEventListener('click', handle_click);
	});
	}

	function handle_click(event){
		event.preventDefault();
		for (var i=0; i < Site.thumbnail.length; i++) {
			var link = Site.thumbnail[i];
			if (link === this)
				continue;
				link.classList.remove('active');
		}
		this.classList.toggle('active');
	}

	//Hnadle dialog click function
	handle_dialog = function(event) {
		event.preventDefault();
		Site.video_dialog
			.setTitle(this.getAttribute('title'))
			.setContentFromURL(this.getAttribute('href'))
			.add_class('video_dialog')
			.showWhenReady();
	}

	//Grabbing all video link inside section and connecting click handler
	Site.videos = document.querySelectorAll('section.videos a');
	Site.videos.forEach(function(element) {
		element.addEventListener('click', handle_dialog);
	});

	//Dialog box for site videos
	Site.video_dialog = new Caracal.Dialog();

	//Dialog form seclecting link and attaching event
	var contact_form_link = document.querySelector('div.laptop_screen_text a');
	if (contact_form_link)
		contact_form_link.addEventListener('click', handle_laptop_link_click);

	//Dialog from
	Site.dialog_form = new Caracal.Dialog();
	Site.dialog_form
		.add_class('floating_form')
		.set_content_from_dom('div#bottom_form');
};


// connect document `load` event with handler function
$(Site.on_load);
