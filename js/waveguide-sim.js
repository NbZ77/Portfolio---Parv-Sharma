/**
 * Parv Sharma - Waveguide Mode & Cutoff Frequency Simulator
 * EMTI Unit 3: Electromagnetic Waves and Waveguides
 */

class WaveguideSimulator {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.state = {
      widthA: 2.286,  // cm (Standard WR-90 X-Band)
      heightB: 1.016, // cm (Standard WR-90 X-Band)
      mode: 'TE10',   // TE10, TE20, TE01, TM11
      operatingFreq: 10.0, // GHz
      material: 'copper' // copper, aluminum, gold, silver
    };

    this.materials = {
      copper: { name: 'Copper', sigma: 5.8e7, label: '5.80 × 10⁷ S/m' },
      aluminum: { name: 'Aluminum', sigma: 3.5e7, label: '3.50 × 10⁷ S/m' },
      gold: { name: 'Gold', sigma: 4.1e7, label: '4.10 × 10⁷ S/m' },
      silver: { name: 'Silver', sigma: 6.3e7, label: '6.30 × 10⁷ S/m' }
    };

    this.render();
    this.bindEvents();
  }

  calculate() {
    const c = 2.99792458e10; // cm/s
    const a = this.state.widthA;
    const b = this.state.heightB;

    let m = 1, n = 0;
    if (this.state.mode === 'TE10') { m = 1; n = 0; }
    else if (this.state.mode === 'TE20') { m = 2; n = 0; }
    else if (this.state.mode === 'TE01') { m = 0; n = 1; }
    else if (this.state.mode === 'TM11') { m = 1; n = 1; }

    // Cutoff frequency in Hz: fc = (c / 2) * sqrt((m/a)^2 + (n/b)^2)
    const fcHz = (c / 2) * Math.sqrt(Math.pow(m / a, 2) + Math.pow(n / b, 2));
    const fcGHz = fcHz / 1e9;

    const fGHz = this.state.operatingFreq;
    const fHz = fGHz * 1e9;
    const isPropagating = fGHz > fcGHz;

    // Guide wavelength: λg = λ0 / sqrt(1 - (fc/f)^2)
    const lambda0Cm = (c / fHz);
    let lambdaGCm = 0;
    let vpC = 0; // phase velocity relative to c
    let vgC = 0; // group velocity relative to c

    if (isPropagating) {
      const radical = Math.sqrt(1 - Math.pow(fcGHz / fGHz, 2));
      lambdaGCm = lambda0Cm / radical;
      vpC = 1 / radical;
      vgC = radical;
    }

    // Skin depth: δ = 1 / sqrt(π * f * μ * σ)
    const mu0 = 4 * Math.PI * 1e-7;
    const sigma = this.materials[this.state.material].sigma;
    const deltaMeters = 1 / Math.sqrt(Math.PI * fHz * mu0 * sigma);
    const deltaMicrons = deltaMeters * 1e6;

    // Wave impedance: η_TE = η0 / sqrt(1 - (fc/f)^2)
    const eta0 = 376.73; // ohms
    let etaTE = isPropagating ? (eta0 / Math.sqrt(1 - Math.pow(fcGHz / fGHz, 2))) : 0;

    return {
      m, n, fcGHz, fGHz, isPropagating, lambda0Cm, lambdaGCm, vpC, vgC, deltaMicrons, etaTE
    };
  }

  render() {
    const calc = this.calculate();

    this.container.innerHTML = `
      <div class="space-y-6">
        <!-- Interactive Controls Bar -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <div>
            <label class="block text-xs font-mono text-slate-400 mb-1">WAVEGUIDE MODE</label>
            <select id="wg-mode-select" class="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-cyan-400 font-mono focus:outline-none focus:border-cyan-500">
              <option value="TE10" ${this.state.mode === 'TE10' ? 'selected' : ''}>TE₁₀ (Dominant Mode)</option>
              <option value="TE20" ${this.state.mode === 'TE20' ? 'selected' : ''}>TE₂₀ Mode</option>
              <option value="TE01" ${this.state.mode === 'TE01' ? 'selected' : ''}>TE₀₁ Mode</option>
              <option value="TM11" ${this.state.mode === 'TM11' ? 'selected' : ''}>TM₁₁ Mode</option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-mono text-slate-400 mb-1">OPERATING FREQ: <span class="text-white font-bold">${this.state.operatingFreq.toFixed(1)} GHz</span></label>
            <input type="range" id="wg-freq-slider" min="4" max="18" step="0.2" value="${this.state.operatingFreq}" class="w-full accent-cyan-400">
          </div>

          <div>
            <label class="block text-xs font-mono text-slate-400 mb-1">WIDTH a (cm): <span class="text-white font-bold">${this.state.widthA.toFixed(2)}</span></label>
            <input type="range" id="wg-a-slider" min="1.5" max="4.0" step="0.1" value="${this.state.widthA}" class="w-full accent-blue-500">
          </div>

          <div>
            <label class="block text-xs font-mono text-slate-400 mb-1">CONDUCTOR MATERIAL</label>
            <select id="wg-mat-select" class="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-amber-400 font-mono focus:outline-none focus:border-amber-500">
              <option value="copper" ${this.state.material === 'copper' ? 'selected' : ''}>Copper (σ = 5.8×10⁷)</option>
              <option value="aluminum" ${this.state.material === 'aluminum' ? 'selected' : ''}>Aluminum (σ = 3.5×10⁷)</option>
              <option value="gold" ${this.state.material === 'gold' ? 'selected' : ''}>Gold (σ = 4.1×10⁷)</option>
              <option value="silver" ${this.state.material === 'silver' ? 'selected' : ''}>Silver (σ = 6.3×10⁷)</option>
            </select>
          </div>
        </div>

        <!-- Telemetry Results Display -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div class="p-3 rounded-lg bg-slate-900/60 border border-slate-800/80">
            <span class="text-[11px] font-mono text-slate-400 block">CUTOFF FREQ (fc)</span>
            <span class="text-xl font-bold font-mono ${calc.isPropagating ? 'text-cyan-400' : 'text-red-400'}">${calc.fcGHz.toFixed(3)} GHz</span>
            <span class="text-[10px] text-slate-500 block mt-0.5">m=${calc.m}, n=${calc.n}</span>
          </div>

          <div class="p-3 rounded-lg bg-slate-900/60 border border-slate-800/80">
            <span class="text-[11px] font-mono text-slate-400 block">PROPAGATION STATE</span>
            <span class="inline-flex items-center gap-1.5 text-xs font-mono font-semibold px-2 py-1 rounded mt-1 ${calc.isPropagating ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-red-500/10 text-red-400 border border-red-500/30'}">
              <span class="w-1.5 h-1.5 rounded-full ${calc.isPropagating ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'}"></span>
              ${calc.isPropagating ? 'PASSING (f > fc)' : 'EVANESCENT (f < fc)'}
            </span>
          </div>

          <div class="p-3 rounded-lg bg-slate-900/60 border border-slate-800/80">
            <span class="text-[11px] font-mono text-slate-400 block">GUIDE WAVELENGTH (λg)</span>
            <span class="text-xl font-bold font-mono text-blue-400">${calc.isPropagating ? calc.lambdaGCm.toFixed(2) + ' cm' : '∞ (Cutoff)'}</span>
            <span class="text-[10px] text-slate-500 block mt-0.5">Free space λ₀ = ${calc.lambda0Cm.toFixed(2)} cm</span>
          </div>

          <div class="p-3 rounded-lg bg-slate-900/60 border border-slate-800/80">
            <span class="text-[11px] font-mono text-slate-400 block">SKIN DEPTH (δ)</span>
            <span class="text-xl font-bold font-mono text-amber-400">${calc.deltaMicrons.toFixed(2)} µm</span>
            <span class="text-[10px] text-slate-500 block mt-0.5">${this.materials[this.state.material].name} at ${calc.fGHz} GHz</span>
          </div>
        </div>

        <!-- 2D Waveguide Cross-Section Canvas -->
        <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 relative">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-mono text-slate-400">WAVEGUIDE CROSS-SECTION (${this.state.widthA} cm × ${this.state.heightB} cm) - FIELD INTENSITY</span>
            <span class="text-xs font-mono text-cyan-400">Mode: ${this.state.mode}</span>
          </div>
          <canvas id="wg-cross-canvas" class="w-full h-44 rounded-lg bg-slate-900/90"></canvas>
          <div class="flex justify-between items-center text-[10px] font-mono text-slate-500 mt-2 px-1">
            <span>Left Wall (x = 0)</span>
            <span class="text-slate-400">Boundary Condition: Etan = 0 on conductor</span>
            <span>Right Wall (x = a)</span>
          </div>
        </div>
      </div>
    `;

    this.drawCrossSection(calc);
  }

  drawCrossSection(calc) {
    const canvas = document.getElementById('wg-cross-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;

    // Conductor Metallic Wall thickness
    const wallThick = 12;
    const innerW = w - 2 * wallThick;
    const innerH = h - 2 * wallThick;

    // Draw Outer metallic walls
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, 0, w, h);

    // Hatching on metallic wall
    ctx.strokeStyle = 'rgba(100, 116, 139, 0.3)';
    ctx.lineWidth = 1;
    for (let x = -h; x < w; x += 14) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + h, h);
      ctx.stroke();
    }

    // Inner hollow core
    ctx.fillStyle = '#050a14';
    ctx.fillRect(wallThick, wallThick, innerW, innerH);

    // Draw field distribution inside the core
    const cols = 60;
    const rows = 20;
    const cellW = innerW / cols;
    const cellH = innerH / rows;

    for (let i = 0; i < cols; i++) {
      const u = i / cols; // 0 to 1 across width a
      for (let j = 0; j < rows; j++) {
        const v = j / rows; // 0 to 1 across height b
        let intensity = 0;

        if (this.state.mode === 'TE10') {
          // Ey = E0 * sin(pi * x / a)
          intensity = Math.sin(Math.PI * u);
        } else if (this.state.mode === 'TE20') {
          // Ey = E0 * sin(2 * pi * x / a)
          intensity = Math.abs(Math.sin(2 * Math.PI * u));
        } else if (this.state.mode === 'TE01') {
          // Ex = E0 * sin(pi * y / b)
          intensity = Math.sin(Math.PI * v);
        } else if (this.state.mode === 'TM11') {
          // Ez = E0 * sin(pi * x / a) * sin(pi * y / b)
          intensity = Math.sin(Math.PI * u) * Math.sin(Math.PI * v);
        }

        if (calc.isPropagating) {
          ctx.fillStyle = `rgba(6, 182, 212, ${intensity * 0.75})`;
        } else {
          ctx.fillStyle = `rgba(239, 68, 68, ${intensity * 0.25})`;
        }

        ctx.fillRect(wallThick + i * cellW, wallThick + j * cellH, cellW + 0.5, cellH + 0.5);
      }
    }

    // Draw Electric Field Vector Arrows for dominant mode
    if (this.state.mode === 'TE10' && calc.isPropagating) {
      const arrowCols = 9;
      const stepX = innerW / (arrowCols + 1);

      for (let k = 1; k <= arrowCols; k++) {
        const xPos = wallThick + k * stepX;
        const normX = k / (arrowCols + 1);
        const arrowHeight = innerH * 0.75 * Math.sin(Math.PI * normX);
        const yCenter = wallThick + innerH / 2;
        const yTop = yCenter - arrowHeight / 2;
        const yBottom = yCenter + arrowHeight / 2;

        ctx.beginPath();
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2;
        ctx.moveTo(xPos, yBottom);
        ctx.lineTo(xPos, yTop);
        ctx.stroke();

        // Arrowhead pointing upward (Ey)
        ctx.beginPath();
        ctx.fillStyle = '#38bdf8';
        ctx.moveTo(xPos, yTop - 4);
        ctx.lineTo(xPos - 4, yTop + 3);
        ctx.lineTo(xPos + 4, yTop + 3);
        ctx.closePath();
        ctx.fill();
      }
    }

    // Inner border stroke
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(wallThick, wallThick, innerW, innerH);
  }

  bindEvents() {
    this.container.addEventListener('change', (e) => {
      if (e.target.id === 'wg-mode-select') {
        this.state.mode = e.target.value;
        this.render();
        this.bindEvents();
      }
      if (e.target.id === 'wg-mat-select') {
        this.state.material = e.target.value;
        this.render();
        this.bindEvents();
      }
    });

    this.container.addEventListener('input', (e) => {
      if (e.target.id === 'wg-freq-slider') {
        this.state.operatingFreq = parseFloat(e.target.value);
        this.render();
        this.bindEvents();
      }
      if (e.target.id === 'wg-a-slider') {
        this.state.widthA = parseFloat(e.target.value);
        this.render();
        this.bindEvents();
      }
    });
  }
}

window.WaveguideSimulator = WaveguideSimulator;
