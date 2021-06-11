import React, { useState } from "react";
import "./App.css";

function App() {
  const [inputText, setInputText] = useState("");
  const handleOnClick = () => {
    alert(`Du søkte på: ${inputText}`);
  };
  return (
    <div className="App">
      <header className="App-header">
        <input
          value={inputText}
          onChange={(text) => setInputText(text.target.value)}
          placeholder="Hvilken fylke vil du sjekke kvadratmeterprisen"
        />
        <button onClick={handleOnClick}>Søk!</button>
      </header>
    </div>
  );
}

export default App;
