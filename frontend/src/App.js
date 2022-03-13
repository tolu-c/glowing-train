import "./App.css";
import axios from "axios";
import { useState } from "react";

function App() {
  const [sent, setSent] = useState(false);
  const [text, setText] = useState("");

  const handleSubmit = async () => {
    setSent(true);
    try {
      await axios.post("http://localhost:4000/send-mail", {
        text,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {!sent ? (
        <form onSubmit={handleSubmit} className="App">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button type="submit">send</button>
        </form>
      ) : (
        <h1>Your mail has been sent</h1>
      )}
    </div>
  );
}

export default App;
