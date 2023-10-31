import React, { useCallback, useState } from "react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { twMerge } from "tailwind-merge";

interface FileInputProps {
  onChange: (base64: string) => void;
  sizeHandle:()=>void;
  disabled: boolean;
  placeholder:string;
  className?:string;
  value:string;
}

const FileInput: React.FC<FileInputProps> = ({ onChange, disabled,placeholder,className,sizeHandle,value}) => {
  const [base64, setBase64] = useState<string>(value);
  const fileValidator=(file:any)=>{
    if(file.size>1048576){
      sizeHandle()
      return {
        code:'size-too-large',
        message:'file is larger than 1 MB'
      }
    }
    return null
  }
  const onDrop = useCallback((files: any) => {
    const file = files[0];
    const reader = new FileReader();
    reader.onload = (event: any) => {
      setBase64(event.target.result as string);
      onChange(event.target.result as string);
    };
    reader.readAsDataURL(file);
  },[onChange]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/jpg": [],
      "image/png": [],
    },
    minSize:0,
    maxSize:1048576,
    maxFiles: 1,
    disabled,
    onDrop,
    validator:fileValidator
  });
  return (
    <div {...getRootProps({className:twMerge('border-dotted border-2 border-neutral-500 cursor-pointer flex justify-center overflow-hidden items-center relative p-4',className)})}>
      <input {...getInputProps()}/>
      {
        base64!==''?<Image src={base64} alt={placeholder} fill objectFit="cover"/>:(
            <p className="text-center">{placeholder}</p>
        )
      }
    </div>
  );
};

export default FileInput;
