import React from 'react'
import {twMerge} from 'tailwind-merge'

interface ButtonProps{
    label:string;
    secondary?:boolean;
    onClick:()=>void;
    disabled?:boolean;
    className:string;
}

const Button:React.FC<ButtonProps> = ({label,secondary,onClick,disabled,className}) => {
  return (
    <button disabled={disabled} className={twMerge('disabled:opacity-50 disabled:cursor-not-allowed font-bold text-lg rounded-full hover:opacity-75 duration-300 border-2 py-2',className,secondary?'bg-white text-black':'bg-blue-500 text-white')} onClick={()=>{onClick()}}>
        {label}
    </button>
  )
}

export default Button
