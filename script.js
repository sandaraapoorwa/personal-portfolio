// Initialize Lenis for smooth scrolling
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical',
  smoothWheel: true
});

// RAF function for Lenis and ScrollTrigger
function raf(time) {
  lenis.raf(time);
  ScrollTrigger.update();
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(TextPlugin);

// ===== UNIVERSE ANIMATED BACKGROUND =====
// Initialize the animated background
function initAnimatedBackground() {
  // Animate the gradient background
  gsap.to(".gradient-bg", {
    backgroundPosition: "100% 100%",
    duration: 20,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true
  });

  // Create stars and particles
  createStars();
  createParticles();
  createComets();
  
  // Animate floating shapes and galaxy
  animateFloatingShapes();
  animateGalaxy();
}

// Create stars dynamically
function createStars() {
  const particlesContainer = document.querySelector('.particles-container');
  const starCount = 200;
  
  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.classList.add('star');
    
    // Random size between 1px and 3px
    const size = Math.random() * 2 + 1;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    
    // Random position
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    star.style.left = `${posX}%`;
    star.style.top = `${posY}%`;
    
    // Random opacity
    star.style.opacity = Math.random() * 0.8 + 0.2;
    
    particlesContainer.appendChild(star);
    
    // Add twinkle animation
    animateStar(star);
  }
}

// Animate individual stars with twinkle effect
function animateStar(star) {
  // Create random duration between 2-5 seconds
  const duration = Math.random() * 3 + 2;
  // Random delay so all stars don't twinkle at once
  const delay = Math.random() * 5;
  
  gsap.to(star, {
    opacity: Math.random() * 0.5 + 0.5,
    scale: Math.random() * 0.5 + 1,
    duration: duration,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    delay: delay
  });
}

// Create particles dynamically
function createParticles() {
  const particlesContainer = document.querySelector('.particles-container');
  const particleCount = 50;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Random size between 2px and 4px
    const size = Math.random() * 2 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Random position
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    particle.style.left = `${posX}%`;
    particle.style.top = `${posY}%`;
    
    // Random opacity
    particle.style.opacity = Math.random() * 0.7 + 0.3;
    
    particlesContainer.appendChild(particle);
    
    // Animate each particle
    animateParticle(particle);
  }
}

// Create comets that occasionally streak across the sky
function createComets() {
  const background = document.querySelector('.animated-background');
  
  // Create 5 comets with different timings
  for (let i = 0; i < 5; i++) {
    const comet = document.createElement('div');
    comet.classList.add('comet');
    
    // Random position along the top edge
    comet.style.left = `${Math.random() * 70}%`;
    
    // Random length
    const length = Math.random() * 80 + 30;
    comet.style.height = `${length}px`;
    
    // Random angle
    const angle = Math.random() * 20 + 25;
    comet.style.transform = `rotate(${angle}deg)`;
    
    background.appendChild(comet);
    
    // Set random delays between comet appearances
    animateComet(comet, i * 10 + Math.random() * 20);
  }
}

// Animate a comet with random timing
function animateComet(comet, delay) {
  // Initial delay before first appearance
  setTimeout(() => {
    // Start the animation
    gsap.set(comet, { opacity: 0, y: -100, x: -50 });
    gsap.to(comet, {
      y: '200vh',
      x: '100vw',
      opacity: 1,
      duration: 3 + Math.random() * 3,
      ease: "power1.in",
      onComplete: () => {
        // Reset and schedule next appearance
        gsap.set(comet, { y: -100, x: -50, opacity: 0 });
        // Random delay between 15-40 seconds before next appearance
        const nextDelay = 15 + Math.random() * 25;
        setTimeout(() => animateComet(comet, 0), nextDelay * 1000);
      }
    });
  }, delay * 1000);
}

// Animate individual particles
function animateParticle(particle) {
  // Initial position
  const startX = parseFloat(particle.style.left);
  const startY = parseFloat(particle.style.top);
  
  // Random movement range
  const rangeX = Math.random() * 15 - 7.5; // -7.5 to 7.5
  const rangeY = Math.random() * 15 - 7.5; // -7.5 to 7.5
  
  // Random duration between 15 and 30 seconds
  const duration = Math.random() * 15 + 15;
  
  // Create animation
  gsap.to(particle, {
    x: rangeX + "%",
    y: rangeY + "%",
    duration: duration,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
    delay: Math.random() * 5
  });
  
  // Subtle pulsing effect
  gsap.to(particle, {
    opacity: "-=0.3",
    scale: 1.5,
    duration: Math.random() * 4 + 3,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
    delay: Math.random() * 2
  });
}

// Animate the floating shapes
function animateFloatingShapes() {
  const shapes = document.querySelectorAll('.shape');
  
  shapes.forEach((shape, index) => {
    // Different animation for each shape
    const xMovement = 5 + (index % 3) * 2; // Varied movement range
    const yMovement = 5 + (index % 2) * 3;
    const duration = 10 + index * 2; // Different durations
    
    // Movement animation
    gsap.to(shape, {
      x: xMovement + "%",
      y: yMovement + "%",
      duration: duration,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      delay: index * 0.5
    });
    
    // Scale/opacity animation
    gsap.to(shape, {
      scale: 1.1,
      opacity: index % 2 === 0 ? "+=0.02" : "-=0.02", // Alternate between increasing/decreasing opacity
      duration: duration * 0.7,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      delay: index * 0.3
    });
    
    // Rotation for some shapes
    if (index % 2 === 0) {
      gsap.to(shape, {
        rotation: index % 3 === 0 ? 10 : -10,
        transformOrigin: "center center",
        duration: duration * 1.2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      });
    }
  });
  
  // Also animate the nebulas
  const nebulas = document.querySelectorAll('.nebula');
  nebulas.forEach((nebula, index) => {
    // Slow pulse animation
    gsap.to(nebula, {
      opacity: "+=0.04",
      scale: 1.05,
      duration: 8 + index * 2,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      delay: index * 1.5
    });
    
    // Very slight rotation
    gsap.to(nebula, {
      rotation: index % 2 === 0 ? 3 : -3,
      transformOrigin: "center center",
      duration: 20 + index * 5,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true
    });
  });
}

// Animate the galaxy
function animateGalaxy() {
  // The galaxy rotation is handled by CSS animation
  // Add the galaxy element if it doesn't exist yet
  if (!document.querySelector('.galaxy')) {
    const background = document.querySelector('.animated-background');
    const galaxy = document.createElement('div');
    galaxy.classList.add('galaxy');
    background.appendChild(galaxy);
  }
}

// Mouse parallax effect for background elements
function initMouseParallax() {
  document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    // Move shapes based on mouse position
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach((shape, index) => {
      const depth = 0.05 + (index % 3) * 0.02; // Different depths for each shape
      const moveX = (mouseX - 0.5) * depth * 100;
      const moveY = (mouseY - 0.5) * depth * 100;
      
      gsap.to(shape, {
        x: moveX,
        y: moveY,
        duration: 1,
        ease: "power1.out",
        overwrite: "auto"
      });
    });
    
    // Subtle effect on particles
    const particles = document.querySelectorAll('.particle');
    particles.forEach((particle, index) => {
      if (index % 5 === 0) { // Only affect some particles for performance
        const particleDepth = 0.02;
        const moveX = (mouseX - 0.5) * particleDepth * 100;
        const moveY = (mouseY - 0.5) * particleDepth * 100;
        
        gsap.to(particle, {
          x: `+=${moveX * 0.1}`,
          y: `+=${moveY * 0.1}`,
          duration: 2,
          ease: "power1.out",
          overwrite: "auto"
        });
      }
    });
    
    // Move nebulas very slightly for deep parallax effect
    const nebulas = document.querySelectorAll('.nebula');
    nebulas.forEach((nebula, index) => {
      const nebulaDepth = 0.01 + (index % 3) * 0.005;
      const moveX = (mouseX - 0.5) * nebulaDepth * 100;
      const moveY = (mouseY - 0.5) * nebulaDepth * 100;
      
      gsap.to(nebula, {
        x: moveX,
        y: moveY,
        duration: 3,
        ease: "power1.out",
        overwrite: "auto"
      });
    });
  });
}

// ===== TYPEWRITER EFFECT =====
// Typewriter effect for hero section
const typewriterText = document.querySelector('.typewriter-text');
const typewriterSubheading = document.querySelector('.typewriter-subheading');

// Store the original text and then empty the elements
const originalName = typewriterText.textContent;
const originalSubheading = typewriterSubheading.textContent;
typewriterText.textContent = '';
typewriterSubheading.textContent = '';

// Create a timeline for the typewriter effect
const typewriterTimeline = gsap.timeline();

// Add the typewriter animation for the name
typewriterTimeline.to(typewriterText, {
  duration: 1.5,
  text: originalName,
  ease: "none",
});

// Add the typewriter animation for the subheading after the name is complete
typewriterTimeline.to(typewriterSubheading, {
  duration: 2,
  text: originalSubheading,
  ease: "none",
}, "+=0.5");

// ===== HERO IMAGE ANIMATION =====
// Hero image animation
const heroImage = document.querySelector('.hero__image-wrapper');
const heroImageImg = document.querySelector('.hero__image');

// Initial animation for hero image - adjusted for circular image
gsap.fromTo(heroImage, 
  { y: 100, opacity: 0, scale: 0.8 },
  { y: 0, opacity: 1, scale: 1, duration: 1.5, ease: "power3.out", delay: 0.5 }
);

// Floating animation for hero image - more subtle for circular image
gsap.to(heroImage, {
  y: 15,
  duration: 3,
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut"
});

// Rotation animation for circular image
gsap.to(heroImage, {
  rotation: 5,
  duration: 4,
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut",
  delay: 1
});

// Parallax effect for hero image on mouse move - adjusted for circular image
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

// ===== VERTICAL SECTION ANIMATION =====
// Vertical section animation
const section_1 = document.getElementById("vertical");
const col_left = document.querySelector(".col_left");
const lastItem = document.querySelector(".vertical__item:last-child");
const timeline = gsap.timeline({ paused: true });

// Calculate the distance to the last item
const calculateDistance = () => {
  const verticalContentHeight = document.querySelector('.vertical__content').offsetHeight;
  const lastItemBottom = lastItem.offsetTop + lastItem.offsetHeight;
  const viewportHeight = window.innerHeight;
  
  // Calculate the maximum scroll distance needed
  // This ensures the sticky element stops at the last item
  return Math.min(verticalContentHeight - viewportHeight, lastItemBottom - viewportHeight / 2);
};

// Set up the animation with the calculated distance
timeline.fromTo(col_left, 
  { y: 0 }, 
  { y: () => calculateDistance(), duration: 1, ease: 'none' }, 
  0
);

// Create the ScrollTrigger
const scroll_1 = ScrollTrigger.create({
  animation: timeline,
  trigger: section_1,
  start: 'top top',
  end: () => `+=${calculateDistance() + window.innerHeight}`,
  scrub: true,
  invalidateOnRefresh: true // Recalculate on window resize
});

// Update the animation on window resize
window.addEventListener('resize', () => {
  ScrollTrigger.refresh();
});

// ===== HORIZONTAL SECTION ANIMATION =====
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

// ===== PROJECT IMAGE ANIMATIONS =====
// Project image animations
const projectImages = document.querySelectorAll('.project__image img');
projectImages.forEach(img => {
  // Initial animation
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

// ===== GITHUB ICON ANIMATIONS =====
// GitHub icon animations
const githubIcons = document.querySelectorAll('.github-link');
githubIcons.forEach(icon => {
  // Hover animation
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
  
  // Initial animation
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

// ===== CONTACT SECTION ANIMATION =====
// Circular progress animation for contact section
const contactSection = document.getElementById("contact");
const circleProgress = document.querySelector(".contact__circle-progress");
const circleWrapper = document.querySelector(".contact__circle-wrapper");

// Get the circumference of the circle
const radius = 48;
const circumference = 2 * Math.PI * radius;

// Set up the circular scroll trigger animation
ScrollTrigger.create({
  trigger: contactSection,
  start: "top bottom",
  end: "bottom top",
  scrub: true,
  onUpdate: (self) => {
      // Calculate progress (0 to 1)
      const progress = self.progress;
      
      // Calculate the dashoffset based on progress
      const dashoffset = circumference - (progress * circumference);
      
      // Update the circle's dashoffset
      circleProgress.style.strokeDashoffset = dashoffset;
      
      // Calculate capped rotation (-60deg to 60deg)
      const rotation = progress * 120 - 60;
      
      // Apply the capped rotation
      gsap.to(circleWrapper, {
          rotation: rotation,
          duration: 0.1,
          ease: "none"
      });
  }
});

// Initial animation for contact circle
gsap.from(circleWrapper, {
  scale: 0.5,
  opacity: 0,
  duration: 2,
  scrollTrigger: {
      trigger: contactSection,
      start: "top bottom",
      toggleActions: "play none none reverse"
  }
});

// ===== FORM ELEMENTS ANIMATION =====
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

// ===== HERO SECTION ELEMENTS ANIMATION =====
// Add some subtle animations for page elements
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

// ===== BACK TO TOP FUNCTIONALITY =====
// Back to top functionality
document.querySelector('.back-to-top').addEventListener('click', (e) => {
  e.preventDefault();
  lenis.scrollTo('top', { duration: 1.5 });
});

// ===== PROJECT ITEMS HOVER EFFECT =====
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

// ===== FORM SUBMISSION HANDLING =====
// Form submission handling (prevent default for demo)
const contactForm = document.querySelector('.contact__form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      
      // In a real application, you would send this data to a server
      console.log('Form submitted:', { name, email, message });
      
      // Show success message (in a real app)
      alert('Thanks for your message! I\'ll get back to you soon.');
      
      // Reset form
      contactForm.reset();
  });
}

// Initialize everything when the page loads
document.addEventListener('DOMContentLoaded', () => {
  // Create nebula elements dynamically
  const background = document.querySelector('.animated-background');
  
  if (!document.querySelector('.nebula-1')) {
    const nebula1 = document.createElement('div');
    nebula1.classList.add('nebula', 'nebula-1');
    background.appendChild(nebula1);
    
    const nebula2 = document.createElement('div');
    nebula2.classList.add('nebula', 'nebula-2');
    background.appendChild(nebula2);
    
    const nebula3 = document.createElement('div');
    nebula3.classList.add('nebula', 'nebula-3');
    background.appendChild(nebula3);
  }
  
  // Initialize animated background
  initAnimatedBackground();
  initMouseParallax();
});