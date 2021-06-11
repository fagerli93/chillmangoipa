import React, { useState } from "react";
import "./App.css";

const API_URL =
  "https://jprasxup48.execute-api.eu-central-1.amazonaws.com/fetchMangoIpas";

function App() {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState<string | undefined>(undefined);
  const handleOnClick = async () => {
    const res = await fetch(API_URL);
    if (res.ok) {
      const data = await res.text();
      setResult(data);
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <input
          value={inputText}
          onChange={(text) => setInputText(text.target.value)}
          placeholder="Hvilken fylke vil du sjekke kvadratmeterprisen"
        />
        {result && <span>{result}</span>}
        <button onClick={handleOnClick}>Søk!</button>
      </header>
    </div>
  );
}

export default App;
