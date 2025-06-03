// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
	anchor.addEventListener('click', function (e) {
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

// Scroll to top function
function scrollToTop() {
	window.scrollTo({
		top: 0,
		behavior: 'smooth',
	});
}

// Show/hide scroll to top button
window.addEventListener('scroll', function () {
	const scrollButton = document.querySelector('.scroll-to-top');
	if (window.pageYOffset > 300) {
		scrollButton.classList.add('visible');
	} else {
		scrollButton.classList.remove('visible');
	}
});

// Intersection Observer for fade-in animations
const observerOptions = {
	threshold: 0.1,
	rootMargin: '0px 0px -50px 0px',
};

const observer = new IntersectionObserver(function (entries) {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.classList.add('visible');
		}
	});
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach((el) => {
	observer.observe(el);
});

// Navbar scroll effect
let lastScrollTop = 0;
window.addEventListener('scroll', function () {
	const navbar = document.querySelector('.navbar');
	const currentScroll = window.pageYOffset;

	if (currentScroll > 100) {
		navbar.style.background = 'rgba(10, 10, 10, 0.95)';
		navbar.style.backdropFilter = 'blur(25px)';
	} else {
		navbar.style.background = 'rgba(10, 10, 10, 0.8)';
		navbar.style.backdropFilter = 'blur(20px)';
	}

	lastScrollTop = currentScroll;
});

// Parallax effect for hero background
window.addEventListener('scroll', function () {
	const scrolled = window.pageYOffset;
	const parallax = document.querySelector('.hero-bg');
	const speed = scrolled * 0.5;

	if (parallax) {
		parallax.style.transform = `translateY(${speed}px)`;
	}
});

// Card tilt effect
document.querySelectorAll('.restaurant-card, .manager-card').forEach((card) => {
	card.addEventListener('mousemove', function (e) {
		const rect = card.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		const centerX = rect.width / 2;
		const centerY = rect.height / 2;

		const rotateX = (y - centerY) / 10;
		const rotateY = (centerX - x) / 10;

		card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
	});

	card.addEventListener('mouseleave', function () {
		card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
	});
});

// Counter animation for statistics
function animateCounter(element, target, duration = 2000) {
	let start = 0;
	const increment = target / (duration / 16);

	const timer = setInterval(() => {
		start += increment;
		if (start >= target) {
			element.textContent = target + (target === 15 ? '+' : target === 50 ? '+' : '');
			clearInterval(timer);
		} else {
			element.textContent = Math.floor(start) + (target === 15 ? '+' : target === 50 ? '+' : '');
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
					const target = parseInt(counter.textContent);
					animateCounter(counter, target);
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

// Add floating action button styles
const floatingStyles = `
.floating-elements {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    z-index: 1000;
}

.scroll-to-top {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: var(--primary-gradient);
    border: none;
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
    transition: all 0.3s ease;
    opacity: 0;
    visibility: hidden;
    transform: translateY(20px);
}

.scroll-to-top.visible {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
}

.scroll-to-top:hover {
    transform: translateY(-5px) scale(1.1);
    box-shadow: 0 15px 35px rgba(102, 126, 234, 0.6);
}

.scroll-to-top:active {
    transform: translateY(-2px) scale(0.95);
}

@media (max-width: 768px) {
    .floating-elements {
        bottom: 1rem;
        right: 1rem;
    }
    
    .scroll-to-top {
        width: 50px;
        height: 50px;
    }
}
`;

// Add floating styles to head
const styleSheet = document.createElement('style');
styleSheet.textContent = floatingStyles;
document.head.appendChild(styleSheet);