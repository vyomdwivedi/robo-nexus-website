/* ===============================
   LINK PREFETCHING
   Preloads pages on hover for instant navigation
================================ */

// Prefetch pages when user hovers over links
document.addEventListener('DOMContentLoaded', () => {
  const prefetchedPages = new Set();
  
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    
    // Only prefetch internal HTML pages
    if (!href || href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto')) {
      return;
    }
    
    link.addEventListener('mouseenter', () => {
      // Don't prefetch the same page twice
      if (prefetchedPages.has(href)) return;
      
      // Create prefetch link
      const prefetchLink = document.createElement('link');
      prefetchLink.rel = 'prefetch';
      prefetchLink.href = href;
      prefetchLink.as = 'document';
      
      document.head.appendChild(prefetchLink);
      prefetchedPages.add(href);
      
      console.log(`🚀 Prefetched: ${href}`);
    }, { once: true }); // Only attach listener once
  });
});

// Optional: Prefetch on touchstart for mobile
if ('ontouchstart' in window) {
  document.addEventListener('touchstart', (e) => {
    const link = e.target.closest('a[href]');
    if (!link) return;
    
    const href = link.getAttribute('href');
    if (!href || href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto')) {
      return;
    }
    
    // Trigger prefetch immediately on touch
    const prefetchLink = document.createElement('link');
    prefetchLink.rel = 'prefetch';
    prefetchLink.href = href;
    document.head.appendChild(prefetchLink);
  }, { passive: true });
}
