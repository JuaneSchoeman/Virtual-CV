// script.js

async function loadResume() {
    try {
        // fetch content.json
        const res = await fetch('content.json');
        if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);

        const data = await res.json();

        // render header
        document.getElementById('name').textContent    = data.name;
        document.getElementById('title').textContent   = data.title;
        const nav = document.getElementById('contact');
        Object.entries(data.contact).forEach(([k,v]) => {
        const a = document.createElement('a');
        a.href = (k === 'email' ? 'mailto:' : 'https://' ) + v;
        a.textContent = k;
        nav.appendChild(a);
        });

        // render sections
        const main = document.getElementById('content');
        data.sections.forEach((sec,i) => {
        const section = document.createElement('section');
        section.className = 'section';
        section.setAttribute('data-aos', i%2? 'fade-left':'fade-right');
        section.innerHTML = `<h2>${sec.heading}</h2>`;
        sec.items.forEach(item => {
            const div = document.createElement('div');
            if (item.role) {
            div.innerHTML = `
                <h3>${item.role} @ ${item.company}</h3>
                <span class="dates">${item.dates}</span>
                <ul>${item.details.map(d=>`<li>${d}</li>`).join('')}</ul>
            `;
            } else {
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
        console.error(err);
        document.body.innerHTML = `
        <div style="padding:2rem; text-align:center; font-family:Georgia, serif; color:#E63946;">
            <h2>Could not load content.json</h2>
            <pre>${err.message}</pre>
        </div>
        `;
    }
}

// kick off
loadResume();
