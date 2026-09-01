import TaskContainer from './TaskContainer';
import type { Task } from "../types/task";
import React from 'react';

type MainProps = {
  tasks: Task[];
	setTasks: React.Dispatch<any>
};

export default function Main({tasks,setTasks}:MainProps){

	function isAnyChecked(): boolean{

	const currentTask = tasks.find(task=>task.isChecked === true)
	return currentTask?.isChecked ?? false
	}
	function isAllChecked(): boolean {
		return tasks.every(task => task.isChecked);
	}

	return(
		<div className='main-container'>
				{tasks.map(task=>( !task.isChecked &&
					<TaskContainer 
					tasks={tasks}
					setTasks={setTasks}
					key={task.id}
					taskId={task.id}
					>
						{task.task}
					</TaskContainer>
				))}	
			<div className='flex flex-col gap-[6px] '>
				{isAnyChecked() && !isAllChecked() && <div className='bg-black h-[1px] mt-[10px]' />}
				{tasks.map(task=>( task.isChecked &&
					<TaskContainer 
					tasks={tasks}
					setTasks={setTasks}
					key={task.id}
					taskId={task.id}
					>
						{task.task}
					</TaskContainer>
				))}	
			</div>
	</div>
	)
	}
					