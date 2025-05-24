import React, { useState } from "react";

function App() {
  const [cuota, setCuota] = useState("");
  const [probabilidad, setProbabilidad] = useState("");
  const [resultado, setResultado] = useState({ probImpl: null, ev: null });

  const calcularValores = () => {
    const cuotaNum = parseFloat(cuota);
    const probNum = parseFloat(probabilidad);

    if (!isNaN(cuotaNum) && cuotaNum > 0 && !isNaN(probNum) && probNum >= 0 && probNum <= 100) {
      const probImpl = (1 / cuotaNum) * 100;
      const ev = ((probNum / 100) * cuotaNum - 1) * 100;

      setResultado({
        probImpl: probImpl.toFixed(2),
        ev: ev.toFixed(2),
      });
    } else {
      setResultado({ probImpl: null, ev: null });
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Aciertos de Apuestas</h1>
      <p>Calcula la probabilidad implícita y el valor esperado (EV):</p>

      <div style={{ marginBottom: "1rem" }}>
        <input
          type="number"
          placeholder="Cuota (Ej: 2.50)"
          value={cuota}
          onChange={(e) => setCuota(e.target.value)}
          style={{ marginRight: "1rem", padding: "0.5rem" }}
        />
        <input
          type="number"
          placeholder="Tu probabilidad estimada (%)"
          value={probabilidad}
          onChange={(e) => setProbabilidad(e.target.value)}
          style={{ marginRight: "1rem", padding: "0.5rem" }}
        />
        <button onClick={calcularValores} style={{ padding: "0.5rem" }}>
          Calcular
        </button>
      </div>

      {resultado.probImpl !== null && (
        <>
          <p>Probabilidad implícita: <strong>{resultado.probImpl}%</strong></p>
          <p>Valor Esperado (EV): <strong>{resultado.ev}%</strong></p>
        </>
      )}
    </div>
  );
}

export default App;
