import React from 'react';
import { FaTasks, FaCheckCircle, FaClock, FaExclamationTriangle } from 'react-icons/fa';

const Sidebar = ({ setFilter }) => {
  return (
    <div className="w-20 bg-white h-screen flex flex-col items-center py-6 space-y-10 shadow-lg">
      {/* Sidebar Icon Buttons */}
      <button
        onClick={() => setFilter('All')}
        className="flex flex-col items-center text-gray-700 hover:text-blue-500 focus:text-blue-500 transition duration-200"
      >
        <FaTasks size={24} />
        <span className="text-xs mt-2">All</span>
      </button>

      <button
        onClick={() => setFilter('Completed')}
        className="flex flex-col items-center text-gray-700 hover:text-green-500 focus:text-green-500 transition duration-200"
      >
        <FaCheckCircle size={24} />
        <span className="text-xs mt-2">Completed</span>
      </button>

      <button
        onClick={() => setFilter('Pending')}
        className="flex flex-col items-center text-gray-700 hover:text-yellow-500 focus:text-yellow-500 transition duration-200"
      >
        <FaClock size={24} />
        <span className="text-xs mt-2">Pending</span>
      </button>

      <button
        onClick={() => setFilter('Overdue')}
        className="flex flex-col items-center text-gray-700 hover:text-red-500 focus:text-red-500 transition duration-200"
      >
        <FaExclamationTriangle size={24} />
        <span className="text-xs mt-2">Overdue</span>
      </button>
    </div>
  );
};

export default Sidebar;
