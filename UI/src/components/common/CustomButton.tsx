import React from 'react';

interface CustomButtonProps {
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  type = 'submit',
  className = '',
  children,
  onClick,
  disabled = false,
}) => {
  return (
    <button
      type={type}
      className={`rounded-md text-[24px] font-normal bg-purple py-2 text-white transition hover:shadow-xl focus:outline-none w-full ${className} poppins`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default CustomButton;
