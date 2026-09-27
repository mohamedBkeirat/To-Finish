import TaskContainer from './TaskContainer';
import type { Task } from "../types/task";
import type { Dispatch, SetStateAction } from "react";
import EditMode from './EditMode'

type MainProps = {
  tasks: Task[];
	setTasks: Dispatch<SetStateAction<Task[]>>
};

export default function Main({  
	tasks,
  setTasks,
}:MainProps){

	function isAnyChecked(): boolean{

	const currentTask = tasks.find(task=>task.isChecked === true)
	return currentTask?.isChecked ?? false
	}
	function isAllChecked(): boolean {
		return tasks.every(task => task.isChecked);
	}


	return(
		<div className='main-container'>
				{tasks.map(task=>( !task.isChecked && !task.isEditing ? 
					<TaskContainer 
					tasks={tasks}
					setTasks={setTasks}
					key={task.id}
					taskId={task.id}
					>
						{task.task}
					</TaskContainer>
					:
					!task.isChecked && task.isEditing && 
					<EditMode
					completedDate={task.completedDate}
					date = {task.date}
					taskId = {task.id}			
					descriptionValue={task.description}
					taskValue={task.task}
					tasks={tasks}
					setTasks={setTasks}
					/>
				))}	
			<div className='flex flex-col gap-[6px] '>
				{isAnyChecked() && !isAllChecked() && <div className='bg-black h-[1px] mt-[10px]' />}
				{tasks.map(task=>( task.isChecked && !task.isEditing ?
					<TaskContainer 
					tasks={tasks}
					setTasks={setTasks}
					key={task.id}
					taskId={task.id}
					>
						{task.task}
					</TaskContainer>
					:
					task.isChecked && task.isEditing && <EditMode
					completedDate={task.completedDate}
					date = {task.date}
					taskId = {task.id}			
					descriptionValue={task.description}
					taskValue={task.task}
					tasks={tasks}
					setTasks={setTasks}
					
					/>
					
				))}	
			</div>
	</div>
	)
	}
					