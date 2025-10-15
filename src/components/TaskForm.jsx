import { useState } from "react";

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validação
    if (!title.trim()) {
      setError("Por favor, digite uma tarefa válida!");
      return;
    }
    
    if (title.trim().length < 3) {
      setError("A tarefa deve ter pelo menos 3 caracteres!");
      return;
    }
    
    // Limpar erro e adicionar tarefa
    setError("");
    onAdd(title);
    setTitle("");
  };

  const handleInputChange = (e) => {
    setTitle(e.target.value);
    if (error) setError(""); // Limpar erro quando usuário digitar
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="input-container">
        <input
          type="text"
          placeholder="Digite uma nova tarefa..."
          value={title}
          onChange={handleInputChange}
          className={error ? "error" : ""}
        />
        <button type="submit" disabled={!title.trim()}>
          Adicionar
        </button>
      </div>
      {error && <p className="error-message">{error}</p>}
    </form>
  );
}
