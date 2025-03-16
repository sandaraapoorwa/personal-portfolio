// Initialize Lenis for smooth scrolling
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical',
  smoothWheel: true
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
  const particleCount = window.innerWidth < 768 ? 30 : 60;
  
  for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      
      // Random size between 2px and 12px
      const size = Math.random() * 10 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      // Random position
      const xPos = Math.random() * 100;
      const yPos = Math.random() * 100;
      particle.style.left = `${xPos}%`;
      particle.style.top = `${yPos}%`;
      
      // Random opacity between 0.1 and 0.5
      const opacity = Math.random() * 0.4 + 0.1;
      particle.style.opacity = opacity;
      
      particle.style.backgroundColor = `rgba(255, 255, 255, ${opacity})`;
      
      particlesContainer.appendChild(particle);
      
      // Animate each particle
      gsap.to(particle, {
          x: () => (Math.random() - 0.5) * 200,
          y: () => (Math.random() - 0.5) * 200,
          opacity: () => Math.random() * 0.5 + 0.1,
          duration: () => Math.random() * 10 + 10,
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
  
  navLinks.forEach(link => {
      link.addEventListener('click', handleNavLinkClick);
  });
  
  mobileLinks.forEach(link => {
      link.addEventListener('click', handleNavLinkClick);
  });
  
  function highlightActiveLink() {
      const sections = [
          { section: document.getElementById('vertical'), index: 0 },
          { section: document.getElementById('horizontal'), index: 1 },
          { section: document.getElementById('contact'), index: 2 }
      ];
      
      const scrollPosition = window.scrollY + window.innerHeight / 2; // Use middle of viewport for accuracy
      
      let activeIndex = -1;
      sections.forEach(({ section, index }) => {
          if (!section) return;
          
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          
          // Special handling for the horizontal section
          if (index === 1) { // Horizontal section
              const sectionEnd = sectionTop + sectionHeight;
              if (scrollPosition >= sectionTop && scrollPosition <= sectionEnd) {
                  activeIndex = index;
              }
          } else {
              if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                  activeIndex = index;
              }
          }
      });

      // If no section is active, default to the closest section
      if (activeIndex === -1) {
          activeIndex = sections.reduce((closestIndex, { section }, index) => {
              if (!section) return closestIndex;
              const sectionTop = section.offsetTop;
              const distance = Math.abs(scrollPosition - sectionTop);
              return distance < Math.abs(scrollPosition - (sections[closestIndex]?.section?.offsetTop || Infinity)) ? index : closestIndex;
          }, 0);
      }

      // Update active classes
      navLinks.forEach(link => link.classList.remove('active'));
      mobileLinks.forEach(link => link.classList.remove('active'));
      
      if (activeIndex !== -1) {
          navLinks[activeIndex].classList.add('active');
          mobileLinks[activeIndex].classList.add('active');
      }
  }
  
  window.addEventListener('scroll', highlightActiveLink);
  highlightActiveLink();
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

document.addEventListener('mousemove', (e) => {
  const xPos = (e.clientX / window.innerWidth - 0.5) * 15;
  const yPos = (e.clientY / window.innerHeight - 0.5) * 15;
  
  gsap.to(heroImageImg, {
      x: xPos,
      y: yPos,
      duration: 1,
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
          duration: 0.6,
          ease: "power1.out"
      });
  });
  
  icon.addEventListener('mouseleave', () => {
      gsap.to(icon, {
          rotation: 0,
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

// Circular progress animation for contact section
const contactSection = document.getElementById("contact");
const circleProgress = document.querySelector(".contact__circle-progress");
const circleWrapper = document.querySelector(".contact__circle-wrapper");
const circleInner = document.querySelector(".contact__circle-inner");

const radius = 48;
const circumference = 2 * Math.PI * radius;

ScrollTrigger.create({
  trigger: contactSection,
  start: "top bottom",
  end: "bottom top",
  scrub: true,
  onUpdate: (self) => {
      const progress = self.progress;
      const dashoffset = circumference - (progress * circumference);
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
      
      alert('Thanks for your message! I\'ll get back to you soon.');
      contactForm.reset();
  });
}