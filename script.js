// script.js
async function loadResume() {
    try {
        const res = await fetch('content.json');
        if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
        const data = await res.json();

        // Render header
        document.getElementById('name').textContent  = data.name;
        document.getElementById('title').textContent = data.title;
        const nav = document.getElementById('contact');
        Object.entries(data.contact).forEach(([k, v]) => {
        const a = document.createElement('a');
        a.href        = (k === 'email' ? 'mailto:' : 'https://') + v;
        a.textContent = k;
        nav.appendChild(a);
        });

        // Render sections
        const main = document.getElementById('content');
        const effects = ['fadeInUp','fadeInLeft','fadeInRight','fadeInDown'];
        data.sections.forEach((sec, i) => {
        const section = document.createElement('section');
        section.className = `section animate__animated animate__${effects[i % effects.length]}`;
        section.setAttribute('data-aos', i % 2 === 0 ? 'fade-right' : 'fade-left');
        section.innerHTML = `<h2>${sec.heading}</h2>`;

        sec.items.forEach(item => {
            const div = document.createElement('div');

            if (item.role) {
            div.innerHTML = `
                <h3>${item.role} @ ${item.company}</h3>
                <span class="dates">${item.dates}</span>
                <ul>${item.details.map(d => `<li>${d}</li>`).join('')}</ul>
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

        // Animate skill bars
        document.querySelectorAll('.skill-bar-fill').forEach(el => {
        const pct = el.getAttribute('data-level');
        setTimeout(() => { el.style.width = pct + '%'; }, 200);
        });

    } catch (err) {
        console.error(err);
        document.body.innerHTML = `
        <div style="
            padding: 2rem;
            text-align: center;
            font-family: Georgia, serif;
            color: var(--accent1);
        ">
            <h2>Could not load content.json</h2>
            <pre>${err.message}</pre>
        </div>
        `;
    }
}

loadResume();

// Parallax scroll for ribbon and header
window.addEventListener('scroll', () => {
    const y = window.scrollY;
    document.getElementById('ribbon').style.transform         = `translateY(${y * 0.2}px)`;
    document.querySelector('.site-header').style.transform   = `translateY(${y * 0.1}px)`;
});