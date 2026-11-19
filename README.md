# Parv Sharma — Personal Engineering Portfolio
> **Electronics and Communication Engineering | SRM Institute of Science and Technology**  
> *Second Year | Third Semester*

A complete, modern, interactive, and professional engineering portfolio designed with a deep-navy technical aesthetic inspired by electronic schematics, electromagnetic wave dynamics, semiconductor physics, and digital interfaces.

---

## ⚡ Key Highlights & Integrated Project Assets

- **Actual High-Resolution Academic Assets Integrated**:
  - **Module 1: Electrostatics Formula Mindmap & Quick Revision** (`assets/unit1_electrostatics_poster.png` — 3072 × 4096 px): Synthesizes Vector Algebra, Coordinate Conversions, Differential Elements, Vector Calculus, Coulomb's/Gauss's laws, Electric Potential, and Maxwell's Electrostatic Equations.
  - **Module 3: Electromagnetic Waves & Waveguides Technical Poster** (`assets/unit3_waves_waveguides_poster.jpg` — 1620 × 2164 px): Covers wave propagation in lossy/lossless media, free-space impedance, skin depth $\delta$, Poynting vector power density, rectangular waveguides, TE/TM modes, and cutoff frequencies.
  - **Electromagnetic Interference (EMI) & EMC Presentation** (`assets/emi_presentation/` & `assets/docs/EMTI_What_is_EMI_Presentation.pptx`): Explores noise sources, conducted vs. radiated travel paths, intrasystem vs. intersystem EMI, and reduction methods (grounding, shielding, filtering).
  - **EM Wave Visualizer Standalone Web App** (`assets/wave_visualizer/`): Complete Three.js 3D application, plus Python numerical modeling (`wave_visualizer.py` with Plotly and `app.py` with Streamlit).
- **Interactive Fullscreen Lightbox / Gallery**:
  - Click any poster or project image to open the fullscreen high-resolution viewer.
  - **No cropping or distortion**: Images are displayed with `object-contain` in their original aspect ratios.
  - **Zoom & Pan controls**: Zoom In (`+`), Zoom Out (`-`), and Reset (`0`).
  - **Gallery navigation**: Arrow Left / Right buttons and keyboard arrow shortcuts.
  - **Direct Document Downloads**: Download original high-res PDFs and presentations.
- **Interactive 3D EM Wave Simulator**: Real-time orthogonal transverse electromagnetic ($\mathbf{E} \perp \mathbf{B} \perp \mathbf{k}$) plane wave simulation with Poynting vector ($\mathbf{S} = \mathbf{E} \times \mathbf{H}$), customizable polarization (Linear, Circular, Elliptical), and interactive 3D camera rotation.
- **Waveguide Modal Calculator**: Interactive TE/TM cutoff frequency ($f_c$), guide wavelength ($\lambda_g$), phase vs. group velocity ($v_p \cdot v_g = c^2$), and skin depth ($\delta$) calculator for microwave waveguides.
- **Interactive Formula Mindmap**: Structured mathematical knowledge graph mapping differential coordinate elements, gradient/divergence/curl, and Maxwell's equations.
- **EMTI Classroom Presentation Mode**: High-contrast classroom mode (Shortcut **`P`**) with direct highlighting of Unit 1 and Unit 3 coursework artifacts.

---

## 🚀 How to Run Locally

### Option 1: Instant Launch (Zero Installation)
Simply double-click:
```bash
open_portfolio.bat
```
or open `index.html` directly in **Google Chrome**, **Microsoft Edge**, or **Mozilla Firefox**.

### Option 2: Run Local Python Web Server
Double-click:
```bash
start_portfolio.bat
```
or execute in PowerShell / Terminal:
```bash
python start_server.py
```
This automatically launches an HTTP server on `http://localhost:3000` and opens your default browser.

---

## 📂 File Architecture

```
parv-sharma-portfolio/
├── index.html              # Main HTML5 layout, Tailwind configuration & Lightbox
├── start_server.py         # Lightweight Python 3 local server with auto-browser launch
├── start_portfolio.bat     # Windows batch script to launch the local server
├── open_portfolio.bat      # Instant launcher for index.html
├── README.md               # Project documentation and presentation guide
├── css/
│   └── style.css           # Custom themes, glassmorphism, circuit grid, lightbox, print styles
├── assets/
│   ├── unit1_electrostatics_poster.png        # Module 1 Formula Mindmap (3072x4096)
│   ├── unit3_waves_waveguides_poster.jpg      # Module 3 Waveguides Poster (1620x2164)
│   ├── docs/                                  # Downloadable original PDF & PPTX files
│   │   ├── EMTI_Module_1_Electrostatics_Formula_Mindmap.pdf
│   │   ├── EMTI_Module_3_Waves_and_Waveguides_Poster.pdf
│   │   └── EMTI_What_is_EMI_Presentation.pptx
│   ├── wave_visualizer/                       # Standalone Three.js app & Python scripts
│   │   ├── index.html
│   │   ├── wave_visualizer.py
│   │   └── app.py
│   └── emi_presentation/                      # Slide graphics from EMI presentation
└── js/
    ├── data.js             # Central data store (Bio, Interests, Skills, Projects, Gallery)
    ├── em-wave.js          # 60fps 3D isometric EM wave canvas simulator
    ├── waveguide-sim.js    # Interactive TE/TM waveguide mode and cutoff frequency simulator
    ├── mindmap-sim.js      # Interactive Unit 1 formula mindmap node graph
    └── app.js              # UI controller, lightbox, scrollspy, filtering, modals, shortcuts
```

---

## ⌨️ Keyboard Shortcuts

- **`P`**: Toggle EMTI Classroom Presentation Mode
- **`Esc`**: Close Lightbox / Active Modal
- **`ArrowRight` / `ArrowLeft`**: Next / Previous asset in Fullscreen Lightbox
- **`+` / `-`**: Zoom In / Zoom Out in Lightbox
- **`0`**: Reset Zoom to 100%

---

© 2026 Parv Sharma · Department of Electronics and Communication Engineering · SRMIST
