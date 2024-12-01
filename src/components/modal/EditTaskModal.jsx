import React, { useState } from 'react';
import './modal.css';

const EditTaskModal = ({ task, closeModal, onSave }) => {
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [error, setError] = useState('');

    const handleSave = () => {
        setError('');

        const trimmedTitle = title.trim();
        const trimmedDescription = description.trim();

        if (!trimmedTitle) {
            setError('Task title is required.');
            return;
        }
        if (!trimmedDescription) {
            setError('Task description is required.');
            return;
        }

        const updatedTask = {
            ...task,
            title: trimmedTitle,
            description: trimmedDescription,
        };
        onSave(updatedTask);
        closeModal();
    };

    return (
        <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Edit Task</h2>
                <div className="modal-fields">
                {error && <p className="error">{error}</p>}
                    <label>
                        Title:
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </label>
                    <label>
                        Description:
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </label>
                </div>
                <div className="modal-buttons">
                    <button className="save-btn" onClick={handleSave}>
                        Save
                    </button>
                    <button className="cancel-btn" onClick={closeModal}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditTaskModal;
