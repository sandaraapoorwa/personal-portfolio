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

// Initial animation for hero image
gsap.fromTo(heroImage, 
  { y: 100, opacity: 0 },
  { y: 0, opacity: 1, duration: 1.5, ease: "power3.out", delay: 0.5 }
);

// Floating animation for hero image
gsap.to(heroImage, {
  y: 20,
  duration: 3,
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut"
});

// Parallax effect for hero image on mouse move
document.addEventListener('mousemove', (e) => {
  const xPos = (e.clientX / window.innerWidth - 0.5) * 20;
  const yPos = (e.clientY / window.innerHeight - 0.5) * 20;
  
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