import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskItem from "./components/TaskItem";
import "./App.css";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'completed', 'pending'

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
    if (!title || !title.trim()) {
      alert("Por favor, digite uma tarefa válida!");
      return;
    }
    const newTask = { 
      id: Date.now(), 
      title: title.trim(), 
      completed: false,
      createdAt: new Date().toISOString()
    };
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
    if (window.confirm("Tem certeza que deseja deletar esta tarefa?")) {
      setTasks(tasks.filter((t) => t.id !== id));
    }
  };

  // ✏️ Editar tarefa
  const editTask = (id, newTitle) => {
    if (!newTitle || !newTitle.trim()) {
      alert("Por favor, digite um título válido!");
      return;
    }
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, title: newTitle.trim() } : t
      )
    );
  };

  // 📊 Estatísticas
  const completedTasks = tasks.filter(t => t.completed).length;
  const pendingTasks = tasks.filter(t => !t.completed).length;
  const totalTasks = tasks.length;

  // 🔍 Filtrar tarefas
  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  // 🗑️ Limpar todas as tarefas concluídas
  const clearCompleted = () => {
    if (completedTasks > 0 && window.confirm(`Tem certeza que deseja deletar ${completedTasks} tarefa(s) concluída(s)?`)) {
      setTasks(tasks.filter(t => !t.completed));
    }
  };

  return (
    <div className="app-container">
      <h1>Sua Lista de Afazeres</h1>
      
      {/* Estatísticas */}
      <div className="stats">
        <div className="stat-item">
          <span className="stat-number">{totalTasks}</span>
          <span className="stat-label">Total</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{pendingTasks}</span>
          <span className="stat-label">Pendentes</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{completedTasks}</span>
          <span className="stat-label">Concluídas</span>
        </div>
      </div>

      <TaskForm onAdd={addTask} />

      {/* Filtros */}
      {totalTasks > 0 && (
        <div className="filters">
          <button 
            className={filter === 'all' ? 'active' : ''} 
            onClick={() => setFilter('all')}
          >
            Todas ({totalTasks})
          </button>
          <button 
            className={filter === 'pending' ? 'active' : ''} 
            onClick={() => setFilter('pending')}
          >
            Pendentes ({pendingTasks})
          </button>
          <button 
            className={filter === 'completed' ? 'active' : ''} 
            onClick={() => setFilter('completed')}
          >
            Concluídas ({completedTasks})
          </button>
          {completedTasks > 0 && (
            <button className="clear-btn" onClick={clearCompleted}>
              Limpar Concluídas
            </button>
          )}
        </div>
      )}

      <div className="task-list">
        {filteredTasks.length === 0 ? (
          <p className="empty">
            {filter === 'all' ? 'Nenhuma tarefa adicionada.' : 
             filter === 'completed' ? 'Nenhuma tarefa concluída.' : 
             'Nenhuma tarefa pendente.'}
          </p>
        ) : (
          filteredTasks.map((t) => (
            <TaskItem
              key={t.id}
              task={t}
              onToggle={() => toggleTask(t.id)}
              onDelete={() => deleteTask(t.id)}
              onEdit={editTask}
            />
          ))
        )}
      </div>
    </div>
  );
}
