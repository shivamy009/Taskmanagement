import React, { useState } from 'react';

const AddTaskModal = ({ addTask, closeModal }) => {
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'Low',
    status: 'Pending',
  });

  const handleAddTask = () => {
    const task = {
      ...newTask,
      id: Date.now(),
      date: new Date().toLocaleDateString(),
    };
    addTask(task);
    closeModal(true)
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Add New Task</h2>
        
        <input
          className="border p-2 mb-4 w-full"
          placeholder="Task title"
          value={newTask.title}
          onChange={e => setNewTask({ ...newTask, title: e.target.value })}
        />
        
        <textarea
          className="border p-2 mb-4 w-full"
          placeholder="Task description"
          value={newTask.description}
          onChange={e => setNewTask({ ...newTask, description: e.target.value })}
        />
        
        <select
          className="border p-2 mb-4 w-full"
          value={newTask.priority}
          onChange={e => setNewTask({ ...newTask, priority: e.target.value })}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        
        <div className="flex justify-between">
          <button
            onClick={handleAddTask}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Add Task
          </button>
          <button
            onClick={closeModal}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;
