$(window).on('load', function () {
	// Preload
	$('#preload').fadeOut(500);
});

jQuery(document).ready(function () {
	// Magnific Popup Menu
	$('.image-popup-no-margins').magnificPopup({
		type: 'image',
		closeOnContentClick: true,
		closeBtnInside: false,
		fixedContentPos: true,
		mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
		image: {
			verticalFit: true,
		},
		zoom: {
			enabled: true,
			duration: 300, // don't foget to change the duration also in CSS
		},
	});

	// Tabs Menu
	$('.menu-list ul li a').click(function () {
		$('.menu-list ul li a').removeClass('active');
		$(this).addClass('active');
	});

	$('.menu-item > .item-list').not(':first-of-type').hide();
	$('.menu-list ul li a').click(function (e) {
		e.preventDefault();
	});
	$('.menu-list ul li').each(function (i) {
		$(this).attr('data-tab', 'tab' + i);
	});
	$('.menu-item > .item-list').each(function (i) {
		$(this).attr('data-tab', 'tab' + i);
	});
	$('.menu-list ul li').on('click', function () {
		var datatab = $(this).data('tab');
		$('.menu-item > .item-list').hide();
		$('.menu-item > .item-list[data-tab=' + datatab + ']').show();
	});

	// Owl Carousel Portfolio
	$('.portfolio-carousel').owlCarousel({
		loop: true,
		margin: 10,
		nav: false,
		dots: true,
		responsive: {
			0: {
				items: 1,
			},
			600: {
				items: 1,
			},
			1000: {
				items: 1,
			},
		},
	});

	// Magnific Popup Video Portfolio
	$('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
		disableOn: 700,
		type: 'iframe',
		mainClass: 'mfp-fade',
		removalDelay: 160,
		preloader: false,
		fixedContentPos: false,
	});

	// Scroll Top Button
	$('#scroll-top').click(function () {
		$('body,html').animate(
			{
				scrollTop: 0,
			},
			800,
		);
		return false;
	});

	// Scroll Top
	$('#scroll-top').hide();
	$(window).scroll(function () {
		if ($(this).scrollTop() > 50) {
			$('#scroll-top').fadeIn();
		} else {
			$('#scroll-top').fadeOut();
		}
	});

	// Scroll Fixed Menu
	$(window).scroll(function () {
		if ($(this).scrollTop() >= 10) {
			$('header').addClass('bg-header');
		} else {
			$('header').removeClass('bg-header');
		}
	});

	// Scroll Menu
	$('.menu li a[href^="#"]').click(function (event) {
		event.preventDefault();
		var id = $(this).attr('href'),
			top = $(id).offset().top;
		$('body,html').animate(
			{
				scrollTop: top,
			},
			1500,
		);
	});

	$('#logo[href^="#"], .header-content a[href^="#"]').click(function (event) {
		event.preventDefault();
		var id = $(this).attr('href'),
			top = $(id).offset().top;
		$('body,html').animate(
			{
				scrollTop: top,
			},
			1500,
		);
	});

	// Booking Ajax
	$('#sendbook').click(function (event) {
		event.preventDefault();

		var name = $('input[name="name"]').val();
		var location = $('input[name="location"]').val();
		var phone = $('input[name="phone"]').val();
		var email = $('input[name="email"]').val();
		var date = $('input[name="date"]').val();
		var time = $('input[name="time"]').val();
		$('input').focus(function () {
			$('.res-booking').fadeOut();
		});

		if (name == '' || location == '' || phone == '' || email == '' || date == '' || time == '') {
			$('.res-booking').fadeIn().html('<span class="error">All fields must be filled.</span>');
			$('input').focus(function () {
				$('.res-booking').fadeOut();
			});
		} else {
			$.ajax({
				url: '../booking.php',
				type: 'POST',
				data: {
					name: name,
					location: location,
					phone: phone,
					email: email,
					date: date,
					time: time,
				},
				dataType: 'html',
				success: function (data) {
					if (data == 'Send') {
						$('.res-booking').fadeIn().html('<span class="send">Thanks. We will contact you shortly.</span>');

						$('input[name="name"]').val('');
						$('input[name="location"]').val('');
						$('input[name="phone"]').val('');
						$('input[name="email"]').val('');
						$('input[name="date"]').val('');
						$('input[name="time"]').val('');
					}
				},
			}); // ajax
		}
	});

	// Mobile Menu
	$('#openmenu').click(function (event) {
		event.preventDefault();
		$('#navigation').animate(
			{
				left: 0,
			},
			800,
		);
	});

	$('#closemenu').click(function (event) {
		event.preventDefault();
		$('#navigation').animate(
			{
				left: '-320px',
			},
			800,
		);
	});

	$('#navigation a').on('click', function () {
		$('#navigation').animate(
			{
				left: '-320px',
			},
			800,
		);
	});
}); // ready
