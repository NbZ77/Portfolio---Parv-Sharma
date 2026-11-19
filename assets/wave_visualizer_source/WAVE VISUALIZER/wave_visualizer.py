import numpy as np
import plotly.graph_objects as go

# ==========================================
# ELECTROMAGNETIC WAVE PARAMETERS
# ==========================================

c = 3e8
frequency = 1e9
E0 = 1.0

wavelength = c / frequency
k = 2 * np.pi / wavelength
omega = 2 * np.pi * frequency

B0 = E0 / c

# ==========================================
# POSITION GRID
# ==========================================

z = np.linspace(0, 2 * wavelength, 150)

# Selected positions for field arrows
arrow_positions = np.linspace(
    0.02 * wavelength,
    1.98 * wavelength,
    13
)

# ==========================================
# FIELD CALCULATIONS
# ==========================================

def calculate_fields(t):
    phase = k * z - omega * t

    E = np.sin(phase)
    B = np.sin(phase)

    return E, B


# ==========================================
# CREATE FIELD CURVES
# ==========================================

E, B = calculate_fields(0)

fig = go.Figure()

# Electric field curve
fig.add_trace(
    go.Scatter3d(
        x=E,
        y=np.zeros_like(z),
        z=z,
        mode="lines",
        name="Electric field",
        line=dict(color="deepskyblue", width=7)
    )
)

# Magnetic field curve
fig.add_trace(
    go.Scatter3d(
        x=np.zeros_like(z),
        y=B,
        z=z,
        mode="lines",
        name="Magnetic field",
        line=dict(color="orangered", width=7)
    )
)

# Propagation axis
fig.add_trace(
    go.Scatter3d(
        x=[0, 0],
        y=[0, 0],
        z=[0, 2 * wavelength],
        mode="lines",
        name="Propagation direction",
        line=dict(color="white", width=5)
    )
)

# ==========================================
# FIELD ARROWS
# ==========================================

def make_field_arrows(t):
    phase = k * arrow_positions - omega * t
    values = np.sin(phase)

    # Electric field arrows along x
    ex = []
    ey = []
    ez = []

    # Magnetic field arrows along y
    bx = []
    by = []
    bz = []

    for zi, value in zip(arrow_positions, values):

        # Electric-field arrow
        ex.extend([0, 0.65 * value, None])
        ey.extend([0, 0, None])
        ez.extend([zi, zi, None])

        # Magnetic-field arrow
        bx.extend([0, 0, None])
        by.extend([0, 0.65 * value, None])
        bz.extend([zi, zi, None])

    return ex, ey, ez, bx, by, bz


ex, ey, ez, bx, by, bz = make_field_arrows(0)

fig.add_trace(
    go.Scatter3d(
        x=ex,
        y=ey,
        z=ez,
        mode="lines",
        name="E field vectors",
        line=dict(color="deepskyblue", width=5),
        showlegend=False
    )
)

fig.add_trace(
    go.Scatter3d(
        x=bx,
        y=by,
        z=bz,
        mode="lines",
        name="B field vectors",
        line=dict(color="orangered", width=5),
        showlegend=False
    )
)

# ==========================================
# ANIMATION
# ==========================================

frames = []
number_of_frames = 50
period = 1 / frequency

for i in range(number_of_frames):

    t = i * period / number_of_frames

    E, B = calculate_fields(t)

    ex, ey, ez, bx, by, bz = make_field_arrows(t)

    frames.append(
        go.Frame(
            data=[
                go.Scatter3d(
                    x=E,
                    y=np.zeros_like(z),
                    z=z
                ),
                go.Scatter3d(
                    x=np.zeros_like(z),
                    y=B,
                    z=z
                ),
                go.Scatter3d(
                    x=ex,
                    y=ey,
                    z=ez
                ),
                go.Scatter3d(
                    x=bx,
                    y=by,
                    z=bz
                )
            ],
            traces=[0, 1, 3, 4],
            name=str(i)
        )
    )

fig.frames = frames

# ==========================================
# LAYOUT
# ==========================================

fig.update_layout(
    title="3D Electromagnetic Wave with Field Vectors",
    template="plotly_dark",
    height=800,

    scene=dict(
        xaxis=dict(
            title="Electric field direction (x)",
            range=[-1.2, 1.2],
            zeroline=True
        ),

        yaxis=dict(
            title="Magnetic field direction (y)",
            range=[-1.2, 1.2],
            zeroline=True
        ),

        zaxis=dict(
            title="Propagation direction (z, m)",
            range=[0, 2 * wavelength]
        ),

        aspectmode="manual",
        aspectratio=dict(x=1, y=1, z=2),

        camera=dict(
            eye=dict(x=1.6, y=1.6, z=1.2)
        )
    ),

    updatemenus=[
        dict(
            type="buttons",
            showactive=False,
            x=0.05,
            y=1.05,
            buttons=[
                dict(
                    label="▶ Play",
                    method="animate",
                    args=[
                        None,
                        {
                            "frame": {
                                "duration": 60,
                                "redraw": True
                            },
                            "fromcurrent": True,
                            "transition": {"duration": 0}
                        }
                    ]
                ),

                dict(
                    label="⏸ Pause",
                    method="animate",
                    args=[
                        [None],
                        {
                            "mode": "immediate",
                            "frame": {
                                "duration": 0,
                                "redraw": False
                            },
                            "transition": {"duration": 0}
                        }
                    ]
                )
            ]
        )
    ],

    sliders=[
        dict(
            active=0,
            currentvalue={"prefix": "Frame: "},
            steps=[
                dict(
                    method="animate",
                    args=[
                        [str(i)],
                        {
                            "mode": "immediate",
                            "frame": {
                                "duration": 0,
                                "redraw": True
                            },
                            "transition": {"duration": 0}
                        }
                    ],
                    label=str(i)
                )
                for i in range(number_of_frames)
            ]
        )
    ]
)

fig.show()

# ==========================================
# PHYSICAL VALUES
# ==========================================

print("ELECTROMAGNETIC WAVE")
print("--------------------")
print(f"Frequency: {frequency / 1e9:.2f} GHz")
print(f"Wavelength: {wavelength:.3f} m")
print(f"E amplitude: {E0:.3f} V/m")
print(f"B amplitude: {B0:.3e} T")
print(f"Wave speed: {frequency * wavelength:.3e} m/s")