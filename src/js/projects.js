// Tutorials Data - Fetched from JSON
let tutorials = [];

const tutorialsGrid = document.getElementById('projects-grid');
const filterBtns = document.querySelectorAll('.filter-btn');
const modal = document.getElementById('project-modal');
const modalBody = document.getElementById('modal-body');
const modalClose = document.querySelector('.modal-close');

// Fetch tutorials from JSON
fetch('/src/js/tutorials.json')
  .then(res => res.json())
  .then(data => {
    tutorials = data.tutorials;
    renderTutorials();
  })
  .catch(err => {
    console.error('Error loading tutorials:', err);
    if (tutorialsGrid) {
      tutorialsGrid.innerHTML = '<p style="text-align:center; color: #47a0b8;">Tutorials loading...</p>';
    }
  });

function renderTutorials(filter = 'all') {
  if (!tutorialsGrid) return;
  
  const filtered = filter === 'all' 
    ? tutorials 
    : tutorials.filter(t => t.category === filter);

  tutorialsGrid.innerHTML = filtered.map((tutorial) => `
    <div class="project-card" data-id="${tutorial.id}">
      <div class="project-image">
        <img src="${tutorial.image}" alt="${tutorial.title}" onerror="this.src='/src/assets/images/Robo_Nexus_Logo.png'">
        <div class="project-overlay">
          <span class="project-category">${tutorial.category.toUpperCase()}</span>
          <span class="project-status ${tutorial.status === 'Completed' ? 'completed' : 'progress'}">${tutorial.status}</span>
        </div>
      </div>
      <div class="project-info">
        <h3>${tutorial.title}</h3>
        <p>${tutorial.description}</p>
        <div class="project-tech">
          ${tutorial.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
        </div>
        <button class="view-project-btn" data-id="${tutorial.id}">View Details <i class="fas fa-arrow-right"></i></button>
      </div>
    </div>
  `).join('');

  // Add click listeners
  document.querySelectorAll('.view-project-btn').forEach(btn => {
    btn.addEventListener('click', () => openModal(btn.dataset.id));
  });
}

// Filter functionality
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderTutorials(btn.dataset.filter);
  });
});

// Modal
function openModal(id) {
  const tutorial = tutorials.find(t => t.id == id);
  if (!tutorial || !modal) return;

  modalBody.innerHTML = `
    <div class="modal-image">
      <img src="${tutorial.image}" alt="${tutorial.title}" onerror="this.src='/src/assets/images/Robo_Nexus_Logo.png'">
    </div>
    <div class="modal-info">
      <span class="modal-category">${tutorial.category.toUpperCase()}</span>
      <h2>${tutorial.title}</h2>
      <p class="modal-year"><i class="fas fa-calendar"></i> ${tutorial.year}</p>
      <p class="modal-desc">${tutorial.description}</p>
      <div class="modal-tech">
        <h4>Technologies Used:</h4>
        ${tutorial.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
      </div>
      <div class="modal-status">
        <span class="${tutorial.status === 'Completed' ? 'completed' : 'progress'}">
          <i class="fas ${tutorial.status === 'Completed' ? 'fa-check-circle' : 'fa-spinner fa-spin'}"></i>
          ${tutorial.status}
        </span>
      </div>
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

if (modalClose) {
  modalClose.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  });
}

if (modal) {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });
}
