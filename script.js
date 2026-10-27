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
