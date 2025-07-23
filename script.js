async function loadResume() {
    try {
        const res = await fetch('content.json');
        if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
        const data = await res.json();

        // Render header
        document.getElementById('name').textContent = data.name;
        document.getElementById('title').textContent = data.title;

        const nav = document.getElementById('contact');
        Object.entries(data.contact).forEach(([k, v]) => {
        const a = document.createElement('a');
        a.href = k === 'Email' ? 'mailto:' + v : 'https://' + v;
        a.textContent = k;
        nav.appendChild(a);
        });

        // Render sections with Animate.css effects and AOS attributes
        const main = document.getElementById('content');
        const effects = ['fadeInUp', 'fadeInLeft', 'fadeInRight', 'fadeInDown'];

        data.sections.forEach((sec, i) => {
        const section = document.createElement('section');
        section.className = `section animate__animated animate__${effects[i % effects.length]}`;
        section.setAttribute('data-aos', i % 2 === 0 ? 'fade-right' : 'fade-left');
        section.innerHTML = `<h2>${sec.heading}</h2>`;

        sec.items.forEach((item) => {
            const div = document.createElement('div');
            
            if (item.text) {
                div.innerHTML = `<p>${item.text}</p>`;
            }
            else if (item.role) {
            div.innerHTML = `
                <h3>${item.role} @ ${item.company}</h3>
                <span class="dates">${item.dates}</span>
                <ul>${item.details.map((d) => `<li>${d}</li>`).join('')}</ul>
            `;
            } else if (item.degree) {
            div.innerHTML = `
                <h3>${item.degree}, ${item.school}</h3>
                <span class="dates">${item.dates}</span>
            `;
            } else if (item.skill) {
            div.innerHTML = `
                <div class="skill-bar">
                <div class="skill-bar-label">${item.skill}</div>
                <div class="skill-bar-track">
                    <div class="skill-bar-fill" data-level="${item.level}"></div>
                </div>
                </div>
            `;
            }

            section.appendChild(div);
        });

        main.appendChild(section);
        });

        // Animate skill bars fill width
        document.querySelectorAll('.skill-bar-fill').forEach((el) => {
        const pct = el.getAttribute('data-level');
        setTimeout(() => {
            el.style.width = pct + '%';
        }, 500);
        });
    } catch (err) {
        console.error(err);
        document.body.innerHTML = `
        <div style="
            padding: 2rem;
            text-align: center;
            font-family: 'Press Start 2P', monospace;
            color: yellow;
        ">
            <h2>Could not load content.json</h2>
            <pre>${err.message}</pre>
        </div>
        `;
    }
}

loadResume();

// Pac-Man dot eating animation

window.addEventListener('DOMContentLoaded', () => {
    const dotsContainer = document.querySelector('.dots-container');

    function createDots() {
        dotsContainer.innerHTML = ''; // Clear any existing dots

        const spacing = 60; // px between dots
        const totalDots = Math.floor(window.innerWidth / spacing);

        for (let i = 0; i <= totalDots; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        dot.style.left = `${i * spacing}px`;
        dotsContainer.appendChild(dot);
        }
    }

  createDots(); // Create dots on page load

    window.addEventListener('resize', createDots);

    const pacman = document.querySelector('.pacman');

    function checkDots() {
        const pacmanRect = pacman.getBoundingClientRect();
        const dots = document.querySelectorAll('.dot');

        dots.forEach(dot => {
        const dotRect = dot.getBoundingClientRect();

        if (pacmanRect.left > window.innerWidth) {
            dot.style.opacity = '1'; // Reset dots when Pac-Man loops
        } else if (pacmanRect.right > dotRect.left + 5 && dot.style.opacity !== '0') {
            dot.style.opacity = '0'; // Fade out dots when eaten
        }
        });

        // ----------- Footer dots ------------

    const footerDotsContainer = document.querySelector('.footer-dots');

    function createFooterDots() {
        footerDotsContainer.innerHTML = ''; // Clear existing footer dots

        const spacing = 50; // px between footer dots
        const totalDots = Math.floor(window.innerWidth / spacing);

        for (let i = 0; i <= totalDots; i++) {
            const dot = document.createElement('div');
            dot.classList.add('footer-dot');
            dot.style.left = `${i * spacing}px`;
            footerDotsContainer.appendChild(dot);
        }
    }

    createFooterDots();
    window.addEventListener('resize', createFooterDots);

    const footerPacman = document.querySelector('.footer-pacman');

    function checkFooterDots() {
    console.log('checkFooterDots called');

    function checkFooterDots() {
        const pacmanFootRect = footerPacman.getBoundingClientRect();
        const footerDots = document.querySelectorAll('.footer-dot');

        // Reset dots when footer Pac-Man has fully left screen on left
        if (pacmanFootRect.right < 0) {
            footerDots.forEach(dot => {
                dot.style.opacity = '1';
            });
            return;
        }

        footerDots.forEach(dot => {
            const dotRect = dot.getBoundingClientRect();

            // Fade out dots when footer Pac-Man overlaps
            if (
                pacmanFootRect.left < dotRect.right &&
                pacmanFootRect.right > dotRect.left &&
                dot.style.opacity !== '0'
            ) {
                dot.style.opacity = '0';
            }

        });
    }
    }
    }
    

    function animate() {
        checkDots();
        checkFooterDots();
        requestAnimationFrame(animate);
    }

    animate();
});
