document.addEventListener('DOMContentLoaded', function () {
	// Dropdown Click Functionality
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

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
	anchor.addEventListener('click', function (e) {
		// Dropdown-Items nicht von smooth scrolling betroffen
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
		navbar.style.background = 'rgba(107, 93, 79, 0.95)';
		navbar.style.backdropFilter = 'blur(25px)';
	} else {
		navbar.style.background = 'rgba(107, 93, 79, 0.95)';
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

// Detaillierte Informationen für jede Station
const nodeDetails = {
	education: {
		title: '🎓 Studium - Informatik B.Sc.',
		content: `
                    <p><strong>Universität Zürich</strong></p>
                    <p><strong>Zeitraum:</strong> September 2018 - Juli 2022</p>
                    <p><strong>Abschlussnote:</strong> 1.8 (Sehr gut)</p>
                    <p><strong>Schwerpunkte:</strong></p>
                    <ul>
                        <li>Algorithmen und Datenstrukturen</li>
                        <li>Künstliche Intelligenz & Machine Learning</li>
                        <li>Software Engineering & Architektur</li>
                        <li>Datenbanksysteme & Big Data</li>
                        <li>Web-Technologien & Mobile Development</li>
                    </ul>
                    <p><strong>Bachelor-Thesis:</strong> "Optimierung von Machine Learning Algorithmen für Real-Time Anwendungen" (Note: 1.3)</p>
                    <p><strong>Besondere Leistungen:</strong> Dean's List 2020, 2021</p>
                `,
	},
	internship: {
		title: '👨‍💻 Praktikum - Software Development',
		content: `
                    <p><strong>StartupTech GmbH</strong></p>
                    <p><strong>Position:</strong> Software Development Intern</p>
                    <p><strong>Zeitraum:</strong> März 2021 - August 2021 (6 Monate)</p>
                    <p><strong>Hauptaufgaben:</strong></p>
                    <ul>
                        <li>Frontend-Entwicklung mit React und TypeScript</li>
                        <li>Responsive Design Implementation</li>
                        <li>API Integration und Testing</li>
                        <li>Code Reviews und Dokumentation</li>
                        <li>Agile Entwicklung mit Scrum</li>
                    </ul>
                    <p><strong>Technologien:</strong> React, JavaScript, HTML5, CSS3, Git</p>
                    <p><strong>Erfolge:</strong> Eigenständige Entwicklung einer Admin-Oberfläche, die heute noch verwendet wird</p>
                `,
	},
	junior: {
		title: '💼 Junior Developer - TechStart AG',
		content: `
                    <p><strong>TechStart AG</strong></p>
                    <p><strong>Position:</strong> Junior Frontend Developer</p>
                    <p><strong>Zeitraum:</strong> August 2022 - Dezember 2023</p>
                    <p><strong>Hauptverantwortlichkeiten:</strong></p>
                    <ul>
                        <li>Entwicklung von React-basierten Webanwendungen</li>
                        <li>Implementation von responsiven UI/UX Designs</li>
                        <li>RESTful API Integration</li>
                        <li>Performance-Optimierung bestehender Anwendungen</li>
                        <li>Mentoring von Praktikanten und Werkstudenten</li>
                        <li>Code Reviews und Testing</li>
                    </ul>
                    <p><strong>Technischer Stack:</strong> React, TypeScript, Redux, Node.js, Jest, Sass, Webpack</p>
                    <p><strong>Erfolge:</strong> 25% Performance-Verbesserung der Hauptanwendung, Reduzierung der Bundle-Größe um 40%</p>
                `,
	},
	training: {
		title: '📚 Weiterbildung & Zertifizierungen',
		content: `
                    <p><strong>Kontinuierliche Weiterentwicklung 2023</strong></p>
                    <p><strong>Zertifizierungen:</strong></p>
                    <ul>
                        <li><strong>AWS Certified Developer - Associate</strong> (März 2023)</li>
                        <li><strong>Certified Scrum Master (CSM)</strong> (Juni 2023)</li>
                        <li><strong>Google Cloud Platform Fundamentals</strong> (September 2023)</li>
                    </ul>
                    <p><strong>Kurse & Schulungen:</strong></p>
                    <ul>
                        <li>Advanced React Patterns & Performance</li>
                        <li>Node.js Microservices Architecture</li>
                        <li>Docker & Kubernetes für Entwickler</li>
                        <li>GraphQL & Apollo Implementation</li>
                    </ul>
                    <p><strong>Konferenzen:</strong> React Conf 2023, JS World Conference, AWS re:Invent 2023</p>
                `,
	},
	senior: {
		title: '⭐ Senior Developer - InnovateTech GmbH',
		content: `
                    <p><strong>InnovateTech GmbH</strong></p>
                    <p><strong>Position:</strong> Senior Full-Stack Developer & Technical Lead</p>
                    <p><strong>Zeitraum:</strong> Januar 2024 - Heute</p>
                    <p><strong>Führungsverantwortung:</strong></p>
                    <ul>
                        <li>Leitung eines 5-köpfigen Entwicklerteams</li>
                        <li>Technische Entscheidungen und Architektur-Design</li>
                        <li>Code Quality Standards und Best Practices</li>
                        <li>Sprint Planning und Backlog Management</li>
                    </ul>
                    <p><strong>Technische Projekte:</strong></p>
                    <ul>
                        <li>Migration zu Mikroservice-Architektur</li>
                        <li>Implementation einer CI/CD Pipeline</li>
                        <li>Performance-Optimierung (40% Verbesserung)</li>
                        <li>Einführung von TypeScript im gesamten Stack</li>
                    </ul>
                    <p><strong>Aktueller Tech-Stack:</strong> React, Node.js, TypeScript, PostgreSQL, Docker, AWS, GraphQL</p>
                `,
	},
	projects: {
		title: '🚀 Portfolio & Side Projects',
		content: `
                    <p><strong>Persönliche Projekte & Open Source</strong></p>
                    
                    <p><strong>1. E-Commerce Platform "ShopFlow"</strong></p>
                    <ul>
                        <li>Full-Stack Online-Shop mit React, Node.js und PostgreSQL</li>
                        <li>Über 10.000 registrierte Nutzer</li>
                        <li>Integrierte Zahlungssysteme (Stripe, PayPal)</li>
                        <li>GitHub: 500+ Stars</li>
                    </ul>
                    
                    <p><strong>2. AI-Powered Chat Bot "AssistantPro"</strong></p>
                    <ul>
                        <li>NLP-basierter Kundenservice-Bot</li>
                        <li>Reduziert Support-Anfragen um 60%</li>
                        <li>Integration in 15+ Unternehmen</li>
                    </ul>
                    
                    <p><strong>3. Mobile Fitness App "TrackFit"</strong></p>
                    <ul>
                        <li>React Native App für iOS und Android</li>
                        <li>Über 5.000 Downloads</li>
                        <li>4.8 Sterne im App Store</li>
                    </ul>
                    
                    <p><strong>Open Source Beiträge:</strong> Contributor bei React, Node.js Community</p>
                `,
	},
	future: {
		title: '🎯 Zukunftspläne & Karriereziele',
		content: `
                    <p><strong>Vision & Langfristige Ziele</strong></p>
                    
                    <p><strong>Kurzfristige Ziele (6-12 Monate):</strong></p>
                    <ul>
                        <li>AWS Solutions Architect Professional Zertifizierung</li>
                        <li>Aufbau des Teams auf 8-10 Entwickler</li>
                        <li>Launch der neuen Microservices-Architektur</li>
                        <li>Sprechen auf 2-3 Tech-Konferenzen</li>
                    </ul>
                    
                    <p><strong>Mittelfristige Ziele (1-3 Jahre):</strong></p>
                    <ul>
                        <li>CTO Position in einem innovativen Scale-up</li>
                        <li>Aufbau einer kompletten Engineering-Organisation</li>
                        <li>Entwicklung einer eigenen SaaS-Plattform</li>
                        <li>Mentoring-Programm für Junior Entwickler</li>
                    </ul>
                    
                    <p><strong>Langfristige Vision (3-5 Jahre):</strong></p>
                    <ul>
                        <li>Gründung eines eigenen Tech-Startups</li>
                        <li>Focus auf AI/ML-basierte B2B-Lösungen</li>
                        <li>Building Tech-Community in der Schweiz</li>
                        <li>Angel Investor für Tech-Startups</li>
                    </ul>
                `,
	},
};

// Animation setup
const nodes = document.querySelectorAll('.flow-node');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalBody = document.getElementById('modal-body');
const closeBtn = document.querySelector('.close');

// Skill bars animation on scroll
const animateSkillBars = () => {
	const skillBars = document.querySelectorAll('.skill-progress');
	skillBars.forEach((bar) => {
		const rect = bar.getBoundingClientRect();
		if (rect.top < window.innerHeight && rect.bottom > 0) {
			const width = bar.getAttribute('data-width');
			bar.style.width = width + '%';
		}
	});
};

// Initial skill bar animation
setTimeout(animateSkillBars, 1000);
window.addEventListener('scroll', animateSkillBars);

// Node click handlers
nodes.forEach((node) => {
	node.addEventListener('click', () => {
		const nodeId = node.id;
		if (nodeDetails[nodeId]) {
			modalTitle.innerHTML = nodeDetails[nodeId].title;
			modalBody.innerHTML = nodeDetails[nodeId].content;
			modal.classList.add('show');
			modal.style.display = 'block';

			// Add active state
			nodes.forEach((n) => n.classList.remove('active'));
			node.classList.add('active');
		}
	});
});

// Modal close handlers
closeBtn.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
	if (e.target === modal) {
		closeModal();
	}
});

function closeModal() {
	modal.classList.remove('show');
	setTimeout(() => {
		modal.style.display = 'none';
	}, 300);
	nodes.forEach((n) => n.classList.remove('active'));
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
	if (e.key === 'Escape') {
		closeModal();
	}
});

// Floating particles animation
function createParticle() {
	const particle = document.createElement('div');
	particle.className = 'particle';
	particle.style.left = Math.random() * 100 + '%';
	particle.style.animationDelay = Math.random() * 6 + 's';
	particle.style.animationDuration = Math.random() * 3 + 3 + 's';

	document.querySelector('.floating-particles').appendChild(particle);

	setTimeout(() => {
		particle.remove();
	}, 6000);
}

// Create particles periodically
setInterval(createParticle, 300);

document.querySelectorAll('.flow-step').forEach((step) => {
	observer.observe(step);
});

function toggleLebenslauf() {
	const cv = document.getElementById('lebenslauf');
	cv.classList.toggle('show');
}
document.addEventListener('DOMContentLoaded', function () {
	const backgrounds = document.querySelectorAll('.hero-bg');
	let currentIndex = 0;

	function switchBackground() {
		// Entferne active Klasse von allen Hintergründen
		backgrounds.forEach((bg) => bg.classList.remove('active'));

		// Setze nächsten Index
		currentIndex = (currentIndex + 1) % backgrounds.length;

		// Füge active Klasse zum nächsten Hintergrund hinzu
		backgrounds[currentIndex].classList.add('active');
	}

	// Wechsle alle 5 Sekunden das Hintergrundbild
	setInterval(switchBackground, 5000);
});

// Verbesserte Navbar Scroll-Funktion
document.addEventListener('DOMContentLoaded', function () {
	let lastScrollTop = 0;
	let scrollTimeout;
	const navbar = document.querySelector('.navbar');

	function handleNavbarScroll() {
		const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

		// Wenn ganz oben auf der Seite (erste 100px), immer anzeigen
		if (currentScrollTop <= 100) {
			navbar.style.transform = 'translateX(-50%) translateY(0)';
			navbar.style.opacity = '1';
			return;
		}

		// Nach unten scrollen - Navbar verstecken
		if (currentScrollTop > lastScrollTop && currentScrollTop > 100) {
			navbar.style.transform = 'translateX(-50%) translateY(-100%)';
			navbar.style.opacity = '0.7';
		}
		// Nach oben scrollen - Navbar anzeigen
		else if (currentScrollTop < lastScrollTop) {
			navbar.style.transform = 'translateX(-50%) translateY(0)';
			navbar.style.opacity = '1';
		}

		lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop; // Für Mobile Safari
	}

	// Throttled Scroll Event für bessere Performance
	function throttledScroll() {
		if (scrollTimeout) {
			return;
		}

		scrollTimeout = setTimeout(() => {
			handleNavbarScroll();
			scrollTimeout = null;
		}, 10);
	}

	// Scroll Event Listener
	window.addEventListener('scroll', throttledScroll, { passive: true });

	// Navbar anzeigen wenn Maus oben am Bildschirm ist
	document.addEventListener('mousemove', (e) => {
		if (e.clientY <= 80 && window.pageYOffset > 100) {
			navbar.style.transform = 'translateX(-50%) translateY(0)';
			navbar.style.opacity = '1';
		}
	});

	// Touch-Geräte: Navbar anzeigen bei Touch am oberen Bildschirmrand
	document.addEventListener('touchstart', (e) => {
		if (e.touches[0].clientY <= 80 && window.pageYOffset > 100) {
			navbar.style.transform = 'translateX(-50%) translateY(0)';
			navbar.style.opacity = '1';
		}
	});
});

// Alternative kompakte Version:
function initNavbarScroll() {
	let lastScroll = 0;
	const navbar = document.querySelector('.navbar');

	window.addEventListener(
		'scroll',
		() => {
			const currentScroll = window.pageYOffset;

			if (currentScroll <= 100) {
				// Oben der Seite - immer anzeigen
				navbar.style.transform = 'translateX(-50%) translateY(0)';
			} else if (currentScroll > lastScroll) {
				// Nach unten scrollen - verstecken
				navbar.style.transform = 'translateX(-50%) translateY(-100%)';
			} else {
				// Nach oben scrollen - anzeigen
				navbar.style.transform = 'translateX(-50%) translateY(0)';
			}

			lastScroll = currentScroll;
		},
		{ passive: true },
	);
}

// Funktion aufrufen
// initNavbarScroll();
