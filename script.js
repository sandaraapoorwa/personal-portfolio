// ============================================================
// LENIS SMOOTH SCROLL
// ============================================================
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    smoothTouch: false,
    touchMultiplier: 1.2
});

gsap.registerPlugin(ScrollTrigger, TextPlugin);

lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => { lenis.raf(time * 1000); });
gsap.ticker.lagSmoothing(0);

// ============================================================
// ANIMATED BACKGROUND
// ============================================================
function initAnimatedBackground() {
    gsap.to('.gradient-bg', {
        backgroundPosition: '100% 100%',
        duration: 20, repeat: -1, yoyo: true, ease: 'sine.inOut'
    });

    const container = document.querySelector('.particles-container');
    if (!container) return;

    const count = window.innerWidth < 768 ? 8 : 16;
    const frag  = document.createDocumentFragment();

    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.classList.add('particle');
        const s = Math.random() * 8 + 3;
        p.style.cssText = `width:${s}px;height:${s}px;left:${Math.random()*100}%;top:${Math.random()*100}%;opacity:${Math.random()*0.25+0.06};background:rgba(255,152,162,0.7);border-radius:50%;position:absolute;will-change:transform;`;
        frag.appendChild(p);
        gsap.to(p, {
            x: () => (Math.random()-.5)*100,
            y: () => (Math.random()-.5)*100,
            duration: () => Math.random()*18+12,
            repeat: -1, yoyo: true, ease: 'sine.inOut',
            delay: Math.random()*5
        });
    }
    container.appendChild(frag);
}

// ============================================================
// NAVBAR
// ============================================================
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const toggle = document.querySelector('.navbar__mobile-toggle');
    const menu   = document.querySelector('.navbar__mobile-menu');
    const links  = document.querySelectorAll('.navbar__link');
    const mLinks = document.querySelectorAll('.navbar__mobile-link');

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                navbar.classList.toggle('scrolled', window.scrollY > 50);
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    toggle?.addEventListener('click', () => {
        toggle.classList.toggle('active');
        menu.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });
    mLinks.forEach(l => l.addEventListener('click', () => {
        toggle.classList.remove('active');
        menu.classList.remove('active');
        document.body.classList.remove('no-scroll');
    }));

    function handleNav(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) lenis.scrollTo(target, { offset: -80 });
    }
    links.forEach(l => l.addEventListener('click', handleNav));
    mLinks.forEach(l => l.addEventListener('click', handleNav));

    let hlTimer = null;
    window.addEventListener('scroll', () => {
        clearTimeout(hlTimer);
        hlTimer = setTimeout(() => {
            const sections = document.querySelectorAll('section[id]');
            let current = null;
            const mid = window.innerHeight / 2;
            sections.forEach(s => {
                const r = s.getBoundingClientRect();
                if (r.top <= mid && r.bottom >= mid) current = s.id;
            });
            links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${current}`));
            mLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${current}`));
        }, 50);
    }, { passive: true });
}

// ============================================================
// TERMINAL TYPEWRITER
// ============================================================
function initTerminal() {
    const win = document.querySelector('.terminal-window');
    if (!win) return;

    gsap.to(win, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.5 });

    const rows  = win.querySelectorAll('.t-code, .t-cursor-row');
    let   delay = 1.0;

    rows.forEach((row) => {
        if (row.classList.contains('t-cursor-row')) {
            gsap.to(row, { opacity: 1, duration: 0.01, delay });
            return;
        }

        const cc  = row.querySelector('.t-cc');
        if (!cc) return;

        const raw = cc.dataset.raw || '';
        const dur = raw.length * 0.022;

        gsap.to(row, { opacity: 1, duration: 0.01, delay });

        const obj = { n: 0 };
        gsap.to(obj, {
            n: raw.length,
            duration: dur,
            ease: 'none',
            delay,
            onUpdate() {
                cc.textContent = raw.substring(0, Math.round(obj.n));
            },
            onComplete() {
                syntaxHighlight(cc, raw);
            }
        });
        delay += dur + 0.06;
    });
}

function syntaxHighlight(el, raw) {
    let html = raw
        .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
        .replace(/(["'])([^"']*)\1/g, (_, q, v) => `<span class="ts-str">${q}${v}${q}</span>`)
        .replace(/\b(const|let|var|true|false|null)\b/g, '<span class="ts-kw">$1</span>')
        .replace(/([a-zA-Z_]\w*)(\s*:)/g, '<span class="ts-key">$1</span>$2')
        .replace(/([{}[\]])/g, '<span class="ts-bracket">$1</span>');
    el.innerHTML = html;
}

// ============================================================
// HERO INTRO TYPEWRITER — name + bio
// ============================================================
function initHeroIntro() {
    const nameEl     = document.querySelector('.hero__name');
    const nameText   = document.querySelector('.hero__name-text');
    const nameCursor = document.querySelector('.hero__name-cursor');
    const bioEl      = document.querySelector('.hero__bio');
    const bioText    = document.querySelector('.hero__bio-text');
    const bioCursor  = document.querySelector('.hero__bio-cursor');

    if (!nameEl || !bioEl) return;

    const NAME = 'Sandara Apoorwa';
    const BIO  = 'Creative developer focused on building beautiful digital experiences';

    // Typewriter helper — returns a promise that resolves when done
    function typeInto(el, cursorEl, str, speed, startDelay) {
        return new Promise(resolve => {
            let i = 0;
            gsap.to(el.parentElement, { opacity: 1, duration: 0.01, delay: startDelay });
            const interval = setInterval(() => {
                i++;
                el.textContent = str.substring(0, i);
                if (i >= str.length) {
                    clearInterval(interval);
                    resolve();
                }
            }, speed);

            // Delay start
            el.textContent = '';
            if (startDelay > 0) {
                clearInterval(interval); // clear immediately, restart after delay
                setTimeout(() => {
                    const iv = setInterval(() => {
                        i++;
                        el.textContent = str.substring(0, i);
                        if (i >= str.length) {
                            clearInterval(iv);
                            resolve();
                        }
                    }, speed);
                }, startDelay * 1000);
            }
        });
    }

    // Simpler direct approach using GSAP ticker for sync with lenis
    const NAME_SPEED  = 55;   // ms per character
    const BIO_SPEED   = 28;   // ms per character
    const NAME_DELAY  = 0.2;  // seconds before name starts
    const BIO_DELAY   = NAME_DELAY + (NAME.length * NAME_SPEED / 1000) + 0.35;

    // Fade in name element
    gsap.to(nameEl, { opacity: 1, duration: 0.01, delay: NAME_DELAY });

    // Type name
    let ni = 0;
    const nameTimer = setTimeout(() => {
        const iv = setInterval(() => {
            ni++;
            nameText.textContent = NAME.substring(0, ni);
            if (ni >= NAME.length) {
                clearInterval(iv);
                // Hide name cursor, show bio cursor start
                nameCursor.classList.add('hidden');
                gsap.to(bioEl, { opacity: 1, duration: 0.01 });
            }
        }, NAME_SPEED);
    }, NAME_DELAY * 1000);

    // Type bio after name finishes
    let bi = 0;
    const bioTimer = setTimeout(() => {
        const iv = setInterval(() => {
            bi++;
            bioText.textContent = BIO.substring(0, bi);
            if (bi >= BIO.length) {
                clearInterval(iv);
                // Bio cursor stays blinking — done
            }
        }, BIO_SPEED);
    }, BIO_DELAY * 1000);
}

// ============================================================
// HERO IMAGE
// ============================================================
function initHero() {
    const wrapper = document.querySelector('.hero__image-wrapper');
    const img     = document.querySelector('.hero__image');
    if (!wrapper || !img) return;

    gsap.fromTo(wrapper,
        { opacity: 0, scale: 0.92 },
        { opacity: 1, scale: 1, duration: 1.1, ease: 'power3.out', delay: 0.3 }
    );

    let tick = false;
    document.addEventListener('mousemove', (e) => {
        if (!tick) {
            requestAnimationFrame(() => {
                gsap.to(img, {
                    x: (e.clientX / window.innerWidth  - 0.5) * 14,
                    y: (e.clientY / window.innerHeight - 0.5) * 14,
                    duration: 1.1, ease: 'power2.out'
                });
                tick = false;
            });
            tick = true;
        }
    }, { passive: true });
}

// ============================================================
// ABOUT
// ============================================================
function initVertical() {
    document.querySelectorAll('.vertical__item').forEach(item => {
        gsap.from(item, {
            y: 40, opacity: 0, duration: 0.7, ease: 'power2.out',
            scrollTrigger: { trigger: item, start: 'top bottom-=60', toggleActions: 'play none none none' }
        });
    });
}

// ============================================================
// EXPERIENCE — ONE-BY-ONE CARD STACK
//
// Each card flies in from the right one at a time.
// As new cards arrive, older cards are pushed back
// (scaled down + shifted down + dimmed) to show depth.
// Cards never disappear — they stay visible in the stack.
// ============================================================
function initExperienceStack() {
    const section = document.getElementById('experience');
    const scene   = document.querySelector('.exp-scene');
    const cards   = gsap.utils.toArray('.exp-card');

    if (!section || !scene || !cards.length) return;
    if (window.innerWidth <= 768) return;

    const n = cards.length;

    // How much each stacked card shifts up and shrinks
    const STACK_Y_STEP  = -18;   // px upward per depth level (negative = up)
    const STACK_SC_STEP = 0.055; // scale reduction per depth level

    // Inject progress dots into the last (front) card
    const frontCard = cards[n - 1];
    const dotsWrap  = document.createElement('div');
    dotsWrap.className = 'exp-progress-dots';
    for (let i = 0; i < n; i++) {
        const dot = document.createElement('span');
        dot.className = 'exp-dot';
        dotsWrap.appendChild(dot);
    }
    frontCard.appendChild(dotsWrap);

    // easeOutCubic
    function easeOut(t) { return 1 - Math.pow(1 - t, 3); }
    // easeInOutCubic for depth settling
    function easeInOut(t) { return t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2,3)/2; }

    // Set all cards hidden off-screen to the right initially
    cards.forEach((card, i) => {
        gsap.set(card, {
            x: '120%',
            y: 0,
            scale: 1,
            opacity: 0,
            zIndex: i + 1,
            filter: 'brightness(1)',
        });
    });

    // Total pinned scroll distance: n cards × 1.8vh each
    const totalScroll = window.innerHeight * 1.8 * n;

    ScrollTrigger.create({
        trigger:    section,
        start:      'top top+=80',
        end:        `+=${totalScroll}`,
        pin:        true,
        pinSpacing: true,
        scrub:      1.1,
        invalidateOnRefresh: true,

        onUpdate(self) {
            const p = self.progress; // 0 → 1
            const sliceSize = 1 / n;

            cards.forEach((card, i) => {
                const sliceStart = i * sliceSize;

                // Progress within this card's own entry slice (0 → 1)
                const cp = Math.max(0, Math.min(1, (p - sliceStart) / sliceSize));

                // ── SLIDE-IN PHASE ──
                // Occupies the first 45% of this card's slice
                const SLIDE_WINDOW = 0.45;
                const slideRaw     = Math.max(0, Math.min(1, cp / SLIDE_WINDOW));
                const slideEased   = easeOut(slideRaw);

                // ── DEPTH CALCULATION ──
                // Count how many cards introduced AFTER this one are already visible
                let depth = 0;
                for (let j = i + 1; j < n; j++) {
                    const jStart = j * sliceSize;
                    // Card j starts sliding in when p > jStart
                    if (p > jStart) {
                        // How far into card j's slide are we? Smooth depth increment
                        const jSlide = Math.min(1, (p - jStart) / (sliceSize * SLIDE_WINDOW));
                        depth += easeInOut(jSlide);
                    }
                }

                // ── FINAL TRANSFORMS ──
                const fromX     = 120; // start percent
                const curX      = fromX - fromX * slideEased; // 120% → 0%

                const targetY   = depth * STACK_Y_STEP;
                const targetSc  = Math.max(0.78, 1 - depth * STACK_SC_STEP);
                const brightness= Math.max(0.45, 1 - depth * 0.18);
                const opacity   = slideEased; // fades in as it slides

                gsap.set(card, {
                    x:       `${curX}%`,
                    y:       targetY,
                    scale:   targetSc,
                    opacity: opacity,
                    filter:  `brightness(${brightness})`,
                });

                // ── PROGRESS DOTS ──
                // Update dots to show which card is currently "active" (on top)
                const dots = dotsWrap.querySelectorAll('.exp-dot');
                // Active card = highest i where cp > 0.1 (card has meaningfully appeared)
                let activeIdx = -1;
                for (let k = 0; k < n; k++) {
                    const kp = Math.max(0, (p - k * sliceSize) / sliceSize);
                    if (kp > 0.1) activeIdx = k;
                }
                dots.forEach((dot, di) => {
                    dot.classList.toggle('active', di === activeIdx);
                });

                // ── EXP-NUM COLOUR ──
                // Top card (depth ~0) gets a vibrant pink number
                const num = card.querySelector('.exp-num');
                if (num) {
                    const alpha = Math.max(0.10, 0.55 - depth * 0.15);
                    num.style.color = `rgba(255,152,162,${alpha.toFixed(2)})`;
                }
            });
        }
    });
}

// ============================================================
// HORIZONTAL SCROLL
// ============================================================
function initHorizontalScroll() {
    const section = document.getElementById('horizontal');
    const track   = document.querySelector('.horizontal__content');
    if (!section || !track) return;

    const getDist = () => track.scrollWidth - window.innerWidth;

    ScrollTrigger.create({
        trigger: section,
        pin: true,
        start: 'top top',
        end: () => `+=${getDist()}`,
        scrub: 1.5,
        invalidateOnRefresh: true,
        animation: gsap.to(track, { x: () => -getDist(), ease: 'none' })
    });
}

// ============================================================
// BLOG
// ============================================================
function initBlog() {
    document.querySelectorAll('.blog__post').forEach((post, i) => {
        gsap.from(post, {
            x: -24, opacity: 0, duration: 0.6, delay: i * 0.08, ease: 'power2.out',
            scrollTrigger: { trigger: post, start: 'top bottom-=40', toggleActions: 'play none none none' }
        });
    });
}

// ============================================================
// CONTACT
// ============================================================
function initContact() {
    const circle  = document.querySelector('.contact__circle-progress');
    const section = document.getElementById('contact');
    if (!circle || !section) return;

    const circ = 2 * Math.PI * 48;
    ScrollTrigger.create({
        trigger: section, start: 'top bottom', end: 'bottom top', scrub: 2,
        onUpdate: self => {
            circle.style.strokeDashoffset = circ - self.progress * circ * 0.85;
        }
    });
}

// ============================================================
// FORM
// ============================================================
function initForm() {
    const form = document.querySelector('.contact__form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = document.querySelector('.form__submit');
        btn.textContent = 'Sending...';
        btn.disabled = true;

        emailjs.send('service_2lrcg2h', 'template_efqw5wj', {
            name:    document.getElementById('name').value,
            email:   document.getElementById('email').value,
            message: document.getElementById('message').value
        }).then(() => {
            btn.textContent = 'Sent!';
            setTimeout(() => { btn.textContent = 'Send Message'; btn.disabled = false; form.reset(); }, 2000);
        }).catch(() => { btn.textContent = 'Error'; btn.disabled = false; });
    });
}

// ============================================================
// INIT
// ============================================================
window.addEventListener('load', () => {
    initAnimatedBackground();
    initNavbar();
    initHeroIntro();
    initTerminal();
    initHero();
    initVertical();
    initExperienceStack();
    initHorizontalScroll();
    initBlog();
    initContact();
    initForm();
    ScrollTrigger.refresh();
});

let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => ScrollTrigger.refresh(), 250);
}, { passive: true });