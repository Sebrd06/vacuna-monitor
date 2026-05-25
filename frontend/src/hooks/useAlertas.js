import { useEffect, useState } from "react";
import { db } from "../services/firebase";
import { collection, onSnapshot, query, where, orderBy } from "firebase/firestore";

export function useAlertas() {
  const [alertas, setAlertas] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "alertas"),
      where("resuelta", "==", false),
      orderBy("timestamp", "desc")
    );
    const unsub = onSnapshot(q, snap =>
      setAlertas(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    );
    return unsub;
  }, []);

  return alertas;
}