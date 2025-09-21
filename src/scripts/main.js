const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('shrink');
  } else {
    navbar.classList.remove('shrink');
  }
});

const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth' });
    navLinks.classList.remove('open');
  });
});

window.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.navbar').classList.add('active');
  document.querySelector('.hero-content').classList.add('active');
});


window.addEventListener('DOMContentLoaded', () => {
  const ctaBtn = document.querySelector('.nav-cta');
  if (ctaBtn) {
    ctaBtn.classList.add('animate');
  }
});

window.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.navbar').classList.add('active');
  const hero = document.querySelector('.hero-content');
  hero.classList.add('active');
});


(function () {
  const skills = document.querySelectorAll('#skills .skill');

  if (!skills.length) return;

  const animateSkill = (el) => {
    const percent = parseInt(el.dataset.percent || '0', 10);
    const fill = el.querySelector('.progress-fill');
    const label = el.querySelector('.skill-percent');
    if (!fill) return;

    fill.style.width = percent + '%';

    if (label) {
      let current = 0;
      const duration = 900;
      const start = performance.now();
      const step = (t) => {
        const p = Math.min((t - start) / duration, 1);
        const val = Math.round(p * percent);
        label.textContent = val + '%';
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }
  };

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateSkill(entry.target);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.35 }
    );
    skills.forEach((s) => io.observe(s));
  } else {
    skills.forEach(animateSkill);
  }
})();


function revealOnScroll() {
  const reveals = document.querySelectorAll('.reveal');
  const triggerBottom = window.innerHeight * 0.85; // 85% ارتفاع صفحه

  reveals.forEach(el => {
    const boxTop = el.getBoundingClientRect().top;
    if (boxTop < triggerBottom) {
      el.classList.add('active');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

document.addEventListener('DOMContentLoaded', () => {
    console.log('Welcome to My Personal Website!');
});