import React, { useState } from 'react';
import './modal.css';
import { createTask } from '../../api/taskApi';

const CreateTaskModal = ({ closeModal, onCreate }) => {
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [error, setError] = useState('');

    const handleSave = async () => {
        setError('');
    
        if (!taskTitle.trim()) {
            setError('Task title is required.');
            return;
        }
        if (!taskDescription.trim()) {
            setError('Task description is required.');
            return;
        }
    
        try {
            const response = await createTask({
                title: taskTitle.trim(),
                description: taskDescription.trim(),
            });
            onCreate(response);
            closeModal();
        } catch (err) {
            setError(err.message || 'Failed to save the task.');
        }
    };    

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Add New Task</h2>
                <div className="modal-fields">
                    {error && <p className="error">{error}</p>}
                    <label>Task Title
                        <input
                            type="text"
                            value={taskTitle}
                            onChange={(e) => setTaskTitle(e.target.value)}
                            placeholder="Enter task title"
                            required
                        />
                    </label>
                    <label>Task Description
                        <textarea
                            value={taskDescription}
                            onChange={(e) => setTaskDescription(e.target.value)}
                            placeholder="Enter task description"
                            required
                        />
                    </label>
                    <div className="modal-buttons">
                        <button className="cancel-btn" onClick={closeModal}>Cancel</button>
                        <button className="save-btn" onClick={handleSave}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateTaskModal;
