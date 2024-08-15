"use client";
import React, { FC, ChangeEvent, forwardRef, Ref } from 'react';

interface InputProps {
  type?: string;
  id: string;
  placeholder?: string;
  label: string;
  name: string;
  icon?: any;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Input: FC<InputProps & React.InputHTMLAttributes<HTMLInputElement>> = forwardRef(
  ({ type = 'text', id, placeholder, label, icon, name, onChange, ...rest }, ref: Ref<HTMLInputElement>) => {

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(event);
      }
    };

    return (
      <div className="relative">
        <label htmlFor={id} className="sr-only">{label}</label>
        <input
          type={type}
          id={id}
          name={name}
          placeholder={placeholder}
          className="poppins border-none w-full rounded-md bg-alabaster py-4 text-manatee text-base pr-10 placeholder:text-manatee focus:ring-2 focus:ring-inset focus:ring-purple"
          onChange={handleChange}
          autoComplete="new-password"
          ref={ref}
          {...rest}
        />
        {icon && (
          <span className="cursor-pointer pointer-events-none absolute inset-y-0 right-0 grid w-10 place-content-center text-manatee">
            {icon}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
