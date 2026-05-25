export default function StatusBadge({ estado }) {
  const map = {
    normal:  "normal",
    alerta:  "alerta",
    critico: "critico",
  };
  const cls = map[estado] ?? "normal";
  const label = { normal: "Normal", alerta: "Alerta", critico: "Crítico" };

  return (
    <span className={`badge-estado badge-${cls}`}>
      {label[cls]}
    </span>
  );
}