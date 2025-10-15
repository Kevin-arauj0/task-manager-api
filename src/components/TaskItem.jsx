export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      <span onClick={onToggle}>{task.title}</span>
      <button onClick={onDelete} className="delete-btn">
        <span className="trash-icon"></span>
      </button>
    </div>
  );
}
