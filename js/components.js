/**
 * Shared HTML Components
 * Centralized component definitions to eliminate code duplication
 */

const Components = {
    /**
     * Header Navigation Component
     */
    header: () => `
        <header class="header-wrapper">
            <nav class="nav-bar">
                <div class="nav-inner">
                    <div class="logo-section">
                        <a href="./index.html" class="logo-container">
                            <img src="assets/hero/tracker-logo.png"
                                alt="TrackerSaas Logo">
                        </a>
                    </div>
                    <div class="links-section">
                        <a href="index.html" class="nav-link">Home</a>
                        <a href="javascript:void(0)" class="nav-link js-open-modal">Preço</a>
                        <a href="about.html" class="nav-link">Sobre</a>
                    </div>
                    <div class="button-section">
                        <a href="javascript:void(0)" class="btn-cta js-open-form">Agendar demonstração</a>
                        <button class="hamburger-btn" id="hamburgerBtn" aria-label="Abrir menu" aria-expanded="false">
                            <span class="hamburger-line"></span>
                            <span class="hamburger-line"></span>
                            <span class="hamburger-line"></span>
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    `,

    /**
     * Mobile Menu Component
     */
    mobileMenu: () => `
        <div class="mobile-menu-overlay" id="mobileMenu" aria-hidden="true">
            <div class="mobile-menu-inner">
                <button class="mobile-menu-close" id="mobileMenuClose" aria-label="Fechar menu">
                    <iconify-icon icon="solar:close-circle-linear" width="32"></iconify-icon>
                </button>
                <nav class="mobile-menu-links">
                    <a href="index.html" class="mobile-menu-link">Home</a>
                    <a href="javascript:void(0)" class="mobile-menu-link js-open-modal">Preço</a>
                    <a href="about.html" class="mobile-menu-link">Sobre</a>
                </nav>
                <a href="javascript:void(0)" class="mobile-menu-cta js-open-form">Agendar demonstração</a>
            </div>
        </div>
    `,

    /**
     * Footer Component
     */
    footer: () => `
        <footer class="footer-sticky" id="contact">
            <div class="footer-bg-container">
                <img src="assets/hero/footer-bg.jpg" alt="Footer Background" class="footer-bg-img">
                <div class="footer-overlay"></div>
            </div>
            <div class="footer-content">
                <span class="footer-tag">Pronto para transformar seu condomínio?</span>
                <a href="mailto:contato@trackersaas.com.br" class="footer-title">VAMOS CONVERSAR</a>

                <div class="footer-links">
                    <a href="#" class="footer-link">Instagram</a>
                    <a href="#" class="footer-link">LinkedIn</a>
                    <a href="#" class="footer-link">Central de Ajuda</a>
                    <a href="#" class="footer-link">Termos de Uso</a>
                </div>

                <div class="footer-bottom">
                    © 2026 TRACKERSAAS — GESTÃO INTELIGENTE DE ENCOMENDAS
                </div>
            </div>
        </footer>
    `,

    /**
     * Modal System Component
     */
    modal: () => `
        <div class="modal-overlay" id="modalOverlay">
            <div class="modal-wrapper">
                <div class="modal-glow"></div>
                <div class="modal-container">
                    <div class="modal-refraction modal-refraction-1"></div>
                    <div class="modal-refraction modal-refraction-2"></div>

                    <button class="modal-close" id="modalClose">
                        <iconify-icon icon="solar:close-circle-linear" width="24"></iconify-icon>
                    </button>

                    <!-- STEP 1: Pricing -->
                    <div class="modal-step is-active" id="modalStep1">
                        <div class="modal-header">
                            <h2 class="modal-title">Preços Simples</h2>
                            <p class="modal-subtitle">Pague por dispositivo</p>
                        </div>

                        <div class="pricing-main-card">
                            <span class="badge-no-fee">Sem taxa de implementação</span>
                            <div class="price-display">
                                <span class="currency">R$</span>
                                <span class="amount">249</span>
                            </div>
                            <p class="price-period">por dispositivo/mês</p>
                            <p class="price-notice">Primeiros 6 meses, depois R$ 199/mês</p>
                        </div>

                        <div class="pricing-addon-card">
                            <div class="addon-info">
                                <h4>Pro Plan</h4>
                                <p>Captura de imagens</p>
                            </div>
                            <div class="addon-price">
                                <p class="val">+ R$ 99</p>
                                <p class="per">por mês</p>
                            </div>
                        </div>

                        <ul class="features-list">
                            <li class="feature-item">
                                <iconify-icon icon="solar:check-circle-bold" width="18"></iconify-icon>
                                <span>Gestão ilimitada de encomendas</span>
                            </li>
                            <li class="feature-item">
                                <iconify-icon icon="solar:check-circle-bold" width="18"></iconify-icon>
                                <span>Notificações WhatsApp automáticas</span>
                            </li>
                            <li class="feature-item">
                                <iconify-icon icon="solar:check-circle-bold" width="18"></iconify-icon>
                                <span>Assinaturas digitais</span>
                            </li>
                            <li class="feature-item">
                                <iconify-icon icon="solar:check-circle-bold" width="18"></iconify-icon>
                                <span>Relatórios completos</span>
                            </li>
                            <li class="feature-item">
                                <iconify-icon icon="solar:check-circle-bold" width="18"></iconify-icon>
                                <span>Suporte técnico</span>
                            </li>
                        </ul>

                        <button class="modal-btn-primary" id="btnGoToForm">Começar Agora</button>
                        <p class="modal-footer-text">Cancele quando quiser</p>
                    </div>

                    <!-- STEP 2: Form -->
                    <div class="modal-step" id="modalStep2">
                        <div class="form-header">
                            <h3>Quase lá!</h3>
                            <p class="modal-subtitle">Preencha os dados para iniciarmos o seu acesso.</p>
                        </div>

                        <form class="modal-form" id="leadForm">
                            <div class="form-group">
                                <label class="form-label">Nome completo</label>
                                <input type="text" class="form-input" placeholder="Seu nome" required>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Nome do Condomínio</label>
                                <input type="text" class="form-input" placeholder="Ex: Edifício Solar" required>
                            </div>
                            <div class="form-group">
                                <label class="form-label">WhatsApp</label>
                                <input type="tel" class="form-input" placeholder="(00) 00000-0000" required>
                            </div>
                            <div class="form-group">
                                <label class="form-label">E-mail corporativo/pessoal</label>
                                <input type="email" class="form-input" placeholder="seu@email.com" required>
                            </div>

                            <button type="submit" class="modal-btn-primary" style="margin-top: 20px;">
                                Finalizar Solicitação
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `,

    /**
     * Preloader Component
     */
    preloader: () => `
        <div class="preloader" id="preloader">
            <div class="preloader-inner">
                <img src="assets/hero/tracker-logo.png" alt="TrackerSaas"
                    class="preloader-logo">
            </div>
        </div>
    `,

    /**
     * Initialize all components — inject immediately (DOM is ready since
     * this script sits after all page markup at the bottom of <body>).
     */
    init() {
        const inject = () => {
            // Insert preloader at the beginning of body
            document.body.insertAdjacentHTML('afterbegin', this.preloader());

            // Insert header, mobile menu after preloader
            const mainWrapper = document.querySelector('.main-wrapper');
            if (mainWrapper) {
                mainWrapper.insertAdjacentHTML('afterbegin', this.header());
                mainWrapper.insertAdjacentHTML('beforeend', this.mobileMenu());
            }

            // Insert footer and modal at the end of main-wrapper
            if (mainWrapper) {
                mainWrapper.insertAdjacentHTML('afterend', this.footer());
                mainWrapper.insertAdjacentHTML('afterend', this.modal());
            }
        };

        // If DOM is already parsed (script at bottom of body), inject now.
        // Otherwise fall back to DOMContentLoaded.
        if (document.readyState !== 'loading') {
            inject();
        } else {
            document.addEventListener('DOMContentLoaded', () => inject());
        }
    }
};

// Auto-initialize components
Components.init();
