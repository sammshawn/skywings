// ============================================
//  SKYWINGS — Professional Flight Booking
//  Scroll-driven plane animation
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- STARFIELD ----
  const starsContainer = document.getElementById('stars');
  for (let i = 0; i < 80; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.animationDelay = Math.random() * 3 + 's';
    star.style.animationDuration = (2 + Math.random() * 3) + 's';
    star.style.width = (Math.random() * 2 + 1) + 'px';
    star.style.height = star.style.width;
    starsContainer.appendChild(star);
  }

  // ---- NAVBAR SCROLL ----
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  // ---- MOBILE MENU ----
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  // ---- SCROLL REVEAL ----
  const revealElements = document.querySelectorAll('.reveal-up');
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), index * 80);
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );
  revealElements.forEach((el) => revealObserver.observe(el));

  // ---- PLANE ANIMATION ----
  const mainPlane = document.getElementById('mainPlane');
  const flyingPlane = document.getElementById('flyingPlane');
  const hero = document.getElementById('hero');

  function updatePlanes() {
    const scrollY = window.scrollY;
    const heroHeight = hero.offsetHeight;

    if (scrollY <= heroHeight) {
      const progress = scrollY / heroHeight; // 0 → 1

      // ===== MAIN PLANE: Sits still, then dives down and fades =====
      const diveStart = 0.35;
      let diveProgress = 0;
      if (progress > diveStart) {
        diveProgress = (progress - diveStart) / (1 - diveStart);
      }

      // Moves down 300px and fades slightly
      const translateY = diveProgress * 300;
      const opacity = 1 - (diveProgress * 0.8); 

      mainPlane.style.transform = `translateY(${translateY}px)`;
      mainPlane.style.opacity = opacity;

      // ===== SECONDARY PLANE: Flies across from 15% to 60% =====
      const flyStart = 0.15;
      const flyEnd = 0.60;

      if (progress >= flyStart && progress <= flyEnd) {
        flyingPlane.classList.add('visible');
        const flyProgress = (progress - flyStart) / (flyEnd - flyStart);
        
        // Moves from left (-300) to right (screen width + 300)
        const currentX = -300 + (window.innerWidth + 600) * flyProgress;
        
        // Slight upward arc
        const arcY = -Math.sin(flyProgress * Math.PI) * 80;

        flyingPlane.style.transform = `translate(${currentX}px, ${arcY}px)`;
      } else if (progress > flyEnd) {
        flyingPlane.classList.remove('visible');
      } else {
        flyingPlane.classList.remove('visible');
        flyingPlane.style.transform = 'translate(-300px, 0)';
      }
    }
  }

  window.addEventListener('scroll', updatePlanes);
  window.addEventListener('resize', updatePlanes);
  updatePlanes(); // Initial position

  // ---- BOOKING FORM ----
  const bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = bookingForm.querySelector('.btn-search');
      const originalText = btn.textContent;
      btn.textContent = '🔍 Searching...';
      btn.disabled = true;

      setTimeout(() => {
        btn.textContent = `✓ ${Math.floor(Math.random() * 30) + 12} flights found!`;
        btn.style.background = '#10b981';
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.background = '';
          btn.disabled = false;
        }, 2500);
      }, 1200);
    });
  }

  // ---- BOOK NOW BUTTONS ----
  document.querySelectorAll('.btn-book').forEach((btn) => {
    btn.addEventListener('click', () => {
      const dest = btn.dataset.dest;
      const originalText = btn.textContent;
      btn.textContent = `✓ ${dest} selected`;
      btn.style.background = 'rgba(0, 180, 255, 0.2)';
      btn.style.borderColor = 'var(--accent)';
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.style.borderColor = '';
        document.getElementById('book').scrollIntoView({ behavior: 'smooth' });
      }, 1200);
    });
  });

  // ---- SMOOTH SCROLL ----
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});