// For screenshots
const screenshotData = [
    { 
        img: "/assets/img/seeker.gif", 
        title: "Seeker", 
        desc: "A fast, aggressive unit that continuously homes in on the player, applying constant pressure with sharp turns and steady acceleration." 
    },
    { 
        img: "/assets/img/elite_seeker.gif", 
        title: "Elite Seeker", 
        desc: "A tougher and faster variant of the Seeker, trading turning speed for stronger pursuit and higher survivability." 
    },
    { 
        img: "/assets/img/shooter.gif", 
        title: "Blaster", 
        desc: "A tactical unit that repositions across the battlefield, then stops to fire controlled shots while strafing around the player." 
    },
    {
        img: "/assets/img/elite_shooter.gif", 
        title: "Elite Blaster", 
        desc: "An advanced shooter that fires rapid alternating shots from dual sides, creating harder-to-dodge bullet patterns." 
    },
    {
        img: "/assets/img/teleporter.gif", 
        title: "Warper", 
        desc: "A disruptive enemy that blinks across the arena and unleashes radial bursts of bullets, forcing constant repositioning." 
    },
    {
        img: "/assets/img/charger.gif", 
        title: "Charger",
        desc: "A massive boss that locks onto the player, charges at high speed, and punishes mistakes with powerful collisions and bullet bursts." 
    },
    {
        img: "/assets/img/mothership.gif",
        title: "Mothership", 
        desc: "A stationary boss that dominates the battlefield with rotating bullet patterns and overwhelming projectile waves over time." 
    },
    
];

function initCarousel(trackId, prevBtnId, nextBtnId, data, isScreenshot = false) {
    const track = document.getElementById(trackId);
    if (!track) return;

    let current = 2;
    const cards = [];
    const total = data.length;

    // Helper to calculate positions
    function getPositions() {
        const cw = isScreenshot ? Math.min(window.innerWidth * 0.25, 400) : Math.min(window.innerWidth * 0.18, 260);
        return [
            { x: -cw * 2.0, scale: 0.42, z: 0, opacity: 0.2 },
            { x: -cw * 1.5, scale: 0.62, z: 1, opacity: 0.5 },
            { x: -cw * 0.8, scale: 0.80, z: 2, opacity: 0.8 },
            { x: 0,         scale: 1.0,  z: 5, opacity: 1.0 }, 
            { x: cw * 0.8,  scale: 0.80, z: 2, opacity: 0.8 },
            { x: cw * 1.5,  scale: 0.62, z: 1, opacity: 0.5 },
            { x: cw * 2.0,  scale: 0.42, z: 0, opacity: 0.2 },
        ];
    }

    // Create cards
    data.forEach((item, i) => {
        const card = document.createElement('div');
        card.className = isScreenshot ? 'ss-card' : 'card';
        
        if (isScreenshot) {
            card.innerHTML = `<img src="${item.img}" alt="Screenshot">`;
        } else {
            // Your existing Dev card innerHTML logic...
            card.innerHTML = `<div style="text-align:center; padding:12px;">...</div>`; 
        }

        card.addEventListener('click', () => {
            const offset = i - current;
            if (offset !== 0) move(offset > 0 ? 1 : -1);
        });
        track.appendChild(card);
        cards.push(card);
    });

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
            card.style.transform = `translateX(${p.x}px) scale(${p.scale})`;
            if (!isScreenshot) card.style.background = purpleShades[posIdx];
        });

        // Update the Text Caption
        const currentTitle = document.getElementById('ss-title');
        const currentDesc = document.getElementById('ss-desc');
        
        if (currentTitle && currentDesc && isScreenshot) {
            currentTitle.innerText = data[current].title;
            currentDesc.innerText = data[current].desc;
            
            // Optional: Add a quick fade effect
            currentTitle.style.opacity = 0;
            setTimeout(() => { currentTitle.style.opacity = 1; }, 50);
        }

        cards.forEach((card, i) => {
            // ... (keep all your existing card transform/opacity logic here)
        });
    }

    function move(dir) {
        current = Math.max(0, Math.min(total - 1, current + dir));
        render();
    }

    document.getElementById(prevBtnId).addEventListener('click', () => move(-1));
    document.getElementById(nextBtnId).addEventListener('click', () => move(1));
    window.addEventListener('resize', render);
    render();
}

// Initialize based on what exists on the page
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Screenshots (Home Page)
    initCarousel('ss-track', 'ss-prev', 'ss-next', screenshotData, true);
    
    // Initialize Devs (Devs Page)
    if (typeof people !== 'undefined') {
        initCarousel('track', 'btn-prev', 'btn-next', people, false);
    }
});

