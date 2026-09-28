import Button from "../Button"

export default function SidebarHeader(){
  return(
    <div className='pr-[8px] flex items-center justify-btween border-r-[1px]'>
			<div className='flex'>
				<div
				className=" p-1d self-center bg-yellow-100/50 rounded-lg shadow-md max-sm:!h-[25px] !w-[30px] !h-[30px] max-lg:!h-[30px]
			   max-sm:!w-[25px] max-lg:!w-[30px]">
					<img data-testid='project-icon' className='!w-full icon !h-full' src='images/icons/checklist.png'/>
				</div>
				<p className='m-[5px] max-sm:text-[10px] max-lg:text-[15px] whitespace-nowrap text-[20px]'>To Finish</p>
			</div>
			<Button imgSrc="images/icons/grid.png"
			 className="hover-mode active-mode max-sm:!h-[25px] !w-[30px] !h-[30px] max-lg:!h-[30px]
			   max-sm:!w-[25px] max-lg:!w-[30px] ml-auto" imgClassName="!w-full !h-full"/>
    </div>
  )
}
