/* ============================================================
   TRADING JOURNAL — INTERACTIONS & SCROLL ANIMATIONS
   ============================================================ */

(function () {
    'use strict';

    /* ---- Mobile Menu ---- */
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            const open = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', String(!open));
            navLinks.classList.toggle('active');
            document.body.style.overflow = !open ? 'hidden' : '';
        });

        navLinks.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.setAttribute('aria-expanded', 'false');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        document.addEventListener('click', e => {
            if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
                menuToggle.setAttribute('aria-expanded', 'false');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    /* ---- Smooth Scroll for # links ---- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 64,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* ---- Nav solid on scroll ---- */
    const nav = document.querySelector('.nav');
    function updateNav() {
        if (window.scrollY > 80) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }
    window.addEventListener('scroll', updateNav, { passive: true });
    updateNav();

    /* ---- Scroll Reveal (IntersectionObserver) ---- */
    const revealEls = document.querySelectorAll('.reveal:not(.hero .reveal)');

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        revealObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
        );
        revealEls.forEach(el => revealObserver.observe(el));
    } else {
        revealEls.forEach(el => el.classList.add('visible'));
    }

    /* ---- Parallax hero glows ---- */
    let ticking = false;
    function updateParallax() {
        const y = window.scrollY;
        const glows = document.querySelectorAll('.hero-glow');
        glows.forEach((g, i) => {
            const speed = (i + 1) * 0.35;
            g.style.transform = `translateY(${y * speed}px)`;
        });
        ticking = false;
    }
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }, { passive: true });

    /* ---- Page loaded class ---- */
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });
})();
