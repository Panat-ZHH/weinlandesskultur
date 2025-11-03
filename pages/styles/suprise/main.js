/**
 * Restaurant Hirschen V2 - Advanced JavaScript
 * Full interactivity, animations, and functionality
 */

document.body.style.opacity = '1';

// Initialize everything on load
document.addEventListener('DOMContentLoaded', function() {
    initializeHeroSwiper();
    initializeNavigation();
    initializeMenuTabs();
    initializeGalleryFilters();
    initializeBookingForm();
    initializeLightbox();
    initializeHamburger();
    initializeScrollAnimations();
    initializeInteractions();
    initializeLazyLoading();
    setupMenuSearch();
    initializeHideableHeader();
});

/**
 * Hide Header on Scroll Down, Show on Scroll Up
 */
function initializeHideableHeader() {
    const header = document.querySelector('.luxury-header');
    if (!header) return;
    
    let lastScrollY = 0;
    let scrollDirection = 'down';
    let scrollTimer;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Determine scroll direction
        if (currentScrollY > lastScrollY) {
            scrollDirection = 'down';
        } else {
            scrollDirection = 'up';
        }
        
        // Always show header at top
        if (currentScrollY < 50) {
            header.classList.remove('hidden');
        } else if (scrollDirection === 'down') {
            header.classList.add('hidden');
        } else if (scrollDirection === 'up') {
            header.classList.remove('hidden');
        }
        
        lastScrollY = currentScrollY;
    });
}

/**
 * Hero Swiper Carousel
 */
function initializeHeroSwiper() {
    const heroSwiper = document.querySelector('.heroSwiper');
    if (heroSwiper && typeof Swiper !== 'undefined') {
        const swiper = new Swiper('.heroSwiper', {
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            effect: 'fade',
            fadeEffect: {
                crossFade: true,
            },
            keyboard: {
                enabled: true,
            },
        });
    }
}

/**
 * Navigation - Smooth Scrolling & Active Links
 */
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('[id]');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            
            if (targetId && targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    // Update active class
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                    
                    // Close mobile menu
                    const hamburger = document.getElementById('hamburger');
                    const nav = document.querySelector('.main-nav');
                    if (nav && nav.classList.contains('active')) {
                        hamburger.classList.remove('active');
                        nav.classList.remove('active');
                    }
                    
                    // Show header when navigating
                    const header = document.querySelector('.luxury-header');
                    if (header) {
                        header.classList.remove('hidden');
                    }
                    
                    // Scroll
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Update active link on scroll
    window.addEventListener('scroll', debounce(() => {
        updateActiveNavigation();
    }, 50));
}

function updateActiveNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

/**
 * Hamburger Menu
 */
function initializeHamburger() {
    const hamburger = document.getElementById('hamburger');
    const nav = document.querySelector('.main-nav');
    
    if (!hamburger || !nav) return;
    
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        hamburger.classList.toggle('active');
        nav.classList.toggle('active');
        
        // Animate hamburger
        const spans = hamburger.querySelectorAll('span');
        if (hamburger.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(15px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-15px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.main-nav') && !e.target.closest('.hamburger')) {
            if (nav.classList.contains('active')) {
                hamburger.classList.remove('active');
                nav.classList.remove('active');
                const spans = hamburger.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        }
    });
}

/**
 * Menu Tab Switching - CORE FUNCTION
 */
function initializeMenuTabs() {
    const tabs = document.querySelectorAll('.menu-tab');
    const contents = document.querySelectorAll('.menu-tab-content');
    
    if (tabs.length === 0 || contents.length === 0) {
        console.warn('Menu tabs or contents not found');
        return;
    }
    
    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            const category = tab.getAttribute('data-category');
            
            if (!category) return;
            
            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Update active content
            contents.forEach(content => {
                content.classList.remove('active');
            });
            
            // Find and activate the correct content
            const activeContent = document.querySelector(`.menu-tab-content[data-category="${category}"]`);
            if (activeContent) {
                activeContent.classList.add('active');
                
                // Smooth scroll to menu
                const menuSection = document.querySelector('.menu-section');
                if (menuSection) {
                    menuSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Set first tab as active
    if (tabs.length > 0) {
        tabs[0].classList.add('active');
    }
    
    // Make sure first content is visible
    if (contents.length > 0) {
        contents[0].classList.add('active');
    }
}

/**
 * Gallery Filtering
 */
function initializeGalleryFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (filterBtns.length === 0) return;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter gallery items
            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-filter') === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Set first filter as active
    if (filterBtns.length > 0) {
        filterBtns[0].classList.add('active');
    }
}

/**
 * Lightbox for Images
 */
function initializeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;
    
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const lightboxImage = lightbox.querySelector('.lightbox-image');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeLightbox);
    }
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Keyboard support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });
    
    // Add click handlers to gallery images
    document.querySelectorAll('.gallery-image').forEach(img => {
        img.addEventListener('click', function() {
            openLightbox(this);
        });
    });
}

function openLightbox(element) {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;
    
    const lightboxImage = lightbox.querySelector('.lightbox-image');
    const img = element.querySelector('img');
    
    if (img && lightboxImage) {
        lightboxImage.src = img.src;
        lightbox.classList.add('active');
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
    }
}

/**
 * Booking Form
 */
function initializeBookingForm() {
    const form = document.getElementById('bookingForm');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Validate form
            if (!data.name || !data.email || !data.phone || !data.date || !data.time || !data.guests) {
                showNotification('Bitte füllen Sie alle erforderlichen Felder aus.', 'error');
                return;
            }
            
            // Show success message
            showNotification('Reservierungsanfrage erhalten! Wir melden uns in Kürze.', 'success');
            
            // Reset form
            form.reset();
            
            // Here you would send data to server
            console.log('Booking data:', data);
        });
    }
}

/**
 * Scroll Animations
 */
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                entry.target.style.animation = `fadeIn ${0.6 + index * 0.1}s ease-out forwards`;
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements
    document.querySelectorAll('.feature-card, .testimonial-card, .menu-item-card, .gallery-item').forEach((el) => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

/**
 * General Interactions
 */
function initializeInteractions() {
    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add hover effects to interactive elements
    addHoverEffects();
    
    // Handle window resize
    window.addEventListener('resize', debounce(() => {
        updateResponsive();
    }, 250));
}

function addHoverEffects() {
    const interactiveElements = document.querySelectorAll('.cta-button, .submit-btn, .menu-tab, .filter-btn, .view-full-menu, .view-wine-list');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', function() {
            this.style.cursor = 'pointer';
        });
    });
}

function updateResponsive() {
    if (window.innerWidth > 768) {
        const hamburger = document.getElementById('hamburger');
        const nav = document.querySelector('.main-nav');
        if (hamburger && nav) {
            hamburger.classList.remove('active');
            nav.classList.remove('active');
        }
    }
}

/**
 * Utility Functions
 */

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function showNotification(message, type = 'info', duration = 3000) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    const bgColor = type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : '#005167';
    const borderColor = type === 'success' ? '#45a049' : type === 'error' ? '#da190b' : '#004052';
    
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        padding: 18px 28px;
        background-color: ${bgColor};
        color: white;
        border-left: 4px solid ${borderColor};
        z-index: 9999;
        animation: slideInUp 0.4s ease-out;
        font-weight: 600;
        font-family: 'Montserrat', sans-serif;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        border-radius: 4px;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideInUp 0.4s ease-out reverse';
        setTimeout(() => notification.remove(), 400);
    }, duration);
}

/**
 * Advanced Features
 */

// Image lazy loading
function initializeLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserverOptions = {
            threshold: 0,
            rootMargin: '50px'
        };
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                }
            });
        }, imageObserverOptions);
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Analytics tracking (optional)
function trackEvent(eventName, eventData = {}) {
    console.log(`Event: ${eventName}`, eventData);
    // Send to analytics service here
}

// Menu search functionality
function setupMenuSearch() {
    const searchInput = document.querySelector('.menu-search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            const items = document.querySelectorAll('.menu-item-card');
            
            items.forEach(item => {
                const text = item.textContent.toLowerCase();
                item.style.display = text.includes(term) ? 'block' : 'none';
            });
        });
    }
}

/**
 * Export API
 */
window.HirschemApp = {
    openLightbox,
    closeLightbox,
    showNotification,
    debounce,
    trackEvent,
    initializeMenuTabs
};

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl+K for menu search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const menuSection = document.querySelector('.menu-section');
        if (menuSection) {
            menuSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    // Ctrl+R for reservations
    if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
        e.preventDefault();
        const bookingSection = document.querySelector('.booking-section');
        if (bookingSection) {
            bookingSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

console.log('%c🦌 Restaurant Hirschen V2', 'font-size: 20px; color: #005167; font-weight: bold;');
console.log('%cInteraktive moderne Website', 'font-size: 14px; color: #913535;');
console.log('%cBenutze Tastenkombinationen: Ctrl+K (Menü) · Ctrl+R (Reservierung)', 'font-size: 12px; color: #666;');
console.log('%c✓ Header Hide on Scroll aktiviert', 'font-size: 12px; color: #4caf50;');