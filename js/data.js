/**
 * Parv Sharma - Portfolio Data Store
 * Electronics and Communication Engineering
 * SRM Institute of Science and Technology
 */

window.PORTFOLIO_DATA = {
  profile: {
    name: "Parv Sharma",
    degree: "Electronics and Communication Engineering",
    institution: "SRM Institute of Science and Technology",
    campus: "Kattankulathur, Chennai, Tamil Nadu",
    department: "Department of Electronics and Communication Engineering",
    year: "Second Year",
    semester: "Third Semester",
    yearNum: 2,
    semNum: 3,
    headline: "Exploring the intersection of electronics, physics, and technology.",
    intro: "I am an Electronics and Communication Engineering student interested in understanding how theoretical engineering concepts translate into real-world technology. From electromagnetic simulations and circuit design to semiconductor technology and embedded systems, I enjoy exploring, building, and learning through practical projects.",
    bio: [
      "I'm Parv Sharma, currently pursuing Electronics and Communication Engineering at SRM Institute of Science and Technology.",
      "My interest in electronics extends beyond classroom learning. I enjoy understanding the underlying principles of electrical and electromagnetic systems and exploring how these concepts are implemented in real-world technology.",
      "Throughout my academic journey, I have worked on simulations, technical posters, academic visualizations, and programming-based projects that have helped me develop a practical understanding of engineering.",
      "I am particularly interested in exploring semiconductor technology, VLSI design, embedded systems, electromagnetics, and electronics-based problem solving.",
      "I believe engineering is best learned by combining theoretical understanding with experimentation, simulation, and practical implementation."
    ],
    contact: {
      emailPlaceholder: "parv.sharma@example.edu",
      linkedinPlaceholder: "https://linkedin.com/in/parv-sharma-ece",
      githubPlaceholder: "https://github.com/parvsharma-ece",
      location: "Chennai, India"
    }
  },

  technicalInterests: [
    {
      id: "electromagnetics",
      title: "ELECTROMAGNETICS",
      icon: "activity",
      badge: "Physics & Theory",
      description: "Understanding electromagnetic fields, wave propagation, Maxwell's equations, and electromagnetic applications.",
      keyTopics: [
        "Maxwell's Equations in Differential & Integral Forms",
        "Poynting Vector & Electromagnetic Power Flow",
        "Wave Propagation in Lossy & Lossless Dielectrics",
        "Boundary Conditions & Waveguide Cutoff Modes"
      ],
      appliedFocus: "EM wave visualization, RF propagation simulation, transmission line characteristics, antenna fundamentals."
    },
    {
      id: "semiconductor",
      title: "SEMICONDUCTOR TECHNOLOGY",
      icon: "cpu",
      badge: "Solid State",
      description: "Exploring semiconductor devices, PN junctions, fabrication processes, and the physical principles behind electronic components.",
      keyTopics: [
        "Energy Band Theory (Conduction, Valence, Fermi Level)",
        "Carrier Transport: Drift & Diffusion Currents",
        "PN Junction Depletion Region & Capacitance",
        "MOSFET Structure & Inversion Layer Physics"
      ],
      appliedFocus: "Device physics modeling, diode I-V characteristics, transition and diffusion capacitance, semiconductor materials (Si, GaAs, GaN)."
    },
    {
      id: "vlsi",
      title: "VLSI DESIGN",
      icon: "layers",
      badge: "Digital ICs",
      description: "Developing an interest in digital circuits, logic design, integrated circuits, and chip architecture.",
      keyTopics: [
        "CMOS Inverter Characteristics (Static & Dynamic)",
        "Combinational & Sequential Logic Optimization",
        "Propagation Delay & Power Dissipation",
        "Hardware Description Basics & Digital Datapaths"
      ],
      appliedFocus: "Transistor-level digital logic, stick diagrams, CMOS transmission gates, timing analysis."
    },
    {
      id: "embedded",
      title: "EMBEDDED SYSTEMS",
      icon: "chip",
      badge: "Hardware & Micro",
      description: "Exploring microcontrollers, sensors, hardware interfaces, and the integration of software with electronics.",
      keyTopics: [
        "Microcontroller Architecture (Harvard vs Von Neumann)",
        "GPIO, Timers, ADC, and PWM Peripherals",
        "Communication Protocols: I2C, SPI, UART",
        "Sensor Interfacing & Actuator Drive Circuits"
      ],
      appliedFocus: "Arduino and ESP32 prototyping, sensor data acquisition, hardware interrupt handling, firmware logic in C/C++."
    },
    {
      id: "circuit-design",
      title: "CIRCUIT DESIGN",
      icon: "git-commit",
      badge: "Analog & Modeling",
      description: "Understanding circuit behaviour through practical experimentation, simulation, and electronic component integration.",
      keyTopics: [
        "Kirchhoff's Laws & Network Theorems (Thevenin, Norton)",
        "RLC Transients & Frequency Response (Bode Plots)",
        "BJT & MOSFET Small-Signal Analysis",
        "Operational Amplifier Feedback Topologies"
      ],
      appliedFocus: "LTspice schematic capture and AC/DC sweeps, breadboard prototyping, signal conditioning, power rail decoupling."
    },
    {
      id: "programming",
      title: "PROGRAMMING",
      icon: "terminal",
      badge: "Simulations & C",
      description: "Using Python and C programming to solve engineering problems, develop simulations, and interact with hardware.",
      keyTopics: [
        "Python for Scientific Simulation (NumPy, Matplotlib)",
        "C Programming for Low-Level Logic & Memory",
        "Algorithmic Problem Solving & Data Structures",
        "Interactive Web Visualizations (JavaScript & Canvas)"
      ],
      appliedFocus: "Mathematical simulations of vector calculus, 3D electromagnetic wave modeling, data visualization, interactive tools."
    }
  ],

  skills: {
    programming: [
      { name: "Python", level: "Developing Experience", note: "Scientific computing, numerical simulations, NumPy, Matplotlib data visualization", badgeClass: "badge-developing" },
      { name: "C Programming", level: "Academic Knowledge", note: "Core syntax, pointers, memory model, basic data structures, algorithmic logic", badgeClass: "badge-academic" },
      { name: "Basic HTML", level: "Hands-on Experience", note: "Semantic structure, responsive layouts, accessibility essentials", badgeClass: "badge-hands-on" },
      { name: "Basic CSS", level: "Hands-on Experience", note: "Flexbox, Grid, CSS animations, responsive media queries, modern UI", badgeClass: "badge-hands-on" },
      { name: "Basic JavaScript", level: "Developing Experience", note: "DOM manipulation, Canvas 2D/3D physics rendering, interactive state", badgeClass: "badge-developing" }
    ],
    electronics: [
      { name: "Digital Logic Design", level: "Academic Knowledge", note: "Boolean algebra, Karnaugh maps, logic gates, multiplexers, flip-flops, counters", badgeClass: "badge-academic" },
      { name: "Basic Circuit Analysis", level: "Hands-on Experience", note: "KVL, KCL, mesh and nodal analysis, Thévenin and Norton theorems, AC resonance", badgeClass: "badge-hands-on" },
      { name: "Electronic Components", level: "Hands-on Experience", note: "Diodes, BJTs, FETs, passive RLC networks, sensors, breadboard assembly", badgeClass: "badge-hands-on" },
      { name: "Electromagnetic Theory", level: "Academic Knowledge", note: "Maxwell's equations, vector calculus, Coulomb/Gauss laws, wave propagation, waveguides", badgeClass: "badge-academic" },
      { name: "Semiconductor Fundamentals", level: "Academic Knowledge", note: "Energy band diagrams, intrinsic/extrinsic carriers, drift/diffusion, PN junctions", badgeClass: "badge-academic" }
    ],
    tools: [
      { name: "Arduino", level: "Hands-on Experience", note: "Microcontroller firmware, GPIO control, sensor integration, hardware prototyping", badgeClass: "badge-hands-on" },
      { name: "ESP32", level: "Currently Learning", note: "Dual-core architecture, WiFi/BLE hardware capabilities, RTOS exploration", badgeClass: "badge-learning" },
      { name: "LTspice", level: "Hands-on Experience", note: "Analog schematic capture, DC operating point, transient analysis, AC frequency sweep", badgeClass: "badge-hands-on" },
      { name: "Circuit Simulation", level: "Hands-on Experience", note: "Virtual testing, waveform probe inspection, component tolerance analysis", badgeClass: "badge-hands-on" },
      { name: "Python-based Visualization", level: "Developing Experience", note: "Plotting electromagnetic wave vectors, coordinate field mapping, simulation plots", badgeClass: "badge-developing" },
      { name: "Basic Web Development", level: "Beginner", note: "Building responsive technical interfaces, interactive engineering demos", badgeClass: "badge-beginner" }
    ]
  },

  projects: [
    {
      id: "em-wave-visualizer",
      featured: true,
      title: "EM WAVE VISUALIZER",
      category: "Electromagnetics / Simulation / Python / Visualization",
      filterCategories: ["simulation", "electromagnetics", "visualization"],
      status: "Completed",
      shortDescription: "An interactive visualization tool designed to demonstrate the propagation of electromagnetic waves through space. The project visualizes the electric and magnetic field components, their perpendicular relationship, propagation direction, polarization, and the Poynting vector.",
      fullDescription: "An interactive visualization tool designed to demonstrate the propagation of electromagnetic waves through space. The project visualizes the electric and magnetic field components, their perpendicular relationship, propagation direction, polarization, and the Poynting vector. The simulation helps connect electromagnetic theory with visual and interactive representations of wave propagation.",
      objectives: [
        "Bridge the gap between abstract mathematical vector equations and intuitive 3D physical intuition.",
        "Demonstrate the transverse electromagnetic (TEM) nature of plane waves in free space and dielectric media.",
        "Provide real-time interactive parameter adjustment (frequency, wavelength, amplitude, and polarization state).",
        "Illustrate the cross-product Poynting vector S = E × H indicating the direction of instantaneous power density."
      ],
      features: [
        "Visualization of electric and magnetic fields",
        "Interactive electromagnetic wave propagation",
        "Polarization visualization",
        "Poynting vector visualization",
        "Interactive physics exploration",
        "Wave propagation visualization"
      ],
      topicsExplored: [
        "Maxwell-Faraday and Maxwell-Ampere coupled differential equations",
        "Orthogonality condition: E ⊥ B ⊥ k (wave propagation vector)",
        "Intrinsic wave impedance η = √(μ/ε) (≈ 377 Ω in free space)",
        "Linear, Circular, and Elliptical polarization dynamics",
        "Instantaneous and time-averaged Poynting vector <S> = (1/2) Re{E × H*}"
      ],
      technologies: ["Python", "JavaScript", "HTML", "Three.js", "Streamlit", "Plotly"],
      whatILearned: "Developing this visualizer deepened my intuitive understanding of Maxwell's wave equations, phase velocity, and how transverse electromagnetic waves transport energy through space without requiring a physical medium.",
      visualType: "interactive-canvas",
      liveAppUrl: "assets/wave_visualizer/index.html",
      emtiRelevance: "Directly relates to EMTI Unit 3 (Wave Propagation in Dielectrics & Conductors) and Maxwell's Electrostatic & Electrodynamic fundamentals."
    },
    {
      id: "waveguides-poster",
      featured: false,
      title: "ELECTROMAGNETIC WAVES AND WAVEGUIDES",
      category: "Academic Work / Electromagnetic Theory",
      filterCategories: ["academic", "electromagnetics"],
      status: "Completed",
      image: "assets/unit3_waves_waveguides_poster.jpg",
      pdfUrl: "assets/docs/EMTI_Module_3_Waves_and_Waveguides_Poster.pdf",
      galleryIndex: 1,
      aspectRatio: "3 / 4",
      shortDescription: "An academic technical poster developed as part of the Electromagnetic Theory coursework. The poster explores electromagnetic wave propagation and concepts associated with waveguides.",
      fullDescription: "An academic technical poster developed as part of the Electromagnetic Theory coursework. The poster explores electromagnetic wave propagation and concepts associated with waveguides, dielectric loss mechanisms, skin effect, and cutoff frequencies.",
      objectives: [
        "Synthesize electromagnetic wave equations across four distinct media: free space, lossless dielectrics, lossy dielectrics, and good conductors.",
        "Mathematically analyze rectangular waveguide boundary conditions for Transverse Electric (TE) and Transverse Magnetic (TM) modes.",
        "Derive and explain the cutoff frequency fc, guide wavelength λg, phase velocity vp, and group velocity vg.",
        "Create a visually compelling technical artifact suitable for academic presentation and peer review in EMTI."
      ],
      topicsCovered: [
        "Electromagnetic wave propagation",
        "Lossy and lossless dielectrics",
        "Free-space propagation",
        "Good conductors",
        "Skin depth",
        "Poynting vector",
        "Waveguides",
        "Cutoff frequency",
        "TE and TM modes",
        "Group velocity and phase velocity"
      ],
      keyFormulas: [
        { name: "Wave Impedance (Free Space)", formula: "η₀ = √(μ₀/ε₀) ≈ 376.73 Ω" },
        { name: "Skin Depth in Good Conductor", formula: "δ = √(2 / (ω·μ·σ)) = 1 / √(π·f·μ·σ)" },
        { name: "Waveguide Cutoff Frequency (TEmn/TMmn)", formula: "fc(m,n) = (c / 2) · √((m/a)² + (n/b)²)" },
        { name: "Velocity Relation in Waveguides", formula: "vp · vg = c² (vp > c, vg < c)" },
        { name: "Loss Tangent", formula: "tan θ = σ / (ω·ε)" }
      ],
      technologies: ["Electromagnetic Theory", "Technical Illustration", "Academic Documentation", "LaTeX/KaTeX"],
      whatILearned: "Gained a rigorous understanding of boundary conditions at conductor surfaces, why TEM modes cannot propagate inside hollow single-conductor waveguides, and how high-frequency RF signals travel through modal patterns.",
      visualType: "technical-poster",
      emtiRelevance: "Curriculum centerpiece for EMTI Unit 3 (Electromagnetic Waves and Waveguides)."
    },
    {
      id: "unit1-mindmap",
      featured: false,
      title: "ELECTROMAGNETIC THEORY - UNIT 1 FORMULA MINDMAP",
      category: "Academic Work / Technical Visualization",
      filterCategories: ["academic", "visualization", "electromagnetics"],
      status: "Completed",
      image: "assets/unit1_electrostatics_poster.png",
      pdfUrl: "assets/docs/EMTI_Module_1_Electrostatics_Formula_Mindmap.pdf",
      galleryIndex: 0,
      aspectRatio: "3 / 4",
      shortDescription: "A structured formula mindmap designed to simplify and visually organize the important mathematical concepts and equations covered in Unit 1 of Electromagnetic Theory.",
      fullDescription: "A structured formula mindmap designed to simplify and visually organize the important mathematical concepts and equations covered in Unit 1 of Electromagnetic Theory. It connects vector calculus identities, differential coordinate transformations, Coulomb's and Gauss's laws, and electrostatics boundary conditions.",
      objectives: [
        "Organize the vast mathematical framework of Unit 1 into an interconnected visual knowledge map.",
        "Establish seamless conceptual links between vector operations (gradient, divergence, curl) and physical field quantities.",
        "Provide quick-reference lookup for Cartesian, Cylindrical, and Spherical differential elements (dl, dS, dv).",
        "Summarize Maxwell's two electrostatic equations and Poisson's/Laplace's equations in one coherent hierarchy."
      ],
      topicsCovered: [
        "Vector algebra",
        "Coordinate systems",
        "Differential elements",
        "Vector calculus",
        "Coulomb's Law",
        "Gauss's Law",
        "Electric potential",
        "Electrostatics",
        "Maxwell's electrostatic equations"
      ],
      keyFormulas: [
        { name: "Gauss's Law (Differential)", formula: "∇ · D = ρv" },
        { name: "Gauss's Law (Integral)", formula: "∮ D · dS = Q_enclosed" },
        { name: "Conservative E-Field", formula: "∇ × E = 0" },
        { name: "Poisson's Equation", formula: "∇²V = -ρv / ε" },
        { name: "Laplace's Equation (Charge-Free)", formula: "∇²V = 0" },
        { name: "Electric Potential Relation", formula: "E = -∇V" }
      ],
      technologies: ["Vector Calculus", "Technical Mindmapping", "Academic Visualization", "Structured Schematics"],
      whatILearned: "Mastering Unit 1's vector differential operators proved to be the cornerstone for understanding the entirety of electromagnetic theory, allowing Maxwell's equations to be understood as physical geometries rather than just algebraic symbols.",
      visualType: "formula-mindmap",
      emtiRelevance: "Essential reference foundation for EMTI Unit 1 (Vector Analysis and Electrostatics)."
    }
  ],

  academicWork: [
    {
      id: "academic-unit-1",
      unit: "MODULE 1",
      subject: "Electromagnetic Theory & Interference (EMTI)",
      title: "MODULE 1: ELECTROSTATICS FORMULA REVISION POSTER",
      type: "Formula Mindmap / Quick Revision",
      badge: "Core Mathematical Foundation",
      image: "assets/unit1_electrostatics_poster.png",
      pdfUrl: "assets/docs/EMTI_Module_1_Electrostatics_Formula_Mindmap.pdf",
      galleryIndex: 0,
      description: "A comprehensive high-resolution visual reference covering vector algebra, coordinate conversions, differential elements, vector calculus operators, Coulomb's and Gauss's laws, electric potential, and Maxwell's electrostatics equations.",
      fullNotes: "This verified academic poster synthesizes the complete mathematical toolkit of Module 1: Cartesian, Cylindrical, and Spherical differential elements (dl, dS, dv), Gradient, Divergence, and Curl identities, Stokes' and Divergence theorems, Coulomb's force, Gauss's law for electric flux density D, electric potential V, Maxwell's statics equations, and a key concept problem-solving workflow.",
      deliverableFormat: "High-Resolution Engineering Poster (3072 × 4096 px)",
      topics: ["Vector Algebra", "Coordinate Conversions", "Differential Geometry", "Vector Calculus", "Coulomb's Law", "Gauss's Law", "Electric Potential", "Maxwell's Equations"],
      projectId: "unit1-mindmap",
      isPresentation: false
    },
    {
      id: "academic-unit-2",
      unit: "MODULE 2",
      subject: "Electromagnetic Theory & Interference (EMTI)",
      title: "MODULE 2: RIGHT HAND THUMB RULE DEMONSTRATION",
      type: "Interactive Video Demonstration",
      badge: "Steady Magnetic Fields & Curl",
      videoUrl: "assets/videos/EMT_U2_DEMO.mp4",
      duration: "0:43",
      description: "A dynamic visual demonstration illustrating the Right Hand Thumb Rule in magnetostatics, demonstrating the directional relationship between electric current flow (I) and concentric circular magnetic field lines (B / H).",
      fullNotes: "This verified academic demonstration bridges vector curl operations (∇ × H = J) with physical field geometries. It connects the right-hand grip convention with Ampère's Circuital Law ∮ H · dl = I_enclosed and the Biot-Savart Law dB = (μ₀·I / 4π) · (dl × a_r) / r², clarifying why magnetic field lines form continuous closed loops without isolated magnetic monopoles.",
      deliverableFormat: "HD Video Demonstration (MP4, 1080p, 0:43)",
      topics: ["Right Hand Thumb Rule", "Magnetostatics", "Ampère's Circuital Law", "Biot-Savart Law", "Concentric Field Lines", "Vector Curl (∇ × H = J)"],
      isVideo: true
    },
    {
      id: "academic-unit-3",
      unit: "MODULE 3",
      subject: "Electromagnetic Theory & Interference (EMTI)",
      title: "MODULE 3: ELECTROMAGNETIC WAVES & WAVEGUIDES POSTER",
      type: "Technical Poster / Exam Reminders",
      badge: "Applied Field Theory",
      image: "assets/unit3_waves_waveguides_poster.jpg",
      pdfUrl: "assets/docs/EMTI_Module_3_Waves_and_Waveguides_Poster.pdf",
      galleryIndex: 1,
      description: "A technical poster exploring electromagnetic wave propagation in lossy, lossless, free-space, and good conductor media, skin depth, Poynting power flow, rectangular waveguides, TE/TM modes, and cutoff frequencies.",
      fullNotes: "This verified academic artifact details uniform plane wave propagation through diverse media, intrinsic wave impedance (η₀ ≈ 377 Ω), skin depth δ = √(2/ωμσ), Poynting vector S = E × H, rectangular waveguide boundary conditions, cutoff frequency fc = (c/2)√((m/a)²+(n/b)²), phase vs. group velocity dispersion, and TE₁₀/TM₁₁ modal field distributions.",
      deliverableFormat: "Academic Technical Poster (1620 × 2164 px)",
      topics: ["Wave Parameters", "Lossy & Lossless Dielectrics", "Good Conductors", "Skin Depth", "Poynting Power Flow", "Waveguide Cutoff", "TE & TM Modes", "Modal Dispersion"],
      projectId: "waveguides-poster",
      isPresentation: false
    },
    {
      id: "academic-emi",
      unit: "EMI & EMC",
      subject: "Electromagnetic Theory & Interference (EMTI)",
      title: "WHAT IS EMI? ELECTROMAGNETIC INTERFERENCE & COMPATIBILITY",
      type: "Coursework Presentation & Slide Deck",
      badge: "Coursework Presentation",
      image: "assets/emi_presentation/slide1.svg",
      pdfUrl: "assets/docs/EMTI_What_is_EMI_Presentation.pptx",
      galleryIndex: 2,
      description: "A 5-slide academic presentation investigating electromagnetic noise sources, intrasystem vs. intersystem interference, conducted vs. radiated travel paths, and reduction methods (grounding, shielding, filtering).",
      fullNotes: "Covers the fundamental principles of electromagnetic compatibility (EMC), defining emitters, susceptors, internal noise (thermal, shot), man-made and natural interference, coupling paths across wires and space, and mitigation via zero-potential grounding, metallic enclosure shielding, and low-pass filtering.",
      deliverableFormat: "Original Coursework Presentation (Microsoft PowerPoint .pptx)",
      topics: ["Emitter & Susceptor", "Thermal & Shot Noise", "Intrasystem vs Intersystem", "Conducted & Radiated EMI", "Grounding", "Shielding", "Filtering", "EMC Standards"],
      isPresentation: true
    }
  ],

  // 5-Slide Presentation Deck
  presentation: {
    title: "What is EMI? Electromagnetic Interference & Compatibility",
    subject: "Electromagnetic Theory & Interference · Coursework Presentation",
    pptxUrl: "assets/docs/EMTI_What_is_EMI_Presentation.pptx",
    slides: [
      {
        index: 0,
        number: "1 / 5",
        title: "What is EMI?",
        subtitle: "Electromagnetic Interference",
        src: "assets/emi_presentation/slide1.svg"
      },
      {
        index: 1,
        number: "2 / 5",
        title: "Sources of EMI",
        subtitle: "Inside Circuits, Man-Made, and Natural",
        src: "assets/emi_presentation/slide2.svg"
      },
      {
        index: 2,
        number: "3 / 5",
        title: "Types of EMI by Cause",
        subtitle: "Intrasystem vs. Intersystem EMI",
        src: "assets/emi_presentation/slide3.svg"
      },
      {
        index: 3,
        number: "4 / 5",
        title: "Types of EMI by Travel Path",
        subtitle: "Conducted EMI vs. Radiated EMI",
        src: "assets/emi_presentation/slide4.svg"
      },
      {
        index: 4,
        number: "5 / 5",
        title: "How to Reduce EMI",
        subtitle: "Grounding, Shielding, and Filtering (EMC)",
        src: "assets/emi_presentation/slide5.svg"
      }
    ]
  },

  // Fullscreen Lightbox Gallery Items
  gallery: [
    {
      id: "gallery-unit1",
      title: "Module 1: Electrostatics Formula Mindmap & Quick Revision",
      subtitle: "Electromagnetic Theory & Interference · SRMIST Department of ECE",
      src: "assets/unit1_electrostatics_poster.png",
      pdf: "assets/docs/EMTI_Module_1_Electrostatics_Formula_Mindmap.pdf",
      unit: "MODULE 1",
      dimensions: "3072 × 4096 px (High Resolution)",
      description: "Complete mathematical formula revision covering Vector Algebra, Coordinate Systems (Cartesian, Cylindrical, Spherical), Vector Calculus (Gradient, Divergence, Curl, Stokes', Divergence Theorem), Coulomb's Law, Electric Flux Density D, Gauss's Law, Electric Potential V, and Maxwell's Electrostatic Equations."
    },
    {
      id: "gallery-unit3",
      title: "Module 3: Electromagnetic Waves & Waveguides Technical Poster",
      subtitle: "Electromagnetic Theory & Interference · SRMIST Department of ECE",
      src: "assets/unit3_waves_waveguides_poster.jpg",
      pdf: "assets/docs/EMTI_Module_3_Waves_and_Waveguides_Poster.pdf",
      unit: "MODULE 3",
      dimensions: "1620 × 2164 px (High Resolution)",
      description: "Comprehensive technical poster on wave propagation in Lossy Dielectrics, Lossless Media, Free Space, and Good Conductors. Features skin depth, Poynting vector power density, rectangular waveguides, TE/TM mode cutoff frequencies, and field intensity distribution patterns."
    },
    {
      id: "gallery-emi-1",
      title: "What is EMI? — Slide 1: Definition, Emitter & Susceptor",
      subtitle: "Electromagnetic Theory & Interference · SRMIST Department of ECE",
      src: "assets/emi_presentation/slide1.svg",
      pdf: "assets/docs/EMTI_What_is_EMI_Presentation.pptx",
      unit: "SLIDE 1/5",
      dimensions: "1600 × 900 px (16:9 Widescreen)",
      description: "EMI definition: Unwanted voltages/currents disturbing device operation. Emitter is the source of EMI, Susceptor is the victim device. Key takeaway: Noise cannot be removed, but interference can."
    },
    {
      id: "gallery-emi-2",
      title: "Sources of EMI — Slide 2: Inside Circuits, Man-Made, Natural",
      subtitle: "Electromagnetic Theory & Interference · SRMIST Department of ECE",
      src: "assets/emi_presentation/slide2.svg",
      pdf: "assets/docs/EMTI_What_is_EMI_Presentation.pptx",
      unit: "SLIDE 2/5",
      dimensions: "1600 × 900 px (16:9 Widescreen)",
      description: "Sources of EMI: Inside circuits (thermal noise, shot noise), Man-made (motors, switches, transmitters, computers), and Natural (lightning, solar flares, sunspots)."
    },
    {
      id: "gallery-emi-3",
      title: "Types of EMI by Cause — Slide 3: Intrasystem vs Intersystem",
      subtitle: "Electromagnetic Theory & Interference · SRMIST Department of ECE",
      src: "assets/emi_presentation/slide3.svg",
      pdf: "assets/docs/EMTI_What_is_EMI_Presentation.pptx",
      unit: "SLIDE 3/5",
      dimensions: "1600 × 900 px (16:9 Widescreen)",
      description: "Intrasystem EMI: Noise starts inside the same system (emitter and victim share chassis/PCB). Intersystem EMI: Noise comes from outside another system. Both controlled by Grounding, Shielding, Filtering."
    },
    {
      id: "gallery-emi-4",
      title: "Types of EMI by Travel Path — Slide 4: Conducted vs Radiated",
      subtitle: "Electromagnetic Theory & Interference · SRMIST Department of ECE",
      src: "assets/emi_presentation/slide4.svg",
      pdf: "assets/docs/EMTI_What_is_EMI_Presentation.pptx",
      unit: "SLIDE 4/5",
      dimensions: "1600 × 900 px (16:9 Widescreen)",
      description: "Conducted EMI: Unwanted voltage/current travels through wires and power cords. Radiated EMI: Unwanted fields radiate through air. Conducted is tackled with Filters; Radiated is tackled with Shields."
    },
    {
      id: "gallery-emi-5",
      title: "How to Reduce EMI — Slide 5: Grounding, Shielding, Filtering",
      subtitle: "Electromagnetic Theory & Interference · SRMIST Department of ECE",
      src: "assets/emi_presentation/slide5.svg",
      pdf: "assets/docs/EMTI_What_is_EMI_Presentation.pptx",
      unit: "SLIDE 5/5",
      dimensions: "1600 × 900 px (16:9 Widescreen)",
      description: "The Three Pillars of EMC: Grounding (zero-potential sink), Shielding (Faraday barrier boxes & cable shields), Filtering (low-pass frequency selectivity). Goal: EMC (Electromagnetic Compatibility)."
    }
  ],

  journey: [
    {
      year: "2025",
      title: "Journey Begins at SRMIST",
      description: "Started my Electronics and Communication Engineering journey at SRM Institute of Science and Technology.",
      details: "Enrolled in the B.Tech Electronics and Communication Engineering program at SRMIST Kattankulathur. Began coursework in engineering mathematics, basic electrical & electronics engineering, physics, and introductory programming in C.",
      milestones: [
        "Joined SRM Institute of Science and Technology (KTR)",
        "Foundations in Engineering Physics and Calculus",
        "Introduction to C programming and algorithmic problem solving",
        "Basic hands-on circuit assembly in laboratory sessions"
      ],
      tag: "Academic Foundation"
    },
    {
      year: "2025 - 2026",
      title: "Core Electronics & Electromagnetic Foundations",
      description: "Developed foundational understanding of electronics, programming, digital logic, and electromagnetic theory.",
      details: "Dived deeper into core electrical theorems (KVL/KCL, Thevenin, Norton), semiconductor physics, digital logic design (combinational circuits, K-maps), and the rigorous vector calculus backing Electromagnetic Theory (EMTI).",
      milestones: [
        "Mastered Circuit Theory analysis and AC/DC network theorems",
        "Explored Digital Logic Design with Boolean algebra and logic gates",
        "Studied Electromagnetic Theory: Vector calculus, Gauss's Law, Maxwell's statics",
        "Began simulation experimentation using LTspice for analog circuits"
      ],
      tag: "Core Engineering"
    },
    {
      year: "2026",
      title: "Practical Projects & Simulation Development",
      description: "Started exploring practical engineering projects involving simulations, technical visualizations, programming, and academic engineering work.",
      details: "Applied theoretical knowledge into visual, interactive tools and academic scholarship. Built the EM Wave Visualizer using Python and Three.js/Canvas, authored the Unit 3 Waves and Waveguides technical poster, and formulated the Unit 1 Formula Mindmap.",
      milestones: [
        "Developed the Interactive EM Wave Visualizer project",
        "Authored EMTI Unit 3 Waves and Waveguides academic poster",
        "Created EMTI Unit 1 structured Formula Mindmap",
        "Integrated Python numerical computing with web visualization"
      ],
      tag: "Applied Exploration"
    },
    {
      year: "CURRENTLY",
      title: "Semiconductors, VLSI & Embedded Systems",
      description: "Exploring VLSI, semiconductor technology, embedded systems, electromagnetic simulations, circuit design, and practical electronics.",
      details: "Actively studying semiconductor device physics (PN junctions, carrier transport, MOSFETs), exploring digital IC design concepts in VLSI, prototyping microcontroller interfaces with Arduino and ESP32, and expanding circuit simulation skills.",
      milestones: [
        "Active study of Semiconductor Device Physics and Band Theory",
        "Exploring VLSI logic architectures and CMOS inverter fundamentals",
        "Prototyping embedded sensor circuits with Arduino & ESP32",
        "Deepening LTspice modeling for active and passive filter stages"
      ],
      tag: "Active Focus"
    }
  ]
};
