import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskItem from "./components/TaskItem";
import "./App.css";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'completed', 'pending'
  const [confirmState, setConfirmState] = useState({ open: false, message: '', onConfirm: null });

  // 🟢 Carrega tarefas da API; se falhar, usa localStorage
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/tasks');
        if (!res.ok) throw new Error('API offline');
        const data = await res.json();
        setTasks(data);
      } catch {
        const saved = localStorage.getItem('tasks');
        if (saved) setTasks(JSON.parse(saved));
      }
    })();
  }, []);

  // 🟡 Sincroniza com API e salva fallback no localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // ➕ Criar tarefa
  const addTask = async (title) => {
    if (!title || !title.trim()) {
      alert("Por favor, digite uma tarefa válida!");
      return;
    }
    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: title.trim(), completed: false, createdAt: new Date().toISOString() })
      });
      if (!res.ok) throw new Error();
      const created = await res.json();
      setTasks([...tasks, created]);
    } catch {
      const newTask = { id: Date.now(), title: title.trim(), completed: false, createdAt: new Date().toISOString() };
      setTasks([...tasks, newTask]);
    }
  };

  // ✅ Alternar tarefa concluída
  const toggleTask = async (id) => {
    const current = tasks.find(t => t.id === id);
    const updated = { ...current, completed: !current.completed };
    setTasks(tasks.map(t => t.id === id ? updated : t));
    try {
      await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: updated.completed })
      });
    } catch {}
  };

  // ❌ Deletar tarefa
  const deleteTask = (id) => {
    setConfirmState({
      open: true,
      message: "Tem certeza que deseja deletar esta tarefa?",
      onConfirm: async () => {
        setTasks(tasks.filter((t) => t.id !== id));
        try { await fetch(`/api/tasks/${id}`, { method: 'DELETE' }); } catch {}
      }
    });
  };

  // ✏️ Editar tarefa
  const editTask = async (id, newTitle) => {
    if (!newTitle || !newTitle.trim()) {
      alert("Por favor, digite um título válido!");
      return;
    }
    setTasks(tasks.map((t) => t.id === id ? { ...t, title: newTitle.trim() } : t));
    try {
      await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTitle.trim() })
      });
    } catch {}
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
    if (completedTasks === 0) return;
    setConfirmState({
      open: true,
      message: `Tem certeza que deseja deletar ${completedTasks} tarefa(s) concluída(s)?`,
      onConfirm: async () => {
        const keep = tasks.filter(t => !t.completed);
        const toDelete = tasks.filter(t => t.completed);
        setTasks(keep);
        try {
          await Promise.all(toDelete.map(t => fetch(`/api/tasks/${t.id}`, { method: 'DELETE' })));
        } catch {}
      }
    });
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

      {confirmState.open && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="confirm-title">
          <div className="modal">
            <div className="modal-header">
              <h2 id="confirm-title">To-Do List</h2>
            </div>
            <div className="modal-body">
              <p>{confirmState.message}</p>
            </div>
            <div className="modal-actions">
              <button
                className="confirm-btn"
                onClick={() => {
                  const action = confirmState.onConfirm;
                  setConfirmState({ open: false, message: '', onConfirm: null });
                  if (typeof action === 'function') action();
                }}
              >
                OK
              </button>
              <button
                className="cancel-btn"
                onClick={() => setConfirmState({ open: false, message: '', onConfirm: null })}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
