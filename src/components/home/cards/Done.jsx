import React, { useState } from 'react';
import { Draggable } from '@hello-pangea/dnd';
import './cards.css';
import TaskModal from '../../modal/TaskModal';
import EditTaskModal from '../../modal/EditTaskModal';
import ConfirmDeleteModal from '../../modal/ConfirmDeleteModal';
import moment from 'moment';

const Done = ({ tasks, onUpdateTask, onDeleteTask }) => {

  const [selectedTask, setSelectedTask] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);

  const handleViewDetails = (task) => {
    setSelectedTask(task);
    setIsEditMode(false);
    setIsDeleteMode(false);
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setIsEditMode(true);
    setIsDeleteMode(false);
  };

  const handleDeleteTask = (task) => {
    setSelectedTask(task);
    setIsDeleteMode(true);
    setIsEditMode(false);
  };

  const closeModal = () => {
    setSelectedTask(null);
    setIsEditMode(false);
    setIsDeleteMode(false);
  };

  return (
    <>
      <div className="card">
        <div className="heading">
          <h3>DONE</h3>
        </div>
        {tasks.map((task, index) => (
          <Draggable key={task._id} draggableId={task._id} index={index}>
            {(provided) => (
              <div
                className="task-card"
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                <div className="task-header">
                  <h4>{task.title}</h4>
                </div>
                <div className="task-description">
                  <p>{task.description}</p>
                </div>
                <div className="task-date">
                  <p>Created on: {moment(task.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
                </div>
                <div className="task-actions">
                  <button
                    className="action-btn delete"
                    onClick={() => handleDeleteTask(task)}
                  >
                    Delete
                  </button>
                  <button
                    className="action-btn edit"
                    onClick={() => handleEditTask(task)}
                  >
                    Edit
                  </button>
                  <button
                    className="action-btn view"
                    onClick={() => handleViewDetails(task)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            )}
          </Draggable>
        ))}
      </div>
      {selectedTask && !isEditMode && !isDeleteMode && (
        <TaskModal task={selectedTask} closeModal={closeModal} />
      )}
      {selectedTask && isEditMode && (
        <EditTaskModal task={selectedTask} closeModal={closeModal} onSave={onUpdateTask} />
      )}
      {selectedTask && isDeleteMode && (
        <ConfirmDeleteModal task={selectedTask} closeModal={closeModal} onDelete={onDeleteTask} />
      )}
    </>
  );
};

export default Done;
