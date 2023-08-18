import { useState } from "react";
import "./App.css";
import { useGetSynonyms } from "./hooks/useGetSynonyms";

function App() {
  const [word, setWord] = useState("");
  const { isLoading, synonyms, getSynonyms } = useGetSynonyms();

  const handleFetchSynonyms = (e: React.FormEvent) => {
    e.preventDefault();
    getSynonyms(word);
  };

  const handleSynonymClicked = (newWord: string) => {
    setWord(newWord);
    getSynonyms(newWord);
  };

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

        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <ul>
            {synonyms.map((synonym) => (
              <li
                onClick={() => handleSynonymClicked(synonym.word)}
                key={synonym.word}
              >
                {synonym.word}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default App;
