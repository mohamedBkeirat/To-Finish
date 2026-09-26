import './App.css';
import SidebarHeader from './components/header/SidebarHeader'
import Main from './components/Main';
import Sidebar from './components/Sidebar';
import MainHeader from './components/header/MainHeader';
import AddMode from './components/AddMode';
import React from 'react';
import type { Task } from './types/task';

export default function App(){

	const [tasks,setTasks]= React.useState<Task[]>(JSON.parse(localStorage.getItem('tasks') || '[]'))
	console.log(tasks)
return (
		<div className='app-layout'>
			<SidebarHeader />
			<MainHeader />
			<Sidebar />
			<Main 			
			tasks={tasks}
			setTasks={setTasks}
			/>
			<AddMode 
			tasks={tasks}
			setTasks={setTasks}
			/>
		</div>
)

}