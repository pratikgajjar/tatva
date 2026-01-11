// ===================================
// Tatva Systems - Interactive Scripts
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    // Set dynamic year
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Smooth scroll for anchor links
    initSmoothScroll();
    
    // Intersection Observer for scroll animations
    initScrollAnimations();
    
    // Header background on scroll
    initHeaderScroll();
    
    // Parallax effect for hero visual
    initParallax();
});

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Intersection Observer for scroll-triggered animations
 */
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add animation class to sections
    const sections = document.querySelectorAll('.services, .about, .contact');
    sections.forEach(section => {
        section.classList.add('animate-on-scroll');
        observer.observe(section);
    });

    // Animate service cards individually
    const cards = document.querySelectorAll('.service-card, .about-link');
    cards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
}

/**
 * Header background effect on scroll
 */
function initHeaderScroll() {
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            header.style.background = 'rgba(10, 10, 15, 0.95)';
        } else {
            header.style.background = 'rgba(10, 10, 15, 0.8)';
        }

        lastScroll = currentScroll;
    }, { passive: true });
}

/**
 * Subtle parallax effect for hero elements
 */
function initParallax() {
    const heroVisual = document.querySelector('.hero-visual');
    const floatingCards = document.querySelectorAll('.floating-card');

    if (!heroVisual || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }

    window.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        
        const xPercent = (clientX / innerWidth - 0.5) * 2;
        const yPercent = (clientY / innerHeight - 0.5) * 2;

        floatingCards.forEach((card, index) => {
            const intensity = (index + 1) * 5;
            card.style.transform = `translate(${xPercent * intensity}px, ${yPercent * intensity}px)`;
        });
    }, { passive: true });
}

/**
 * Add ripple effect to buttons
 */
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        
        ripple.style.cssText = `
            position: absolute;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            pointer-events: none;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            left: ${e.clientX - rect.left}px;
            top: ${e.clientY - rect.top}px;
            width: 100px;
            height: 100px;
            margin-left: -50px;
            margin-top: -50px;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Console easter egg
console.log(`
%c त %c Tatva Systems
%c Building robust systems with elegant solutions

→ backend.how
→ github.com/pratikgajjar
→ pg@tatvasystems.com
`, 
'background: #e8b4b8; color: #0a0a0f; font-size: 24px; padding: 10px; border-radius: 4px;',
'color: #f5f5f7; font-size: 18px; font-weight: bold;',
'color: #a1a1aa; font-size: 12px;'
);
