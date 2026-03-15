# ✦ Juané Schoeman — Virtual CV

A personal portfolio and interactive CV built with vanilla HTML, CSS, and JavaScript. Features a galaxy/nebula theme with animated stars, shooting stars, glowing cards, magnetic buttons, and smooth scroll transitions. All content is driven from a single `content.json` file — no frameworks, no build tools, no dependencies.

🌐 **Live site:** [juaneschoeman.github.io/Virtual-CV](https://juaneschoeman.github.io/Virtual-CV/)

---

## ✨ Features

- **Galaxy/nebula background** — animated canvas with 320 twinkling stars, coloured nebula clouds, and shooting stars
- **Custom cursor** — glowing purple dot with a smooth trailing ring
- **Typewriter effect** — cycles through role titles in the hero section
- **Magnetic buttons** — CTA and contact buttons subtly follow the cursor
- **Card shimmer & glow** — hover effects on all skill, project, and education cards
- **Smooth section transitions** — sections fade and rise into view on scroll
- **Fully data-driven** — all personal info lives in `content.json`, no HTML editing needed
- **Responsive** — mobile-friendly layout
- **Zero dependencies** — no frameworks, no npm, no build step

---

## 📁 Project Structure

```
Virtual-CV/
│
├── index.html       # HTML structure (no inline CSS or JS)
├── style.css        # Galaxy theme — all styles and animations
├── script.js        # All logic: content rendering, effects, interactions
├── content.json     # Your personal data — edit this to update the site
└── README.md        # You are here
```

---

## 🚀 Getting Started

**To view locally:**
1. Clone or download the repository
2. Open `index.html` in any modern browser — no server needed

```bash
git clone https://github.com/JuaneSchoeman/Virtual-CV.git
cd Virtual-CV
open index.html
```

> **Note:** Because `script.js` fetches `content.json` via `fetch()`, you may need to run a simple local server if your browser blocks local file requests. You can use VS Code's **Live Server** extension, or run:
> ```bash
> npx serve .
> ```

---

## ✏️ How to Customise

All personal content lives in **`content.json`**. Open it and update the fields — the site rebuilds automatically.

### Key fields to update:

```json
{
  "name": "Your Name",
  "bio": "A short paragraph about yourself.",
  "contact": {
    "email": "you@example.com",
    "github": "https://github.com/yourusername",
    "linkedin": "https://linkedin.com/in/yourprofile"
  }
}
```

### Adding a new project:
```json
{
  "number": "003",
  "title": "My New Project",
  "description": "What it does and what you built.",
  "stack": ["React", "Node.js", "PostgreSQL"],
  "github": "https://github.com/you/project",
  "live": "https://yourproject.com"
}
```

### Adding work experience:
```json
{
  "date": "Jan 2024 — Present",
  "company": "Company Name",
  "role": "Junior Developer",
  "description": [
    "What you built or contributed to.",
    "Technologies you used.",
    "Any impact or results."
  ]
}
```

---

## 🛠️ Built With

| Technology | Purpose |
|---|---|
| HTML5 | Page structure |
| CSS3 | Styling, animations, galaxy theme |
| Vanilla JavaScript | Content rendering, canvas effects, interactions |
| Canvas API | Nebula clouds, stars, shooting stars |
| Google Fonts | Playfair Display, DM Sans, DM Mono |
| GitHub Pages | Hosting |

---

## 🌌 Effects Overview

| Effect | How it works |
|---|---|
| Nebula background | Canvas API radial gradients drawn as ellipses |
| Twinkling stars | 320 canvas circles with sine-wave alpha animation |
| Shooting stars | Canvas strokes with linear gradient fade, spawned on interval |
| Custom cursor | Two fixed `div`s following `mousemove` via `requestAnimationFrame` |
| Magnetic buttons | `mousemove` offset calculation on hover, reset on `mouseleave` |
| Card shimmer | CSS `::after` pseudo-element sweep triggered on `:hover` |
| Section reveal | `IntersectionObserver` toggling `.in-view` class |

---

## 📬 Contact

- **Email:** [juane@example.com](mailto:juane@example.com)
- **GitHub:** [@JuaneSchoeman](https://github.com/JuaneSchoeman)
- **LinkedIn:** [linkedin.com/in/](https://linkedin.com/in/)

---

<p align="center">Made with ♥ and stardust · <a href="https://juaneschoeman.github.io/Virtual-CV/">juaneschoeman.github.io/Virtual-CV</a></p>