import { useEffect, useState } from "react";
import { db } from "../services/firebase";
import { collection, onSnapshot, query, orderBy, limit } from "firebase/firestore";

export function useTemperatura(vacunaId) {
  const [lecturas, setLecturas] = useState([]);
  const [ultima,   setUltima]   = useState(null);

  useEffect(() => {
    const q = query(
      collection(db, "vacunas", vacunaId, "lecturas"),
      orderBy("timestamp", "desc"),
      limit(50)
    );
    const unsub = onSnapshot(q, snap => {
      const datos = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setLecturas(datos.reverse());
      setUltima(datos.at(-1) ?? null);
    });
    return unsub;
  }, [vacunaId]);

  return { lecturas, ultima };
}