import { useState } from "react";
import "./App.css";

type Synonym = {
  word: string;
  score: number;
}

const API_URL = `https://api.datamuse.com`

function App() {
  const [word, setWord] = useState("");
  const [synonyms, setSynonyms] = useState<Synonym[]>([]);

  const handleFetchSynonyms = (e: React.FormEvent) => {
    e.preventDefault();
    fetch(`${API_URL}/words?rel_syn=${word}`)
    .then((response) => response.json())
    .then(setSynonyms);
  }

  return (
    <>
      <div className="App">
        <form onSubmit={handleFetchSynonyms}>
          <label htmlFor="word-input">Your Word</label>
          <input
            value={word}
            onChange={(e) => setWord(e.target.value)}
            id="word-input"
          ></input>
          <button>Submit</button>
        </form>

        <ul>
          {synonyms.map((synonym) => (
            <li key={synonym.word}>{synonym.word}</li> 
            ))}
        </ul>
      </div>
    </>
  );
}

export default App;
