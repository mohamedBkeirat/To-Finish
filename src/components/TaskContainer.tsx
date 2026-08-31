import Button from "./Button";

import type { ReactNode } from "react";

type TaskContainerProps = {
  children?: ReactNode;
  onDelete: () => void;
};

export default function TaskContainer({
  children,onDelete
}: TaskContainerProps) {
  return (
    <div className="task-container hover-mode">
      <input type="checkbox" className="h-[15px] w-[15px]" />

      <p className="ml-[5px] text-[18px]">
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
