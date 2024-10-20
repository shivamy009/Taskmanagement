import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const TaskProgress = ({ tasks }) => {
    console.log(tasks,"u")
  const completedTasks = tasks.filter(task => task.status === 'Completed').length;
  const pendingTasks = tasks.filter(task => task.status === 'Pending').length;
  const percentage = (completedTasks / tasks.length) * 100;
  console.log(completedTasks,"c")
  console.log(pendingTasks,"P")

  return (
    <div className='mr-5 mt-5 border-l-2 pl-1 flex flex-col'>
        <div className= " ml-2 bg-white p-6 rounded-lg shadow-md w-full">
      <div className="grid grid-cols-2 gap-6">
        {/* Total Tasks */}
        <div className="flex flex-col items-center">
          <p className="text-gray-500">Total Tasks:</p>
          <div className="flex items-center">
            <span className="inline-block w-1 h-10 bg-purple-500 mr-2"></span>
            <p className="text-3xl font-semibold">{tasks.length}</p>
          </div>
        </div>

        {/* In Progress Tasks */}

        {/* Open Tasks */}
        <div className="flex flex-col items-center">
          <p className="text-gray-500">Open Tasks:</p>
          <div className="flex items-center">
            <span className="inline-block w-1 h-10 bg-orange-500 mr-2"></span>
            <p className="text-3xl font-semibold">{pendingTasks}</p>
          </div>
        </div>

        {/* Completed Tasks */}
        <div className="flex flex-col items-center">
          <p className="text-gray-500">Completed:</p>
          <div className="flex items-center">
            <span className="inline-block w-1 h-10 bg-green-500 mr-2"></span>
            <p className="text-3xl font-semibold">{completedTasks}</p>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-gray-500">Overdue task:</p>
          <div className="flex items-center">
            <span className="inline-block w-1 h-10 bg-yellow-500 mr-2"></span>
            <p className="text-3xl font-semibold">{tasks.length-(completedTasks+pendingTasks)}</p>
          </div>
        </div>
      </div>
      
    </div>

    <div className="mt-10 mr-3 flex justify-center items-center flex-col">
      <h2 className="text-xl font-bold mb-2">Task Analysis</h2>
      
   
      <div style={{ width: 200, height: 100 }}>
        <CircularProgressbar
          value={percentage}
          maxValue={100}
          text={`${Math.round(percentage)}%`}
          styles={buildStyles({
            rotation: 0.75, 
            strokeLinecap: 'round', 
            trailColor: '#d6d6d6', 
            pathColor: 'green', 
            textColor: 'black',  
            pathTransitionDuration: 0.5,
          })}
        />
      </div>

       
    </div>
    </div>
  );
};

export default TaskProgress;
