/**
 * Parv Sharma - Main Application Controller
 * Handles Navigation, Filtering, Modals, Presentation Viewer, Lightbox, Canvas & Asset Interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
  const data = window.PORTFOLIO_DATA;
  if (!data) {
    console.error('Portfolio data not loaded.');
    return;
  }

  // State Management
  const state = {
    currentFilter: 'all',
    activeModal: null,
    isPresentationMode: false,
    heroSimulator: null,
    modalSimulator: null,
    waveguideSim: null,
    mindmapSim: null,
    // Lightbox State
    lightboxIndex: 0,
    lightboxZoom: 1.0,
    isLightboxOpen: false,
    // Slide Presentation State
    currentSlide: 0,
    isPresentationOpen: false
  };

  // Initialize Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 1. Theme Controller
  initTheme();

  // 2. Navigation & ScrollSpy
  initNavigation();

  // 3. Hero Section & Background Simulator
  initHeroSimulator();

  // 4. Render Technical Interests
  renderTechnicalInterests();

  // 5. Render Skills
  renderSkills();

  // 6. Render Projects & Filter Logic
  renderProjects();

  // 7. Render Academic Work Archive
  renderAcademicWork();

  // 8. Render Engineering Journey
  renderJourney();

  // 9. Contact Interactions
  initContact();

  // 10. Modals, Presentation Deck & Lightbox Framework
  initModals();
  initPresentationDeck();
  initLightbox();
  initPresentationMode();
  initBackToTop();
  initKeyboardShortcuts();

  /* ==========================================================================
     Theme Controller
     ========================================================================== */
  function initTheme() {
    const savedTheme = localStorage.getItem('parv_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeToggleUI(savedTheme);

    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme') || 'dark';
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('parv_theme', next);
        updateThemeToggleUI(next);
      });
    }
  }

  function updateThemeToggleUI(theme) {
    const label = document.getElementById('theme-toggle-label');
    const icon = document.getElementById('theme-toggle-icon');
    if (label) label.textContent = theme === 'dark' ? 'DARK' : 'LIGHT';
    if (icon) {
      icon.innerHTML = theme === 'dark' 
        ? '<i data-lucide="moon" class="w-4 h-4 text-cyan-400"></i>' 
        : '<i data-lucide="sun" class="w-4 h-4 text-amber-500"></i>';
      if (window.lucide) window.lucide.createIcons();
    }
  }

  /* ==========================================================================
     Navigation & Mobile Menu
     ========================================================================== */
  function initNavigation() {
    const nav = document.getElementById('main-nav');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        nav.classList.add('bg-slate-950/90', 'shadow-xl', 'border-b', 'border-cyan-500/20');
        nav.classList.remove('bg-transparent');
      } else {
        nav.classList.remove('bg-slate-950/90', 'shadow-xl', 'border-b', 'border-cyan-500/20');
        nav.classList.add('bg-transparent');
      }
      updateScrollSpy();
    });

    if (mobileMenuBtn && mobileMenu) {
      mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
      });

      mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          mobileMenu.classList.add('hidden');
        });
      });
    }

    function updateScrollSpy() {
      const sections = ['hero', 'about', 'interests', 'skills', 'projects', 'academic-work', 'journey', 'contact'];
      let currentSection = '';

      const scrollPos = window.scrollY + 180;
      sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            currentSection = id;
          }
        }
      });

      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === `#${currentSection}`) {
          link.classList.add('text-cyan-400', 'font-semibold');
          link.classList.remove('text-slate-400');
        } else {
          link.classList.remove('text-cyan-400', 'font-semibold');
          link.classList.add('text-slate-400');
        }
      });
    }
  }

  /* ==========================================================================
     Hero Section & Canvas Simulator
     ========================================================================== */
  function initHeroSimulator() {
    if (typeof EMWaveSimulator === 'undefined') return;

    state.heroSimulator = new EMWaveSimulator('hero-wave-canvas', {
      amplitude: 75,
      wavelength: 250,
      frequency: 1.1,
      polarization: 'linear',
      interactive: true,
      rotX: 0.42,
      rotY: -0.62
    });

    const polButtons = document.querySelectorAll('[data-hero-pol]');
    polButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        polButtons.forEach(b => b.classList.remove('bg-cyan-500/20', 'text-cyan-400', 'border-cyan-500/50'));
        btn.classList.add('bg-cyan-500/20', 'text-cyan-400', 'border-cyan-500/50');
        const pol = btn.getAttribute('data-hero-pol');
        state.heroSimulator.setPolarization(pol);
      });
    });

    const playPauseBtn = document.getElementById('hero-play-pause');
    if (playPauseBtn) {
      playPauseBtn.addEventListener('click', () => {
        const isPaused = state.heroSimulator.togglePlayPause();
        playPauseBtn.innerHTML = isPaused 
          ? '<i data-lucide="play" class="w-3.5 h-3.5"></i> Play' 
          : '<i data-lucide="pause" class="w-3.5 h-3.5"></i> Pause';
        if (window.lucide) window.lucide.createIcons();
      });
    }
  }

  /* ==========================================================================
     Technical Interests
     ========================================================================== */
  function renderTechnicalInterests() {
    const container = document.getElementById('interests-grid');
    if (!container) return;

    container.innerHTML = data.technicalInterests.map(item => `
      <div 
        class="glass-panel p-6 rounded-2xl relative group cursor-pointer border border-slate-800/80 hover:border-cyan-500/40 transition-all flex flex-col justify-between"
        onclick="window.openInterestModal('${item.id}')"
      >
        <div>
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 rounded-xl bg-slate-900 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:border-cyan-500/50 transition-all">
              <i data-lucide="${item.icon}" class="w-6 h-6"></i>
            </div>
            <span class="text-[11px] font-mono px-2.5 py-1 rounded-full bg-slate-900/80 text-slate-400 border border-slate-800">${item.badge}</span>
          </div>

          <h3 class="text-base font-bold font-display text-white group-hover:text-cyan-400 transition-colors mb-2">${item.title}</h3>
          <p class="text-xs text-slate-300 leading-relaxed">${item.description}</p>
        </div>

        <div class="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400 group-hover:text-cyan-300">
          <span>Explore Key Topics</span>
          <i data-lucide="arrow-right" class="w-4 h-4 transform group-hover:translate-x-1 transition-transform"></i>
        </div>
      </div>
    `).join('');

    if (window.lucide) window.lucide.createIcons();
  }

  window.openInterestModal = function(id) {
    const item = data.technicalInterests.find(t => t.id === id);
    if (!item) return;

    const modalTitle = document.getElementById('generic-modal-title');
    const modalBody = document.getElementById('generic-modal-body');

    modalTitle.innerHTML = `
      <div class="flex items-center gap-2">
        <i data-lucide="${item.icon}" class="w-5 h-5 text-cyan-400"></i>
        <span>${item.title}</span>
      </div>
    `;

    modalBody.innerHTML = `
      <div class="space-y-5">
        <p class="text-sm text-slate-300 leading-relaxed font-sans">${item.description}</p>
        
        <div class="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
          <h5 class="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-3">Key Technical Concepts Covered</h5>
          <ul class="space-y-2">
            ${item.keyTopics.map(t => `
              <li class="flex items-start gap-2.5 text-xs text-slate-300 font-sans">
                <i data-lucide="check-circle" class="w-4 h-4 text-cyan-400 shrink-0 mt-0.5"></i>
                <span>${t}</span>
              </li>
            `).join('')}
          </ul>
        </div>

        <div class="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
          <h5 class="text-xs font-mono uppercase tracking-wider text-blue-400 mb-2">Applied Engineering & Laboratory Focus</h5>
          <p class="text-xs text-slate-300 leading-relaxed">${item.appliedFocus}</p>
        </div>
      </div>
    `;

    openModal('generic-modal');
    if (window.lucide) window.lucide.createIcons();
  };

  /* ==========================================================================
     Skills Section (Authentic Indicators)
     ========================================================================== */
  function renderSkills() {
    const progContainer = document.getElementById('skills-programming');
    const elecContainer = document.getElementById('skills-electronics');
    const toolsContainer = document.getElementById('skills-tools');

    if (progContainer) {
      progContainer.innerHTML = data.skills.programming.map(renderSkillCard).join('');
    }
    if (elecContainer) {
      elecContainer.innerHTML = data.skills.electronics.map(renderSkillCard).join('');
    }
    if (toolsContainer) {
      toolsContainer.innerHTML = data.skills.tools.map(renderSkillCard).join('');
    }

    if (window.lucide) window.lucide.createIcons();
  }

  function renderSkillCard(skill) {
    return `
      <div class="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/30 transition-all flex flex-col justify-between">
        <div class="flex items-center justify-between gap-2 mb-1.5">
          <span class="text-sm font-semibold text-white font-sans">${skill.name}</span>
          <span class="badge-tag ${skill.badgeClass}">${skill.level}</span>
        </div>
        <p class="text-[11px] text-slate-400 leading-normal">${skill.note}</p>
      </div>
    `;
  }

  /* ==========================================================================
     Projects Showcase & Filtering
     ========================================================================== */
  function renderProjects() {
    const container = document.getElementById('projects-grid');
    if (!container) return;

    const filterButtons = document.querySelectorAll('[data-project-filter]');
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => {
          b.classList.remove('bg-cyan-500/20', 'text-cyan-400', 'border-cyan-500/50');
          b.classList.add('bg-slate-900/80', 'text-slate-400', 'border-slate-800');
        });
        btn.classList.add('bg-cyan-500/20', 'text-cyan-400', 'border-cyan-500/50');
        btn.classList.remove('bg-slate-900/80', 'text-slate-400', 'border-slate-800');

        state.currentFilter = btn.getAttribute('data-project-filter');
        filterProjectsGrid();
      });
    });

    filterProjectsGrid();
  }

  function filterProjectsGrid() {
    const container = document.getElementById('projects-grid');
    if (!container) return;

    const filtered = data.projects.filter(p => {
      if (state.currentFilter === 'all') return true;
      return p.filterCategories.includes(state.currentFilter);
    });

    container.innerHTML = filtered.map(project => {
      if (project.featured) {
        return renderFeaturedProject(project);
      }
      return renderSecondaryProject(project);
    }).join('');

    if (window.lucide) window.lucide.createIcons();

    requestAnimationFrame(() => {
      const cardCanvas = document.getElementById('project-card-wave-canvas');
      if (cardCanvas && typeof EMWaveSimulator !== 'undefined') {
        if (state.cardSimulator && typeof state.cardSimulator.destroy === 'function') {
          state.cardSimulator.destroy();
        }
        state.cardSimulator = new EMWaveSimulator('project-card-wave-canvas', {
          amplitude: 52,
          wavelength: 210,
          frequency: 1.0,
          polarization: 'linear',
          interactive: true,
          rotX: 0.38,
          rotY: -0.55
        });
      }
    });
  }

  function renderFeaturedProject(project) {
    return `
      <div class="col-span-1 lg:col-span-2 glass-panel rounded-2xl overflow-hidden border border-cyan-500/30 shadow-xl shadow-cyan-950/20 transition-all flex flex-col md:flex-row">
        <!-- Visual Wave Preview Area -->
        <div class="md:w-5/12 bg-slate-950/90 relative p-5 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-800">
          <div>
            <div class="flex items-center justify-between mb-3">
              <span class="badge-tag bg-cyan-500/20 text-cyan-300 border-cyan-500/40">★ FEATURED SHOWCASE</span>
              <span class="badge-tag bg-emerald-500/10 text-emerald-400 border-emerald-500/30">✓ ${project.status}</span>
            </div>
            
            <div 
              class="wave-canvas-wrapper h-52 w-full relative rounded-xl overflow-hidden my-2 shadow-inner cursor-pointer group/wave"
              onclick="window.openProjectModal('${project.id}')"
              title="Click to launch interactive 3D wave simulation"
            >
              <canvas id="project-card-wave-canvas" class="w-full h-full block"></canvas>
              <div class="absolute inset-0 bg-cyan-500/0 group-hover/wave:bg-cyan-500/5 transition-colors pointer-events-none flex items-end justify-end p-2.5">
                <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950/80 text-cyan-400 border border-cyan-500/30 opacity-0 group-hover/wave:opacity-100 transition-opacity flex items-center gap-1 shadow">
                  <i data-lucide="maximize-2" class="w-3 h-3"></i>
                  Interactive 3D View
                </span>
              </div>
            </div>
            
            <div class="flex items-center justify-between text-[11px] font-mono text-slate-400 px-1 mt-1">
              <span>Vector Field E ⊥ B ⊥ k</span>
              <span class="text-amber-400">Poynting Vector S</span>
            </div>
          </div>

          <div class="mt-4 pt-4 border-t border-slate-800/80 space-y-2">
            <div class="flex items-center justify-between text-[11px] font-mono">
              <span class="text-slate-400">SOURCE ASSETS:</span>
              <span class="text-cyan-400">Python + Three.js</span>
            </div>
            <a 
              href="${project.liveAppUrl}" 
              target="_blank" 
              rel="noopener noreferrer"
              class="w-full py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 border border-cyan-500/30 hover:border-cyan-400 text-cyan-300 text-xs font-mono flex items-center justify-center gap-1.5 transition-colors"
            >
              <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
              Open Standalone Three.js Visualizer
            </a>
          </div>
        </div>

        <!-- Project Details Area -->
        <div class="md:w-7/12 p-6 flex flex-col justify-between">
          <div>
            <div class="flex items-center gap-2 mb-2">
              <span class="text-xs font-mono text-cyan-400 font-semibold">${project.category}</span>
            </div>
            <h3 class="text-2xl font-bold font-display text-white mb-3 hover:text-cyan-300 transition-colors">${project.title}</h3>
            <p class="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">${project.shortDescription}</p>

            <div class="space-y-1.5 mb-5">
              ${project.features.slice(0, 4).map(f => `
                <div class="flex items-center gap-2 text-xs text-slate-300">
                  <i data-lucide="check" class="w-3.5 h-3.5 text-cyan-400 shrink-0"></i>
                  <span>${f}</span>
                </div>
              `).join('')}
            </div>

            <div class="flex flex-wrap gap-1.5 mb-6">
              ${project.technologies.map(t => `
                <span class="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono text-cyan-400">${t}</span>
              `).join('')}
            </div>
          </div>

          <div class="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-800">
            <button 
              onclick="window.openProjectModal('${project.id}')"
              class="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono transition-all flex items-center gap-2 shadow-lg shadow-cyan-500/20"
            >
              <i data-lucide="layers" class="w-4 h-4"></i>
              Launch Full Interactive View
            </button>
            <span class="text-xs font-mono text-slate-400">Classroom Presentation Ready</span>
          </div>
        </div>
      </div>
    `;
  }

  function renderSecondaryProject(project) {
    const hasImage = !!project.image;

    return `
      <div class="col-span-1 glass-panel p-6 rounded-2xl flex flex-col justify-between border border-slate-800/80 hover:border-cyan-500/40 transition-all group">
        <div>
          <div class="flex items-center justify-between mb-3">
            <span class="text-[11px] font-mono px-2.5 py-1 rounded-full bg-slate-900/80 text-cyan-400 border border-slate-800">${project.category.split('/')[0]}</span>
            <span class="badge-tag bg-emerald-500/10 text-emerald-400 border-emerald-500/30">✓ ${project.status}</span>
          </div>

          <!-- ACTUAL PROJECT IMAGE ASSET (No distortion, click to enlarge) -->
          ${hasImage ? `
            <div 
              class="poster-preview-card h-52 w-full mb-4 group/poster"
              onclick="window.openLightbox(${project.galleryIndex !== undefined ? project.galleryIndex : 0})"
              title="Click to view full-resolution poster without cropping"
            >
              <img 
                src="${project.image}" 
                alt="${project.title} - Academic Asset" 
                loading="lazy"
                class="w-full h-full object-contain p-2"
              />
              <div class="poster-expand-badge">
                <i data-lucide="maximize-2" class="w-3.5 h-3.5"></i>
                <span>Fullscreen View</span>
              </div>
            </div>
          ` : `
            <div class="h-40 rounded-xl bg-slate-950/80 border border-slate-800/80 p-3 mb-4 flex flex-col justify-between">
              <span class="text-xs font-mono text-cyan-300">Technical Graphic</span>
            </div>
          `}

          <h3 class="text-lg font-bold font-display text-white group-hover:text-cyan-400 transition-colors mb-2">${project.title}</h3>
          <p class="text-xs text-slate-300 leading-relaxed mb-4">${project.shortDescription}</p>

          <div class="flex flex-wrap gap-1.5 mb-5">
            ${(project.topicsCovered || []).slice(0, 4).map(topic => `
              <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900/70 border border-slate-800 text-slate-400">${topic}</span>
            `).join('')}
          </div>
        </div>

        <div class="pt-4 border-t border-slate-800 flex items-center justify-between">
          <div class="flex items-center gap-2">
            ${hasImage ? `
              <button 
                onclick="window.openLightbox(${project.galleryIndex})"
                class="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-[11px] font-mono text-cyan-400 border border-slate-800 flex items-center gap-1 transition-colors"
              >
                <i data-lucide="image" class="w-3.5 h-3.5"></i>
                Poster
              </button>
            ` : ''}
            ${project.pdfUrl ? `
              <a 
                href="${project.pdfUrl}" 
                target="_blank"
                class="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-[11px] font-mono text-slate-300 border border-slate-800 flex items-center gap-1 transition-colors"
                title="Download original document"
              >
                <i data-lucide="file-text" class="w-3.5 h-3.5"></i>
                PDF
              </a>
            ` : ''}
          </div>

          <button 
            onclick="window.openProjectModal('${project.id}')"
            class="text-xs font-mono font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 group-hover:translate-x-1 transition-all"
          >
            <span>Interactive Simulator</span>
            <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
          </button>
        </div>
      </div>
    `;
  }

  window.openProjectModal = function(id) {
    // If the requested project is the EMI presentation, open the original PPTX directly!
    if (id === 'academic-emi') {
      window.open('assets/docs/EMTI_What_is_EMI_Presentation.pptx', '_blank');
      return;
    }

    // If the requested project is the Module 2 video demonstration, open the video player modal!
    if (id === 'academic-unit-2') {
      window.openVideoModal('assets/videos/EMT_U2_DEMO.mp4', 'Module 2: Right Hand Thumb Rule Demonstration');
      return;
    }

    const project = data.projects.find(p => p.id === id);
    if (!project) return;

    const modalTitle = document.getElementById('project-modal-title');
    const modalBody = document.getElementById('project-modal-body');

    modalTitle.innerHTML = `
      <div>
        <span class="text-xs font-mono text-cyan-400 uppercase tracking-wider block">${project.category}</span>
        <h3 class="text-xl sm:text-2xl font-bold font-display text-white">${project.title}</h3>
      </div>
    `;

    modalBody.innerHTML = `
      <div class="space-y-6">
        <!-- Interactive Canvas / Simulation Mount Point -->
        <div id="modal-interactive-mount" class="w-full"></div>

        <!-- High-res inspection bar -->
        ${project.image ? `
          <div class="p-4 rounded-xl bg-slate-950/90 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div class="flex items-center gap-3">
              <img src="${project.image}" alt="${project.title}" class="w-16 h-20 object-contain rounded border border-slate-800 bg-slate-900" />
              <div>
                <span class="text-xs font-mono text-cyan-400 font-bold block">ORIGINAL ACADEMIC ASSET</span>
                <span class="text-xs text-slate-300 font-sans">Full resolution coursework poster & formula sheet</span>
              </div>
            </div>
            <div class="flex gap-2">
              <button 
                onclick="window.openLightbox(${project.galleryIndex})"
                class="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono flex items-center gap-1.5 transition-colors"
              >
                <i data-lucide="maximize-2" class="w-3.5 h-3.5"></i>
                Open Fullscreen Poster
              </button>
              ${project.pdfUrl ? `
                <a 
                  href="${project.pdfUrl}" 
                  download
                  class="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-mono flex items-center gap-1.5 transition-colors"
                >
                  <i data-lucide="download" class="w-3.5 h-3.5"></i>
                  Download PDF
                </a>
              ` : ''}
            </div>
          </div>
        ` : ''}

        <!-- Description -->
        <div class="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
          <h4 class="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2">Project Overview</h4>
          <p class="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">${project.fullDescription}</p>
        </div>

        <!-- Objectives & What I Learned -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
            <h4 class="text-xs font-mono uppercase tracking-wider text-blue-400 mb-3">Project Objectives</h4>
            <ul class="space-y-2">
              ${(project.objectives || []).map(obj => `
                <li class="flex items-start gap-2 text-xs text-slate-300 font-sans">
                  <i data-lucide="check-circle" class="w-4 h-4 text-cyan-400 shrink-0 mt-0.5"></i>
                  <span>${obj}</span>
                </li>
              `).join('')}
            </ul>
          </div>

          <div class="p-4 rounded-xl bg-slate-900/70 border border-slate-800 flex flex-col justify-between">
            <div>
              <h4 class="text-xs font-mono uppercase tracking-wider text-amber-400 mb-2">What I Learned</h4>
              <p class="text-xs text-slate-300 leading-relaxed font-sans">${project.whatILearned}</p>
            </div>
            <div class="mt-4 pt-3 border-t border-slate-800">
              <span class="text-[10px] font-mono text-slate-400 block mb-1">PROJECT STATUS:</span>
              <span class="inline-flex items-center gap-1.5 text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                ${project.status} (Verified Academic Submission)
              </span>
            </div>
          </div>
        </div>

        <!-- Topics Explored & Technologies -->
        <div class="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
          <h4 class="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-3">Core Topics Covered</h4>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
            ${(project.topicsCovered || project.topicsExplored || []).map(topic => `
              <div class="flex items-center gap-2 text-xs text-slate-300 font-mono">
                <span class="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                <span>${topic}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
          <div class="flex flex-wrap gap-2">
            ${project.technologies.map(t => `
              <span class="px-3 py-1 rounded bg-slate-900 border border-slate-700 text-xs font-mono text-cyan-400">${t}</span>
            `).join('')}
          </div>
          <button 
            onclick="window.closeAllModals()"
            class="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300 transition-colors"
          >
            Close View
          </button>
        </div>
      </div>
    `;

    openModal('project-modal');
    if (window.lucide) window.lucide.createIcons();

    const mountPoint = document.getElementById('modal-interactive-mount');
    if (mountPoint) {
      if (project.id === 'em-wave-visualizer') {
        mountPoint.innerHTML = `
          <div class="rounded-xl overflow-hidden border border-cyan-500/30 bg-slate-950 p-4 relative">
            <div class="flex flex-wrap items-center justify-between gap-3 mb-3">
              <div class="flex items-center gap-2">
                <span class="legend-dot legend-e"></span> <span class="text-xs font-mono text-blue-400">Electric Field E</span>
                <span class="legend-dot legend-b ml-2"></span> <span class="text-xs font-mono text-cyan-400">Magnetic Field B</span>
                <span class="legend-dot legend-s ml-2"></span> <span class="text-xs font-mono text-amber-400">Poynting Vector S</span>
              </div>
              <div class="flex items-center gap-1.5 text-xs font-mono">
                <button id="modal-pol-lin" class="px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">Linear</button>
                <button id="modal-pol-circ" class="px-2.5 py-1 rounded bg-slate-900 text-slate-400 border border-slate-800">Circular</button>
                <button id="modal-pol-ellip" class="px-2.5 py-1 rounded bg-slate-900 text-slate-400 border border-slate-800">Elliptical</button>
              </div>
            </div>
            <div class="wave-canvas-wrapper h-64 w-full relative rounded-lg overflow-hidden">
              <canvas id="modal-wave-canvas" class="w-full h-full"></canvas>
            </div>
            <div class="flex flex-wrap justify-between items-center text-[10px] font-mono text-slate-400 mt-2 gap-2">
              <span>Interactive: Drag to rotate 3D isometric view</span>
              <div class="flex gap-2">
                <a href="${project.liveAppUrl}" target="_blank" class="text-cyan-400 hover:underline flex items-center gap-1">
                  <span>Open Standalone Three.js Visualizer App</span>
                  <i data-lucide="external-link" class="w-3 h-3"></i>
                </a>
              </div>
            </div>
          </div>
        `;
        if (typeof EMWaveSimulator !== 'undefined') {
          state.modalSimulator = new EMWaveSimulator('modal-wave-canvas', {
            amplitude: 70,
            wavelength: 240,
            frequency: 1.2,
            polarization: 'linear',
            interactive: true,
            rotX: 0.42,
            rotY: -0.65
          });

          document.getElementById('modal-pol-lin')?.addEventListener('click', () => {
            state.modalSimulator.setPolarization('linear');
            updatePolButtons('modal-pol-lin');
          });
          document.getElementById('modal-pol-circ')?.addEventListener('click', () => {
            state.modalSimulator.setPolarization('circular');
            updatePolButtons('modal-pol-circ');
          });
          document.getElementById('modal-pol-ellip')?.addEventListener('click', () => {
            state.modalSimulator.setPolarization('elliptical');
            updatePolButtons('modal-pol-ellip');
          });

          function updatePolButtons(activeId) {
            ['modal-pol-lin', 'modal-pol-circ', 'modal-pol-ellip'].forEach(id => {
              const b = document.getElementById(id);
              if (b) {
                if (id === activeId) {
                  b.className = 'px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40';
                } else {
                  b.className = 'px-2.5 py-1 rounded bg-slate-900 text-slate-400 border border-slate-800';
                }
              }
            });
          }
        }
      } else if (project.id === 'waveguides-poster') {
        mountPoint.innerHTML = `<div id="waveguide-sim-container"></div>`;
        if (typeof WaveguideSimulator !== 'undefined') {
          state.waveguideSim = new WaveguideSimulator('waveguide-sim-container');
        }
      } else if (project.id === 'unit1-mindmap') {
        mountPoint.innerHTML = `<div id="mindmap-sim-container"></div>`;
        if (typeof FormulaMindmap !== 'undefined') {
          state.mindmapSim = new FormulaMindmap('mindmap-sim-container');
        }
      }
    }
  };

  /* ==========================================================================
     Academic Work Archive (With Video Demo, Lightbox, & PPTX Direct Open)
     ========================================================================== */
  function renderAcademicWork() {
    const container = document.getElementById('academic-grid');
    if (!container) return;

    container.innerHTML = data.academicWork.map(item => {
      const isPresentation = !!item.isPresentation;
      const isVideo = !!item.isVideo;

      let previewHtml = '';
      let actionButtonsHtml = '';

      if (isVideo) {
        previewHtml = `
          <div 
            class="poster-preview-card h-64 w-full mb-4 group/academic relative overflow-hidden rounded-xl bg-slate-950 border border-slate-800 cursor-pointer"
            onclick="window.openVideoModal('${item.videoUrl}', '${item.title}')"
            title="Click to play video demonstration"
          >
            <video 
              src="${item.videoUrl}#t=0.5" 
              preload="metadata" 
              muted 
              playsinline 
              class="w-full h-full object-cover opacity-85 group-hover/academic:opacity-100 group-hover/academic:scale-105 transition-all duration-300"
            ></video>
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-center justify-center pointer-events-none">
              <div class="w-14 h-14 rounded-full bg-cyan-500/90 text-slate-950 flex items-center justify-center shadow-lg shadow-cyan-500/40 group-hover/academic:scale-110 group-hover/academic:bg-cyan-400 transition-all">
                <i data-lucide="play" class="w-6 h-6 fill-current ml-0.5"></i>
              </div>
            </div>
            <div class="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-slate-950/80 border border-slate-700 text-[10px] font-mono text-cyan-300 flex items-center gap-1 backdrop-blur-sm">
              <i data-lucide="video" class="w-3 h-3 text-cyan-400"></i>
              <span>${item.duration || '0:43'}</span>
            </div>
            <div class="poster-expand-badge">
              <i data-lucide="play" class="w-3.5 h-3.5"></i>
              <span>Play Video Demo</span>
            </div>
          </div>
        `;

        actionButtonsHtml = `
          <button 
            onclick="window.openVideoModal('${item.videoUrl}', '${item.title}')"
            class="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-mono font-bold transition-all flex items-center gap-1.5 shadow-md shadow-cyan-500/20"
          >
            <i data-lucide="play" class="w-3.5 h-3.5 fill-current"></i>
            <span>Play Demo</span>
          </button>
          <div class="flex items-center gap-2">
            <a 
              href="${item.videoUrl}" 
              download
              class="px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-mono transition-colors flex items-center gap-1 border border-slate-800"
              title="Download HD Video Demonstration"
            >
              <i data-lucide="download" class="w-3.5 h-3.5"></i>
              <span>MP4</span>
            </a>
          </div>
        `;
      } else if (isPresentation) {
        // Direct click to open original PowerPoint presentation
        previewHtml = `
          <div 
            class="poster-preview-card h-64 w-full mb-4 group/academic cursor-pointer relative"
            onclick="window.open('${item.pdfUrl}', '_blank')"
            title="Click to open original PowerPoint presentation (EMTI_What_is_EMI_Presentation.pptx)"
          >
            <img 
              src="${item.image}" 
              alt="${item.title}" 
              loading="lazy"
              class="w-full h-full object-contain p-2 group-hover/academic:scale-105 transition-transform"
            />
            <div class="poster-expand-badge">
              <i data-lucide="presentation" class="w-3.5 h-3.5"></i>
              <span>Open PPTX</span>
            </div>
          </div>
        `;

        actionButtonsHtml = `
          <button 
            onclick="window.open('${item.pdfUrl}', '_blank')"
            class="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-mono font-bold transition-all flex items-center gap-1.5 shadow-md shadow-cyan-500/20"
            title="Open original PowerPoint presentation in a new tab"
          >
            <i data-lucide="presentation" class="w-3.5 h-3.5"></i>
            <span>Open PPTX</span>
          </button>

          <div class="flex items-center gap-2">
            <a 
              href="${item.pdfUrl}" 
              download
              class="px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-mono transition-colors flex items-center gap-1 border border-slate-800"
              title="Download original PPTX presentation"
            >
              <i data-lucide="download" class="w-3.5 h-3.5"></i>
              <span>Download</span>
            </a>
          </div>
        `;
      } else {
        // High-resolution Poster with Lightbox
        previewHtml = `
          <div 
            class="poster-preview-card h-64 w-full mb-4 group/academic cursor-pointer relative"
            onclick="window.openLightbox(${item.galleryIndex})"
            title="Click to view full-resolution academic artifact"
          >
            <img 
              src="${item.image}" 
              alt="${item.title}" 
              loading="lazy"
              class="w-full h-full object-contain p-2 group-hover/academic:scale-105 transition-transform"
            />
            <div class="poster-expand-badge">
              <i data-lucide="zoom-in" class="w-3.5 h-3.5"></i>
              <span>Fullscreen Poster</span>
            </div>
          </div>
        `;

        actionButtonsHtml = `
          <button 
            onclick="window.openLightbox(${item.galleryIndex})"
            class="px-4 py-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500 text-cyan-300 hover:text-slate-950 text-xs font-mono font-semibold transition-all flex items-center gap-1.5 border border-cyan-500/30"
          >
            <i data-lucide="maximize-2" class="w-3.5 h-3.5"></i>
            <span>Inspect Poster</span>
          </button>

          <div class="flex items-center gap-2">
            ${item.pdfUrl ? `
              <a 
                href="${item.pdfUrl}" 
                download
                class="px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-mono transition-colors flex items-center gap-1 border border-slate-800"
                title="Download original high-res document"
              >
                <i data-lucide="download" class="w-3.5 h-3.5"></i>
                <span class="hidden sm:inline">Download</span>
              </a>
            ` : ''}

            <button 
              onclick="window.openProjectModal('${item.projectId}')"
              class="px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-cyan-400 text-xs font-mono transition-colors flex items-center gap-1 border border-slate-800"
              title="Open simulator & notes"
            >
              <i data-lucide="sliders" class="w-3.5 h-3.5"></i>
              <span class="hidden sm:inline">Simulator</span>
            </button>
          </div>
        `;
      }

      return `
        <div class="glass-panel p-6 rounded-2xl border border-slate-800/80 hover:border-cyan-500/40 transition-all flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between mb-3">
              <span class="text-xs font-mono font-bold text-cyan-400 px-2.5 py-1 rounded bg-cyan-500/10 border border-cyan-500/30">${item.unit}</span>
              <span class="badge-tag bg-slate-900 text-slate-400 border-slate-800">${item.badge}</span>
            </div>

            <!-- CARD ASSET PREVIEW -->
            ${previewHtml}

            <div class="text-xs font-mono text-slate-400 mb-1">${item.subject}</div>
            <h3 class="text-xl font-bold font-display text-white mb-2">${item.title}</h3>
            <p class="text-xs text-slate-300 leading-relaxed mb-4">${item.description}</p>

            <div class="p-3.5 rounded-xl bg-slate-950/90 border border-slate-800 mb-4">
              <div class="flex items-center justify-between text-[11px] font-mono text-cyan-300 mb-1.5">
                <span>FORMAT: ${item.deliverableFormat}</span>
                <span class="text-slate-500">DIGITAL ARCHIVE</span>
              </div>
              <p class="text-xs text-slate-400 font-sans leading-relaxed">${item.fullNotes}</p>
            </div>

            <div class="flex flex-wrap gap-1.5 mb-4">
              ${item.topics.map(t => `
                <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">${t}</span>
              `).join('')}
            </div>
          </div>

          <!-- Bottom Action Buttons -->
          <div class="pt-4 border-t border-slate-800 flex items-center justify-between gap-2">
            ${actionButtonsHtml}
          </div>
        </div>
      `;
    }).join('');

    if (window.lucide) window.lucide.createIcons();
  }

  /* ==========================================================================
     INTERACTIVE SLIDE PRESENTATION VIEWER SYSTEM
     ========================================================================== */
  function initPresentationDeck() {
    const prevBtn = document.getElementById('pres-prev-btn');
    const nextBtn = document.getElementById('pres-next-btn');
    const fullBtn = document.getElementById('pres-fullscreen-btn');

    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);

    if (fullBtn) {
      fullBtn.addEventListener('click', () => {
        // Opens currently active slide in the Fullscreen Lightbox
        closeAllModals();
        window.openLightbox(2 + state.currentSlide);
      });
    }
  }

  window.openPresentationModal = function(slideIndex = 0) {
    const pres = data.presentation;
    if (!pres || !pres.slides || pres.slides.length === 0) return;

    state.currentSlide = (slideIndex >= 0 && slideIndex < pres.slides.length) ? slideIndex : 0;
    state.isPresentationOpen = true;

    updateSlideView();
    openModal('presentation-modal');
  };

  function updateSlideView() {
    const pres = data.presentation;
    const slide = pres.slides[state.currentSlide];
    if (!slide) return;

    const img = document.getElementById('pres-slide-img');
    const num = document.getElementById('pres-slide-num');
    const name = document.getElementById('pres-slide-name');
    const dotsContainer = document.getElementById('pres-dots-container');

    if (img) {
      img.src = slide.src;
      img.alt = `${slide.title} - ${slide.subtitle}`;
    }
    if (num) num.textContent = `Slide ${state.currentSlide + 1} of ${pres.slides.length}`;
    if (name) name.textContent = slide.title;

    if (dotsContainer) {
      dotsContainer.innerHTML = pres.slides.map((s, idx) => `
        <button 
          onclick="window.goToSlide(${idx})"
          class="w-2.5 h-2.5 rounded-full transition-all ${idx === state.currentSlide ? 'bg-cyan-400 w-6' : 'bg-slate-700 hover:bg-slate-500'}"
          title="Go to Slide ${idx + 1}: ${s.title}"
        ></button>
      `).join('');
    }

    if (window.lucide) window.lucide.createIcons();
  }

  window.goToSlide = function(idx) {
    if (data.presentation && idx >= 0 && idx < data.presentation.slides.length) {
      state.currentSlide = idx;
      updateSlideView();
    }
  };

  function nextSlide() {
    if (!data.presentation) return;
    state.currentSlide = (state.currentSlide + 1) % data.presentation.slides.length;
    updateSlideView();
  }

  function prevSlide() {
    if (!data.presentation) return;
    state.currentSlide = (state.currentSlide - 1 + data.presentation.slides.length) % data.presentation.slides.length;
    updateSlideView();
  }

  /* ==========================================================================
     FULLSCREEN LIGHTBOX / GALLERY SYSTEM
     ========================================================================== */
  function initLightbox() {
    const lightbox = document.getElementById('fullscreen-lightbox');
    if (!lightbox) return;

    document.querySelectorAll('[data-close-lightbox]').forEach(btn => {
      btn.addEventListener('click', closeLightbox);
    });

    document.getElementById('lightbox-prev-btn')?.addEventListener('click', prevLightboxImage);
    document.getElementById('lightbox-next-btn')?.addEventListener('click', nextLightboxImage);

    document.getElementById('lightbox-zoom-in')?.addEventListener('click', () => zoomLightbox(0.25));
    document.getElementById('lightbox-zoom-out')?.addEventListener('click', () => zoomLightbox(-0.25));
    document.getElementById('lightbox-zoom-reset')?.addEventListener('click', resetLightboxZoom);
  }

  window.openLightbox = function(index) {
    const gallery = data.gallery;
    if (!gallery || gallery.length === 0) return;

    state.lightboxIndex = (index >= 0 && index < gallery.length) ? index : 0;
    state.lightboxZoom = 1.0;
    state.isLightboxOpen = true;

    updateLightboxView();

    const lightbox = document.getElementById('fullscreen-lightbox');
    if (lightbox) {
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  function updateLightboxView() {
    const item = data.gallery[state.lightboxIndex];
    if (!item) return;

    const img = document.getElementById('lightbox-img');
    const title = document.getElementById('lightbox-title');
    const subtitle = document.getElementById('lightbox-subtitle');
    const unitBadge = document.getElementById('lightbox-unit-badge');
    const desc = document.getElementById('lightbox-desc');
    const count = document.getElementById('lightbox-counter');
    const downloadBtn = document.getElementById('lightbox-download-link');
    const zoomVal = document.getElementById('lightbox-zoom-val');

    if (img) {
      img.src = item.src;
      img.alt = item.title;
      img.style.transform = `scale(${state.lightboxZoom})`;
    }

    if (title) title.textContent = item.title;
    if (subtitle) subtitle.textContent = item.subtitle;
    if (unitBadge) unitBadge.textContent = item.unit;
    if (desc) desc.textContent = item.description;
    if (count) count.textContent = `${state.lightboxIndex + 1} / ${data.gallery.length}`;
    if (zoomVal) zoomVal.textContent = `${Math.round(state.lightboxZoom * 100)}%`;

    if (downloadBtn && item.pdf) {
      downloadBtn.href = item.pdf;
      downloadBtn.classList.remove('hidden');
    } else if (downloadBtn) {
      downloadBtn.classList.add('hidden');
    }

    if (window.lucide) window.lucide.createIcons();
  }

  function closeLightbox() {
    const lightbox = document.getElementById('fullscreen-lightbox');
    if (lightbox) {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
      state.isLightboxOpen = false;
      state.lightboxZoom = 1.0;
    }
  }

  window.closeLightbox = closeLightbox;

  function nextLightboxImage() {
    state.lightboxIndex = (state.lightboxIndex + 1) % data.gallery.length;
    state.lightboxZoom = 1.0;
    updateLightboxView();
  }

  function prevLightboxImage() {
    state.lightboxIndex = (state.lightboxIndex - 1 + data.gallery.length) % data.gallery.length;
    state.lightboxZoom = 1.0;
    updateLightboxView();
  }

  function zoomLightbox(delta) {
    state.lightboxZoom = Math.max(0.6, Math.min(3.0, state.lightboxZoom + delta));
    const img = document.getElementById('lightbox-img');
    const zoomVal = document.getElementById('lightbox-zoom-val');
    if (img) img.style.transform = `scale(${state.lightboxZoom})`;
    if (zoomVal) zoomVal.textContent = `${Math.round(state.lightboxZoom * 100)}%`;
  }

  function resetLightboxZoom() {
    state.lightboxZoom = 1.0;
    const img = document.getElementById('lightbox-img');
    const zoomVal = document.getElementById('lightbox-zoom-val');
    if (img) img.style.transform = `scale(1.0)`;
    if (zoomVal) zoomVal.textContent = `100%`;
  }

  /* ==========================================================================
     Engineering Journey Timeline
     ========================================================================== */
  function renderJourney() {
    const container = document.getElementById('journey-timeline');
    if (!container) return;

    container.innerHTML = data.journey.map((item, index) => {
      const isEven = index % 2 === 0;
      return `
        <div class="relative pl-10 md:pl-0 mb-8 md:mb-12">
          <div class="absolute left-2.5 md:left-1/2 -translate-x-1/2 top-1.5 w-6 h-6 rounded-full bg-slate-950 border-2 border-cyan-400 flex items-center justify-center z-10 shadow-lg shadow-cyan-500/20">
            <span class="w-2 h-2 rounded-full ${item.year === 'CURRENTLY' ? 'bg-amber-400 animate-ping' : 'bg-cyan-400'}"></span>
          </div>

          <div class="md:grid md:grid-cols-2 md:gap-8 items-start">
            <div class="${isEven ? 'md:text-right md:pr-10' : 'md:col-start-2 md:pl-10'}">
              <div class="glass-panel p-5 rounded-2xl border border-slate-800/80 hover:border-cyan-500/30 transition-all">
                <div class="flex items-center gap-2 mb-2 ${isEven ? 'md:justify-end' : ''}">
                  <span class="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">${item.year}</span>
                  <span class="text-[11px] font-mono text-slate-400">${item.tag}</span>
                </div>

                <h4 class="text-base font-bold font-display text-white mb-2">${item.title}</h4>
                <p class="text-xs text-slate-300 leading-relaxed mb-3">${item.description}</p>
                
                <p class="text-[11px] text-slate-400 leading-relaxed mb-3">${item.details}</p>

                <div class="space-y-1.5 pt-3 border-t border-slate-800/80 text-left">
                  ${item.milestones.map(m => `
                    <div class="flex items-start gap-2 text-[11px] text-slate-300 font-sans">
                      <i data-lucide="chevron-right" class="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5"></i>
                      <span>${m}</span>
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');

    if (window.lucide) window.lucide.createIcons();
  }

  /* ==========================================================================
     Contact Interactions
     ========================================================================== */
  function initContact() {
    const copyEmailBtn = document.getElementById('copy-email-btn');
    const emailTooltip = document.getElementById('copy-email-tooltip');
    const placeholderEmail = data.profile.contact.emailPlaceholder;

    if (copyEmailBtn) {
      copyEmailBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(placeholderEmail).then(() => {
          if (emailTooltip) {
            emailTooltip.textContent = 'Copied to Clipboard!';
            emailTooltip.classList.remove('opacity-0');
            setTimeout(() => {
              emailTooltip.classList.add('opacity-0');
              emailTooltip.textContent = 'Click to copy';
            }, 2500);
          }
        }).catch(() => {
          alert(`Email: ${placeholderEmail}`);
        });
      });
    }

    const messageForm = document.getElementById('contact-form');
    if (messageForm) {
      messageForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nameInput = document.getElementById('contact-name');
        const subjectInput = document.getElementById('contact-subject');
        const textInput = document.getElementById('contact-text');

        const sender = nameInput ? nameInput.value : 'Colleague / Recruiter';
        const subject = subjectInput ? subjectInput.value : 'Academic Inquiry';
        const body = textInput ? textInput.value : '';

        const mailtoUrl = `mailto:${placeholderEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent("From: " + sender + "\n\n" + body)}`;
        
        const modalTitle = document.getElementById('generic-modal-title');
        const modalBody = document.getElementById('generic-modal-body');

        modalTitle.textContent = 'Message Prepared';
        modalBody.innerHTML = `
          <div class="space-y-4">
            <p class="text-xs text-slate-300">Your message draft has been generated for Parv Sharma. Since this is an editable placeholder template, you can open your default email client or copy the text directly.</p>
            <div class="p-3 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs text-cyan-300">
              <div><strong>To:</strong> ${placeholderEmail}</div>
              <div><strong>Subject:</strong> ${subject}</div>
              <div class="mt-2 text-slate-300 whitespace-pre-wrap">${body}</div>
            </div>
            <div class="flex gap-2 justify-end pt-2">
              <a href="${mailtoUrl}" class="px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs font-mono hover:bg-cyan-400 transition-colors">
                Open Email Client (mailto)
              </a>
            </div>
          </div>
        `;
        openModal('generic-modal');
      });
    }
  }

  /* ==========================================================================
     Modals Framework
     ========================================================================== */
  function initModals() {
    document.querySelectorAll('[data-close-modal]').forEach(btn => {
      btn.addEventListener('click', closeAllModals);
    });

    document.querySelectorAll('.modal-overlay').forEach(overlay => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          closeAllModals();
        }
      });
    });
  }

  function openModal(modalId) {
    closeAllModals();
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      state.activeModal = modal;
    }
  }

  function closeAllModals() {
    document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
    document.body.style.overflow = '';
    state.activeModal = null;
    state.isPresentationOpen = false;

    // Pause video player if active
    const player = document.getElementById('video-player');
    if (player) {
      player.pause();
    }

    if (state.modalSimulator) {
      state.modalSimulator.stop();
      state.modalSimulator = null;
    }
  }

  window.openVideoModal = function(videoUrl = 'assets/videos/EMT_U2_DEMO.mp4', title = 'Module 2: Right Hand Thumb Rule Demonstration') {
    const player = document.getElementById('video-player');
    const titleEl = document.getElementById('video-modal-title');
    const dlEl = document.getElementById('video-modal-download');
    
    if (titleEl) titleEl.textContent = title;
    if (dlEl) dlEl.href = videoUrl;
    if (player) {
      player.src = videoUrl;
      player.currentTime = 0;
      openModal('video-modal');
      player.play().catch(() => {});
    }
  };

  window.closeAllModals = closeAllModals;

  /* ==========================================================================
     EMTI Presentation Mode & Classroom Action
     ========================================================================== */
  function initPresentationMode() {
    const toggleBtn = document.getElementById('presentation-mode-btn');
    const banner = document.getElementById('presentation-banner');

    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        state.isPresentationMode = !state.isPresentationMode;
        if (banner) {
          if (state.isPresentationMode) {
            banner.classList.remove('hidden');
            toggleBtn.classList.add('bg-cyan-500', 'text-slate-950', 'border-cyan-400');
            toggleBtn.classList.remove('bg-slate-900', 'text-cyan-400');
            document.getElementById('academic-work')?.scrollIntoView({ behavior: 'smooth' });
          } else {
            banner.classList.add('hidden');
            toggleBtn.classList.remove('bg-cyan-500', 'text-slate-950', 'border-cyan-400');
            toggleBtn.classList.add('bg-slate-900', 'text-cyan-400');
          }
        }
      });
    }
  }

  /* ==========================================================================
     Back-to-Top Button
     ========================================================================== */
  function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 450) {
        btn.classList.remove('opacity-0', 'pointer-events-none');
        btn.classList.add('opacity-100', 'pointer-events-auto');
      } else {
        btn.classList.add('opacity-0', 'pointer-events-none');
        btn.classList.remove('opacity-100', 'pointer-events-auto');
      }
    });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ==========================================================================
     Keyboard Shortcuts
     ========================================================================== */
  function initKeyboardShortcuts() {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (state.isLightboxOpen) {
          closeLightbox();
        } else {
          closeAllModals();
        }
      }
      // Lightbox navigation
      if (state.isLightboxOpen) {
        if (e.key === 'ArrowRight') nextLightboxImage();
        if (e.key === 'ArrowLeft') prevLightboxImage();
        if (e.key === '+' || e.key === '=') zoomLightbox(0.25);
        if (e.key === '-' || e.key === '_') zoomLightbox(-0.25);
        if (e.key === '0') resetLightboxZoom();
      }
      // Presentation deck navigation
      if (state.isPresentationOpen) {
        if (e.key === 'ArrowRight') nextSlide();
        if (e.key === 'ArrowLeft') prevSlide();
      }
      // P toggles Presentation mode
      if ((e.key === 'p' || e.key === 'P') && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
        document.getElementById('presentation-mode-btn')?.click();
      }
    });
  }
});
