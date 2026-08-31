import './App.css';
import SidebarHeader from './components/header/SidebarHeader'
import Main from './components/Main';
import Sidebar from './components/Sidebar';
import MainHeader from './components/header/MainHeader';
import AddMode from './components/AddMode';
import React from 'react';

export default function App(){

	const [tasks,setTasks]= React.useState(JSON.parse(localStorage.getItem('tasks') || '[]'))
return (
		<div className='app-layout'>
			<SidebarHeader />
			<MainHeader />
			<Sidebar />
			<Main tasks={tasks} setTasks={setTasks} />
			<AddMode tasks={tasks} setTasks={setTasks} />
		</div>
)

}