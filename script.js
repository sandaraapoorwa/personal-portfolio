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
    // Gradient animation
    gsap.to('.gradient-bg', {
        backgroundPosition: '100% 100%',
        duration: 15,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });
    
    // Create particles with some larger ones
    const particlesContainer = document.querySelector('.particles-container');
    const particleCount = window.innerWidth < 768 ? 40 : 80; // Increased particle count
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random size between 2px and 15px (increased max size)
        const size = Math.random() * 13 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random position
        const xPos = Math.random() * 100;
        const yPos = Math.random() * 100;
        particle.style.left = `${xPos}%`;
        particle.style.top = `${yPos}%`;
        
        // Random opacity between 0.1 and 0.6 (increased max opacity)
        const opacity = Math.random() * 0.5 + 0.1;
        particle.style.opacity = opacity;
        
        // Add some color variation
        const hue = Math.random() * 20 + 350; // Pink to red hues
        particle.style.backgroundColor = `hsla(${hue}, 100%, 80%, ${opacity})`;
        
        particlesContainer.appendChild(particle);
        
        // Animate each particle with more dynamic movement
        gsap.to(particle, {
            x: () => (Math.random() - 0.5) * 300, // Increased movement range
            y: () => (Math.random() - 0.5) * 300,
            opacity: () => Math.random() * 0.5 + 0.1,
            duration: () => Math.random() * 15 + 10, // Longer animation duration
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: Math.random() * 5
        });
    }
  }
  
  // Navbar functionality with improved section detection
  function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const mobileToggle = document.querySelector('.navbar__mobile-toggle');
    const mobileMenu = document.querySelector('.navbar__mobile-menu');
    const navLinks = document.querySelectorAll('.navbar__link');
    const mobileLinks = document.querySelectorAll('.navbar__mobile-link');
    
    // Add scroll class to navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });
    
    // Close mobile menu when clicking a link
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });
    
    // Smooth scroll with Lenis
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
    
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavLinkClick);
    });
    
    mobileLinks.forEach(link => {
        link.addEventListener('click', handleNavLinkClick);
    });
    
    // Improved active section detection for navbar
    function highlightActiveLink() {
        // Get all sections we want to track
        const sections = [
            { id: 'vertical', element: document.getElementById('vertical'), navIndex: 0 },
            { id: 'horizontal', element: document.getElementById('horizontal'), navIndex: 1 },
            { id: 'contact', element: document.getElementById('contact'), navIndex: 2 }
        ];
        
        // Get current scroll position (middle of viewport)
        const scrollPosition = window.scrollY + window.innerHeight / 2;
        
        // Find the current active section
        let activeSection = null;
        
        // Special handling for horizontal section to fix the navbar issue
        const horizontalSection = document.getElementById('horizontal');
        const horizontalRect = horizontalSection ? horizontalSection.getBoundingClientRect() : null;
        
        if (horizontalRect && 
            horizontalRect.top <= window.innerHeight / 2 && 
            horizontalRect.bottom >= window.innerHeight / 2) {
            // We're in the horizontal section
            activeSection = sections[1];
        } else {
            // Check other sections
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
        
        // If no section is active, find the closest one
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
        
        // Update active classes
        navLinks.forEach(link => link.classList.remove('active'));
        mobileLinks.forEach(link => link.classList.remove('active'));
        
        if (activeSection) {
            navLinks[activeSection.navIndex].classList.add('active');
            mobileLinks[activeSection.navIndex].classList.add('active');
        }
    }
    
    // Update active link on scroll
    window.addEventListener('scroll', highlightActiveLink);
    highlightActiveLink(); // Initial call
  }
  
  // Initialize navbar and background
  initNavbar();
  initAnimatedBackground();
  
  // Enhanced Typewriter Effect for Hero Section
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
        onUpdate: function() {
            typewriterText1.classList.add('typing');
        },
        onComplete: function() {
            typewriterText1.classList.remove('typing');
        }
    });
  
    typewriterTimeline.to(typewriterText2, {
        duration: 1.5,
        text: originalName2,
        ease: "none",
        onUpdate: function() {
            typewriterText2.classList.add('typing');
        },
        onComplete: function() {
            typewriterText2.classList.remove('typing');
        }
    }, "-=0.5");
  
    typewriterTimeline.to(typewriterSubheading, {
        duration: 2,
        text: originalSubheading,
        ease: "none",
        onUpdate: function() {
            typewriterSubheading.classList.add('typing');
        },
        onComplete: function() {
            typewriterSubheading.classList.remove('typing');
        }
    }, "+=0.5");
  }
  
  initTypewriterEffect();
  
  // Enhanced Hero image animation
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
  
  // Enhanced mouse parallax effect
  document.addEventListener('mousemove', (e) => {
    const xPos = (e.clientX / window.innerWidth - 0.5) * 20; // Increased movement
    const yPos = (e.clientY / window.innerHeight - 0.5) * 20;
    
    gsap.to(heroImageImg, {
        x: xPos,
        y: yPos,
        duration: 1,
        ease: "power1.out"
    });
    
    // Add parallax to particles
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
  
  // Animate vertical items on scroll
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
  
  // Horizontal section animation with improved smoothness
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
  
  // Project image animations with enhanced effects
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
  
  // GitHub icon animations with enhanced rotation
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
  
  // Enhanced circular progress animation for contact section
  const contactSection = document.getElementById("contact");
  const circleProgress = document.querySelector(".contact__circle-progress");
  const circleWrapper = document.querySelector(".contact__circle-wrapper");
  const circleInner = document.querySelector(".contact__circle-inner");
  
  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  
  // Set initial dasharray and dashoffset
  circleProgress.style.strokeDasharray = circumference;
  circleProgress.style.strokeDashoffset = circumference;
  
  // Create the scroll trigger for the circle progress
  ScrollTrigger.create({
    trigger: contactSection,
    start: "top bottom",
    end: "bottom top",
    scrub: true,
    onUpdate: (self) => {
        const progress = self.progress;
        const dashoffset = circumference - (progress * circumference);
        circleProgress.style.strokeDashoffset = dashoffset;
        
        // Rotate the outer circle wrapper
        gsap.to(circleWrapper, {
            rotation: progress * 360,
            duration: 0.1,
            ease: "none"
        });
  
        // Counter-rotate the inner circle to keep text upright
        gsap.to(circleInner, {
            rotation: -(progress * 360),
            duration: 0.1,
            ease: "none"
        });
    }
  });
  
  // Add continuous rotation to inner circle
  gsap.to(circleInner, {
    rotation: 360,
    duration: 20,
    repeat: -1,
    ease: "linear"
  });
  
  // Add pulsing glow effect to the inner circle
  gsap.to(circleInner, {
    boxShadow: "0 0 30px rgba(255, 152, 162, 0.7), 0 0 60px rgba(255, 152, 162, 0.4)",
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });
  
  gsap.from(circleWrapper, {
    scale: 0.5,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
        trigger: contactSection,
        start: "top bottom",
        toggleActions: "play none none reverse"
    }
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
  
  // Back to top functionality with Lenis
  document.querySelector('.back-to-top').addEventListener('click', (e) => {
    e.preventDefault();
    lenis.scrollTo('top', { duration: 1.5 });
  });
  
  // Add hover effect to project items
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
  
  // Form submission handling
  const contactForm = document.querySelector('.contact__form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        console.log('Form submitted:', { name, email, message });
        
        // Show success message with animation
        const formContainer = document.querySelector('.contact__form-container');
        const successMessage = document.createElement('div');
        successMessage.classList.add('success-message');
        successMessage.innerHTML = `<h3>Thanks for your message, ${name}!</h3><p>I'll get back to you soon.</p>`;
        
        // Animate form out
        gsap.to(contactForm, {
            opacity: 0,
            y: -20,
            duration: 0.5,
            onComplete: () => {
                contactForm.style.display = 'none';
                formContainer.appendChild(successMessage);
                
                // Animate success message in
                gsap.from(successMessage, {
                    opacity: 0,
                    y: 20,
                    duration: 0.5
                });
                
                // Reset form
                setTimeout(() => {
                    contactForm.reset();
                    
                    // Animate success message out
                    gsap.to(successMessage, {
                        opacity: 0,
                        y: -20,
                        duration: 0.5,
                        onComplete: () => {
                            successMessage.remove();
                            contactForm.style.display = 'block';
                            
                            // Animate form back in
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
  }
  
  // Add page transition effects
  window.addEventListener('load', () => {
    // Fade in the entire page
    gsap.from('body', {
        opacity: 0,
        duration: 1,
        ease: 'power2.out'
    });
    
    // Stagger in the navbar elements
    gsap.from('.navbar__logo, .navbar__link', {
        y: -20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'back.out'
    });
  });
  
  // Add scroll-based parallax to floating shapes
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