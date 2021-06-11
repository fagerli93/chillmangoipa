import React, { useEffect, useState } from "react";
import "./App.css";

const API_URL = "https://jprasxup48.execute-api.eu-central-1.amazonaws.com";
const GET_AVAILABLE_FYLKER_ENDPOINT = "";
const GET_RESULTS_ENDPOINTS = "fetchMangoIpas";

function App() {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState<string | undefined>(undefined);
  const [allAvailableFylker, setAllAvailableFylker] = useState<string[]>([]);

  useEffect(() => {
    getAvailableFylker();
  }, []);

  const handleOnClick = async () => {
    const res = await fetch(`${API_URL}/${GET_RESULTS_ENDPOINTS}`);
    if (res.ok) {
      const data = await res.text();
      setResult(data);
    }
  };

  const getAvailableFylker = async () => {
    /*
    const res = await fetch(`${API_URL}/${GET_AVAILABLE_FYLKER_ENDPOINT}`);
    if (res.ok) {
      const data: string[] = await res.json();
      setAllAvailableFylker(data);
    }
    */
    setAllAvailableFylker([
      "Oslo",
      "Troms og Finnmark",
      "Nordland",
      "Rogaland",
      "Møre og Romsdal",
      "Viken",
      "Innlandet",
      "Vestfold og Telemark",
      "Agder",
      "Vestlandet",
      "Trøndelag",
    ]);
  };

  const handleSearchTextChanged = (text: string) => {
    setInputText(text);
  };

  const handleSelectFylke = (fylke: string) => {
    setInputText(fylke);
  };

  return (
    <div className="App">
      <header className="App-header">
        <input
          value={inputText}
          onChange={(text) => handleSearchTextChanged(text.target.value)}
          placeholder="Hvilken fylke vil du sjekke kvadratmeterprisen"
        />
        {inputText && inputText !== "" && (
          <ul>
            {allAvailableFylker
              .filter((fylke) => fylke.includes(inputText))
              .map((fylke) => (
                <li key={fylke} onClick={() => handleSelectFylke(fylke)}>
                  {fylke}
                </li>
              ))}
          </ul>
        )}
        {result && <span>{result}</span>}
        <button onClick={handleOnClick}>Søk!</button>
      </header>
    </div>
  );
}

export default App;
