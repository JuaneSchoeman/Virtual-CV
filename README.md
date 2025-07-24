# Virtual-CV

An animated, Pac‑Man‑themed **interactive CV** built with **HTML, CSS, and JavaScript**.  

It features:
- A **scrolling resume** populated from `content.json`.
- **Animated Pac‑Man and ghosts** chasing across the screen.
- **Dots** that Pac‑Man “eats” along the top and in the footer.
- **Responsive layout** and retro arcade style using the "Press Start 2P" font.

---

## Demo

Open `index.html` in any browser to view the CV.

---

## Project Structure

project/  
│  
├── index.html       # Main HTML file  
├── style.css        # Styling for layout, animations, and theme  
├── script.js        # JS for rendering sections and animations  
├── content.json     # Resume data (name, sections, contact info)  
└── README.md        # Project documentation  

---

## How It Works

1. **Resume Content**  
   - All personal info, experience, and skills are stored in `content.json`.  
   - `script.js` dynamically loads this content into `index.html`.  

2. **Animations**  
   - Pac‑Man and ghosts are animated using CSS keyframes.  
   - Dots are created dynamically with JavaScript and disappear when eaten by Pac‑Man.  

3. **Styling**  
   - Uses **Google Fonts** (`Press Start 2P`) for a retro look.  
   - **AOS (Animate On Scroll)** library for animated section reveals.  

---

## Setup & Usage

1. **Download or clone** the repository.  
2. Open `index.html` in a browser (no server needed).  
3. To customize the resume:  
   - Edit `content.json` with your own info.  
   - Adjust colors or animations in `style.css`.  

---

## Links & Credits

- **Fonts:** [Press Start 2P](https://fonts.google.com/specimen/Press+Start+2P)  
- **Animations:** [Animate.css](https://animate.style/) & [AOS](https://michalsnik.github.io/aos/)  
- **Pac‑Man & Ghost Design:** Inspired by the original **Namco Pac‑Man** arcade game.  

---

## Future Improvements

- Add **mobile optimizations** for smaller screens.  
- Add **flash effect** to frightened ghosts (like in the real game).  
- Export as **PDF CV** for easy sharing.  
