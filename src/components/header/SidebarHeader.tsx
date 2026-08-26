export default function SidebarHeader(){
  return(
    <div className='pr-[8px] flex items-center justify-btween border-r-[1px]'>
			<div className='flex'>
				<img className='icon ml-[5px]' src='images/icons/checklist.png'/>
				<p className='ml-[5px] text-[20px]'>To Finish</p>
			</div>
			<img className='hover-mode active-mode icon ml-auto' src='images/icons/grid.png'/>
    </div>
  )
}
