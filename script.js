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
            legend: {
                labels: { color: 'white' }
            },
            title: {
                display: true,
                text: 'Global Temperature Anomaly',
                color: 'white'
            }
        },
        scales: {
            y: {
                grid: { color: 'rgba(255, 255, 255, 0.1)' },
                ticks: { color: 'white' }
            },
            x: {
                grid: { color: 'rgba(255, 255, 255, 0.1)' },
                ticks: { color: 'white' }
            }
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
            legend: {
                labels: { color: 'white' }
            },
            title: {
                display: true,
                text: 'Global CO₂ Emissions',
                color: 'white'
            }
        },
        scales: {
            y: {
                grid: { color: 'rgba(255, 255, 255, 0.1)' },
                ticks: { color: 'white' }
            },
            x: {
                grid: { color: 'rgba(255, 255, 255, 0.1)' },
                ticks: { color: 'white' }
            }
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