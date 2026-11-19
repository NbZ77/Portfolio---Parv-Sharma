/**
 * Parv Sharma - Interactive Formula Mindmap
 * EMTI Unit 1: Vector Analysis & Electrostatics
 */

class FormulaMindmap {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.activeNodeId = "coord";
    this.nodes = [
      {
        id: "coord",
        title: "Coordinate Systems & Differentials",
        category: "Geometry",
        color: "#38bdf8",
        summary: "Cartesian, Cylindrical, and Spherical transformations with differential line, surface, and volume elements.",
        equations: [
          { name: "Cartesian Line Element", expr: "dl = dx ax + dy ay + dz az", desc: "Differential length vector in rectangular space" },
          { name: "Cartesian Volume Element", expr: "dv = dx · dy · dz", desc: "Infinitesimal volume block" },
          { name: "Cylindrical Line Element", expr: "dl = dρ aρ + ρ dφ aφ + dz az", desc: "Curvilinear metric factor hφ = ρ" },
          { name: "Cylindrical Volume Element", expr: "dv = ρ · dρ · dφ · dz", desc: "Volume element in circular cylinder coordinates" },
          { name: "Spherical Line Element", expr: "dl = dr ar + r dθ aθ + r sinθ dφ aφ", desc: "Metric factors hr=1, hθ=r, hφ=r sinθ" },
          { name: "Spherical Volume Element", expr: "dv = r² sinθ · dr · dθ · dφ", desc: "Infinitesimal spherical shell segment" }
        ]
      },
      {
        id: "calculus",
        title: "Vector Differential Calculus",
        category: "Operators",
        color: "#818cf8",
        summary: "Del operator operations: Gradient (scalar slope), Divergence (flux source), Curl (vorticity), and fundamental integral theorems.",
        equations: [
          { name: "Gradient of Scalar V", expr: "∇V = (∂V/∂x)ax + (∂V/∂y)ay + (∂V/∂z)az", desc: "Points in the direction of maximum spatial rate of increase" },
          { name: "Divergence of Vector A", expr: "∇ · A = ∂Ax/∂x + ∂Ay/∂y + ∂Az/∂z", desc: "Net volumetric outflow flux per unit volume" },
          { name: "Curl of Vector A", expr: "∇ × A = det | ax  ay  az ; ∂/∂x ∂/∂y ∂/∂z ; Ax Ay Az |", desc: "Circulation density or rotational vorticity of vector A" },
          { name: "Divergence Theorem", expr: "∮_S A · dS = ∫_V (∇ · A) dv", desc: "Converts closed surface flux integral into volume integral" },
          { name: "Stokes' Theorem", expr: "∮_L A · dl = ∫_S (∇ × A) · dS", desc: "Converts closed contour line integral into open surface curl integral" },
          { name: "Null Identities", expr: "∇ × (∇V) ≡ 0  and  ∇ · (∇ × A) ≡ 0", desc: "Curl of gradient is identically zero; divergence of curl is identically zero" }
        ]
      },
      {
        id: "coulomb-gauss",
        title: "Coulomb's Law & Gauss's Law",
        category: "Forces & Flux",
        color: "#34d399",
        summary: "Electrostatic force between stationary point charges, electric field intensity E, flux density D, and Gauss's Law.",
        equations: [
          { name: "Coulomb's Law", expr: "F = (Q1 · Q2) / (4πε₀ R²) aR", desc: "Electrostatic force in free space (ε₀ ≈ 8.854 × 10⁻¹² F/m)" },
          { name: "Electric Field Intensity E", expr: "E = F / q = Q / (4πε₀ r²) ar", desc: "Force per unit test charge" },
          { name: "Electric Flux Density D", expr: "D = ε · E = ε₀ εr · E", desc: "Independent of dielectric medium polarization" },
          { name: "Gauss's Law (Integral)", expr: "∮_S D · dS = Q_enclosed = ∫_V ρv dv", desc: "Total outward electric flux through any closed surface equals enclosed charge" },
          { name: "Gauss's Law (Differential)", expr: "∇ · D = ρv", desc: "Point-form Maxwell's first electrostatic equation" }
        ]
      },
      {
        id: "potential",
        title: "Electric Potential & Energy",
        category: "Energy & Work",
        color: "#fbbf24",
        summary: "Line integral of E-field, conservative nature of static fields, voltage gradient relation, and electrostatic energy density.",
        equations: [
          { name: "Electric Potential V", expr: "V_AB = - ∫_A^B E · dl", desc: "Work done moving unit positive charge against field from A to B" },
          { name: "Potential-Field Relation", expr: "E = -∇V", desc: "Electric field is negative gradient of electrostatic potential" },
          { name: "Conservative Field", expr: "∮ E · dl = 0  ⇒  ∇ × E = 0", desc: "Zero net work along any closed electrostatic loop" },
          { name: "Potential from Point Charge", expr: "V(r) = Q / (4πε₀ r)", desc: "Absolute potential referenced to infinity (V(∞) = 0)" },
          { name: "Electrostatic Energy Density", expr: "we = (1/2) D · E = (1/2) ε |E|² (J/m³)", desc: "Energy stored per unit volume in electrostatic field" }
        ]
      },
      {
        id: "maxwell-laplace",
        title: "Maxwell's Statics & Poisson/Laplace",
        category: "Field Equations",
        color: "#f43f5e",
        summary: "The coupled governing partial differential equations of electrostatics and boundary-value solutions.",
        equations: [
          { name: "Maxwell's 1st Electrostatic Eq", expr: "∇ · D = ρv", desc: "Differential form of Gauss's Law" },
          { name: "Maxwell's 2nd Electrostatic Eq", expr: "∇ × E = 0", desc: "Conservative nature of static electric fields" },
          { name: "Poisson's Equation", expr: "∇²V = - ρv / ε", desc: "Second-order PDE governing potential in regions with charge density ρv" },
          { name: "Laplace's Equation", expr: "∇²V = 0", desc: "Special case of Poisson's equation in charge-free dielectric regions (ρv = 0)" },
          { name: "Boundary Conditions (Dielectric)", expr: "Dt1 - Dt2 = 0  and  Dn1 - Dn2 = ρs", desc: "Tangential E is continuous; normal D jumps by surface charge density ρs" }
        ]
      }
    ];

    this.render();
  }

  selectNode(id) {
    this.activeNodeId = id;
    this.render();
  }

  render() {
    const activeNode = this.nodes.find(n => n.id === this.activeNodeId) || this.nodes[0];

    this.container.innerHTML = `
      <div class="space-y-6">
        <!-- Interactive Category Pills -->
        <div class="flex flex-wrap gap-2 pb-2 border-b border-slate-800">
          ${this.nodes.map(n => `
            <button 
              data-node-id="${n.id}"
              class="px-3.5 py-2 rounded-lg text-xs font-mono transition-all flex items-center gap-2 ${
                n.id === this.activeNodeId
                  ? 'bg-slate-800 text-white border-2 border-cyan-400 shadow-lg shadow-cyan-500/10 font-bold'
                  : 'bg-slate-900/80 text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-slate-200'
              }"
            >
              <span class="w-2 h-2 rounded-full" style="background-color: ${n.color};"></span>
              ${n.title}
            </button>
          `).join('')}
        </div>

        <!-- Node Header & Summary -->
        <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800/90 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-cyan-400 border border-cyan-500/20">${activeNode.category}</span>
              <span class="text-xs font-mono text-slate-500">Unit 1 Core Pillar</span>
            </div>
            <h4 class="text-lg font-bold font-display text-white">${activeNode.title}</h4>
            <p class="text-xs text-slate-300 mt-1 max-w-2xl">${activeNode.summary}</p>
          </div>
          <div class="shrink-0 font-mono text-xs text-slate-400 bg-slate-950 px-3 py-2 rounded-lg border border-slate-800">
            <span>6 Key Equations</span>
          </div>
        </div>

        <!-- Equations Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          ${activeNode.equations.map(eq => `
            <div class="p-4 rounded-xl bg-slate-950/90 border border-slate-800 hover:border-cyan-500/40 transition-all group">
              <div class="flex items-center justify-between mb-2">
                <span class="text-xs font-mono font-semibold text-slate-300 group-hover:text-cyan-300 transition-colors">${eq.name}</span>
                <span class="text-[10px] font-mono text-slate-500">EMTI-U1</span>
              </div>
              <div class="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 font-mono text-sm text-cyan-400 overflow-x-auto my-2 tracking-wide font-medium">
                ${eq.expr}
              </div>
              <p class="text-xs text-slate-400 leading-relaxed">${eq.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    // Bind pill buttons
    this.container.querySelectorAll('[data-node-id]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.selectNode(btn.getAttribute('data-node-id'));
      });
    });
  }
}

window.FormulaMindmap = FormulaMindmap;
