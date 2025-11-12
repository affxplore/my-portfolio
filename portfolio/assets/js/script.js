// ================= MATRIX BACKGROUND =================
class MatrixRain {
  constructor() {
    this.canvas = document.getElementById('matrix-canvas');
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン01';
    this.charArray = this.chars.split('');
    this.fontSize = 14;
    this.columns = this.canvas.width / this.fontSize;
    this.drops = [];

    for (let i = 0; i < this.columns; i++) {
      this.drops[i] = Math.random() * -100;
    }

    this.draw();

    window.addEventListener('resize', () => {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      this.columns = this.canvas.width / this.fontSize;
      this.drops = [];
      for (let i = 0; i < this.columns; i++) {
        this.drops[i] = Math.random() * -100;
      }
    });
  }

  draw() {
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.fillStyle = '#00FFFF';
    this.ctx.font = this.fontSize + 'px monospace';

    for (let i = 0; i < this.drops.length; i++) {
      const char = this.charArray[Math.floor(Math.random() * this.charArray.length)];
      this.ctx.fillText(char, i * this.fontSize, this.drops[i] * this.fontSize);

      if (this.drops[i] * this.fontSize > this.canvas.height && Math.random() > 0.975) {
        this.drops[i] = 0;
      }
      this.drops[i]++;
    }

    requestAnimationFrame(() => this.draw());
  }
}

// ================= TYPING EFFECT =================
class TypeWriter {
  constructor(element, texts, speed = 100, deleteSpeed = 50, pauseTime = 2000) {
    this.element = element;
    this.texts = texts;
    this.speed = speed;
    this.deleteSpeed = deleteSpeed;
    this.pauseTime = pauseTime;
    this.textIndex = 0;
    this.charIndex = 0;
    this.isDeleting = false;
    this.type();
  }

  type() {
    const currentText = this.texts[this.textIndex];

    if (this.isDeleting) {
      this.element.textContent = currentText.substring(0, this.charIndex - 1);
      this.charIndex--;
    } else {
      this.element.textContent = currentText.substring(0, this.charIndex + 1);
      this.charIndex++;
    }

    let timeout = this.isDeleting ? this.deleteSpeed : this.speed;

    if (!this.isDeleting && this.charIndex === currentText.length) {
      timeout = this.pauseTime;
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.textIndex = (this.textIndex + 1) % this.texts.length;
      timeout = 500;
    }

    setTimeout(() => this.type(), timeout);
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
      if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
  }

  // Highlight active link
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-menu a');
  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });
}

// ================= BACK TO TOP BUTTON =================
function initBackToTop() {
  const backToTopBtn = document.querySelector('.back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ================= CONTACT MODAL =================
function openContact() {
  document.getElementById("contactModal").classList.add("active");
}

function closeContact() {
  document.getElementById("contactModal").classList.remove("active");
}

window.addEventListener("click", function (event) {
  const modal = document.getElementById("contactModal");
  if (event.target === modal) {
    closeContact();
  }
});

// ================= PAGE TRANSITION =================
function initPageTransition() {
  document.body.style.opacity = '0';

  window.addEventListener('load', () => {
    setTimeout(() => {
      document.body.style.transition = 'opacity 0.5s ease';
      document.body.style.opacity = '1';
    }, 100);
  });

  const navLinks = document.querySelectorAll('a[href]');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && !link.hasAttribute('target')) {
        e.preventDefault();
        document.body.style.opacity = '0';
        setTimeout(() => {
          window.location.href = href;
        }, 300);
      }
    });
  });
}

// ================= PROJECT FILTER =================
function initProjectFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterButtons.length === 0 || projectCards.length === 0) return;

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // hapus class aktif dari semua tombol
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
          setTimeout(() => (card.style.opacity = '1'), 50);
        } else {
          card.style.opacity = '0';
          setTimeout(() => (card.style.display = 'none'), 300);
        }
      });
    });
  });
}

// ================= INITIALIZATION =================
document.addEventListener('DOMContentLoaded', () => {
  new MatrixRain();

  const typingElement = document.getElementById('typing-text');
  if (typingElement) {
    const texts = [
      "Hi, I'm Afifatul",
      "I'm interested in the world of IT",
      "I like reading books and watching movies"
    ];
    new TypeWriter(typingElement, texts);
  }

  initNavigation();
  initBackToTop();
  initPageTransition();
  initProjectFilter(); // ✅ Tambahan fungsi filter project
});
