// Screenshot stacks: clicking a stack opens its dialog carousel at the clicked image.
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');

document.querySelectorAll('.gallery').forEach((gallery) => {
  const stack = gallery.querySelector('.gallery-stack');
  const dialog = gallery.querySelector('.lightbox');
  const track = dialog.querySelector('.lightbox-track');
  const counter = dialog.querySelector('.lightbox-counter');
  const count = track.children.length;

  const current = () => Math.round(track.scrollLeft / track.clientWidth);

  // Wraps around at both ends so the buttons never become disabled under focus.
  const goTo = (index, smooth = true) => {
    const i = (index + count) % count;
    track.scrollTo({
      left: i * track.clientWidth,
      behavior: smooth && !reduceMotion.matches ? 'smooth' : 'instant',
    });
  };

  const updateCounter = () => {
    if (counter) counter.textContent = `${current() + 1} / ${count}`;
  };

  stack.addEventListener('click', (event) => {
    const index = Number(event.target.closest('[data-index]')?.dataset.index ?? 0);
    dialog.showModal();
    goTo(index, false);
    updateCounter();
  });

  track.addEventListener('scroll', updateCounter, { passive: true });
  dialog.querySelector('.lightbox-prev')?.addEventListener('click', () => goTo(current() - 1));
  dialog.querySelector('.lightbox-next')?.addEventListener('click', () => goTo(current() + 1));
  dialog.querySelector('.lightbox-close').addEventListener('click', () => dialog.close());

  dialog.addEventListener('keydown', (event) => {
    if (count < 2) return;
    if (event.key === 'ArrowLeft') { event.preventDefault(); goTo(current() - 1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); goTo(current() + 1); }
  });

  // Clicking the empty area around the image closes the carousel.
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog || event.target.classList.contains('lightbox-slide')) dialog.close();
  });
});

// Highlight the menu link for the section currently in view.
const navLinks = [...document.querySelectorAll('.nav-list a[href^="#"]')];
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => {
      link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`);
    });
  });
}, { rootMargin: '-45% 0px -50% 0px' });
navLinks.forEach((link) => {
  const section = document.querySelector(link.getAttribute('href'));
  if (section) sectionObserver.observe(section);
});

// Fade content in as it scrolls into view (skipped when the visitor prefers less motion).
if (!reduceMotion.matches && 'IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });

  document.querySelectorAll(
    '.section h2, .section .container > p, .section h3, .stack > li, .project .gallery, .field, .steps li, .contact-list li'
  ).forEach((el) => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });
}
