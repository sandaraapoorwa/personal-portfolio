// Initialize Lenis for smooth scrolling
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
    smoothTouch: true,
    touchMultiplier: 1.5
});

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(TextPlugin);

// RAF function for Lenis and ScrollTrigger
function raf(time) {
    lenis.raf(time);
    ScrollTrigger.update();
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Animated Background
function initAnimatedBackground() {
    gsap.to('.gradient-bg', {
        backgroundPosition: '100% 100%',
        duration: 15,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });
    
    const particlesContainer = document.querySelector('.particles-container');
    const particleCount = window.innerWidth < 768 ? 40 : 80;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        const size = Math.random() * 13 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        const xPos = Math.random() * 100;
        const yPos = Math.random() * 100;
        particle.style.left = `${xPos}%`;
        particle.style.top = `${yPos}%`;
        
        const opacity = Math.random() * 0.5 + 0.1;
        particle.style.opacity = opacity;
        
        const hue = Math.random() * 20 + 350;
        particle.style.backgroundColor = `hsla(${hue}, 100%, 80%, ${opacity})`;
        
        particlesContainer.appendChild(particle);
        
        gsap.to(particle, {
            x: () => (Math.random() - 0.5) * 300,
            y: () => (Math.random() - 0.5) * 300,
            opacity: () => Math.random() * 0.5 + 0.1,
            duration: () => Math.random() * 15 + 10,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: Math.random() * 5
        });
    }
}

// Navbar functionality
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const mobileToggle = document.querySelector('.navbar__mobile-toggle');
    const mobileMenu = document.querySelector('.navbar__mobile-menu');
    const navLinks = document.querySelectorAll('.navbar__link');
    const mobileLinks = document.querySelectorAll('.navbar__mobile-link');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });
    
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });
    
    function handleNavLinkClick(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            lenis.scrollTo(targetSection, {
                duration: 1.2,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
            });
        }
    }
    
    navLinks.forEach(link => link.addEventListener('click', handleNavLinkClick));
    mobileLinks.forEach(link => link.addEventListener('click', handleNavLinkClick));
    
    function highlightActiveLink() {
        const sections = [
            { id: 'vertical', element: document.getElementById('vertical'), navIndex: 0 },
            { id: 'horizontal', element: document.getElementById('horizontal'), navIndex: 1 },
            { id: 'blog', element: document.getElementById('blog'), navIndex: 2 },
            { id: 'contact', element: document.getElementById('contact'), navIndex: 3 }
        ];
        
        const scrollPosition = window.scrollY + window.innerHeight / 2;
        let activeSection = null;
        
        const horizontalSection = document.getElementById('horizontal');
        const horizontalRect = horizontalSection ? horizontalSection.getBoundingClientRect() : null;
        
        if (horizontalRect && 
            horizontalRect.top <= window.innerHeight / 2 && 
            horizontalRect.bottom >= window.innerHeight / 2) {
            activeSection = sections[1];
        } else {
            for (const section of sections) {
                if (!section.element) continue;
                
                const rect = section.element.getBoundingClientRect();
                const sectionTop = window.scrollY + rect.top;
                const sectionBottom = sectionTop + rect.height;
                
                if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
                    activeSection = section;
                    break;
                }
            }
        }
        
        if (!activeSection && sections.length > 0) {
            activeSection = sections.reduce((closest, section) => {
                if (!section.element) return closest;
                
                const rect = section.element.getBoundingClientRect();
                const sectionTop = window.scrollY + rect.top;
                const distance = Math.abs(scrollPosition - sectionTop);
                
                return !closest || distance < closest.distance 
                    ? { ...section, distance } 
                    : closest;
            }, null);
        }
        
        navLinks.forEach(link => link.classList.remove('active'));
        mobileLinks.forEach(link => link.classList.remove('active'));
        
        if (activeSection) {
            navLinks[activeSection.navIndex].classList.add('active');
            mobileLinks[activeSection.navIndex].classList.add('active');
        }
    }
    
    window.addEventListener('scroll', highlightActiveLink);
    highlightActiveLink();
}

// Initialize navbar and background
initNavbar();
initAnimatedBackground();

// Typewriter Effect for Hero Section
function initTypewriterEffect() {
    const typewriterText1 = document.querySelector('.typewriter-text-1');
    const typewriterText2 = document.querySelector('.typewriter-text-2');
    const typewriterSubheading = document.querySelector('.typewriter-subheading');
  
    const originalName1 = typewriterText1.dataset.text;
    const originalName2 = typewriterText2.dataset.text;
    const originalSubheading = typewriterSubheading.dataset.text;
  
    typewriterText1.textContent = '';
    typewriterText2.textContent = '';
    typewriterSubheading.textContent = '';
  
    const typewriterTimeline = gsap.timeline();
  
    typewriterTimeline.to(typewriterText1, {
        duration: 1.5,
        text: originalName1,
        ease: "none",
        onUpdate: function() { typewriterText1.classList.add('typing'); },
        onComplete: function() { typewriterText1.classList.remove('typing'); }
    });
  
    typewriterTimeline.to(typewriterText2, {
        duration: 1.5,
        text: originalName2,
        ease: "none",
        onUpdate: function() { typewriterText2.classList.add('typing'); },
        onComplete: function() { typewriterText2.classList.remove('typing'); }
    }, "-=0.5");
  
    typewriterTimeline.to(typewriterSubheading, {
        duration: 2,
        text: originalSubheading,
        ease: "none",
        onUpdate: function() { typewriterSubheading.classList.add('typing'); },
        onComplete: function() { typewriterSubheading.classList.remove('typing'); }
    }, "+=0.5");
}

initTypewriterEffect();

// Hero image animation
const heroImage = document.querySelector('.hero__image-wrapper');
const heroImageImg = document.querySelector('.hero__image');

gsap.fromTo(heroImage, 
    { y: 100, opacity: 0, scale: 0.8 },
    { y: 0, opacity: 1, scale: 1, duration: 1.5, ease: "power3.out", delay: 0.5 }
);

gsap.to(heroImage, {
    y: 15,
    duration: 3,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
});

gsap.to(heroImage, {
    rotation: 5,
    duration: 4,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    delay: 1
});

// Mouse parallax effect
document.addEventListener('mousemove', (e) => {
    const xPos = (e.clientX / window.innerWidth - 0.5) * 20;
    const yPos = (e.clientY / window.innerHeight - 0.5) * 20;
    
    gsap.to(heroImageImg, {
        x: xPos,
        y: yPos,
        duration: 1,
        ease: "power1.out"
    });
    
    gsap.to('.particles-container', {
        x: xPos / 3,
        y: yPos / 3,
        duration: 2,
        ease: "power1.out"
    });
});

// Vertical section animation
const section_1 = document.getElementById("vertical");
const col_left = document.querySelector(".col_left");
const lastItem = document.querySelector(".vertical__item:last-child");
const timeline = gsap.timeline({ paused: true });

const calculateDistance = () => {
    const verticalContentHeight = document.querySelector('.vertical__content').offsetHeight;
    const lastItemBottom = lastItem.offsetTop + lastItem.offsetHeight;
    const viewportHeight = window.innerHeight;
    
    return Math.min(verticalContentHeight - viewportHeight, lastItemBottom - viewportHeight / 2);
};

timeline.fromTo(col_left, 
    { y: 0 }, 
    { y: () => calculateDistance(), duration: 1, ease: 'none' }, 
    0
);

const scroll_1 = ScrollTrigger.create({
    animation: timeline,
    trigger: section_1,
    start: 'top top',
    end: () => `+=${calculateDistance() + window.innerHeight}`,
    scrub: true,
    invalidateOnRefresh: true
});

const verticalItems = document.querySelectorAll('.vertical__item');
verticalItems.forEach((item, index) => {
    gsap.from(item, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
            trigger: item,
            start: "top bottom-=100",
            end: "bottom top",
            toggleActions: "play none none reverse"
        },
        delay: index * 0.1
    });
});

window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
});

// Horizontal section animation
const section_2 = document.getElementById("horizontal");
let box_items = gsap.utils.toArray(".horizontal__item");

gsap.to(box_items, {
    xPercent: -100 * (box_items.length - 1),
    ease: "sine.out",
    scrollTrigger: {
        trigger: section_2,
        pin: true,
        scrub: 3,
        snap: 1 / (box_items.length - 1),
        end: "+=" + section_2.offsetWidth
    }
});

// Project image animations
const projectImages = document.querySelectorAll('.project__image img');
projectImages.forEach(img => {
    gsap.from(img, {
        scale: 1.2,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: img,
            start: "top bottom",
            end: "bottom top",
            toggleActions: "play none none reverse"
        }
    });
});

// GitHub icon animations
const githubIcons = document.querySelectorAll('.github-link');
githubIcons.forEach(icon => {
    icon.addEventListener('mouseenter', () => {
        gsap.to(icon, {
            rotation: 360,
            scale: 1.2,
            duration: 0.6,
            ease: "back.out"
        });
    });
    
    icon.addEventListener('mouseleave', () => {
        gsap.to(icon, {
            rotation: 0,
            scale: 1,
            duration: 0.6,
            ease: "power1.out"
        });
    });
    
    gsap.from(icon, {
        y: -20,
        opacity: 0,
        duration: 0.5,
        ease: "back.out",
        scrollTrigger: {
            trigger: icon,
            start: "top bottom",
            toggleActions: "play none none reverse"
        }
    });
});

// Blog section animation
const blogSection = document.getElementById('blog');
const blogDashboard = document.querySelector('.blog__dashboard');
const blogPosts = document.querySelectorAll('.blog__post');

gsap.from(blogDashboard, {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
        trigger: blogSection,
        start: "top bottom-=100",
        toggleActions: "play none none reverse"
    }
});

blogPosts.forEach((post, index) => {
    gsap.from(post, {
        x: -30,
        opacity: 0,
        duration: 0.8,
        delay: index * 0.1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: post,
            start: "top bottom-=50",
            toggleActions: "play none none reverse"
        }
    });
});

// Enhanced circular button animation
const contactSection = document.getElementById("contact");
const circleWrapper = document.querySelector(".contact__circle-wrapper");
const circleInner = document.querySelector(".contact__circle-inner");
const circleProgress = document.querySelector(".contact__circle-progress");
const circleText = circleInner.querySelector("h2");

const radius = 48;
const circumference = 2 * Math.PI * radius;

circleProgress.style.strokeDasharray = circumference;
circleProgress.style.strokeDashoffset = circumference;

circleWrapper.addEventListener('mouseenter', () => {
    gsap.to(circleInner, {
        scale: 1.05,
        duration: 0.4,
        ease: "power2.out"
    });
    
    gsap.to(circleText, {
        y: -5,
        duration: 0.4,
        ease: "power2.out"
    });
    
    gsap.to(circleProgress, {
        strokeDashoffset: circumference * 0.2,
        duration: 0.6,
        ease: "power2.out"
    });
});

circleWrapper.addEventListener('mouseleave', () => {
    gsap.to(circleInner, {
        scale: 1,
        duration: 0.4,
        ease: "power2.out"
    });
    
    gsap.to(circleText, {
        y: 0,
        duration: 0.4,
        ease: "power2.out"
    });
    
    gsap.to(circleProgress, {
        strokeDashoffset: circumference,
        duration: 0.6,
        ease: "power2.out"
    });
});

ScrollTrigger.create({
    trigger: contactSection,
    start: "top bottom",
    end: "bottom top",
    scrub: true,
    onUpdate: (self) => {
        const progress = self.progress;
        const dashoffset = circumference - (progress * circumference * 0.8);
        circleProgress.style.strokeDashoffset = dashoffset;
        
        gsap.to(circleWrapper, {
            rotation: progress * 360,
            duration: 0.1,
            ease: "none"
        });
        
        gsap.to(circleInner, {
            rotation: -(progress * 360),
            duration: 0.1,
            ease: "none"
        });
    }
});

gsap.from(circleWrapper, {
    scale: 0.8,
    opacity: 0,
    rotation: -90,
    duration: 1.2,
    ease: "back.out(1.7)",
    scrollTrigger: {
        trigger: contactSection,
        start: "top bottom",
        toggleActions: "play none none reverse"
    }
});

gsap.to(circleInner, {
    rotation: 360,
    duration: 30,
    repeat: -1,
    ease: "linear"
});

gsap.to(circleInner, {
    boxShadow: "0 0 25px rgba(255, 152, 162, 0.6), 0 0 50px rgba(255, 152, 162, 0.3)",
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
});

circleWrapper.addEventListener('click', () => {
    gsap.to(circleInner, {
        scale: 0.95,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
            gsap.to(circleInner, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        }
    });
    
    document.getElementById('name')?.focus();
});

// Form elements animation
const formElements = document.querySelectorAll('.form__group, .form__submit');
gsap.from(formElements, {
    y: 30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    scrollTrigger: {
        trigger: '.contact__form',
        start: "top bottom-=100",
        toggleActions: "play none none reverse"
    }
});

// Hero section animations
gsap.from(".hero__heading span", {
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: "power3.out"
});

gsap.from(".hero__subheading", {
    y: 30,
    opacity: 0,
    duration: 1,
    delay: 0.5,
    ease: "power3.out"
});

// Back to top functionality
document.querySelector('.back-to-top').addEventListener('click', (e) => {
    e.preventDefault();
    lenis.scrollTo('top', { duration: 1.5 });
});

// Project items hover effect
const projectItems = document.querySelectorAll('.horizontal__item');
projectItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        gsap.to(item, {
            y: -10,
            duration: 0.3,
            ease: "power2.out"
        });
    });
    
    item.addEventListener('mouseleave', () => {
        gsap.to(item, {
            y: 0,
            duration: 0.3,
            ease: "power2.out"
        });
    });
});

// Form submission handling with EmailJS
const contactForm = document.querySelector('.contact__form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // EmailJS send email
        emailjs.send('service_dxtyh6i', 'template_efqw5wj', {
            name: name,
            email: email,
            message: message
        })
        .then((response) => {
            console.log('Email sent successfully:', response.status, response.text);

            const formContainer = document.querySelector('.contact__form-container');
            const successMessage = document.createElement('div');
            successMessage.classList.add('success-message');
            successMessage.innerHTML = `<h3>Thanks for your message, ${name}!</h3><p>I'll get back to you soon.</p>`;

            gsap.to(contactForm, {
                opacity: 0,
                y: -20,
                duration: 0.5,
                onComplete: () => {
                    contactForm.style.display = 'none';
                    formContainer.appendChild(successMessage);

                    gsap.from(successMessage, {
                        opacity: 0,
                        y: 20,
                        duration: 0.5
                    });

                    setTimeout(() => {
                        gsap.to(successMessage, {
                            opacity: 0,
                            y: -20,
                            duration: 0.5,
                            onComplete: () => {
                                successMessage.remove();
                                contactForm.style.display = 'block';
                                contactForm.reset(); // Reset form fields
                                gsap.to(contactForm, {
                                    opacity: 1,
                                    y: 0,
                                    duration: 0.5
                                });
                            }
                        });
                    }, 3000);
                }
            });
        }, (error) => {
            console.error('Failed to send email:', error);

            const formContainer = document.querySelector('.contact__form-container');
            const errorMessage = document.createElement('div');
            errorMessage.classList.add('error-message');
            errorMessage.innerHTML = `<h3>Oops! Something went wrong.</h3><p>Please try again later or contact me directly at <a href="mailto:apoorwasandara@gmail.com">apoorwasandara@gmail.com</a>.</p>`;

            gsap.to(contactForm, {
                opacity: 0,
                y: -20,
                duration: 0.5,
                onComplete: () => {
                    contactForm.style.display = 'none';
                    formContainer.appendChild(errorMessage);

                    gsap.from(errorMessage, {
                        opacity: 0,
                        y: 20,
                        duration: 0.5
                    });

                    setTimeout(() => {
                        gsap.to(errorMessage, {
                            opacity: 0,
                            y: -20,
                            duration: 0.5,
                            onComplete: () => {
                                errorMessage.remove();
                                contactForm.style.display = 'block';
                                contactForm.reset(); // Reset form fields
                                gsap.to(contactForm, {
                                    opacity: 1,
                                    y: 0,
                                    duration: 0.5
                                });
                            }
                        });
                    }, 3000);
                }
            });
        });
    });
}

// Page transition effects
window.addEventListener('load', () => {
    gsap.from('body', {
        opacity: 0,
        duration: 1,
        ease: 'power2.out'
    });
    
    gsap.from('.navbar__logo, .navbar__link', {
        y: -20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'back.out'
    });
});

// Scroll-based parallax for floating shapes
gsap.to('.shape-1', {
    y: -100,
    scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: true
    }
});

gsap.to('.shape-2', {
    y: 150,
    scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: true
    }
});

gsap.to('.shape-3', {
    y: -80,
    x: 50,
    scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: true
    }
});

gsap.to('.shape-4', {
    y: 120,
    x: -30,
    scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: true
    }
});

gsap.to('.shape-5', {
    y: -50,
    x: -50,
    scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: true
    }
});