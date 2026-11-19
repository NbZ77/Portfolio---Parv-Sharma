/**
 * Parv Sharma - EM Wave Visualizer
 * Real-time 3D Isometric Electromagnetic Wave Simulator
 * Mathematical model: E = E0 cos(kz - wt), B = B0 cos(kz - wt), S = E x H
 */

class EMWaveSimulator {
  constructor(canvasId, options = {}) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    
    // Configurable Physics Parameters
    this.params = {
      amplitude: options.amplitude || 70,
      wavelength: options.wavelength || 240,
      frequency: options.frequency || 1.2,
      phase: 0,
      polarization: options.polarization || 'linear', // 'linear', 'circular', 'elliptical'
      showE: options.showE !== false,
      showB: options.showB !== false,
      showPoynting: options.showPoynting !== false,
      showEnvelopes: options.showEnvelopes !== false,
      showGrid: options.showGrid !== false,
      isPaused: false,
      speed: 1.0,
      // Isometric view angles (in radians)
      rotX: options.rotX || 0.45,
      rotY: options.rotY || -0.65,
      zoom: options.zoom || 1.0,
      interactive: options.interactive !== false
    };

    this.isDragging = false;
    this.lastMousePos = { x: 0, y: 0 };
    this.animationFrameId = null;

    this.initCanvasSize();
    this.bindEvents();
    this.start();
  }

  initCanvasSize() {
    const parent = this.canvas.parentElement;
    const rect = parent ? parent.getBoundingClientRect() : this.canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    
    // Ensure we obtain realistic dimensions even before full flex layout calculation
    const w = (rect && rect.width > 50) ? rect.width : (parent ? parent.clientWidth : 380) || 380;
    const h = (rect && rect.height > 50) ? rect.height : (parent ? parent.clientHeight : 208) || 208;

    this.width = Math.round(w);
    this.height = Math.round(h);
    this.canvas.width = Math.round(this.width * dpr);
    this.canvas.height = Math.round(this.height * dpr);
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.display = 'block';
    
    // Reset transform to identity before applying devicePixelRatio scale (prevents exponential scale accumulation)
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  bindEvents() {
    if (window.ResizeObserver && this.canvas.parentElement) {
      this.resizeObserver = new ResizeObserver(() => {
        this.initCanvasSize();
      });
      this.resizeObserver.observe(this.canvas.parentElement);
    } else {
      window.addEventListener('resize', () => {
        this.initCanvasSize();
      });
    }

    if (!this.params.interactive) return;

    // Mouse drag to rotate isometric view
    this.canvas.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      this.lastMousePos = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener('mousemove', (e) => {
      if (!this.isDragging) return;
      const dx = e.clientX - this.lastMousePos.x;
      const dy = e.clientY - this.lastMousePos.y;
      this.params.rotY += dx * 0.007;
      this.params.rotX += dy * 0.007;
      // Clamp X rotation to avoid complete upside-down flipping
      this.params.rotX = Math.max(-1.2, Math.min(1.2, this.params.rotX));
      this.lastMousePos = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener('mouseup', () => {
      this.isDragging = false;
    });

    // Touch support for mobile devices
    this.canvas.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        this.isDragging = true;
        this.lastMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (!this.isDragging || e.touches.length !== 1) return;
      const dx = e.touches[0].clientX - this.lastMousePos.x;
      const dy = e.touches[0].clientY - this.lastMousePos.y;
      this.params.rotY += dx * 0.008;
      this.params.rotX += dy * 0.008;
      this.params.rotX = Math.max(-1.2, Math.min(1.2, this.params.rotX));
      this.lastMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }, { passive: true });

    window.addEventListener('touchend', () => {
      this.isDragging = false;
    });
  }

  // 3D coordinate transformation into 2D viewport with isometric projection
  project(x, y, z) {
    const cx = this.width / 2;
    const cy = this.height / 2;

    // Rotate around Y axis
    const cosY = Math.cos(this.params.rotY);
    const sinY = Math.sin(this.params.rotY);
    const x1 = x * cosY - z * sinY;
    const z1 = z * cosY + x * sinY;

    // Rotate around X axis
    const cosX = Math.cos(this.params.rotX);
    const sinX = Math.sin(this.params.rotX);
    const y2 = y * cosX - z1 * sinX;
    const z2 = z1 * cosX + y * sinX;

    // Adaptive scale to dynamically fill viewport width & height with clean margin
    const baseScale = Math.min(this.width / 380, this.height / 200);
    const scale = Math.max(0.72, Math.min(1.25, baseScale)) * this.params.zoom;
    return {
      x: cx + x1 * scale,
      y: cy - y2 * scale, // Invert Y for Cartesian upward
      depth: z2
    };
  }

  drawAxes() {
    const ctx = this.ctx;
    const axisLen = 320;
    
    // Propagation axis Z (Centerline)
    const zStart = this.project(0, 0, -axisLen);
    const zEnd = this.project(0, 0, axisLen);

    ctx.beginPath();
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.25)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);
    ctx.moveTo(zStart.x, zStart.y);
    ctx.lineTo(zEnd.x, zEnd.y);
    ctx.stroke();
    ctx.setLineDash([]);

    // Axis Labels
    ctx.font = '11px "JetBrains Mono", monospace';
    ctx.fillStyle = 'rgba(148, 163, 184, 0.6)';
    ctx.fillText('+z (Propagation Direction k)', zEnd.x + 8, zEnd.y);

    // X Axis (Electric Field Axis)
    const xStart = this.project(-120, 0, 0);
    const xEnd = this.project(120, 0, 0);
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(59, 130, 246, 0.3)';
    ctx.moveTo(xStart.x, xStart.y);
    ctx.lineTo(xEnd.x, xEnd.y);
    ctx.stroke();
    ctx.fillStyle = '#60a5fa';
    ctx.fillText('x (E-field)', xEnd.x + 6, xEnd.y);

    // Y Axis (Magnetic Field Axis)
    const yStart = this.project(0, -120, 0);
    const yEnd = this.project(0, 120, 0);
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(6, 182, 212, 0.3)';
    ctx.moveTo(yStart.x, yStart.y);
    ctx.lineTo(yEnd.x, yEnd.y);
    ctx.stroke();
    ctx.fillStyle = '#22d3ee';
    ctx.fillText('y (B-field)', yEnd.x + 6, yEnd.y - 4);
  }

  drawArrow(from, to, color, headSize = 5) {
    const ctx = this.ctx;
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const angle = Math.atan2(dy, dx);
    const length = Math.hypot(dx, dy);

    if (length < 2) return;

    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 1.5;
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();

    // Arrowhead
    ctx.beginPath();
    ctx.moveTo(to.x, to.y);
    ctx.lineTo(
      to.x - headSize * Math.cos(angle - Math.PI / 6),
      to.y - headSize * Math.sin(angle - Math.PI / 6)
    );
    ctx.lineTo(
      to.x - headSize * Math.cos(angle + Math.PI / 6),
      to.y - headSize * Math.sin(angle + Math.PI / 6)
    );
    ctx.closePath();
    ctx.fill();
  }

  render() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);

    if (!this.params.isPaused) {
      this.params.phase += 0.035 * this.params.frequency * this.params.speed;
    }

    if (this.params.showGrid) {
      this.drawAxes();
    }

    const k = (2 * Math.PI) / this.params.wavelength;
    const numPoints = 140;
    const zRange = 600;
    const step = zRange / numPoints;
    const zMin = -zRange / 2;

    const eCurve = [];
    const bCurve = [];

    // Calculate wave curves
    for (let i = 0; i <= numPoints; i++) {
      const z = zMin + i * step;
      const waveArg = k * z - this.params.phase;

      let ex = 0;
      let ey = 0;
      let bx = 0;
      let by = 0;

      if (this.params.polarization === 'linear') {
        // Linear: E in X direction, B in Y direction
        ex = this.params.amplitude * Math.cos(waveArg);
        ey = 0;
        bx = 0;
        by = this.params.amplitude * Math.cos(waveArg);
      } else if (this.params.polarization === 'circular') {
        // Circular: E rotates in XY plane
        ex = this.params.amplitude * Math.cos(waveArg);
        ey = this.params.amplitude * Math.sin(waveArg);
        bx = -this.params.amplitude * Math.sin(waveArg);
        by = this.params.amplitude * Math.cos(waveArg);
      } else if (this.params.polarization === 'elliptical') {
        // Elliptical: Unequal amplitudes with phase delay
        ex = this.params.amplitude * Math.cos(waveArg);
        ey = (this.params.amplitude * 0.55) * Math.sin(waveArg + 0.3);
        bx = -(this.params.amplitude * 0.55) * Math.sin(waveArg + 0.3);
        by = this.params.amplitude * Math.cos(waveArg);
      }

      const pOrigin = this.project(0, 0, z);
      const pE = this.project(ex, ey, z);
      const pB = this.project(bx, by, z);

      eCurve.push({ origin: pOrigin, tip: pE, z });
      bCurve.push({ origin: pOrigin, tip: pB, z });
    }

    // Draw Vector field arrows along the wave every N steps
    const arrowStride = 5;
    for (let i = 0; i < eCurve.length; i += arrowStride) {
      const ptE = eCurve[i];
      const ptB = bCurve[i];

      // Draw Magnetic field vector (Cyan)
      if (this.params.showB) {
        this.drawArrow(ptB.origin, ptB.tip, 'rgba(6, 182, 212, 0.7)', 4);
      }

      // Draw Electric field vector (Electric Blue)
      if (this.params.showE) {
        this.drawArrow(ptE.origin, ptE.tip, 'rgba(59, 130, 246, 0.85)', 4);
      }
    }

    // Draw continuous wave envelopes
    if (this.params.showEnvelopes) {
      // E-field envelope
      if (this.params.showE && eCurve.length > 0) {
        ctx.beginPath();
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 2.5;
        ctx.shadowColor = 'rgba(59, 130, 246, 0.6)';
        ctx.shadowBlur = 8;
        ctx.moveTo(eCurve[0].tip.x, eCurve[0].tip.y);
        for (let i = 1; i < eCurve.length; i++) {
          ctx.lineTo(eCurve[i].tip.x, eCurve[i].tip.y);
        }
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // B-field envelope
      if (this.params.showB && bCurve.length > 0) {
        ctx.beginPath();
        ctx.strokeStyle = '#06b6d4';
        ctx.lineWidth = 2.5;
        ctx.shadowColor = 'rgba(6, 182, 212, 0.6)';
        ctx.shadowBlur = 8;
        ctx.moveTo(bCurve[0].tip.x, bCurve[0].tip.y);
        for (let i = 1; i < bCurve.length; i++) {
          ctx.lineTo(bCurve[i].tip.x, bCurve[i].tip.y);
        }
        ctx.stroke();
        ctx.shadowBlur = 0;
      }
    }

    // Draw Poynting Vectors (S = E x H) at periodic intervals along the propagation axis
    if (this.params.showPoynting) {
      const poyntingStride = 20;
      for (let i = 10; i < eCurve.length - 10; i += poyntingStride) {
        const origin = eCurve[i].origin;
        // Direction is +Z
        const forwardZ = eCurve[i].z + 38;
        const poyntingTip = this.project(0, 0, forwardZ);
        
        ctx.shadowColor = 'rgba(245, 158, 11, 0.8)';
        ctx.shadowBlur = 6;
        this.drawArrow(origin, poyntingTip, '#f59e0b', 6);
        ctx.shadowBlur = 0;
      }
    }

    // Overlay real-time formula telemetry HUD
    this.drawHUD();

    this.animationFrameId = requestAnimationFrame(() => this.render());
  }

  drawHUD() {
    const ctx = this.ctx;
    ctx.font = '10px "JetBrains Mono", monospace';
    ctx.fillStyle = 'rgba(148, 163, 184, 0.7)';
    const textY = this.height - 14;

    const polLabel = this.params.polarization.toUpperCase();
    const statusText = `S = E × H  |  λ = ${this.params.wavelength}px  |  f = ${this.params.frequency.toFixed(1)}  |  POL: ${polLabel}`;
    ctx.fillText(statusText, 14, textY);
  }

  setPolarization(type) {
    if (['linear', 'circular', 'elliptical'].includes(type)) {
      this.params.polarization = type;
    }
  }

  togglePlayPause() {
    this.params.isPaused = !this.params.isPaused;
    return this.params.isPaused;
  }

  setSpeed(factor) {
    this.params.speed = factor;
  }

  setWavelength(val) {
    this.params.wavelength = val;
  }

  setFrequency(val) {
    this.params.frequency = val;
  }

  toggleE() {
    this.params.showE = !this.params.showE;
  }

  toggleB() {
    this.params.showB = !this.params.showB;
  }

  togglePoynting() {
    this.params.showPoynting = !this.params.showPoynting;
  }

  start() {
    if (!this.animationFrameId) {
      this.render();
    }
  }

  stop() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  destroy() {
    this.stop();
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
  }
}

window.EMWaveSimulator = EMWaveSimulator;
