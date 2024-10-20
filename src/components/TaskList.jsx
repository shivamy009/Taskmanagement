import React, { useState } from 'react';
import { MdDelete } from "react-icons/md";

const TaskModal = ({ task, isOpen, onClose, updateTaskDetails }) => {
  const [updatedTask, setUpdatedTask] = useState({ ...task });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    updateTaskDetails(updatedTask);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="font-bold mb-2">Update Task</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={updatedTask.title}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={updatedTask.description}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Priority</label>
          <select
            name="priority"
            value={updatedTask.priority}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Status</label>
          <select
            name="status"
            value={updatedTask.status}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Overdue">Overdue</option>
          </select>
        </div>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

// Main TaskList Component
const TaskList = ({ tasks, deleteTask, updateTaskStatus, updateTaskDetails }) => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = (task) => {
    setSelectedTask(task);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedTask(null);
  };

  return (
    <div className=' mr-3'>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-white p-4 rounded-lg shadow-md cursor-pointer"
            onClick={() => openModal(task)}
          >
            <h2 className="font-bold mb-1">{task.title}</h2>
            <p className="text-sm text-gray-500"><span className=' text-blue-400 font-bold'>Created at: </span> {task.date}</p>
            <p className="mt-2">{task.description}</p>
            <div className="mt-2 flex justify-end space-x-2">
              <p
                className={`text-${
                  task.priority === 'High'
                    ? 'red'
                    : task.priority === 'Medium'
                    ? 'pink'
                    : 'green'
                }-500 mb-0`}
              >
                {task.priority}
              </p>
              <button
                 onClick={(e) => {
                    e.stopPropagation();
                    if (task.status === 'Pending' || task.status === 'Completed') {
                      updateTaskStatus(
                        task.id,
                        task.status === 'Pending' ? 'Completed' : 'Pending'
                      );
                    }
                  }}
                className="text-blue-500"
              >
                {task.status === 'Completed' ? '✅' : task.status === 'Overdue' ? '⏰' : '🔄'}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteTask(task.id);
                }}
                className="text-red-500 hover:text-red-700"
              >
                 <MdDelete size={23} /> 
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Popup */}
      {selectedTask && (
        <TaskModal
          task={selectedTask}
          isOpen={isModalOpen}
          onClose={closeModal}
          updateTaskDetails={updateTaskDetails}
        />
      )}
    </div>
  );
};

export default TaskList;
