import React, { useState } from 'react';
import './modal.css';

const EditTaskModal = ({ task, closeModal, onSave }) => {
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);

    const handleSave = () => {
        const updatedTask = {
            ...task,
            title,
            description,
        };
        onSave(updatedTask);
        closeModal();
    };

    return (
        <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Edit Task</h2>
                <div className="modal-fields">
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
