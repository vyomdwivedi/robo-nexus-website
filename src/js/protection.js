// Disable right-click context menu
document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

// Disable keyboard shortcuts for inspect/view source
document.addEventListener('keydown', (e) => {
  // F12
//  if (e.key === 'F12') {
//    e.preventDefault();
//  }
  // Ctrl+Shift+I (Inspect)
  if (e.ctrlKey && e.shiftKey && e.key === 'I') {
    e.preventDefault();
  }
  // Ctrl+Shift+J (Console)
  if (e.ctrlKey && e.shiftKey && e.key === 'J') {
    e.preventDefault();
  }
  // Ctrl+U (View Source)
  if (e.ctrlKey && e.key === 'u') {
    e.preventDefault();
  }
  // Ctrl+S (Save)
  if (e.ctrlKey && e.key === 's') {
    e.preventDefault();
  }
  // Ctrl+Shift+C (Inspect Element)
  if (e.ctrlKey && e.shiftKey && e.key === 'C') {
    e.preventDefault();
  }
});

// Disable text selection
document.addEventListener('selectstart', (e) => {
  e.preventDefault();
});

// Disable drag on images
document.addEventListener('dragstart', (e) => {
  if (e.target.tagName === 'IMG') {
    e.preventDefault();
  }
});

// Disable copy
document.addEventListener('copy', (e) => {
  e.preventDefault();
});
