"use client";

import React from "react";
import { twMerge } from "tailwind-merge";
import Button from "../Button";
import { ImCross } from "react-icons/im";
import { motion as m, AnimatePresence } from "framer-motion";

interface ModalProps {
  title: string;
  body: React.ReactElement;
  footer?: React.ReactElement;
  label: string;
  secondary?: boolean;
  isOpen: boolean;
  onSubmit: () => void;
  onClose: () => void;
  buttonClassName?: string;
  isLoading: boolean;
  hideButton?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  title,
  body,
  onSubmit,
  onClose,
  label,
  secondary,
  footer,
  isOpen,
  buttonClassName,
  isLoading,
  hideButton,
}) => {
  return (
    <AnimatePresence>
      {isOpen ? (
        <div
          className={twMerge(
            "inset-0 fixed z-50 bg-neutral-800 bg-opacity-70 flex justify-center items-center"
          )}
        >
          <m.div
            className="bg-black py-5 px-8 flex-col rounded-lg flex justify-center items-center max-lg:w-[90%] lg:w-3/6 lg:max-w-3xl h-fit"
            initial={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
          >
            <div className="flex flex-row justify-between items-center w-full">
              {/* Header */}
              <h3 className="text-3xl text-white font-bold">{title}</h3>
              <button
                className="duration-200 hover:opacity-80"
                onClick={onClose}
              >
                <ImCross size={18} />
              </button>
            </div>
            {/* Body */}
            <div className="p-10 w-full">{body}</div>
            {/* Footer */}
            <div className="flex flex-col items-center gap-2 p-5 w-full">
              {!hideButton && !isLoading && (
                <Button
                  className={buttonClassName || ""}
                  label={label}
                  onClick={onSubmit}
                  secondary={secondary}
                  disabled={isLoading}
                />
              )}

              {footer}
            </div>
          </m.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
};

export default Modal;
