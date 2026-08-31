import Button from "./Button";
import React from "react";

import type { ReactNode } from "react";

type TaskContainerProps = {
  children?: ReactNode;
  onDelete: () => void;
};

export default function TaskContainer({
  
  children,onDelete,
}: TaskContainerProps) {

  const [isActive,setisActive] = React.useState(false)

  function toggleClick(){
    setisActive(!isActive)
  }

  return (
    <div className={"task-container hover-mode"}>
      <input onClick={toggleClick} type="checkbox" className="h-[15px] w-[15px]" />

      <p className={`ml-[5px] text-[18px] ${isActive && 'line-through '}`}>
        {children}
      </p>

      <Button
        onClick={onDelete}
        imgSrc="/images/icons/trash.png"
        className="!m-[2px] !ml-auto !h-[35px] !w-[35px] hover-mode active-mode"
      />
    </div>
  );
}
