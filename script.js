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
      
      // Rotate the circle based on progress
      gsap.to(circleWrapper, {
          rotation: progress * 360,
          duration: 0.1,
          ease: "none"
      });
  }
});

// Initial animation for contact circle
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