import { useState } from "react";

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(title);
    setTitle("");
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Digite uma nova tarefa..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">Adicionar</button>
    </form>
  );
}
