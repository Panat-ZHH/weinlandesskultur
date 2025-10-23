// Dropdown Click Functionality
document.addEventListener('DOMContentLoaded', function () {
	const dropdown = document.querySelector('.dropdown');
	const dropdownButton = dropdown ? dropdown.querySelector('.nav-button') : null;

	if (dropdown && dropdownButton) {
		dropdownButton.addEventListener('click', function (e) {
			e.preventDefault();
			e.stopPropagation();
			dropdown.classList.toggle('active');
		});

		document.addEventListener('click', function (e) {
			if (!dropdown.contains(e.target)) {
				dropdown.classList.remove('active');
			}
		});

		const dropdownContent = dropdown.querySelector('.dropdown-content');
		if (dropdownContent) {
			dropdownContent.addEventListener('click', function (e) {
				e.stopPropagation();
			});
		}

		document.addEventListener('keydown', function (e) {
			if (e.key === 'Escape') {
				dropdown.classList.remove('active');
			}
		});
	}
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
	anchor.addEventListener('click', function (e) {
		if (this.classList.contains('dropdown-item')) {
			return;
		}

		e.preventDefault();
		const targetID = this.getAttribute('href').substring(1);
		const targetElement = document.getElementById(targetID);
		if (targetElement) {
			targetElement.scrollIntoView({
				behavior: 'smooth',
				block: 'start',
			});
		}
	});
});

// Mobile menu functions
function toggleMobileMenu() {
	document.querySelector('.burger-menu').classList.toggle('active');
	document.querySelector('.mobile-menu').classList.toggle('active');
	document.querySelector('.mobile-overlay').classList.toggle('active');
	document.body.style.overflow = document.querySelector('.mobile-menu').classList.contains('active')
		? 'hidden'
		: 'auto';
}

function closeMobileMenu() {
	document.querySelector('.burger-menu').classList.remove('active');
	document.querySelector('.mobile-menu').classList.remove('active');
	document.querySelector('.mobile-overlay').classList.remove('active');
	document.body.style.overflow = 'auto';
}

function scrollToAbout() {
	document.getElementById('aboutSection').scrollIntoView({
		behavior: 'smooth',
		block: 'start',
	});
}

// Intersection Observer for fade-in animations
const observerOptions = {
	threshold: 0.1,
	rootMargin: '0px 0px -50px 0px',
};

const observer = new IntersectionObserver(function (entries) {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.classList.add('visible');
			observer.unobserve(entry.target);
		}
	});
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach((el) => {
	observer.observe(el);
});

// Counter animation for statistics
function animateCounter(element, target, duration = 2000, hasPlus = false) {
	let start = 0;
	const increment = target / (duration / 16);

	const timer = setInterval(() => {
		start += increment;
		if (start >= target) {
			element.textContent = target + (hasPlus ? '+' : '');
			clearInterval(timer);
		} else {
			element.textContent = Math.floor(start) + (hasPlus ? '+' : '');
		}
	}, 16);
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver(
	function (entries) {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				const counters = entry.target.querySelectorAll('.stat-item h3');
				counters.forEach((counter) => {
					const originalText = counter.textContent;
					const hasPlus = originalText.includes('+');
					const target = parseInt(originalText.replace('+', ''));
					animateCounter(counter, target, 2000, hasPlus);
				});
				statsObserver.unobserve(entry.target);
			}
		});
	},
	{ threshold: 0.5 },
);

const statsSection = document.querySelector('.company-stats');
if (statsSection) {
	statsObserver.observe(statsSection);
}