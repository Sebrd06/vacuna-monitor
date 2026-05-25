import { useState, useEffect } from "react";
import { db } from "../services/firebase";
import {
  collection, doc, getDoc, getDocs,
  updateDoc, addDoc, deleteDoc
} from "firebase/firestore";

export default function Configuracion() {
  const [vacunas,    setVacunas]    = useState([]);
  const [seleccion,  setSeleccion]  = useState(null);
  const [form,       setForm]       = useState({ nombre: "", lote: "", tempMin: 2, tempMax: 8 });
  const [modo,       setModo]       = useState("lista"); // "lista" | "editar" | "nueva"
  const [guardando,  setGuardando]  = useState(false);
  const [mensaje,    setMensaje]    = useState(null);

  const fetchVacunas = async () => {
    const snap = await getDocs(collection(db, "vacunas"));
    setVacunas(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  };

  useEffect(() => { fetchVacunas(); }, []);

  const abrirEditar = (v) => {
    setSeleccion(v.id);
    setForm({ nombre: v.nombre, lote: v.lote, tempMin: v.tempMin, tempMax: v.tempMax });
    setModo("editar");
    setMensaje(null);
  };

  const abrirNueva = () => {
    setSeleccion(null);
    setForm({ nombre: "", lote: "", tempMin: 2, tempMax: 8 });
    setModo("nueva");
    setMensaje(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: name.startsWith("temp") ? Number(value) : value }));
  };

  const handleGuardar = async () => {
    if (!form.nombre || !form.lote) {
      setMensaje({ tipo: "danger", texto: "El nombre y el lote son obligatorios." });
      return;
    }
    setGuardando(true);
    setMensaje(null);
    try {
      if (modo === "editar") {
        await updateDoc(doc(db, "vacunas", seleccion), {
          nombre: form.nombre, lote: form.lote,
          tempMin: form.tempMin, tempMax: form.tempMax,
        });
      } else {
        await addDoc(collection(db, "vacunas"), {
          nombre: form.nombre, lote: form.lote,
          tempMin: form.tempMin, tempMax: form.tempMax,
          estado: "normal",
        });
      }
      setMensaje({ tipo: "success", texto: "✓ Guardado correctamente." });
      await fetchVacunas();
      setTimeout(() => setModo("lista"), 1200);
    } catch (e) {
      setMensaje({ tipo: "danger", texto: "Error: " + e.message });
    }
    setGuardando(false);
  };

  const handleEliminar = async (id) => {
    if (!confirm("¿Eliminar esta vacuna?")) return;
    await deleteDoc(doc(db, "vacunas", id));
    await fetchVacunas();
  };

  const estadoColor = { normal: "#1D9E75", alerta: "#BA7517", critico: "#A32D2D" };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="page-title mb-0">
          {modo === "lista" ? "Configuración" : modo === "nueva" ? "Nueva vacuna" : "Editar vacuna"}
        </h2>
        {modo === "lista" ? (
          <button className="btn-primary-custom" style={{ width: "auto", padding: "8px 22px" }} onClick={abrirNueva}>
            + Agregar vacuna
          </button>
        ) : (
          <button
            onClick={() => setModo("lista")}
            style={{ background: "none", border: "none", color: "#6C3FC5", cursor: "pointer", fontWeight: 500 }}
          >
            ← Volver
          </button>
        )}
      </div>

      {/* Lista de vacunas */}
      {modo === "lista" && (
        <div className="row g-3">
          {vacunas.length === 0 && (
            <p style={{ color: "#888" }}>No hay vacunas registradas. Agrega una.</p>
          )}
          {vacunas.map(v => (
            <div className="col-md-6" key={v.id}>
              <div className="main-card">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 16, color: "#26215C" }}>{v.nombre}</div>
                    <div style={{ fontSize: 13, color: "#888" }}>Lote: {v.lote}</div>
                  </div>
                  <span style={{
                    background: estadoColor[v.estado] ?? "#1D9E75",
                    color: "#fff", fontSize: 12,
                    padding: "3px 12px", borderRadius: 99, fontWeight: 500
                  }}>
                    {v.estado ?? "normal"}
                  </span>
                </div>
                <div style={{ fontSize: 13, color: "#534AB7", marginBottom: 14 }}>
                  Rango: {v.tempMin}°C – {v.tempMax}°C
                </div>
                <div className="d-flex gap-2">
                  <button
                    onClick={() => abrirEditar(v)}
                    style={{ flex: 1, background: "#6C3FC5", color: "#fff", border: "none", borderRadius: 99, padding: "7px 0", cursor: "pointer", fontSize: 13 }}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleEliminar(v.id)}
                    style={{ flex: 1, background: "#FCEBEB", color: "#A32D2D", border: "none", borderRadius: 99, padding: "7px 0", cursor: "pointer", fontSize: 13 }}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Formulario nueva / editar */}
      {(modo === "nueva" || modo === "editar") && (
        <div className="main-card" style={{ maxWidth: 520 }}>
          {mensaje && (
            <div className={`alert alert-${mensaje.tipo} rounded-3 mb-3`}>{mensaje.texto}</div>
          )}
          <div className="mb-3">
            <label className="form-label" style={{ color: "#534AB7", fontWeight: 500 }}>Nombre de la vacuna</label>
            <input className="form-control" name="nombre" value={form.nombre} onChange={handleChange} placeholder="ej. Pfizer BNT162b2" />
          </div>
          <div className="mb-3">
            <label className="form-label" style={{ color: "#534AB7", fontWeight: 500 }}>Número de lote</label>
            <input className="form-control" name="lote" value={form.lote} onChange={handleChange} placeholder="ej. LOT-2025-001" />
          </div>
          <div className="row mb-3">
            <div className="col">
              <label className="form-label" style={{ color: "#534AB7", fontWeight: 500 }}>Temp. mínima (°C)</label>
              <input type="number" className="form-control" name="tempMin" value={form.tempMin} onChange={handleChange} />
            </div>
            <div className="col">
              <label className="form-label" style={{ color: "#534AB7", fontWeight: 500 }}>Temp. máxima (°C)</label>
              <input type="number" className="form-control" name="tempMax" value={form.tempMax} onChange={handleChange} />
            </div>
          </div>
          <div className="alert-ok-custom mb-3" style={{ fontSize: 13 }}>
            Estado Alerta: ±1°C fuera del rango<br />
            Estado Crítico: más de 2°C fuera del rango
          </div>
          <button className="btn-primary-custom" onClick={handleGuardar} disabled={guardando}>
            {guardando ? "Guardando..." : modo === "nueva" ? "Crear vacuna" : "Guardar cambios"}
          </button>
        </div>
      )}
    </div>
  );
}