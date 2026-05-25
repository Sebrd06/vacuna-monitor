import { useAlertas } from "../hooks/useAlertas";

export default function AlertPanel() {
  const alertas = useAlertas();

  if (alertas.length === 0)
    return <div className="alert-ok-custom">Sin alertas activas ✓</div>;

  return (
    <div>
      {alertas.map(a => (
        <div key={a.id} className="alert-item-custom">
          <div style={{ fontWeight: 500, color: "#791F1F", fontSize: 13 }}>
            {a.tipo?.toUpperCase()}
          </div>
          <div style={{ color: "#A32D2D", fontSize: 14 }}>
            {a.temperatura?.toFixed(1)}°C
          </div>
          <div style={{ color: "#888", fontSize: 12 }}>
            {a.timestamp?.toDate ? a.timestamp.toDate().toLocaleString() : "--"}
          </div>
        </div>
      ))}
    </div>
  );
}