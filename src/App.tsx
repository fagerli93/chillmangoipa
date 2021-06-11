import React, { useEffect, useState } from "react";
import "./App.css";

const API_URL = "https://jprasxup48.execute-api.eu-central-1.amazonaws.com";
const GET_AVAILABLE_FYLKER_ENDPOINT = "fylke";
const GET_RESULTS_ENDPOINTS = (fylke: string) => `fylke/${fylke}`;

function App() {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState<string | undefined>(undefined);
  const [allAvailableFylker, setAllAvailableFylker] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAvailableFylker();
  }, []);

  const handleOnClick = async () => {
    setLoading((prevState) => true);
    try {
      const res = await fetch(
        encodeURI(`${API_URL}/${GET_RESULTS_ENDPOINTS(inputText)}`)
      );
      if (res.ok) {
        const data = await res.text();
        setResult(data);
      }
    } catch (err) {
      alert(`Fant ingenting under ${inputText}`);
    } finally {
      setLoading((prevState) => false);
    }
  };

  const getAvailableFylker = async () => {
    setLoading((prevState) => true);
    try {
      const res = await fetch(`${API_URL}/${GET_AVAILABLE_FYLKER_ENDPOINT}`);
      if (res.ok) {
        const data: any = await res.json();

        setAllAvailableFylker(data.Items.map((i: any) => i.region));
      } else {
        alert("Klarte ikke hente fylker");
      }
    } catch (err) {
      alert("Klarte ikke hente fylker..");
    } finally {
      setLoading((prevState) => false);
    }
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
        <div className="container">
          <h1>Hvilket fylke vil du ha pris for?</h1>
          {loading && <span>Laster..</span>}
          <input
            disabled={loading}
            className="input"
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
          <button className="button" onClick={handleOnClick}>
            Søk!
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;
