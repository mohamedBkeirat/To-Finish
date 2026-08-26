import { twMerge } from "tailwind-merge";

type ButtonProps = {
  onClick?: () => void;
  className?: string;
  imgClassName?: string;
  imgSrc:string,
  disabled?:boolean
};

export default function Button({
  onClick,
  className,
  imgClassName,
  imgSrc,
  disabled
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={twMerge(
        "w-[50px] h-[50px] flex rounded-[12px] border-[1px] justify-center items-center bg-yellow-100 ",
        className
      )}
    >
      <img
        className={twMerge("icon", imgClassName)}
        src={imgSrc}
      />
    </button>
  );
}
