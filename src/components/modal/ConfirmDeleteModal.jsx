import React from 'react';
import './modal.css';

const ConfirmDeleteModal = ({ task, closeModal, onDelete }) => {
    const handleDeleteConfirm = () => {
        onDelete(task._id, task.status);
        closeModal();
    };

    return (
        <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Are you sure?</h2>
                <p>Do you really want to delete the task "{task.title}"?</p>
                <div className="modal-buttons">
                    <button className="save-btn" onClick={handleDeleteConfirm}>
                        Yes
                    </button>
                    <button className="cancel-btn" onClick={closeModal}>
                        No
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDeleteModal;
