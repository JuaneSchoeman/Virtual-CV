// script.js

async function loadResume() {
    try {
        console.log('Loading resume…');

        const res = await fetch('resume.json');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();
        console.log('Resume JSON:', data);

        // Header rendering
        document.getElementById('name').textContent = data.name;
        document.getElementById('title').textContent = data.title;
        const nav = document.getElementById('contact');
        Object.entries(data.contact).forEach(([key, val]) => {
        const a = document.createElement('a');
        a.href = (key === 'email' ? 'mailto:' : 'https://') + val;
        a.textContent = key;
        nav.appendChild(a);
        });

        // Main content rendering
        const main = document.getElementById('content');
        data.sections.forEach((sec, i) => {
        const section = document.createElement('section');
        section.className = 'section';
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
            }

            section.appendChild(div);
        });

        main.appendChild(section);
        });

    } catch (err) {
        console.error('Failed to load or parse resume.json:', err);
        document.body.innerHTML = `
        <div style="
            color: #E63946;
            font-family: Georgia, serif;
            padding: 2rem;
            text-align: center;
        ">
            Error loading resume data. Check browser console for details.
        </div>
        `;
    }
}

loadResume();
