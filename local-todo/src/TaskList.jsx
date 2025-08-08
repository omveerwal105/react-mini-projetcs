const TaskList = ({ task, onDelete, onToggle, onEdit }) => {
    return (
        <div className='card-header'>
            <div
                onClick={() => onToggle(task.id)}
                style={{
                    textDecoration: task.completed ? 'line-through' : 'none',
                    cursor: 'pointer',
                }}
            >
                <h4 className='card-title'>{task.name}</h4>
            </div>
            <button className='btn btn-warning me-2' onClick={() => onEdit(task)}>
                Edit
            </button>
            <button className='btn btn-danger' onClick={() => onDelete(task.id)}>
                Delete
            </button>
        </div>
    );
};

export default TaskList;
