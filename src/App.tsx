import { useState } from "react";
import { fetchSynonyms } from "./api/fetchSynonyms";
import "./App.css";

type Synonym = {
  word: string;
  score: number;
}

function App() {
  const [word, setWord] = useState("");
  const [synonyms, setSynonyms] = useState<Synonym[]>([]);

  const handleFetchSynonyms = (e: React.FormEvent) => {
    e.preventDefault();
    fetchSynonyms(word).then(setSynonyms);
  }

  const handleSynonymClicked = (newWord: string) => {
    setWord(newWord);
    fetchSynonyms(newWord).then(setSynonyms);
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
            <li 
            onClick={() => handleSynonymClicked(synonym.word)}
            key={synonym.word}>{synonym.word}</li> 
            ))}
        </ul>
      </div>
    </>
  );
}

export default App;
