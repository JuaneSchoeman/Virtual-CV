async function loadResume() {
    const res = await fetch('resume.json');
    const data = await res.json();

    // Header
    document.getElementById('name').textContent = data.name;
    document.getElementById('title').textContent = data.title;
    const nav = document.getElementById('contact');
    for (let [key, val] of Object.entries(data.contact)) {
        const a = document.createElement('a');
        a.href = (key === 'email' ? 'mailto:' : 'https://') + val;
        a.textContent = key;
        nav.appendChild(a);
    }

    // Main content
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
}

loadResume().catch(console.error);
