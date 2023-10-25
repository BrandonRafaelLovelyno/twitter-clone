import { type } from "os";
import React from "react";

type InputType='password'|'text'|'email'

interface InputProps {
  value: string;
  placeholder: string;
  disabled?: boolean;
  onChange:(e:React.FormEvent<HTMLInputElement>)=>void;
  type:InputType
}

const Input: React.FC<InputProps> = ({ value, placeholder, disabled,onChange,type}) => {
  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      onChange={onChange}
      className="border-[1px] focus:border-blue-500 focus:border-2 focus:outline-none w-full h-fit py-2 px-3 bg-black rounded-lg duration-200 focus:placeholder:text-blue-500 focus:text-blue-500 font-semibold focus:-translate-y-2"
    />
  );
};

export default Input;
