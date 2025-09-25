$(window).on('load', function () {
	// Preload
	$('#preload').fadeOut(500);
});

window.addEventListener("load", function() {
    // EmailJS initialisieren
    emailjs.init("XhDQ4t09-1GA4YZiO");

    const form = document.getElementById('booking-form');

    // Popup erstellen
    const popup = document.createElement('div');
    popup.id = 'booking-popup';
    popup.style.position = 'fixed';
    popup.style.top = '50%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.background = 'white';
    popup.style.padding = '2rem';
    popup.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
    popup.style.borderRadius = '10px';
    popup.style.zIndex = '10000';
    popup.style.display = 'none';
    popup.style.maxWidth = '400px';
    popup.style.textAlign = 'center';
    popup.style.fontFamily = 'Arial, sans-serif';
    document.body.appendChild(popup);

    function showPopup(html, color = "black") {
        popup.innerHTML = html + `
            <button id="close-popup" style="
                margin-top: 1rem;
                padding: 0.5rem 1rem;
                background: ${color};
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
            ">Schließen</button>
        `;
        popup.style.display = 'block';
        document.getElementById('close-popup').addEventListener('click', () => {
            popup.style.display = 'none';
        });
        setTimeout(() => { popup.style.display = 'none'; }, 10000);
    }

    function isWithinOpeningHours(dateStr, timeStr) {
        const date = new Date(`${dateStr}T${timeStr}`);
        const day = date.getDay(); // Sonntag = 0, Montag = 1, ..., Samstag = 6
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const totalMinutes = hours * 60 + minutes;

        // Dienstag – Freitag: 11:00 - 14:00 & 17:30 - 22:00
        if (day >= 2 && day <= 5) {
            if ((totalMinutes >= 11*60 && totalMinutes <= 14*60) ||
                (totalMinutes >= 17*60+30 && totalMinutes <= 22*60)) {
                return true;
            }
        }
        // Samstag: 17:00 - 23:00
        if (day === 6) {
            if (totalMinutes >= 17*60 && totalMinutes <= 23*60) return true;
        }
        return false;
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Page Reload verhindern
        console.log("Form submit event ausgelöst ✅");

        // Werte aus dem Formular
        const fullName = form.querySelector('input[name="full_name"]').value;
        const phone = form.querySelector('input[name="phone"]').value;
        const guests = form.querySelector('input[name="guests"]').value;
        const date = form.querySelector('input[name="date"]').value;
        const time = form.querySelector('input[name="time"]').value;

        // Prüfen Öffnungszeiten
        if (!isWithinOpeningHours(date, time)) {
            showPopup(`
                <h3 style="color:red;">⚠️ Außerhalb der Öffnungszeiten</h3>
                <p>Unsere Reservierungszeiten sind:</p>
                <p>Dienstag – Freitag: 11:00 - 14:00 & 17:30 - 22:00<br>
                Samstag: 17:00 - 23:00</p>
            `, "#f44336");
            return;
        }

        // Email senden
        emailjs.sendForm('service_3xmfbcr', 'template_sba0uij', form)
        .then(function(response) {
            console.log("✅ EmailJS Response:", response);
            showPopup(`
                <h3 style="color:green;">✅ Reservierung erfolgreich!</h3>
                <p><strong>Name:</strong> ${fullName}</p>
                <p><strong>Telefon:</strong> ${phone}</p>
                <p><strong>Personen:</strong> ${guests}</p>
                <p><strong>Datum:</strong> ${date}</p>
                <p><strong>Uhrzeit:</strong> ${time}</p>
            `, "#4CAF50");
            form.reset();
        }, function(error) {
            console.error("❌ EmailJS Fehler:", error);
            showPopup(`
                <h3 style="color:red;">❌ Fehler beim Senden</h3>
                <p>${error.text || JSON.stringify(error)}</p>
            `, "#f44336");
        });
    });
});

jQuery(document).ready(function () {
	// Magnific Popup Menu
	$('.image-popup-no-margins').magnificPopup({
		type: 'image',
		closeOnContentClick: true,
		closeBtnInside: false,
		fixedContentPos: true,
		mainClass: 'mfp-no-margins mfp-with-zoom',
		image: {
			verticalFit: true,
		},
		zoom: {
			enabled: true,
			duration: 300,
		},
	});

	// MENU TABS - Einfache und funktionierende Implementierung
	$(document).ready(function() {
		console.log("Menu tabs werden initialisiert...");
		
		// Zeige standardmäßig den ersten Tab (Vorspeisen)
		$('.item-list').hide();
		$('.item-list[data-tab="tab0"]').show();
		
		// Menu Tab Click Handler
		$('.menu-list ul li a').on('click', function(e) {
			e.preventDefault();
			
			var targetTab = $(this).attr('data-tab');
			console.log("Menu tab wurde geklickt:", targetTab);
			
			// Entferne active Klasse von allen Tab-Links
			$('.menu-list ul li a').removeClass('active');
			
			// Füge active Klasse zum geklickten Link hinzu
			$(this).addClass('active');
			
			// Verstecke alle item-list Bereiche
			$('.item-list').hide();
			
			// Zeige den gewählten item-list Bereich
			$('.item-list[data-tab="' + targetTab + '"]').show();
		});
	});

	// Scroll Top Button
	$('#scroll-top').click(function () {
		$('body,html').animate({
			scrollTop: 0,
		}, 800);
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

	// Smooth Scroll Menu
	$('.menu li a[href^="#"]').click(function (event) {
		event.preventDefault();
		var id = $(this).attr('href'),
			top = $(id).offset().top;
		$('body,html').animate({
			scrollTop: top,
		}, 1500);
	});

	$('#logo[href^="#"], .header-content a[href^="#"]').click(function (event) {
		event.preventDefault();
		var id = $(this).attr('href'),
			top = $(id).offset().top;
		$('body,html').animate({
			scrollTop: top,
		}, 1500);
	});

	// Mobile Menu
	$('#openmenu').click(function (event) {
		event.preventDefault();
		$('#navigation').animate({
			left: 0,
		}, 800);
	});

	$('#closemenu').click(function (event) {
		event.preventDefault();
		$('#navigation').animate({
			left: '-320px',
		}, 800);
	});

	$('#navigation a').on('click', function () {
		$('#navigation').animate({
			left: '-320px',
		}, 800);
	});
});