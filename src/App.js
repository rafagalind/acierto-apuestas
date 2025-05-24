import React, { useState } from "react";

function App() {
  const [cuota, setCuota] = useState("");
  const [probabilidad, setProbabilidad] = useState("");
  const [cuotasMargen, setCuotasMargen] = useState(["", ""]);
  const [resultado, setResultado] = useState({
    probImpl: null,
    ev: null,
    margen: null,
  });

  const calcularValores = () => {
    const cuotaNum = parseFloat(cuota);
    const probNum = parseFloat(probabilidad);

    let probImpl = null;
    let ev = null;
    if (!isNaN(cuotaNum) && cuotaNum > 0 && !isNaN(probNum) && probNum >= 0 && probNum <= 100) {
      probImpl = (1 / cuotaNum) * 100;
      ev = ((probNum / 100) * cuotaNum - 1) * 100;
    }

    // Cálculo del margen
    const probabilidades = cuotasMargen
      .map((c) => parseFloat(c))
      .filter((n) => !isNaN(n) && n > 0)
      .map((c) => (1 / c) * 100);
    const margen =
      probabilidades.length > 0
        ? probabilidades.reduce((a, b) => a + b, 0) - 100
        : null;

    setResultado({
      probImpl: probImpl?.toFixed(2) ?? null,
      ev: ev?.toFixed(2) ?? null,
      margen: margen?.toFixed(2) ?? null,
    });
  };

  const actualizarCuotas = (index, value) => {
    const nuevas = [...cuotasMargen];
    nuevas[index] = value;
    setCuotasMargen(nuevas);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Aciertos de Apuestas</h1>
      <p>Calculadora de probabilidad, valor esperado y margen de la casa:</p>

      <div style={{ marginBottom: "1rem" }}>
        <h3>Probabilidad y EV</h3>
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
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <h3>Cuotas para calcular margen</h3>
        <input
          type="number"
          placeholder="Cuota 1 (Ej: 2.00)"
          value={cuotasMargen[0]}
          onChange={(e) => actualizarCuotas(0, e.target.value)}
          style={{ marginRight: "1rem", padding: "0.5rem" }}
        />
        <input
          type="number"
          placeholder="Cuota 2 (Ej: 1.80)"
          value={cuotasMargen[1]}
          onChange={(e) => actualizarCuotas(1, e.target.value)}
          style={{ marginRight: "1rem", padding: "0.5rem" }}
        />
      </div>

      <button onClick={calcularValores} style={{ padding: "0.5rem" }}>
        Calcular
      </button>

      {resultado.probImpl !== null && (
        <>
          <p>📊 Probabilidad implícita: <strong>{resultado.probImpl}%</strong></p>
          <p>💰 Valor Esperado (EV): <strong>{resultado.ev}%</strong></p>
        </>
      )}

      {resultado.margen !== null && (
        <p>🏦 Margen de la casa: <strong>{resultado.margen}%</strong></p>
      )}
    </div>
  );
}

export default App;

    </div>
  );
}

export default App;
