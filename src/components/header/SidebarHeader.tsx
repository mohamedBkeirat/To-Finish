export default function SidebarHeader(){
  return(
    <div className='pr-[8px] flex items-center justify-btween border-r-[1px]'>
			<div className='flex'>
				<img data-testid='project-icon' className='icon max-sm:!w-[20px] max-lg:!w-[25px] ml-[5px]' src='images/icons/checklist.png'/>
				<p className='ml-[5px] self-center max-sm:text-[10px] max-lg:text-[15px] whitespace-nowrap text-[20px]'>To Finish</p>
			</div>
			<img data-testid='sidebar-icon' className='hover-mode max-sm:!w-[20px] max-lg:!w-[25px] icon ml-auto' src='images/icons/grid.png'/>
    </div>
  )
}
