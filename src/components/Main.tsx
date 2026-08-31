import TaskContainer from './TaskContainer';
import type { Task } from "../types/task";
import React from 'react';
import saveToStorage from '../utils/saveToStorage';

type MainProps = {
  tasks: Task[];
	setTasks: React.Dispatch<any>
};

export default function Main({tasks,setTasks}:MainProps){


	function onDelete(taskId:string){

		const newTasks = tasks.filter(task=>task.id !== taskId)

		setTasks(newTasks)

		saveToStorage('tasks',newTasks)

	}

		return(
			<div className='main-container'>

				{tasks.map(task=>(
					<TaskContainer 
					onDelete={() => onDelete(task.id)}
					key={task.id}
					>
						{task.task}
					</TaskContainer>
				))}					
		</div>
		)
	}
