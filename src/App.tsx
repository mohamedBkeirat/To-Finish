import './App.css';
import SidebarHeader from './components/header/SidebarHeader'
import Main from './components/Main';
import Sidebar from './components/Sidebar';
import MainHeader from './components/header/MainHeader';
import AddMode from './components/AddMode';
export default function App(){
return (
		<div className='app-layout'>
			<SidebarHeader />
			<MainHeader />
			<Sidebar />
			<Main />
			<AddMode />
		</div>
)

}