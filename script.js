document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 80, 
          behavior: 'smooth'
        });
      }
    });
  });

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.2
  });

  const sections = document.querySelectorAll('.section');
  sections.forEach(section => {
    observer.observe(section);
  });

  // كود النص المتحرك
  const professions = [
    "رئيس حسابات",
    "مدير مالي",
    "محلل مالي",
    "مراجع حسابات",
    "وائل عثمان"
  ];
  let professionIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const animatedTextElement = document.querySelector('.animated-text');

  function typeProfession() {
    const currentProfession = professions[professionIndex];
    if (isDeleting) {
      animatedTextElement.textContent = currentProfession.substring(0, charIndex - 1);
      charIndex--;
    } else {
      animatedTextElement.textContent = currentProfession.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentProfession.length + 1) {
      setTimeout(() => isDeleting = true, 1500);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      professionIndex = (professionIndex + 1) % professions.length;
      setTimeout(typeProfession, 500);
    } else {
      const typingSpeed = isDeleting ? 75 : 150;
      setTimeout(typeProfession, typingSpeed);
    }
  }

  typeProfession();
});