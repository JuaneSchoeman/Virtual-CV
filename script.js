// script.js

async function loadResume() {
    try {
        console.log('Attempting to load content.json…');

        // Try relative path first, then absolute if that fails
        let res = await fetch('./content.json');
        console.log('Fetch ./content.json →', res.status, res.statusText);

        if (!res.ok) {
        console.warn('Retrying with absolute path /content.json');
        res = await fetch('/content.json');
        console.log('Fetch /content.json →', res.status, res.statusText);
        }

        if (!res.ok) {
        throw new Error(`Fetch failed: ${res.status} ${res.statusText}`);
        }

        const raw = await res.text();
        console.log('Raw response text:', raw.slice(0, 200));

        let data;
        try {
        data = JSON.parse(raw);
        } catch (parseErr) {
        throw new Error(`JSON parse error: ${parseErr.message}`);
        }

        console.log('Parsed JSON:', data);

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
        console.error('Error in loadResume:', err);
        document.body.innerHTML = `
        <div style="
            color: var(--accent1);
            font-family: Georgia, serif;
            padding: 2rem;
            text-align: center;
        ">
            <h2>Failed to load content.json</h2>
            <p>${err.message}</p>
            <p>See console for more details.</p>
        </div>
        `;
    }
}

loadResume();
