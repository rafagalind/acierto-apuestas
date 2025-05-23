import React, { useState } from "react";

function App() {
  const [cuota, setCuota] = useState("");
  const [probabilidad, setProbabilidad] = useState(null);

  const calcularProbabilidad = () => {
    const num = parseFloat(cuota);
    if (!isNaN(num) && num > 0) {
      const resultado = (1 / num) * 100;
      setProbabilidad(parseFloat(resultado.toFixed(2)));
    } else {
      setProbabilidad(null);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Aciertos de Apuestas</h1>
      <p>Calcula la probabilidad implícita de una cuota decimal:</p>

      <input
        type="number"
        placeholder="Ejemplo: 2.50"
        value={cuota}
        onChange={(e) => setCuota(e.target.value)}
        style={{ marginRight: "1rem", padding: "0.5rem" }}
      />
      <button onClick={calcularProbabilidad} style={{ padding: "0.5rem" }}>
        Calcular
      </button>

      {probabilidad !== null && (
        <p style={{ marginTop: "1rem" }}>
          Probabilidad implícita: <strong>{probabilidad}%</strong>
        </p>
      )}
    </div>
  );
}

export default App;
