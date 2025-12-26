const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');
const hoverTriggers = document.querySelectorAll('.hover-trigger');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    if (cursorDot) {
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;
    }

    if (cursorOutline && window.gsap) {
        gsap.to(cursorOutline, {
            x: posX,
            y: posY,
            duration: 0.15,
            ease: "power2.out"
        });
    }
});

hoverTriggers.forEach(link => {
    link.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
    link.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
});

const tl = window.gsap ? gsap.timeline() : { to: () => ({ to: () => ({ from: () => ({ from: () => {} }) }) }) };

tl.to('.loader-progress', {
    width: '100%',
    duration: 2,
    ease: "power2.inOut",
    onUpdate: function() {
        const progress = Math.round(this.progress() * 100);
        const el = document.getElementById('loader-text');
        if (el) el.innerText = `LOADING CORE SYSTEM... ${progress}%`;
    }
})
.to('.cyber-loader', {
    y: '-100%',
    duration: 0.8,
    ease: "power4.inOut",
    delay: 0.2
})
.from('.hero h1', {
    y: 100,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: "power2.out"
})
.from('.hacker-text', {
    opacity: 0,
    duration: 1
}, "-=0.5");

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";

const hackerEl = document.querySelector(".hacker-text");
if (hackerEl) {
    hackerEl.addEventListener('mouseover', (event) => {
        let iterations = 0;
        const target = event.target;
        
        const interval = setInterval(() => {
            target.innerText = target.innerText
                .split("")
                .map((letter, index) => {
                    if(index < iterations) {
                        return target.dataset.value[index];
                    }
                    return letters[Math.floor(Math.random() * letters.length)];
                })
                .join("");
            
            if(iterations >= target.dataset.value.length){ 
                clearInterval(interval);
            }
            
            iterations += 1 / 3;
        }, 30);
    });

    setTimeout(() => {
        const ev = new Event('mouseover');
        hackerEl.dispatchEvent(ev);
    }, 3500);
}