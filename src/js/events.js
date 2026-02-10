// Events Data - Fetched from JSON
let upcomingEvents = [];
let pastEvents = [];

// Fetch events from JSON
fetch('/src/js/events.json')
  .then(res => res.json())
  .then(data => {
    upcomingEvents = data.upcomingEvents;
    pastEvents = data.pastEvents;
    renderCalendar();
    renderUpcomingEvents();
    renderPastEvents();
  })
  .catch(err => {
    console.error('Error loading events:', err);
  });

// Calendar Data
function generateCalendarDays(year, month) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days = [];

  // Combine all events
  const allEvents = [
    ...upcomingEvents.map(e => ({ ...e, isPast: false })),
    ...pastEvents.map(e => ({ ...e, isPast: true }))
  ];

  for (let i = 0; i < firstDay; i++) {
    days.push({ day: '', event: null });
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
    const event = allEvents.find(e => e.date === dateStr);
    days.push({ day: i, event });
  }

  return days;
}

// Render Calendar
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

function renderCalendar() {
  const calendarGrid = document.getElementById('calendar-grid');
  const monthYear = document.getElementById('month-year');
  
  if (!calendarGrid || !monthYear) return;

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                  'July', 'August', 'September', 'October', 'November', 'December'];
  
  monthYear.textContent = `${months[currentMonth]} ${currentYear}`;
  
  const days = generateCalendarDays(currentYear, currentMonth);
  
  calendarGrid.innerHTML = days.map(d => `
    <div class="calendar-day ${d.event ? (d.event.isPast ? 'has-past-event' : 'has-event') : ''} ${d.day === '' ? 'empty' : ''}">
      <span class="day-number">${d.day}</span>
      ${d.event ? `<span class="event-dot ${d.event.isPast ? 'past' : ''}" title="${d.event.title}"></span>` : ''}
    </div>
  `).join('');
}

// Calendar Navigation
document.getElementById('prev-month')?.addEventListener('click', () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar();
});

document.getElementById('next-month')?.addEventListener('click', () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar();
});

// Render Upcoming Events
function renderUpcomingEvents() {
  const upcomingContainer = document.getElementById('upcoming-events');
  if (!upcomingContainer) return;

  upcomingContainer.innerHTML = upcomingEvents.map(event => `
    <div class="event-card reveal ${event.type}">
      <div class="event-date">
        <span class="event-day">${new Date(event.date).getDate()}</span>
        <span class="event-month">${new Date(event.date).toLocaleString('default', { month: 'short' })}</span>
      </div>
      <div class="event-details">
        <span class="event-type">${event.type}</span>
        <h3>${event.title}</h3>
        <p><i class="fas fa-clock"></i> ${event.time}</p>
        <p><i class="fas fa-map-marker-alt"></i> ${event.location}</p>
        <p class="event-desc">${event.description}</p>
        ${event.registrationOpen ? `
          <div class="event-spots">
            <div class="spots-bar">
              <div class="spots-fill" style="width: ${((event.spots - event.spotsLeft) / event.spots) * 100}%"></div>
            </div>
            <span>${event.spotsLeft} spots left</span>
          </div>
          <button class="register-btn" data-event="${event.id}">Register Now</button>
        ` : `<span class="coming-soon">Registration Opening Soon</span>`}
      </div>
    </div>
  `).join('');

  document.querySelectorAll('.register-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const eventId = btn.dataset.event;
      openRegistrationModal(eventId);
    });
  });
}

// Render Past Events
function renderPastEvents() {
  const pastContainer = document.getElementById('past-events');
  if (!pastContainer) return;

  pastContainer.innerHTML = pastEvents.map(event => `
    <div class="past-event-card reveal">
      <div class="past-event-image">
        <img src="${event.images[0]}" alt="${event.title}">
      </div>
      <div class="past-event-info">
        <span class="past-event-date">${new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        <h3>${event.title}</h3>
        <p>${event.description}</p>
        <div class="event-highlights">
          ${event.highlights.map(h => `<span class="highlight-tag"><i class="fas fa-check"></i> ${h}</span>`).join('')}
        </div>
      </div>
    </div>
  `).join('');
}

// Registration Modal
const regModal = document.getElementById('registration-modal');
const regForm = document.getElementById('registration-form');

function openRegistrationModal(eventId) {
  const event = upcomingEvents.find(e => e.id == eventId);
  if (!event || !regModal) return;

  document.getElementById('reg-event-title').textContent = event.title;
  document.getElementById('reg-event-id').value = eventId;
  regModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

document.querySelector('.reg-modal-close')?.addEventListener('click', () => {
  regModal.classList.remove('active');
  document.body.style.overflow = 'auto';
});

regForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const formData = new FormData(regForm);
  console.log('Registration:', Object.fromEntries(formData));
  
  alert('Registration successful! You will receive a confirmation email shortly.');
  regModal.classList.remove('active');
  document.body.style.overflow = 'auto';
  regForm.reset();
});
