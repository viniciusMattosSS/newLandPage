(function () {
    /* ==========================================================
       MOBILE MENU
       ========================================================== */
    function initMobileMenu() {
        var btn = document.getElementById('hamburgerBtn');
        var menu = document.getElementById('mobileMenu');
        var closeBtn = document.getElementById('mobileMenuClose');

        function openMenu() {
            if (!menu || !btn) return;
            menu.classList.add('is-open');
            menu.setAttribute('aria-hidden', 'false');
            btn.setAttribute('aria-expanded', 'true');
            btn.classList.add('is-active');
            document.body.style.overflow = 'hidden';
        }

        function closeMenu() {
            if (!menu || !btn) return;
            menu.classList.remove('is-open');
            menu.setAttribute('aria-hidden', 'true');
            btn.setAttribute('aria-expanded', 'false');
            btn.classList.remove('is-active');
            document.body.style.overflow = '';
        }

        if (btn) btn.addEventListener('click', openMenu);
        if (closeBtn) closeBtn.addEventListener('click', closeMenu);
        if (menu) menu.addEventListener('click', function (e) { if (e.target === menu) closeMenu(); });

        document.querySelectorAll('.mobile-menu-link, .mobile-menu-cta').forEach(function (l) {
            l.addEventListener('click', closeMenu);
        });
    }

    /* ==========================================================
       MODAL SYSTEM
       ========================================================== */
    function initModal() {
        var modalOverlay = document.getElementById('modalOverlay');
        var modalClose = document.getElementById('modalClose');
        var btnGoToForm = document.getElementById('btnGoToForm');
        var modalStep1 = document.getElementById('modalStep1');
        var modalStep2 = document.getElementById('modalStep2');
        var leadForm = document.getElementById('leadForm');

        function openModal(step) {
            if (!modalOverlay) return;
            modalOverlay.classList.add('is-active');
            document.body.style.overflow = 'hidden';
            if (step === 1) {
                modalStep1.classList.add('is-active');
                modalStep2.classList.remove('is-active');
            } else {
                modalStep1.classList.remove('is-active');
                modalStep2.classList.add('is-active');
            }
        }

        function closeModal() {
            if (!modalOverlay) return;
            modalOverlay.classList.remove('is-active');
            document.body.style.overflow = '';
        }

        document.querySelectorAll('.js-open-modal').forEach(function (b) {
            b.addEventListener('click', function () { openModal(1); });
        });
        document.querySelectorAll('.js-open-form').forEach(function (b) {
            b.addEventListener('click', function () { openModal(2); });
        });

        if (modalClose) modalClose.addEventListener('click', closeModal);
        if (modalOverlay) modalOverlay.addEventListener('click', function (e) { if (e.target === modalOverlay) closeModal(); });
        if (btnGoToForm) btnGoToForm.addEventListener('click', function () {
            modalStep1.classList.remove('is-active');
            modalStep2.classList.add('is-active');
        });

        if (leadForm) leadForm.addEventListener('submit', function (e) {
            e.preventDefault();
            var btn = leadForm.querySelector('button[type="submit"]');
            var originalText = btn.innerText;
            btn.innerText = 'Enviando...';
            btn.disabled = true;

            setTimeout(function () {
                btn.innerText = 'Sucesso! Entraremos em contato.';
                btn.style.background = '#2fb344';
                setTimeout(function () {
                    closeModal();
                    // Reset button for next time
                    setTimeout(function () {
                        btn.innerText = originalText;
                        btn.style.background = '';
                        btn.disabled = false;
                    }, 500);
                }, 2000);
            }, 1500);
        });
    }

    /* ==========================================================
       PAGE ANIMATIONS (GSAP)
       ========================================================== */
    function initPageAnimations() {
        if (typeof gsap === 'undefined') return;

        gsap.registerPlugin(ScrollTrigger);

        // Kill old ScrollTriggers and clear styles
        ScrollTrigger.getAll().forEach(function (t) { t.kill(); });
        var fc = document.querySelector('.footer-content');
        if (fc) gsap.set(fc, { clearProps: 'all' });

        /* --- INDEX PAGE ANIMATIONS --- */
        if (document.querySelector('.hero-cinematic')) {
            gsap.to('.hero-cinematic-logo-main', { opacity: 1, y: 0, duration: 1.5, ease: 'power4.out', delay: 0.3 });
            gsap.to('.hero-cinematic-subtitle', { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 0.6 });
            gsap.to('.hero-cinematic-img', {
                yPercent: 15,
                ease: 'none',
                scrollTrigger: { trigger: '.hero-cinematic', start: 'top top', end: 'bottom top', scrub: 1.5 }
            });

            // Staggered Reveals
            var section = document.querySelector('.portaria-tagline-section');
            var logo = document.querySelector('.portaria-logo');
            var words = document.querySelectorAll('.portaria-word');
            if (section && logo && words.length) {
                gsap.timeline({ scrollTrigger: { trigger: section, start: 'top 78%', end: 'top 35%', scrub: 2 } })
                    .fromTo(logo, { opacity: 0, y: 80, scale: 0.7, filter: 'blur(12px)' }, { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', ease: 'power3.out' })
                    .fromTo(words, { opacity: 0, y: 70, filter: 'blur(12px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', stagger: 0.06, ease: 'power2.out' }, '-=0.4');
            }

            // Hero Statement
            var ss = document.querySelector('.hero-statement');
            if (ss) {
                var sh = document.querySelector('.hero-statement-heading');
                var sc = document.querySelector('.hero-statement-ctas');
                var si = document.querySelectorAll('.hero-stat');
                if (sh) gsap.from(sh, { opacity: 0, y: 50, duration: 1, scrollTrigger: { trigger: ss, start: 'top 78%', toggleActions: 'play none none reverse' } });
                if (sc) gsap.from(sc, { opacity: 0, y: 35, duration: 0.9, scrollTrigger: { trigger: ss, start: 'top 75%', toggleActions: 'play none none reverse' } });
                if (si.length) gsap.from(si, { opacity: 0, y: 45, duration: 0.85, stagger: 0.12, scrollTrigger: { trigger: ss, start: 'top 70%', toggleActions: 'play none none reverse' } });
            }

            // Boxes Software
            var bs = document.querySelector('.boxes-software-section');
            if (bs) {
                var bi = document.querySelectorAll('.box-icon-inner');
                var bc = document.querySelector('.boxes-software-copy');
                if (bi.length) gsap.from(bi, { opacity: 0, y: 50, duration: 0.9, stagger: 0.1, scrollTrigger: { trigger: bs, start: 'top 75%', toggleActions: 'play none none reverse' } });
                if (bc) gsap.from(bc, { opacity: 0, x: 36, duration: 0.9, scrollTrigger: { trigger: bs, start: 'top 72%', toggleActions: 'play none none reverse' } });
            }
        }

        /* --- ABOUT PAGE ANIMATIONS --- */
        if (document.querySelector('.about-hero')) {
            gsap.from('.about-header-reveal', { opacity: 0, y: 40, duration: 1, ease: 'power3.out' });
            gsap.from('.video-container-wrapper', { opacity: 0, scale: 0.95, duration: 1.2, delay: 0.3, ease: 'power2.out' });

            // Swiper Carousel
            if (document.querySelector('.features-swiper') && typeof Swiper !== 'undefined') {
                new Swiper('.features-swiper', {
                    slidesPerView: 1.2,
                    spaceBetween: 24,
                    grabCursor: true,
                    navigation: { nextEl: '.nav-btn.next', prevEl: '.nav-btn.prev' },
                    breakpoints: {
                        768: { slidesPerView: 2, spaceBetween: 32 },
                        1024: { slidesPerView: 3, spaceBetween: 32 }
                    }
                });
            }
        }

        /* --- FOOTER PARALLAX --- */
        if (document.querySelector('.footer-sticky')) {
            gsap.fromTo('.footer-content',
                { y: 150, opacity: 0, scale: 0.9 },
                { y: 0, opacity: 1, scale: 1, scrollTrigger: { trigger: '.footer-sticky', start: 'top bottom', end: 'bottom bottom', scrub: true } }
            );
        }

        ScrollTrigger.refresh();
    }

    /* ==========================================================
       PRELOADER
       ========================================================== */
    function initPreloader() {
        var preloader = document.getElementById('preloader');
        var body = document.body;
        function onLoad() {
            if (preloader) preloader.classList.add('preloader--done');
            initPageAnimations();
            setTimeout(function () {
                if (preloader) preloader.remove();
                body.classList.remove('preloading');
            }, 1000);
        }

        if (document.readyState === 'complete') {
            setTimeout(onLoad, 2000);
        } else {
            window.addEventListener('load', function () {
                setTimeout(onLoad, 2000);
            });
        }
    }

    /* ==========================================================
       SWUP INITIALIZATION
       ========================================================== */
    function initSwup() {
        if (typeof Swup === 'undefined') {
            // If Swup is not available, just run animations once
            initPreloader();
            return;
        }

        var swup = new Swup({
            containers: ['#swup'],
            animateHistoryBrowsing: true
        });

        swup.hooks.on('content:replace', function () {
            window.scrollTo(0, 0);
            initPageAnimations();

            // Close mobile menu if open during transition
            var menu = document.getElementById('mobileMenu');
            var btn = document.getElementById('hamburgerBtn');
            if (menu && menu.classList.contains('is-open')) {
                menu.classList.remove('is-open');
                if (btn) btn.classList.remove('is-active');
                document.body.style.overflow = '';
            }
        });
    }

    /* ==========================================================
       BOOTSTRAP
       ========================================================== */
    initMobileMenu();
    initModal();
    initSwup();
    initPreloader();

})();
