// Projects Data
const projects = [
  {
    id: 1,
    title: "Autonomous Line Follower",
    category: "robots",
    image: "../assets/images/project-placeholder.jpg",
    description: "A smart robot that follows lines using IR sensors with PID control for smooth navigation.",
    tech: ["Arduino", "IR Sensors", "Motor Driver"],
    status: "Completed",
    year: "2024"
  },
  {
    id: 2,
    title: "Smart Home Automation",
    category: "iot",
    image: "../assets/images/project-placeholder.jpg",
    description: "IoT-based home automation system controllable via mobile app and voice commands.",
    tech: ["ESP32", "Firebase", "Flutter"],
    status: "Completed",
    year: "2024"
  },
  {
    id: 3,
    title: "Gesture Controlled Robot",
    category: "robots",
    image: "../assets/images/project-placeholder.jpg",
    description: "Robot controlled by hand gestures using accelerometer and wireless communication.",
    tech: ["Arduino", "MPU6050", "NRF24L01"],
    status: "Completed",
    year: "2024"
  },
  {
    id: 4,
    title: "Object Detection Drone",
    category: "drones",
    image: "../assets/images/project-placeholder.jpg",
    description: "Quadcopter with real-time object detection using computer vision.",
    tech: ["Raspberry Pi", "OpenCV", "Python"],
    status: "In Progress",
    year: "2025"
  },
  {
    id: 5,
    title: "AI Chatbot Assistant",
    category: "ai",
    image: "../assets/images/project-placeholder.jpg",
    description: "Custom trained chatbot for answering robotics-related queries.",
    tech: ["Python", "TensorFlow", "NLP"],
    status: "In Progress",
    year: "2025"
  },
  {
    id: 6,
    title: "Maze Solver Robot",
    category: "robots",
    image: "../assets/images/project-placeholder.jpg",
    description: "Autonomous robot that maps and solves mazes using flood-fill algorithm.",
    tech: ["Arduino", "Ultrasonic Sensors", "C++"],
    status: "Completed",
    year: "2024"
  },
  {
    id: 7,
    title: "Weather Station IoT",
    category: "iot",
    image: "../assets/images/project-placeholder.jpg",
    description: "Real-time weather monitoring system with cloud data logging.",
    tech: ["NodeMCU", "DHT22", "ThingSpeak"],
    status: "Completed",
    year: "2024"
  },
  {
    id: 8,
    title: "Face Recognition System",
    category: "ai",
    image: "../assets/images/project-placeholder.jpg",
    description: "Attendance system using facial recognition with high accuracy.",
    tech: ["Python", "OpenCV", "dlib"],
    status: "Completed",
    year: "2024"
  }
];

// Render Projects
const projectsGrid = document.getElementById('projects-grid');
const filterBtns = document.querySelectorAll('.filter-btn');
const modal = document.getElementById('project-modal');
const modalBody = document.getElementById('modal-body');
const modalClose = document.querySelector('.modal-close');

function renderProjects(filter = 'all') {
  const filtered = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);

  projectsGrid.innerHTML = filtered.map((project, index) => `
    <div class="project-card" data-id="${project.id}">
      <div class="project-image">
        <img src="${project.image}" alt="${project.title}" onerror="this.src='../assets/images/Robo_Nexus_Logo.png'">
        <div class="project-overlay">
          <span class="project-category">${project.category.toUpperCase()}</span>
          <span class="project-status ${project.status === 'Completed' ? 'completed' : 'progress'}">${project.status}</span>
        </div>
      </div>
      <div class="project-info">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="project-tech">
          ${project.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
        </div>
        <button class="view-project-btn" data-id="${project.id}">View Details <i class="fas fa-arrow-right"></i></button>
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
    renderProjects(btn.dataset.filter);
  });
});

// Modal
function openModal(id) {
  const project = projects.find(p => p.id == id);
  if (!project) return;

  modalBody.innerHTML = `
    <div class="modal-image">
      <img src="${project.image}" alt="${project.title}" onerror="this.src='../assets/images/Robo_Nexus_Logo.png'">
    </div>
    <div class="modal-info">
      <span class="modal-category">${project.category.toUpperCase()}</span>
      <h2>${project.title}</h2>
      <p class="modal-year"><i class="fas fa-calendar"></i> ${project.year}</p>
      <p class="modal-desc">${project.description}</p>
      <div class="modal-tech">
        <h4>Technologies Used:</h4>
        ${project.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
      </div>
      <div class="modal-status">
        <span class="${project.status === 'Completed' ? 'completed' : 'progress'}">
          <i class="fas ${project.status === 'Completed' ? 'fa-check-circle' : 'fa-spinner fa-spin'}"></i>
          ${project.status}
        </span>
      </div>
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

modalClose.addEventListener('click', () => {
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
});

// Initialize
renderProjects();
