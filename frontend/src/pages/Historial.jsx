import { useState, useEffect } from "react";
import { db } from "../services/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useTemperatura } from "../hooks/useTemperatura";
import TempChart from "../components/TempChart";
import AlertPanel from "../components/AlertPanel";
import StatusBadge from "../components/StatusBadge";

export default function Home() {
  const [vacunas,   setVacunas]   = useState([]);
  const [vacunaId,  setVacunaId]  = useState("pfizer-lote-A");
  const [vacunaInfo, setVacunaInfo] = useState(null);

  useEffect(() => {
    const fetchVacunas = async () => {
      const snap = await getDocs(collection(db, "vacunas"));
      const lista = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setVacunas(lista);
      if (lista.length > 0) {
        setVacunaId(lista[0].id);
        setVacunaInfo(lista[0]);
      }
    };
    fetchVacunas();
  }, []);

  const { lecturas, ultima } = useTemperatura(vacunaId);

  const handleSeleccion = (e) => {
    const id = e.target.value;
    setVacunaId(id);
    setVacunaInfo(vacunas.find(v => v.id === id));
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <h2 className="page-title mb-0">Dashboard de vacunas</h2>
        {ultima && <StatusBadge estado={ultima.estado} />}
      </div>

      {/* Selector de vacuna */}
      <div className="main-card mb-4 d-flex align-items-center gap-3 flex-wrap">
        <label style={{ color: "#534AB7", fontWeight: 500, marginBottom: 0, whiteSpace: "nowrap" }}>
          Vacuna activa:
        </label>
        <select
          className="form-select"
          style={{ maxWidth: 320, borderColor: "#7F77DD" }}
          value={vacunaId}
          onChange={handleSeleccion}
        >
          {vacunas.map(v => (
            <option key={v.id} value={v.id}>
              {v.nombre} — {v.lote}
            </option>
          ))}
        </select>
        {vacunaInfo && (
          <span style={{ fontSize: 13, color: "#888" }}>
            Rango: {vacunaInfo.tempMin}°C – {vacunaInfo.tempMax}°C
          </span>
        )}
      </div>

      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="stat-card stat-purple">
            <div className="label">Temperatura actual</div>
            <div className="value">{ultima ? `${ultima.temperatura.toFixed(1)}°C` : "--"}</div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="stat-card stat-green">
            <div className="label">Rango permitido</div>
            <div className="value">
              {vacunaInfo ? `${vacunaInfo.tempMin} – ${vacunaInfo.tempMax}°C` : "2 – 8°C"}
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="stat-card stat-pink">
            <div className="label">Total lecturas</div>
            <div className="value">{lecturas.length}</div>
          </div>
        </div>
      </div>

      <div className="row g-3">
        <div className="col-md-8">
          <div className="main-card">
            <h5 style={{ color: "#26215C", marginBottom: 16 }}>Temperatura en tiempo real</h5>
            <TempChart lecturas={lecturas} />
          </div>
        </div>
        <div className="col-md-4">
          <div className="main-card">
            <h5 style={{ color: "#26215C", marginBottom: 16 }}>Alertas activas</h5>
            <AlertPanel />
          </div>
        </div>
      </div>
    </div>
  );
}