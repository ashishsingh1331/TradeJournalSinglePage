// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed nav
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all animated elements
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.feature-card, .pricing-card, .testimonial-card');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
});

// Parallax effect for hero background orbs
let ticking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;
    const orbs = document.querySelectorAll('.gradient-orb');
    
    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 0.5;
        const yPos = -(scrolled * speed);
        orb.style.transform = `translateY(${yPos}px)`;
    });
    
    ticking = false;
}

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
    }
}

window.addEventListener('scroll', requestTick);

// Navbar background on scroll
const nav = document.querySelector('.nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        nav.style.background = 'rgba(10, 10, 15, 0.95)';
        nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        nav.style.background = 'rgba(10, 10, 15, 0.8)';
        nav.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Add hover effect to pricing cards
document.querySelectorAll('.pricing-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Dynamic testimonial updates (placeholder for YouTube comments integration)
// You can replace this with actual YouTube API integration later
function updateTestimonials(comments) {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    comments.forEach((comment, index) => {
        if (testimonialCards[index]) {
            const textEl = testimonialCards[index].querySelector('.testimonial-text');
            const nameEl = testimonialCards[index].querySelector('.author-name');
            const avatarEl = testimonialCards[index].querySelector('.author-avatar');
            
            if (textEl) textEl.textContent = `"${comment.text}"`;
            if (nameEl) nameEl.textContent = comment.author || 'Trader';
            if (avatarEl) avatarEl.textContent = (comment.author || 'T')[0].toUpperCase();
        }
    });
}

// Example: You can call this function with actual YouTube comments
// updateTestimonials([
//     { text: "Amazing app! The CSV import is seamless.", author: "John Doe" },
//     { text: "Best trading journal I've used. Highly recommend!", author: "Jane Smith" },
//     { text: "The analytics are incredibly detailed.", author: "Mike Johnson" }
// ]);

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Smooth number counter animation for stats
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Animate stats when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            const statNumber = entry.target.querySelector('.stat-number');
            if (statNumber && statNumber.textContent === '100%') {
                // For percentage, just show it
                statNumber.style.opacity = '1';
            } else if (statNumber && !isNaN(parseInt(statNumber.textContent))) {
                const endValue = parseInt(statNumber.textContent);
                statNumber.textContent = '0';
                animateValue(statNumber, 0, endValue, 2000);
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item').forEach(stat => {
    statsObserver.observe(stat);
});