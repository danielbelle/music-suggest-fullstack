import { useState } from "react";

export default function SuggestionForm({ onSubmit, message }) {
  const [url, setUrl] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(url);
    setUrl("");
  }

  return (
    <div className="submit-form">
      <h3>Sugerir Nova Música</h3>
      {message && (
        <div className={`message ${message.type}`}>{message.text}</div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="url"
            name="url"
            placeholder="Cole aqui o link do YouTube"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
          <button type="submit" className="submit-button">
            Enviar Link
          </button>
        </div>
      </form>
    </div>
  );
}
