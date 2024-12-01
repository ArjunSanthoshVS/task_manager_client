import React from 'react';
import './modal.css';
import moment from 'moment';

const TaskModal = ({ task, closeModal }) => {
    return (
        <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Task Details</h2>
                <div className="modal-details">
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                    <p>Created on: {moment(task.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
                </div>
                <button className="close-btn" onClick={closeModal}>
                    Close
                </button>
            </div>
        </div>
    );
};

export default TaskModal;
