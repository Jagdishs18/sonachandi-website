/* ========================================
   SONACHANDI - Main JavaScript
   Luxury Interactions & Scroll Effects
   ======================================== */

// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    
    // ---------- CUSTOM CURSOR (Desktop only) ----------
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    if (cursorDot && cursorOutline && window.innerWidth > 768) {
        window.addEventListener('mousemove', (e) => {
            cursorDot.style.transform = `translate(${e.clientX - 3}px, ${e.clientY - 3}px)`;
            cursorOutline.style.transform = `translate(${e.clientX - 20}px, ${e.clientY - 20}px)`;
        });
        
        // Hover effect on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .btn-primary, .btn-outline, .btn-small, .collection-card, .arrival-card');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.style.transform = `scale(1.5) translate(-50%, -50%)`;
                cursorOutline.style.borderColor = '#D4AF37';
            });
            el.addEventListener('mouseleave', () => {
                cursorOutline.style.transform = `scale(1) translate(-50%, -50%)`;
                cursorOutline.style.borderColor = 'rgba(212, 175, 55, 0.5)';
            });
        });
    }
    
    // ---------- STICKY NAVBAR + ACTIVE MENU HIGHLIGHT ----------
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function updateNavbar() {
        // Add scrolled class
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Active menu highlighting based on scroll position
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionBottom = sectionTop + section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href').substring(1);
            if (href === current) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateNavbar);
    updateNavbar(); // Initial call
    
    // ---------- INTERSECTION OBSERVER (Reveal Animations) ----------
    const revealElements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up');
    
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Optional: unobserve after reveal for performance
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    revealElements.forEach(el => observer.observe(el));
    
    // ---------- MOBILE HAMBURGER MENU ----------
    const hamburger = document.getElementById('hamburger');
    const navLinksDiv = document.getElementById('navLinks');
    
    if (hamburger && navLinksDiv) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinksDiv.classList.toggle('active');
            // Prevent body scroll when menu is open
            if (navLinksDiv.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Close mobile menu when a nav link is clicked
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinksDiv.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
    
    // ---------- SMOOTH SCROLLING FOR NAVIGATION LINKS ----------
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ---------- SMOOTH SCROLL FOR OTHER ANCHOR LINKS ----------
    const allAnchors = document.querySelectorAll('a[href^="#"]:not(.nav-link)');
    allAnchors.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const hash = this.getAttribute('href');
            if (hash === "#" || hash === "") return;
            
            const target = document.querySelector(hash);
            if (target) {
                e.preventDefault();
                const offset = target.offsetTop - 80;
                window.scrollTo({
                    top: offset,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ---------- PARALLAX EFFECT ON HERO (Subtle) ----------
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            if (scrolled < window.innerHeight) {
                heroBg.style.transform = `scale(1.05) translateY(${scrolled * 0.1}px)`;
            }
        });
    }
    
    // ---------- PRELOAD IMAGES (Prevent layout shift) ----------
    const allImages = document.querySelectorAll('img');
    allImages.forEach(img => {
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
        if (img.complete) {
            img.style.opacity = '1';
        } else {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.4s ease';
        }
    });
    
    // ---------- ADD SUBTLE SCROLL PROGRESS BAR (Optional Luxury Touch) ----------
    const progressBar = document.createElement('div');
    progressBar.style.position = 'fixed';
    progressBar.style.top = '0';
    progressBar.style.left = '0';
    progressBar.style.width = '0%';
    progressBar.style.height = '2px';
    progressBar.style.backgroundColor = '#D4AF37';
    progressBar.style.zIndex = '10000';
    progressBar.style.transition = 'width 0.1s ease';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
    
    // ---------- PREVENT RIGHT CLICK ON IMAGES (Brand Protection) ----------
    const allSiteImages = document.querySelectorAll('img');
    allSiteImages.forEach(img => {
        img.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });
        img.addEventListener('dragstart', (e) => {
            e.preventDefault();
        });
    });
    
    // ---------- ADD LOADING CLASS REMOVAL ----------
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        // Fade in all images
        document.querySelectorAll('img').forEach(img => {
            img.style.opacity = '1';
        });
    });
    
    // ---------- HOVER SOUND EFFECT (Optional - commented by default) ----------
    // Uncomment if you want subtle hover sound for luxury buttons
    /*
    const hoverSound = new Audio('https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3');
    hoverSound.volume = 0.1;
    document.querySelectorAll('.btn-primary, .btn-outline').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            hoverSound.currentTime = 0;
            hoverSound.play().catch(e => console.log('Audio not supported'));
        });
    });
    */
    
    // ---------- DYNAMIC YEAR IN FOOTER ----------
    const footerBottom = document.querySelector('.footer-bottom p');
    if (footerBottom) {
        const currentYear = new Date().getFullYear();
        footerBottom.innerHTML = footerBottom.innerHTML.replace('2025', currentYear);
    }
    
    // Console log for brand identity
    console.log('✨ SONACHANDI — Eternal Elegance in Gold & Silver ✨');
});