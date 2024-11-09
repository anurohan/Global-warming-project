document.addEventListener('DOMContentLoaded', () => {
    // Create particles
    function createParticles() {
        const container = document.getElementById('particles');
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 3 + 's';
            container.appendChild(particle);
        }
    }

    // Initialize particles
    createParticles();

    // Parallax effect
    const parallaxBg = document.querySelector('.parallax-bg');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        parallaxBg.style.transform = `translateY(${scrolled * 0.5}px)`;
    });

    // Navigation scroll effect
    const nav = document.querySelector('.main-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.style.background = 'rgba(0, 0, 0, 0.9)';
            nav.style.padding = '0.5rem 1rem';
        } else {
            nav.style.background = 'rgba(0, 0, 0, 0.8)';
            nav.style.padding = '1rem';
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Initialize Charts
    const temperatureCtx = document.getElementById('temperatureChart').getContext('2d');
    new Chart(temperatureCtx, {
        type: 'line',
        data: {
            labels: ['1880', '1900', '1920', '1940', '1960', '1980', '2000', '2020'],
            datasets: [{
                label: 'Temperature Anomaly (°C)',
                data: [-0.16, -0.09, -0.27, 0.12, 0.03, 0.26, 0.39, 0.98],
                borderColor: 'rgb(239, 68, 68)',
                backgroundColor: 'rgba(239, 68, 68, 0.5)',
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { labels: { color: 'white' } },
                title: { display: true, text: 'Global Temperature Anomaly', color: 'white' }
            },
            scales: {
                y: { grid: { color: 'rgba(255, 255, 255, 0.1)' }, ticks: { color: 'white' } },
                x: { grid: { color: 'rgba(255, 255, 255, 0.1)' }, ticks: { color: 'white' } }
            }
        }
    });

    const emissionsCtx = document.getElementById('emissionsChart').getContext('2d');
    new Chart(emissionsCtx, {
        type: 'bar',
        data: {
            labels: ['1950', '1970', '1990', '2000', '2010', '2020'],
            datasets: [{
                label: 'CO₂ Emissions (billion tonnes)',
                data: [6, 15, 22, 25, 33, 36],
                backgroundColor: 'rgba(34, 197, 94, 0.6)'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { labels: { color: 'white' } },
                title: { display: true, text: 'Global CO₂ Emissions', color: 'white' }
            },
            scales: {
                y: { grid: { color: 'rgba(255, 255, 255, 0.1)' }, ticks: { color: 'white' } },
                x: { grid: { color: 'rgba(255, 255, 255, 0.1)' }, ticks: { color: 'white' } }
            }
        }
    });

    // Facts Carousel
    const facts = document.querySelectorAll('.fact-slide');
    const dotsContainer = document.querySelector('.carousel-dots');
    let currentFact = 0;

    // Create dots
    facts.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = `dot ${index === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => showFact(index));
        dotsContainer.appendChild(dot);
    });

    function showFact(index) {
        facts[currentFact].classList.remove('active');
        document.querySelectorAll('.dot')[currentFact].classList.remove('active');
        
        currentFact = index;
        facts[currentFact].classList.add('active');
        document.querySelectorAll('.dot')[currentFact].classList.add('active');
    }

    // Auto-advance carousel
    setInterval(() => {
        showFact((currentFact + 1) % facts.length);
    }, 5000);

    // Intersection Observer for animations
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        },
        { threshold: 0.1 }
    );

    // Observe all info cards
    document.querySelectorAll('.info-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'all 0.5s ease-out';
        observer.observe(card);
    });

    // Sliding tabs
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            tab.style.width = '200px';
        });
    });

    // Carbon footprint calculator
    const footprintForm = document.querySelector('.footprint-form');
    const resultContainer = document.querySelector('.result-container .result');

    footprintForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const miles = document.getElementById('miles').value;
        const household = document.getElementById('household').value;
        const result = calculateFootprint(miles, household);
        resultContainer.textContent = `Your estimated carbon footprint is ${result} tonnes of CO2 per year.`;
    });

    function calculateFootprint(miles, household) {
        // Implement the carbon footprint calculation logic here
        return (miles * 0.4 + household * 2.2).toFixed(2);
    }

    // Scroll Reveal Animation
    ScrollReveal().reveal('.info-card', { delay: 200 });
    ScrollReveal().reveal('.team-member', { delay: 200 });
    ScrollReveal().reveal('.resource-card', { delay: 200 });
    ScrollReveal().reveal('.contact-form', { delay: 200 });
});
// Add new charts
const seaLevelCtx = document.getElementById('seaLevelChart').getContext('2d');
new Chart(seaLevelCtx, {
    type: 'line',
    data: {
        labels: ['1900', '1920', '1940', '1960', '1980', '2000', '2020'],
        datasets: [{
            label: 'Sea Level Rise (mm)',
            data: [0, 20, 50, 100, 150, 200, 300],
            borderColor: 'rgb(30, 64, 175)',
            backgroundColor: 'rgba(30, 64, 175, 0.5)',
            tension: 0.4
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { labels: { color: 'white' } },
            title: { display: true, text: 'Global Sea Level Rise', color: 'white' }
        },
        scales: {
            y: { grid: { color: 'rgba(255, 255, 255, 0.1)' }, ticks: { color: 'white' } },
            x: { grid: { color: 'rgba(255, 255, 255, 0.1)' }, ticks: { color: 'white' } }
        }
    }
});

const glacierVolumeCtx = document.getElementById('glacierVolumeChart').getContext('2d');
new Chart(glacierVolumeCtx, {
    type: 'bar',
    data: {
        labels: ['1980', '1990', '2000', '2010', '2020'],
        datasets: [{
            label: 'Glacier Volume (km³)',
            data: [28000, 26000, 24000, 22000, 20000],
            backgroundColor: 'rgba(59, 130, 246, 0.6)'
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { labels: { color: 'white' } },
            title: { display: true, text: 'Global Glacier Volume', color: 'white' }
        },
        scales: {
            y: { grid: { color: 'rgba(255, 255, 255, 0.1)' }, ticks: { color: 'white' } },
            x: { grid: { color: 'rgba(255, 255, 255, 0.1)' }, ticks: { color: 'white' } }
        }
    }
});

// Feedback form submission
const feedbackForm = document.querySelector('.feedback-form');
const resultContainer = document.querySelector('.result-container');

feedbackForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const feedback = document.getElementById('feedback').value;

    // Implement your feedback submission logic here
    console.log('Feedback submitted:', { name, email, feedback });
    resultContainer.textContent = 'Thank you for your feedback!';
    feedbackForm.reset();
});

// Frequency of Extreme Weather Events Chart
const weatherEventsCtx = document.getElementById('weatherEventsChart').getContext('2d');
const weatherEventsChart = new Chart(weatherEventsCtx, {
    type: 'line',
    data: {
        labels: [2000, 2005, 2010, 2015, 2020], // Example years
        datasets: [
            {
                label: 'Hurricanes',
                data: [5, 8, 12, 14, 16], // Replace with actual data
                borderColor: 'rgb(255, 99, 132)',
                borderWidth: 2,
                fill: false
            },
            {
                label: 'Droughts',
                data: [10, 12, 15, 18, 22], // Replace with actual data
                borderColor: 'rgb(54, 162, 235)',
                borderWidth: 2,
                fill: false
            },
            {
                label: 'Wildfires',
                data: [20, 25, 30, 35, 45], // Replace with actual data
                borderColor: 'rgb(75, 192, 192)',
                borderWidth: 2,
                fill: false
            }
        ]
    },
    options: {
        responsive: true,
        scales: {
            x: {
                title: { display: true, text: 'Year' }
            },
            y: {
                title: { display: true, text: 'Number of Events' }
            }
        },
        plugins: {
            legend: { position: 'top' },
            tooltip: { mode: 'index', intersect: false }
        }
    }
});

// Emissions by Sector Chart
const emissionsSectorCtx = document.getElementById('emissionsSectorChart').getContext('2d');
const emissionsSectorChart = new Chart(emissionsSectorCtx, {
    type: 'line',
    data: {
        labels: [2000, 2005, 2010, 2015, 2020], // Example years
        datasets: [
            {
                label: 'Transportation',
                data: [100, 120, 150, 170, 200], // Replace with actual data
                borderColor: 'rgb(255, 159, 64)',
                borderWidth: 2,
                fill: false
            },
            {
                label: 'Industry',
                data: [80, 90, 110, 130, 160], // Replace with actual data
                borderColor: 'rgb(153, 102, 255)',
                borderWidth: 2,
                fill: false
            },
            {
                label: 'Agriculture',
                data: [60, 70, 85, 95, 110], // Replace with actual data
                borderColor: 'rgb(255, 205, 86)',
                borderWidth: 2,
                fill: false
            }
        ]
    },
    options: {
        responsive: true,
        scales: {
            x: {
                title: { display: true, text: 'Year' }
            },
            y: {
                title: { display: true, text: 'Emissions (MtCO₂)' }
            }
        },
        plugins: {
            legend: { position: 'top' },
            tooltip: { mode: 'index', intersect: false }
        }
    }
});

