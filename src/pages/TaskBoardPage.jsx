import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import Navbar from '../components/navbar/Navbar';
import Searchbar from '../components/home/searchbar/Searchbar';
import './TaskBoardPage.css';
import Todo from '../components/home/cards/Todo';
import Progess from '../components/home/cards/Progess';
import Done from '../components/home/cards/Done';
import Overlay from '../components/navbar/Overlay';
import CreateTaskModal from '../components/modal/CreateTaskModal';
import { deleteTask, fetchTasks, updateTask } from '../api/taskApi';

const TaskBoardPage = () => {
  const [hamburger, setHamburger] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState({
    TODO: [],
    PROGRESS: [],
    DONE: []
  });
  const [filteredTasks, setFilteredTasks] = useState({
    TODO: [],
    PROGRESS: [],
    DONE: []
  });

  useEffect(() => {
    const getTasks = async () => {
      try {
        const response = await fetchTasks();
        setTasks(response);
        setFilteredTasks(response);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    };

    getTasks();
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleCreateTask = (newTask) => {
    const updatedTasks = {
      ...tasks,
      TODO: [...tasks.TODO, newTask],
    };
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks);
  };

  const changeTaskStatus = async (taskId, newStatus) => {
    try {
      const response = await updateTask(taskId, newStatus);
      console.log("Task status updated:", response);
    } catch (err) {
      console.error("Error updating task status:", err);
    }
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    const sourceColumn = [...tasks[source.droppableId]];
    let destinationColumn = [...tasks[destination.droppableId]];

    const [movedTask] = sourceColumn.splice(source.index, 1);

    destinationColumn = destinationColumn.filter(task => task._id !== movedTask._id);

    const updatedTask = { ...movedTask, status: destination.droppableId };

    destinationColumn.splice(destination.index, 0, updatedTask);

    const updatedTasks = {
      ...tasks,
      [source.droppableId]: sourceColumn,
      [destination.droppableId]: destinationColumn,
    };

    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks);

    changeTaskStatus(movedTask._id, updatedTask);
  };


  const handleUpdateTask = async (updatedTask) => {
    try {
      setTasks((prevTasks) => {
        const columnTasks = { ...prevTasks };
        const column = columnTasks[updatedTask.status];
        const index = column.findIndex((task) => task._id === updatedTask._id);
        if (index !== -1) {
          column[index] = updatedTask;
        }
        return { ...columnTasks };
      });

      await updateTask(updatedTask._id, updatedTask);
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  const handleDeleteTask = async (taskId, taskStatus) => {
    try {
      setTasks((prevTasks) => {
        const columnTasks = { ...prevTasks };
        columnTasks[taskStatus] = columnTasks[taskStatus].filter(task => task._id !== taskId);
        return columnTasks;
      });

      setFilteredTasks((prevFilteredTasks) => {
        const columnTasks = { ...prevFilteredTasks };
        columnTasks[taskStatus] = columnTasks[taskStatus].filter(task => task._id !== taskId);
        return columnTasks;
      });

      await deleteTask(taskId);
      console.log(`Task with ID ${taskId} deleted successfully`);
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  return (
    <>
      <div className={hamburger ? 'navbar-hidden' : ''}>
        <Navbar setHamburger={setHamburger} />
      </div>
      <main>
        <div className="add-task-button">
          <button className="btn primary" onClick={openModal}>
            Add Task
          </button>
        </div>
        <Searchbar tasks={tasks} onFilter={setFilteredTasks} />
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="home-cards">
            <Droppable droppableId="TODO">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  <Todo tasks={filteredTasks.TODO} onUpdateTask={handleUpdateTask} onDeleteTask={handleDeleteTask} />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <Droppable droppableId="PROGRESS">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  <Progess tasks={filteredTasks.PROGRESS} onUpdateTask={handleUpdateTask} onDeleteTask={handleDeleteTask} />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <Droppable droppableId="DONE">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  <Done tasks={filteredTasks.DONE} onUpdateTask={handleUpdateTask} onDeleteTask={handleDeleteTask} />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </DragDropContext>
      </main>
      {hamburger && <Overlay setHamburger={setHamburger} />}
      {isModalOpen && <CreateTaskModal closeModal={closeModal} onCreate={handleCreateTask} />}
    </>
  );
};

export default TaskBoardPage;
