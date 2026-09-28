import { twMerge } from "tailwind-merge";

type ButtonProps = {
  onClick?: () => void;
  className?: string;
  imgClassName?: string;
  imgSrc:string,
  disabled?:boolean
  alt?:string
};

export default function Button({
  onClick,
  className,
  imgClassName,
  imgSrc,
  disabled,
  alt
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={twMerge(
        "w-[40px] h-[40px] shrink-0 flex bg-yellow-100/50 rounded-lg shadow-md p-1 m-1 b justify-center items-center",
        className
      )}
    >
      <img
        className={twMerge("icon", imgClassName)}
        src={imgSrc}
        alt={alt}
      />
    </button>
  );
}
