import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskItem from "./components/TaskItem";
import "./App.css";

export default function App() {
  const [tasks, setTasks] = useState([]);

  // 🟢 Carrega tarefas salvas do localStorage
  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  // 🟡 Salva tarefas no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // ➕ Criar tarefa
  const addTask = (title) => {
    if (!title.trim()) return;
    const newTask = { id: Date.now(), title, completed: false };
    setTasks([...tasks, newTask]);
  };

  // ✅ Alternar tarefa concluída
  const toggleTask = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  // ❌ Deletar tarefa
  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <div className="app-container">
      <h1>Sua Lista de Afazeres</h1>
      <TaskForm onAdd={addTask} />
      <div className="task-list">
        {tasks.length === 0 ? (
          <p className="empty">Nenhuma tarefa adicionada.</p>
        ) : (
          tasks.map((t) => (
            <TaskItem
              key={t.id}
              task={t}
              onToggle={() => toggleTask(t.id)}
              onDelete={() => deleteTask(t.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}
