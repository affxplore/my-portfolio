// ================= MATRIX BACKGROUND =================
class MatrixRain {
  constructor() {
    this.canvas = document.getElementById('matrix-canvas');
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.resizeCanvas();

    this.chars = '0101010101010101010101';
    this.charArray = this.chars.split('');
    this.fontSize = 14;
    this.columns = Math.floor(this.canvas.width / this.fontSize);
    this.drops = Array(this.columns).fill(0).map(() => Math.random() * -50);

    window.addEventListener('resize', () => this.resizeCanvas());

    this.draw();
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  draw() {
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.fillStyle = '#00ffff';
    this.ctx.font = `${this.fontSize}px monospace`;

    this.drops.forEach((drop, i) => {
      const char = this.charArray[Math.floor(Math.random() * this.charArray.length)];
      this.ctx.fillText(char, i * this.fontSize, drop * this.fontSize);

      if (drop * this.fontSize > this.canvas.height && Math.random() > 0.975) {
        this.drops[i] = 0;
      }
      this.drops[i]++;
    });

    requestAnimationFrame(() => this.draw());
  }
}


// ================= TYPING EFFECT =================
class TypeWriter {
  constructor(element, texts, speed = 90, deleteSpeed = 50, pauseTime = 1500) {
    this.element = element;
    this.texts = texts;
    this.speed = speed;
    this.deleteSpeed = deleteSpeed;
    this.pauseTime = pauseTime;
    this.index = 0;
    this.charIndex = 0;
    this.isDeleting = false;

    this.type();
  }

  type() {
    const current = this.texts[this.index];

    if (this.isDeleting) {
      this.charIndex--;
    } else {
      this.charIndex++;
    }

    this.element.textContent = current.substring(0, this.charIndex);

    let time = this.isDeleting ? this.deleteSpeed : this.speed;

    if (!this.isDeleting && this.charIndex === current.length) {
      time = this.pauseTime;
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.index = (this.index + 1) % this.texts.length;
      time = 500;
    }

    setTimeout(() => this.type(), time);
  }
}


// ================= NAVIGATION =================
function initNavigation() {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');

      const spans = navToggle.querySelectorAll('span');
      const active = navMenu.classList.contains('active');

      spans[0].style.transform = active ? 'rotate(45deg) translate(5px, 5px)' : 'none';
      spans[1].style.opacity = active ? '0' : '1';
      spans[2].style.transform = active ? 'rotate(-45deg) translate(7px, -6px)' : 'none';
    });
  }

  // Highlight active menu
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const links = document.querySelectorAll('.nav-menu a');

  links.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });
}


// ================= BACK TO TOP BUTTON =================
function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 300);
  });

  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}


// ================= CONTACT MODAL =================
function openContact() {
  document.getElementById("contactModal").classList.add("active");
}

function closeContact() {
  document.getElementById("contactModal").classList.remove("active");
}

window.addEventListener("click", e => {
  const modal = document.getElementById("contactModal");
  if (e.target === modal) closeContact();
});


// ================= PAGE TRANSITION =================
function initPageTransition() {
  document.body.style.opacity = '0';

  window.addEventListener('load', () => {
    setTimeout(() => {
      document.body.style.opacity = '1';
      document.body.style.transition = 'opacity .4s ease';
    }, 50);
  });
}


// ================= PROJECT FILTER =================
function initProjectFilter() {
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');

  if (!buttons.length) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      cards.forEach(card => {
        card.style.display = (filter === 'all' || card.dataset.category === filter) ? "block" : "none";
        card.style.opacity = (filter === 'all' || card.dataset.category === filter) ? "1" : "0";
      });
    });
  });
}


// ================= INITIALIZATION =================
document.addEventListener('DOMContentLoaded', () => {
  new MatrixRain();

  const typingElement = document.getElementById('typing-text');
  if (typingElement) {
    new TypeWriter(typingElement, [
      "Hi, I'm Afifatul",
      "I'm interested in the world of IT",
      "I like reading books and watching movies"
    ]);
  }

  initNavigation();
  initBackToTop();
  initPageTransition();
  initProjectFilter();
});
