import numpy as np
import streamlit as st
import plotly.graph_objects as go

st.set_page_config(
    page_title="EM Wave Visualizer",
    page_icon="🌊",
    layout="wide"
)

C = 3e8

st.title("🌊 Electromagnetic Wave Visualizer")
st.caption("Interactive electromagnetic wave simulation")

# ------------------------------------------
# CONTROLS
# ------------------------------------------

st.sidebar.header("Wave Parameters")

frequency_ghz = st.sidebar.slider(
    "Frequency (GHz)",
    0.1, 5.0, 1.0, 0.1
)

E0 = st.sidebar.slider(
    "Electric field amplitude (V/m)",
    0.1, 10.0, 1.0, 0.1
)

frequency = frequency_ghz * 1e9
wavelength = C / frequency
k = 2 * np.pi / wavelength
omega = 2 * np.pi * frequency
B0 = E0 / C

# ------------------------------------------
# PHYSICAL VALUES
# ------------------------------------------

a, b, c, d = st.columns(4)

a.metric("Frequency", f"{frequency_ghz:.2f} GHz")
b.metric("Wavelength", f"{wavelength:.3f} m")
c.metric("Electric field", f"{E0:.2f} V/m")
d.metric("Magnetic field", f"{B0:.3e} T")

st.latex(r"E_x(z,t)=E_0\sin(kz-\omega t)")
st.latex(r"B_y(z,t)=B_0\sin(kz-\omega t)")

# ------------------------------------------
# SPATIAL GRID
# ------------------------------------------

z = np.linspace(0, 2 * wavelength, 120)
sample_z = np.linspace(0, 2 * wavelength, 9)

# ------------------------------------------
# INITIAL FRAME
# ------------------------------------------

def field_values(phase):
    return np.sin(k * z - phase)

def arrow_values(phase):
    return np.sin(k * sample_z - phase)

phase = 0.0

E = field_values(phase)
B = field_values(phase)
arrows = arrow_values(phase)

fig = go.Figure()

# Electric field curve
fig.add_trace(go.Scatter3d(
    x=E,
    y=np.zeros_like(z),
    z=z,
    mode="lines",
    name="Electric field E",
    line=dict(color="#38bdf8", width=6)
))

# Magnetic field curve
fig.add_trace(go.Scatter3d(
    x=np.zeros_like(z),
    y=B,
    z=z,
    mode="lines",
    name="Magnetic field B",
    line=dict(color="#fb923c", width=6)
))

# Propagation axis
fig.add_trace(go.Scatter3d(
    x=[0, 0],
    y=[0, 0],
    z=[0, 2 * wavelength],
    mode="lines",
    name="Propagation (+z)",
    line=dict(color="white", width=4)
))

# Electric field indicators
for zi, value in zip(sample_z, arrows):
    fig.add_trace(go.Scatter3d(
        x=[0, value],
        y=[0, 0],
        z=[zi, zi],
        mode="lines",
        line=dict(color="#38bdf8", width=3),
        showlegend=False,
        hoverinfo="skip"
    ))

# Magnetic field indicators
for zi, value in zip(sample_z, arrows):
    fig.add_trace(go.Scatter3d(
        x=[0, 0],
        y=[0, value],
        z=[zi, zi],
        mode="lines",
        line=dict(color="#fb923c", width=3),
        showlegend=False,
        hoverinfo="skip"
    ))

# ------------------------------------------
# BUILD ANIMATION FRAMES
# ------------------------------------------

frames = []

frame_count = 40

for i in range(frame_count):
    phase = 2 * np.pi * i / frame_count

    E = field_values(phase)
    B = field_values(phase)
    arrows = arrow_values(phase)

    frame_data = [
        go.Scatter3d(x=E, y=np.zeros_like(z), z=z),
        go.Scatter3d(x=np.zeros_like(z), y=B, z=z)
    ]

    # Update electric field indicators
    for j, value in enumerate(arrows):
        frame_data.append(
            go.Scatter3d(
                x=[0, value],
                y=[0, 0],
                z=[sample_z[j], sample_z[j]]
            )
        )

    # Update magnetic field indicators
    for j, value in enumerate(arrows):
        frame_data.append(
            go.Scatter3d(
                x=[0, 0],
                y=[0, value],
                z=[sample_z[j], sample_z[j]]
            )
        )

    frames.append(go.Frame(
        data=frame_data,
        traces=list(range(2, 2 + 2 * len(sample_z)))
    ))

fig.frames = frames

# ------------------------------------------
# PLAY / PAUSE / RESET
# ------------------------------------------

fig.update_layout(
    template="plotly_dark",
    height=720,
    margin=dict(l=0, r=0, t=35, b=0),
    scene=dict(
        xaxis=dict(title="Normalized E field", range=[-1.2, 1.2]),
        yaxis=dict(title="Normalized B field", range=[-1.2, 1.2]),
        zaxis=dict(title="Propagation position z (m)",
                   range=[0, 2 * wavelength]),
        aspectmode="manual",
        aspectratio=dict(x=1, y=1, z=2),
        uirevision="keep-camera"
    ),
    updatemenus=[dict(
        type="buttons",
        direction="left",
        x=0.02,
        y=1.08,
        showactive=False,
        buttons=[
            dict(
                label="▶ Play",
                method="animate",
                args=[
                    None,
                    dict(
                        mode="immediate",
                        fromcurrent=True,
                        frame=dict(duration=50, redraw=True),
                        transition=dict(duration=0)
                    )
                ]
            ),
            dict(
                label="⏸ Pause",
                method="animate",
                args=[
                    [None],
                    dict(
                        mode="immediate",
                        frame=dict(duration=0, redraw=False),
                        transition=dict(duration=0)
                    )
                ]
            ),
            dict(
                label="↺ Reset",
                method="animate",
                args=[
                    ["0"],
                    dict(
                        mode="immediate",
                        frame=dict(duration=0, redraw=True),
                        transition=dict(duration=0)
                    )
                ]
            )
        ]
    )]
)

fig.show()

st.caption(
    "Rotate the 3D graph with your mouse. "
    "Use Play, Pause, and Reset above the graph."
)

# ------------------------------------------
# PHYSICS SUMMARY
# ------------------------------------------

st.subheader("Physics")

st.write(f"Wave number: {k:.3f} rad/m")
st.write(f"Angular frequency: {omega:.3e} rad/s")
st.write(f"Magnetic field amplitude: {B0:.3e} T")
st.write(f"Wave speed: {frequency * wavelength:.3e} m/s")

st.latex(r"\vec E\perp\vec B\perp\vec k")
st.latex(r"\vec S=\vec E\times\vec H")