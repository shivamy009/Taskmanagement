import React, { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import TaskList from './components/TaskList';
import TaskProgress from './components/TaskProgress';
import AddTaskModal from './components/AddTaskModal';

 

const initialTasks = [
  {
    id: 1,
    title: 'Plan Weekend Trip Edit',
    description: 'Plan a weekend trip itinerary, including places to visit, accommodation, and activities.',
    priority: 'low',
    date: '4 days ago',
    status: 'Pending',
  },
  {
    id: 2,
    title: 'Team Meeting',
    description: 'Attend the team meeting at 10 AM via Zoom. Discuss project updates and next steps.',
    priority: 'high',
    date: 'Yesterday',
    status: 'Completed',
  },
  {
    id: 3,
    title: 'Finish Presentation',
    description: 'Complete the PowerPoint presentation for Friday\'s client meeting.',
    priority: 'low',
    date: 'Yesterday',
    status: 'Pending',
  },
  {
    id: 4,
    title: 'Update Resume',
    description: 'Revise and update your resume with recent work experience and skills.',
    priority: 'medium',
    date: 'Today',
    status: 'Pending',
  },
  {
    id: 5,
    title: 'Assignment Submission',
    description: 'Revise and update your resume with recent work experience and skills.',
    priority: 'High',
    date: 'Today',
    status: 'Overdue',
  },
];
function App() {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    } else {
      setTasks(initialTasks);
      saveTasksToLocalStorage(initialTasks);  
    }
  }, []);

   
  const saveTasksToLocalStorage = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  const [filter, setFilter] = useState('All');  
  const [showModal, setShowModal] = useState(false);  

   
  const addTask = (newTask) => {
    const updatedTasks = [...tasks, { ...newTask, id: tasks.length + 1 }];
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);  
  };
 
  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
   
    setTasks(updatedTasks);
  
  
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };
  
  const updateTaskStatus = (taskId, status) => {
    
    const updatedTasks = tasks.map(task => 
      task.id === taskId ? { ...task, status } : task
    );
  
    setTasks(updatedTasks);
  
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };
  

  const getFilteredTasks = () => {
    switch (filter) {
      case 'Completed':
        return tasks.filter(task => task.status === 'Completed');
      case 'Pending':
        return tasks.filter(task => task.status === 'Pending');
      case 'Overdue':
        return tasks.filter(task => task.status === 'Overdue');
      default:
        return tasks;
    }
  };
   
  const updateTaskDetails = (updatedTask) => {
     
    const updatedTasks = tasks.map((task) => 
      task.id === updatedTask.id ? updatedTask : task
    );
  
     
    setTasks(updatedTasks);
   
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };
  
console.log(getFilteredTasks())
  return (
    
    <div className="flex">
      <Sidebar setFilter={setFilter} />
      <div className="flex-1 pl-5 mt-5">
        {/* Task List */}
        <TaskList
          tasks={getFilteredTasks()}
          deleteTask={deleteTask}
          updateTaskStatus={updateTaskStatus}
          updateTaskDetails={updateTaskDetails}
        />

        {/* Button to show the Add Task modal */}
        <div className="mt-5">
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Add New Task
          </button>
        </div>

        
        {/* Add Task Modal */}
        {showModal && <AddTaskModal addTask={addTask} closeModal={() => setShowModal(false)} />}
      </div>
        <TaskProgress tasks={tasks} />
    </div>

  );
}

export default App;
