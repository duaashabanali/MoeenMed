import { useCopyToClipboard } from "@/customhooks/useCopyToClipboard";
import { CancelIcon, CheckIcon } from "@/utils/SVGs";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import CustomTextArea from "../common/CustomTextArea";

interface TransScriptProps {
  value: string;
  setDisplayText: (arg: string) => void;
  isRecognizing: boolean;
}

const TransScript: React.FC<TransScriptProps> = ({
  value,
  isRecognizing,
  setDisplayText,
}) => {
  const { textareaRef, copyText } = useCopyToClipboard();
  const [isEdit, setIsEdit] = useState(false);
  useEffect(() => {
    if (!isRecognizing) {
      setIsEdit(isRecognizing);
    }
  }, [isRecognizing]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDisplayText(e.target.value);
  };

  const handleEditToggle = () => {
    setIsEdit(!isEdit);
  };

  const handleCancelEdit = () => {
    setIsEdit(false);
  };

  return (
    <div className="poppins text-white p-8 bg-[url('/Transcription_bg.png')] bg-no-repeat w-full h-auto rounded-[30px]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-[20px] font-semibold">Transcription</h2>
        <div className="flex items-center gap-12 justify-between">
          <button
            className="cursor-pointer flex items-center flex-col"
            disabled={!isRecognizing}
            onClick={handleEditToggle}
          >
            {!isEdit ? (
              <Image
                src="/edit.png"
                width={22}
                height={24}
                alt="edit"
                className="mx-auto"
              />
            ) : (
              <div className="flex gap-4 items-center">
                <CheckIcon onClick={handleEditToggle} />
                <CancelIcon onClick={handleCancelEdit} />
              </div>
            )}
            <div className="text-sm font-normal pt-2">Edit</div>
          </button>
          <button
            className="cursor-pointer"
            disabled={!isRecognizing}
            onClick={copyText}
          >
            <Image
              src="/copy.png"
              width={22}
              height={24}
              alt="Copy"
              className="mx-auto"
            />
            <div className="text-sm font-normal pt-2">Copy</div>
          </button>
        </div>
      </div>
      <div>
        <CustomTextArea
          id="Transcript"
          ref={textareaRef}
          onChange={isEdit ? handleChange : undefined}
          value={value}
          className="p-8 poppins w-[886px] h-[452px] rounded-[30px] align-top text-base font-normal bg-transparent border-1 border-silver placeholder:text-manatee focus:border-none focus:ring-2 focus:ring-inset focus:ring-purple custom-scrollbar"
        />
      </div>
    </div>
  );
};

export default TransScript;
