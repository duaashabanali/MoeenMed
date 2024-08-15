import React, { ReactNode } from "react";

interface RootModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
  title?: string;
  isHeader?: boolean;
  isFooter?: boolean;
}

const RootModal: React.FC<RootModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  isHeader = false,
  isFooter = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black bg-opacity-50"></div>
      <div className="bg-[#464255] modal_bg rounded-[20px] shadow-lg overflow-hidden w-full max-w-[886px] mx-auto z-50">
        {isHeader && (
          <div className="px-4 py-2 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-semibold">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
          </div>
        )}
        <div>{children}</div>
        {isFooter && (
          <div className="px-4 py-2 border-t border-gray-200 flex justify-end">
            <button
              onClick={onClose}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RootModal;
