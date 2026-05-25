import { useTemperatura } from "../hooks/useTemperatura";
import TempChart from "../components/TempChart";
import AlertPanel from "../components/AlertPanel";
import StatusBadge from "../components/StatusBadge";

const VACUNA_ID = "pfizer-lote-A";

export default function Home() {
  const { lecturas, ultima } = useTemperatura(VACUNA_ID);

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="page-title mb-0">Dashboard de vacunas</h2>
        {ultima && <StatusBadge estado={ultima.estado} />}
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
            <div className="value">2 – 8°C</div>
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