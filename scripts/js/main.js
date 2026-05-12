let logo = document.getElementById('logo');
let ship = document.getElementById('ship');
//scroll effect
window.addEventListener('scroll', () => {
    let value = window.scrollY;

    if (logo) logo.style.marginTop = value * -1.5 + 'px';
    if (ship) ship.style.transform = `translateX(${value * 1.5}px)`;
});

// Page transition handlers
window.addEventListener('load', () => {
    document.body.classList.add('fade-in');
    // Trigger reflow to start transition
    document.body.offsetHeight;
});

window.addEventListener('beforeunload', () => {
    document.body.classList.add('fade-out');
});

// Smooth navigation for links (optional enhancement for internal nav)
document.querySelectorAll('a[href^="/pages/"], a[href^="/index.html"]').forEach(link => {
    link.addEventListener('click', (e) => {
        document.body.classList.add('fade-out');
    });
});

//KEY FEATURES FUNCTIONS
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.feature-card');
    
    // 1. Intersection Observer for Reveal Effect
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active-scroll');
                // Optional: stop observing if you only want it to animate once
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    cards.forEach(card => observer.observe(card));

    // 2. Advanced Parallax Effect
    window.addEventListener('scroll', () => {
        const viewportHeight = window.innerHeight;

        cards.forEach((card) => {
            const img = card.querySelector('.feature-media img');
            if (!img) return;

            // Get the bounding box of the card
            const rect = card.getBoundingClientRect();
            
            // Check if card is visible in viewport
            if (rect.top < viewportHeight && rect.bottom > 0) {
                // Calculate how far the card is from the center of the screen
                // 0 = centered, negative = above center, positive = below center
                const centerOffset = rect.top + rect.height / 2 - viewportHeight / 2;
                
                const speed = 0.08; // Adjust for intensity
                const translateY = centerOffset * speed;

                img.style.transform = `translateY(${translateY}px)`;
            }
        });
    });
});

// DEVS SECTION FUNCTIONS
const total = 5;
let current = 2;

function getPositions() {
  const cw = Math.min(window.innerWidth * 0.18, 260); // matches card width clamp
  return [
    { x: -cw * 2.0, scale: 0.42, z: 0, opacity: 0.45 },
    { x: -cw * 1.8, scale: 0.62, z: 1, opacity: 0.65 },
    { x: -cw * 0.9, scale: 0.78, z: 2, opacity: 0.80 },
    { x: 0,         scale: 1.0,  z: 5, opacity: 1.00 },
    { x: cw * 0.9,  scale: 0.78, z: 2, opacity: 0.80 },
    { x: cw * 1.8,  scale: 0.62, z: 1, opacity: 0.65 },
    { x: cw * 2.3,  scale: 0.42, z: 0, opacity: 0.45 },
  ];
}

const people = [
  { name: "Adrian Marquez",   role: "UI/UX Dev",  lang: "Figma",   avatar: "assets/img/Marquez.png" },
  { name: "Wency Jae Villegas",     role: "Game Developer/Front End",   lang: "Python, Java, JavaScript", avatar: "assets/img/Villegas.png" },
  { name: "Josh Arrieta",   role: "Game Dev/Front End",    lang: "Python, Java, JavaScript", avatar: "assets/img/Arrieta.png" },
  { name: "Aldred Naranjo",     role: "UI/UX Dev",        lang: "Figma",  avatar: "assets/img/Naranjo.png" },
  { name: "Flint Yabes",     role: "UI/UX Dev",     lang: "Figma",   avatar: "assets/img/Yabes.png" },
];

const purpleShades = [
  '#2d1541','#3d1e58','#4a2470','#5a2a82',
  '#4a2470','#3d1e58','#2d1541'
];
const track = document.getElementById('track');

if (track){

const cards = [];

for (let i = 0; i < total; i++) {
  const card = document.createElement('div');
  card.className = 'card';
  card.dataset.index = i;
  card.addEventListener('click', () => {
    const offset = i - current;
    if (offset !== 0) move(offset > 0 ? 1 : -1);
  });
  track.appendChild(card);
  cards.push(card);
}

function render() {
  const positions = getPositions();
  cards.forEach((card, i) => {
    const posIdx = (i - current) + 3;
    if (posIdx < 0 || posIdx >= positions.length) {
      card.style.opacity = '0';
      card.style.pointerEvents = 'none';
      return;
    }
    const p = positions[posIdx];
    card.style.opacity = p.opacity;
    card.style.zIndex = p.z;
    card.style.pointerEvents = 'auto';
    card.style.transform = `translateX(${p.x}px) scale(${p.scale})`;
    card.style.background = purpleShades[posIdx];

    const person = people[i];
    const cardW = Math.min(window.innerWidth * 0.18, 260);
    const imgSize = cardW * 0.85; // avatar scales with card

    card.innerHTML = `
      <div style="text-align:center; padding: 12px; width: 100%; font-family: 'Futuristic';">
        <div style="
          width: ${imgSize}px; height: ${imgSize}px;
          border-radius: 10%;
          background: ${person.avatar ? `url(${person.avatar}) center/cover` : '#3d1e58'};
          margin: 0 auto 8px;
          box-shadow: 0 0 15px 5px #0000006c;
        "></div>
        <div style="font-size: clamp(12px, 1.4vw, 18px); font-weight: 600;">${person.name}</div>
        <div style="font-size: clamp(10px, 1vw, 14px); opacity: 0.8; margin-top: 4px;">${person.role}</div>
        <div style="font-size: clamp(10px, 1vw, 14px); opacity: 0.6; margin-top: 2px;">${person.lang}</div>
      </div>
    `;
  });
}

// Re-render on resize so positions stay correct
window.addEventListener('resize', render);

function move(dir) {
  current = Math.max(0, Math.min(total - 1, current + dir));
  render();
}

document.getElementById('btn-prev').addEventListener('click', () => move(-1));
document.getElementById('btn-next').addEventListener('click', () => move(1));

render();
}