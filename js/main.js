(function () {
    'use strict';

    /* ==========================================================
       MOBILE MENU
       ========================================================== */
    function initMobileMenu() {
        const btn = document.getElementById('hamburgerBtn');
        const menu = document.getElementById('mobileMenu');
        const closeBtn = document.getElementById('mobileMenuClose');

        if (!btn || !menu) return;
        if (btn.dataset.menuBound === 'true') return;

        function openMenu() {
            menu.classList.add('is-open');
            menu.setAttribute('aria-hidden', 'false');
            btn.setAttribute('aria-expanded', 'true');
            btn.classList.add('is-active');
            document.body.style.overflow = 'hidden';
        }

        function closeMenu() {
            menu.classList.remove('is-open');
            menu.setAttribute('aria-hidden', 'true');
            btn.setAttribute('aria-expanded', 'false');
            btn.classList.remove('is-active');
            document.body.style.overflow = '';
        }

        btn.addEventListener('click', openMenu);
        if (closeBtn) closeBtn.addEventListener('click', closeMenu);
        menu.addEventListener('click', (e) => e.target === menu && closeMenu());

        document.querySelectorAll('.mobile-menu-link, .mobile-menu-cta').forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        btn.dataset.menuBound = 'true';
    }

    /* ==========================================================
       MODAL SYSTEM
       ========================================================== */
    function initModal() {
        const modalOverlay = document.getElementById('modalOverlay');
        const modalClose = document.getElementById('modalClose');
        const btnGoToForm = document.getElementById('btnGoToForm');
        const modalStep1 = document.getElementById('modalStep1');
        const modalStep2 = document.getElementById('modalStep2');
        const leadForm = document.getElementById('leadForm');

        if (!modalOverlay) return;

        function openModal(step) {
            modalOverlay.classList.add('is-active');
            document.body.style.overflow = 'hidden';
            
            if (step === 1) {
                modalStep1?.classList.add('is-active');
                modalStep2?.classList.remove('is-active');
            } else {
                modalStep1?.classList.remove('is-active');
                modalStep2?.classList.add('is-active');
            }
        }

        function closeModal() {
            modalOverlay.classList.remove('is-active');
            document.body.style.overflow = '';
        }

        document.querySelectorAll('.js-open-modal').forEach(btn => {
            if (btn.dataset.modalBound === 'true') return;
            btn.addEventListener('click', () => openModal(1));
            btn.dataset.modalBound = 'true';
        });

        document.querySelectorAll('.js-open-form').forEach(btn => {
            if (btn.dataset.modalBound === 'true') return;
            btn.addEventListener('click', () => openModal(2));
            btn.dataset.modalBound = 'true';
        });

        if (modalClose && modalClose.dataset.modalBound !== 'true') {
            modalClose.addEventListener('click', closeModal);
            modalClose.dataset.modalBound = 'true';
        }

        if (modalOverlay.dataset.modalBound !== 'true') {
            modalOverlay.addEventListener('click', (e) => e.target === modalOverlay && closeModal());
            modalOverlay.dataset.modalBound = 'true';
        }
        
        if (btnGoToForm) {
            if (btnGoToForm.dataset.modalBound !== 'true') {
                btnGoToForm.addEventListener('click', () => {
                    modalStep1?.classList.remove('is-active');
                    modalStep2?.classList.add('is-active');
                });
                btnGoToForm.dataset.modalBound = 'true';
            }
        }

        if (leadForm) {
            if (leadForm.dataset.modalBound !== 'true') {
                leadForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const btn = leadForm.querySelector('button[type="submit"]');
                    const originalText = btn.innerText;
                    
                    btn.innerText = 'Enviando...';
                    btn.disabled = true;

                    setTimeout(() => {
                        btn.innerText = 'Sucesso! Entraremos em contato.';
                        btn.style.background = '#2fb344';
                        
                        setTimeout(() => {
                            closeModal();
                            setTimeout(() => {
                                btn.innerText = originalText;
                                btn.style.background = '';
                                btn.disabled = false;
                            }, 500);
                        }, 2000);
                    }, 1500);
                });
                leadForm.dataset.modalBound = 'true';
            }
        }
    }

    /* ==========================================================
       PAGE ANIMATIONS (GSAP)
       ========================================================== */
    function initPageAnimations() {
        if (typeof gsap === 'undefined') return;

        gsap.registerPlugin(ScrollTrigger);

        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        const footerContent = document.querySelector('.footer-content');
        if (footerContent) gsap.set(footerContent, { clearProps: 'all' });

        const isMobile = window.innerWidth <= 768;

        /* --- INDEX PAGE ANIMATIONS --- */
        const heroCinematic = document.querySelector('.hero-cinematic');
        if (heroCinematic) {
            gsap.to('.hero-cinematic-logo-main', { 
                opacity: 1, y: 0, duration: 1.5, ease: 'power4.out', delay: 0.3 
            });
            gsap.to('.hero-cinematic-subtitle', { 
                opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 0.6 
            });
        }

        if (!isMobile && heroCinematic) {
            // Portaria Section
            const section = document.querySelector('.portaria-tagline-section');
            const logo = document.querySelector('.portaria-logo');
            const words = document.querySelectorAll('.portaria-word');
            
            if (section && logo && words.length) {
                gsap.timeline({ 
                    scrollTrigger: { 
                        trigger: section, 
                        start: 'top 78%', 
                        end: 'top 35%', 
                        scrub: false 
                    } 
                })
                .fromTo(logo, 
                    { opacity: 0, y: 80, scale: 0.7, filter: 'blur(12px)' }, 
                    { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out' }
                )
                .fromTo(words, 
                    { opacity: 0, y: 70, filter: 'blur(12px)' }, 
                    { opacity: 1, y: 0, filter: 'blur(0px)', stagger: 0.08, duration: 1, ease: 'power2.out' }, 
                    '-=0.8'
                );
            }

            // Hero Statement
            const heroStatement = document.querySelector('.hero-statement');
            if (heroStatement) {
                const heading = document.querySelector('.hero-statement-heading');
                const ctas = document.querySelector('.hero-statement-ctas');
                const stats = document.querySelectorAll('.hero-stat');
                
                if (heading) {
                    gsap.from(heading, { 
                        opacity: 0, y: 50, duration: 2.4, 
                        scrollTrigger: { trigger: heroStatement, start: 'top 78%', toggleActions: 'play none none reverse' } 
                    });
                }
                if (ctas) {
                    gsap.from(ctas, { 
                        opacity: 0, y: 35, duration: 2.2, 
                        scrollTrigger: { trigger: heroStatement, start: 'top 75%', toggleActions: 'play none none reverse' } 
                    });
                }
                if (stats.length) {
                    gsap.from(stats, { 
                        opacity: 0, y: 45, duration: 2, stagger: 0.2, 
                        scrollTrigger: { trigger: heroStatement, start: 'top 70%', toggleActions: 'play none none reverse' } 
                    });
                }
            }

            // Boxes Software
            const boxesSection = document.querySelector('.boxes-software-section');
            if (boxesSection) {
                const boxIcons = document.querySelectorAll('.box-icon-inner');
                const boxesCopy = document.querySelector('.boxes-software-copy');
                
                if (boxIcons.length) {
                    gsap.from(boxIcons, { 
                        opacity: 0, y: 50, duration: 2.2, stagger: 0.2, 
                        scrollTrigger: { trigger: boxesSection, start: 'top 75%', toggleActions: 'play none none reverse' } 
                    });
                }
                if (boxesCopy) {
                    gsap.from(boxesCopy, { 
                        opacity: 0, x: 36, duration: 2.2, 
                        scrollTrigger: { trigger: boxesSection, start: 'top 72%', toggleActions: 'play none none reverse' } 
                    });
                }
            }

            // Footer parallax
            if (document.querySelector('.footer-sticky')) {
                gsap.fromTo('.footer-content',
                    { y: 150, opacity: 0, scale: 0.9 },
                    { 
                        y: 0, opacity: 1, scale: 1, 
                        scrollTrigger: { 
                            trigger: '.footer-sticky', 
                            start: 'top bottom', 
                            end: 'bottom bottom', 
                            scrub: true 
                        } 
                    }
                );
            }
        }

        /* --- ABOUT PAGE ANIMATIONS --- */
        const aboutHero = document.querySelector('.about-hero');
        if (aboutHero) {
            gsap.from('.about-header-reveal', { 
                opacity: 0, y: 40, duration: 1, ease: 'power3.out' 
            });
            gsap.from('.video-container-wrapper', { 
                opacity: 0, scale: 0.95, duration: 1.2, delay: 0.3, ease: 'power2.out' 
            });

            // Swiper Carousel
            if (document.querySelector('.features-swiper') && typeof Swiper !== 'undefined') {
                new Swiper('.features-swiper', {
                    slidesPerView: 1.2,
                    spaceBetween: 24,
                    grabCursor: true,
                    navigation: { 
                        nextEl: '.nav-btn.next', 
                        prevEl: '.nav-btn.prev' 
                    },
                    breakpoints: {
                        768: { slidesPerView: 2, spaceBetween: 32 },
                        1024: { slidesPerView: 3, spaceBetween: 32 }
                    }
                });
            }
        }
    }

    /* ==========================================================
       PRELOADER
       ========================================================== */
    function initPreloader() {
        const body = document.body;
        let isReleased = false;

        function releasePreloader() {
            if (isReleased) return;
            isReleased = true;

            const preloader = document.getElementById('preloader');
            if (preloader) preloader.classList.add('preloader--done');
            initPageAnimations();
            
            setTimeout(() => {
                const activePreloader = document.getElementById('preloader');
                if (activePreloader) activePreloader.remove();
                body.classList.remove('preloading');
            }, 800);
        }

        const fallbackTimer = setTimeout(releasePreloader, 4000);

        window.addEventListener('load', () => {
            clearTimeout(fallbackTimer);
            setTimeout(releasePreloader, 350);
        }, { once: true });

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                setTimeout(releasePreloader, 1200);
            }, { once: true });
        } else {
            setTimeout(releasePreloader, 1200);
        }
    }

    /* ==========================================================
       SWUP INITIALIZATION
       ========================================================== */
    function initSwup() {
        if (typeof Swup === 'undefined') {
            return;
        }

        const swup = new Swup({
            containers: ['#swup'],
            animateHistoryBrowsing: true,
            animationSelector: '[class*="transition-"]',
            duration: 500
        });

        swup.hooks.on('content:replace', () => {
            window.scrollTo(0, 0);
            
            const menu = document.getElementById('mobileMenu');
            const btn = document.getElementById('hamburgerBtn');
            
            if (menu?.classList.contains('is-open')) {
                menu.classList.remove('is-open');
                btn?.classList.remove('is-active');
                document.body.style.overflow = '';
            }
            
            initMobileMenu();
            initModal();
            
            initPageAnimations();
        });

        // Pre-cache the hero image so it's already in browser cache
        // when the user navigates back to Home
        const HERO_IMG_SRC = 'assets/hero/hero-bg.jpeg';
        let heroImgCached = false;

        function preCacheHeroImage() {
            if (heroImgCached) return;
            const img = new Image();
            img.src = HERO_IMG_SRC;
            img.onload = () => { heroImgCached = true; };
        }

        // Pre-cache immediately on every page (will use cache if already loaded)
        preCacheHeroImage();

        // Also pre-cache after any Swup navigation
        swup.hooks.on('content:replace', preCacheHeroImage);

        // Wait for critical hero image to be ready before fade-in
        swup.hooks.on('animation:in:await', async () => {
            const heroImg = document.querySelector('.hero-cinematic-img');
            if (!heroImg) return;

            // Wait for the image to fully load (or use cache)
            if (!heroImg.complete || heroImg.naturalWidth === 0) {
                await Promise.race([
                    new Promise(resolve => {
                        heroImg.addEventListener('load', resolve, { once: true });
                        heroImg.addEventListener('error', resolve, { once: true });
                    }),
                    new Promise(resolve => setTimeout(resolve, 2000))
                ]);
            }

            // Ensure the image is decoded and ready to paint
            if (heroImg.decode) {
                try { await heroImg.decode(); } catch (e) { /* ignore */ }
            }

            // Extra frame wait so the browser can composite the decoded image
            await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
        });
    }

    /* ==========================================================
       BOOTSTRAP
       ========================================================== */
    function bootstrap() {
        initMobileMenu();
        initModal();
        initSwup();
        initPreloader();
    }

    // Components.js injects elements synchronously when the script is at
    // the bottom of <body>.  If, for any reason, the DOM is not ready yet
    // (e.g. script loaded with defer), wait for DOMContentLoaded.
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', bootstrap);
    } else {
        bootstrap();
    }

})();