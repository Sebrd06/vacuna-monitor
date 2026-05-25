import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ReferenceLine, ResponsiveContainer
} from "recharts";

export default function TempChart({ lecturas }) {
  const datos = lecturas.map(l => ({
    hora: l.timestamp?.toDate
      ? l.timestamp.toDate().toLocaleTimeString()
      : "--",
    temp: parseFloat(l.temperatura?.toFixed(1)),
  }));

  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={datos}>
        <CartesianGrid strokeDasharray="3 3" stroke="#EDE9FF" />
        <XAxis dataKey="hora" tick={{ fontSize: 11, fill: "#534AB7" }} />
        <YAxis domain={[-5, 15]} tick={{ fontSize: 11, fill: "#534AB7" }} />
        <Tooltip
          contentStyle={{ borderRadius: 10, border: "1px solid #AFA9EC" }}
          labelStyle={{ color: "#26215C" }}
        />
        <ReferenceLine y={2} stroke="#EF9F27" strokeDasharray="4 4" label={{ value: "Mín", fill: "#854F0B", fontSize: 11 }} />
        <ReferenceLine y={8} stroke="#EF9F27" strokeDasharray="4 4" label={{ value: "Máx", fill: "#854F0B", fontSize: 11 }} />
        <Line type="monotone" dataKey="temp" stroke="#6C3FC5" dot={{ fill: "#D4537E", r: 4 }} strokeWidth={2.5} />
      </LineChart>
    </ResponsiveContainer>
  );
}