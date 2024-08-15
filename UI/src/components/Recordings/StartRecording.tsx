"use client";
import Select from "../common/Select";
import { languageOptions } from "@/utils/constant";
import Image from "next/image";
import { useState } from "react";
import RecordingInProgress from "./RecordingInProgress";

const StartRecording = ({id}:{id:string}) => {
  const [language, setLanguage] = useState("en");
  const [show, setShow] = useState<boolean>(false);
  const handleChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setLanguage(e.target.value);
  };
  const handeplay = () => {
    setShow(true);
  };
  return !show ? (
    <div className="p-4 bg-[url('/RectangleHome.png')] bg-no-repeat w-[962px] h-auto rounded-[30px]">
      <div className="text-end text-white">
        <Select
          label="Language"
          id="language"
          options={languageOptions}
          className="poppins border-none rounded-md bg-transparent text-white text-base pr-10 placeholder:text-manatee focus:ring-2 focus:ring-inset focus:ring-purple"
          onChange={handleChange}
          value={language}
        />
      </div>
      <div className="text-center text-white flex flex-col items-center justify-center">
        <Image src="/speaker.png" alt="speaker" width={286} height={324} />
        <h5 className="text-[24px] font-semibold pt-6">Start Speaking</h5>
        <div className="flex items-center gap-2 justify-center py-4">
          <button onClick={handeplay}>
            <Image src="/play.png" alt="play" width={50} height={50} />
          </button>
          <button>
            <Image
              src="/pausedisabled.png"
              alt="pause disabled"
              width={50}
              height={50}
            />
          </button>
        </div>
        <h6 className="text-[32px] font-medium">00:00:00</h6>
      </div>
    </div>
  ) : (
    <RecordingInProgress language={language} id={id} />
  );
};

export default StartRecording;
