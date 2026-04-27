(function initPreloader() {
    const quotes = [
        "L'excellence digitale à portée de main...",
        "Votre succès en ligne commence ici...",
        "Conception de votre expérience web...",
        "Le design qui fera la différence...",
        "Innovation et performance en cours de chargement..."
    ];
    const quoteEl = document.getElementById('loader-quote');
    if (quoteEl) {
        quoteEl.textContent = quotes[Math.floor(Math.random() * quotes.length)];
    }
})();

import { animate, spring, inView, stagger } from "https://cdn.jsdelivr.net/npm/motion@11.11.13/+esm";

document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 1200);
    }

    // Gérer les liens internes pour afficher le preloader
    const links = document.querySelectorAll('a[href$=".html"]');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.target === "_blank") return;
            e.preventDefault();
            const target = link.href;
            if (preloader) {
                preloader.style.visibility = 'visible';
                preloader.style.opacity = '1';
                setTimeout(() => {
                    window.location.href = target;
                }, 500);
            } else {
                window.location.href = target;
            }
        });
    });

    // ---- MODERN REVEAL ANIMATIONS (MOTION ONE) ----
    inView(".reveal", ({ target }) => {
        animate(
            target,
            { opacity: [0, 1], y: [40, 0], filter: ["blur(10px)", "blur(0px)"] },
            { duration: 0.8, easing: [0.17, 0.55, 0.55, 1] }
        );
    });

    // ---- MAGNETIC EFFECT ON BUTTONS ----
    const magneticBtns = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-nav');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) * 0.4;
            const y = (e.clientY - rect.top - rect.height / 2) * 0.4;
            animate(btn, { x, y }, { duration: 0.1 });
        });
        btn.addEventListener('mouseleave', () => {
            animate(btn, { x: 0, y: 0 }, { type: "spring", stiffness: 300, damping: 20 });
        });
    });

    // ---- CUBE INTERACTION (FOLLOW MOUSE ON HERO) ----
    const hero = document.querySelector('.hero');
    const cube = document.querySelector('.cube');
    if (hero && cube) {
        window.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            const rotateX = -(y - 0.5) * 45; 
            const rotateY = (x - 0.5) * 45;
            cube.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
    }

    // ---- 3D TILT EFFECT ON CARDS ----
    const tiltCards = document.querySelectorAll('.tilt-card');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const rotateX = -((y / rect.height) - 0.5) * 15; 
            const rotateY = ((x / rect.width) - 0.5) * 15;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
    });

    // ---- BACKGROUND SCROLL LOGIC REMOVED FOR CLEAN TECH THEME ----

    // ---- CUSTOM CURSOR LOGIC ----
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    if (window.matchMedia("(pointer: fine)").matches && cursorDot && cursorOutline) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });

        const interactables = document.querySelectorAll('a, button, .payment-method, .portfolio-item, .card, .feature-box, .step');
        interactables.forEach(el => {
            el.addEventListener('mouseenter', () => { cursorOutline.classList.add('hover'); });
            el.addEventListener('mouseleave', () => { cursorOutline.classList.remove('hover'); });
        });
    }

    // ---- WHATSAPP MENU LOGIC ----
    const waTrigger = document.getElementById('wa-trigger');
    const waMenu = document.getElementById('wa-menu');
    
    if (waTrigger && waMenu) {
        waTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            waMenu.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (waMenu.classList.contains('active') && !e.target.closest('.whatsapp-container')) {
                waMenu.classList.remove('active');
            }
        });

        setTimeout(() => {
            waTrigger.classList.add('show-tooltip');
            setTimeout(() => { waTrigger.classList.remove('show-tooltip'); }, 4000);
        }, 2000);
    }

    // ---- MODAL PAIEMENT LOGIC (Uniquement sur services.html ou là où c'est présent) ----
    const modal = document.getElementById('payment-modal');
    if (modal) {
        const orderBtns = document.querySelectorAll('.order-btn, .order-btn-nav');
        const closeBtn = document.querySelector('.close-modal');
        const selectedPlanText = document.getElementById('selected-plan');
        const payMethods = document.querySelectorAll('.payment-method');
        const cardForm = document.getElementById('card-form');
        const transferInfo = document.getElementById('transfer-info');

        orderBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault(); 
                const card = e.target.closest('.card');
                if (card) {
                    selectedPlanText.textContent = card.getAttribute('data-plan');
                } else {
                    selectedPlanText.textContent = "Sur-mesure";
                }
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        const closeModal = () => {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        };

        closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

        payMethods.forEach(method => {
            method.addEventListener('click', () => {
                payMethods.forEach(m => m.classList.remove('active'));
                method.classList.add('active');

                const id = method.id;
                cardForm.classList.add('hidden');
                transferInfo.classList.add('hidden');

                if (id === 'pay-card' || id === 'pay-apple' || id === 'pay-google' || id === 'pay-samsung') {
                    cardForm.classList.remove('hidden');
                    if(id !== 'pay-card') {
                        let btnText = "Payer avec " + method.querySelector('span').textContent;
                        let iconHTML = method.querySelector('i').outerHTML;
                        cardForm.innerHTML = `
                            <p style="text-align:center; color:var(--text-muted); margin-bottom: 1rem;">Paiement rapide et sécurisé via votre portefeuille numérique.</p>
                            <button class="btn btn-primary full-width" style="font-size:1.2rem; padding: 1rem;">
                                ${iconHTML} ${btnText}
                            </button>`;
                    } else {
                        cardForm.innerHTML = `
                            <div class="input-group"><label>Nom</label><input type="text" placeholder="Jean Dupont"></div>
                            <div class="input-group"><label>Numéro de carte</label><input type="text" placeholder="0000 0000 0000 0000"></div>
                            <div class="row">
                                <div class="input-group"><label>Date d'exp.</label><input type="text" placeholder="MM/AA"></div>
                                <div class="input-group"><label>CVC</label><input type="text" placeholder="123"></div>
                            </div>
                            <button class="btn btn-primary full-width">Valider le paiement</button>
                        `;
                    }
                } else if (id === 'pay-transfer') {
                    transferInfo.classList.remove('hidden');
                }
            });
        });
    }

    // ---- ANIMATIONS AU SCROLL & COMPTEURS ----
    const counters = document.querySelectorAll('.stat-number');
    const animateCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const speed = 200;
                const inc = target / speed;
                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 15);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    };

    if ('IntersectionObserver' in window) {
        const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const animateElements = document.querySelectorAll('.card, .portfolio-item, .feature-box, .step, .problem-content, .testimonial-card, .cta-content');
        animateElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = `all 0.6s ease ${(index % 3) * 0.1}s`;
            observer.observe(el);
        });

        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        const statsSection = document.querySelector('.stats-section');
        if(statsSection) statsObserver.observe(statsSection);
    }

    // ---- CONTACT FORM HANDLING ----
    const contactForm = document.getElementById('main-contact-form');
    if(contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Empêche le rechargement et la redirection
            const btn = contactForm.querySelector('button[type="submit"]');
            const successMsg = document.getElementById('form-success-msg');
            
            // Loading state
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Envoi en cours...';
            btn.style.opacity = '0.7';
            
            const formData = new FormData(contactForm);

            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                });
                
                if (response.ok) {
                    btn.innerHTML = originalText;
                    btn.style.opacity = '1';
                    contactForm.reset();
                    successMsg.style.display = 'block';
                    setTimeout(() => { successMsg.style.display = 'none'; }, 5000);
                } else {
                    alert("Une erreur est survenue lors de l'envoi du message.");
                    btn.innerHTML = originalText;
                    btn.style.opacity = '1';
                }
            } catch (error) {
                console.error(error);
                alert("Erreur réseau. Veuillez réessayer.");
                btn.innerHTML = originalText;
                btn.style.opacity = '1';
            }
        });
    }

    // ---- BUTTON ANIMATIONS WITH MOTION ONE ----
    document.querySelectorAll('.btn, button').forEach(btn => {
        btn.addEventListener('mousedown', () => {
            animate(btn, { scale: 0.92 }, { type: spring, stiffness: 500, damping: 20 });
        });
        
        const releaseAnimation = () => {
            animate(btn, { scale: 1 }, { type: spring, stiffness: 500, damping: 20 });
        };
        
        btn.addEventListener('mouseup', releaseAnimation);
        btn.addEventListener('mouseleave', releaseAnimation);
    });

    // ---- ROI SIMULATOR ----
    const roiRevenue = document.getElementById('roi-revenue');
    const roiVisitors = document.getElementById('roi-visitors');
    const roiConversion = document.getElementById('roi-conversion');

    if (roiRevenue && roiVisitors && roiConversion) {
        const fmt = (n) => Math.round(n).toLocaleString('fr-FR');

        function updateROI() {
            const revenue = parseFloat(roiRevenue.value);
            const visitors = parseFloat(roiVisitors.value);
            const conversion = parseFloat(roiConversion.value);

            // Display slider values
            document.getElementById('roi-revenue-val').textContent = fmt(revenue);
            document.getElementById('roi-visitors-val').textContent = fmt(visitors);
            document.getElementById('roi-conversion-val').textContent = conversion.toFixed(1);

            // ROI calculation
            // With a pro site: +150% more visitors, +2.5x conversion rate
            const newVisitors = visitors * 2.5;
            const newConvRate = Math.min(conversion * 2.5, 10) / 100;
            const avgOrderValue = revenue / Math.max(visitors * (conversion / 100), 1);
            const newClients = Math.round(newVisitors * newConvRate - visitors * (conversion / 100));
            const monthlyGain = Math.round(newClients * avgOrderValue);
            const annualGain = monthlyGain * 12;
            
            // Payback period based on Pro plan (499€)
            const planCost = 499;
            const paybackMonths = monthlyGain > 0 ? Math.ceil(planCost / monthlyGain) : '—';

            // Update display
            document.getElementById('roi-gain').textContent = '+' + fmt(monthlyGain) + ' €';
            document.getElementById('roi-clients').textContent = '+' + fmt(newClients);
            document.getElementById('roi-annual').textContent = '+' + fmt(annualGain) + ' €';
            document.getElementById('roi-payback').textContent = 
                typeof paybackMonths === 'number' ? paybackMonths + ' mois' : paybackMonths;

            // Animate the main value
            const gainEl = document.getElementById('roi-gain');
            gainEl.style.transform = 'scale(1.05)';
            setTimeout(() => { gainEl.style.transform = 'scale(1)'; }, 200);
        }

        roiRevenue.addEventListener('input', updateROI);
        roiVisitors.addEventListener('input', updateROI);
        roiConversion.addEventListener('input', updateROI);
        updateROI(); // Initial calculation
    }
});
