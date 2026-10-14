export function scrollToTopFast() {
  if (typeof window === 'undefined') return;
  const start = window.scrollY || document.documentElement.scrollTop;
  if (start === 0) return;
  const startTime = performance.now();
  const duration = 280;

  function step(currentTime: number) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    window.scrollTo(0, start * (1 - ease));
    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }
  requestAnimationFrame(step);
}
