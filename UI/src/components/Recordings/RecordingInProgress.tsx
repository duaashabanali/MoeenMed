import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { getToken } from "@/lib/api";
import {
  TranslationRecognizer,
  ResultReason,
  SpeechTranslationConfig,
  AudioConfig,
} from "microsoft-cognitiveservices-speech-sdk";
import TransScript from "../transscript/TransScript";
import { useMutation } from "@apollo/client";
import { CREATE_RECORDING } from "@/lib/graphql/mutation/recordings";
import { errorToast, successToast } from "../common/Toast/toaster";
import Loader from "../common/Loader/Loader";
import { IconButton } from "@mui/material";

const RecordingInProgress = ({
  language,
  id,
}: {
  language: string;
  id: string;
}) => {
  const [displayText, setDisplayText] = useState("");
  const [createRecording, { loading }] = useMutation(CREATE_RECORDING, {
    onCompleted: () => {
      setDisplayText("");
      successToast("Data successfully saved");
      setRecognizer(null);
      setIsRecognizing(false);
    },
    onError: (err) => {
      errorToast(err?.message);
      console.log(err);
    },
  });
  const [recognizer, setRecognizer] = useState<TranslationRecognizer | null>(
    null
  );
  const [isPaused, setIsPaused] = useState(false);
  const [isRecognizing, setIsRecognizing] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [pausedTime, setPausedTime] = useState<number | null>(0);
  const timerRef = useRef<number | null>(null);
  const startTimer = () => {
    timerRef.current = window.setInterval(() => {
      if (startTime !== null) {
        const currentTime = new Date();
        const elapsed =
          pausedTime ?? 0 + (currentTime.getTime() - startTime.getTime());
        setPausedTime(elapsed);
      }
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };
  useEffect(() => {
    if (isRecognizing) {
      startTimer();
    } else {
      stopTimer();
    }
  }, [isRecognizing]);
  async function sttFromMic() {
    const { token, region } = await getToken();
    const speechTranslationConfig =
      SpeechTranslationConfig.fromAuthorizationToken(token, region as any);
    speechTranslationConfig.speechRecognitionLanguage = "en-US";
    speechTranslationConfig.addTargetLanguage(language);

    const audioConfig = AudioConfig.fromDefaultMicrophoneInput();
    const translationRecognizer = new TranslationRecognizer(
      speechTranslationConfig,
      audioConfig
    );

    setRecognizer(translationRecognizer);
    setIsRecognizing(true);

    translationRecognizer.recognized = (_s, e) => {
      if (e.result.reason === ResultReason.TranslatedSpeech) {
        const translation = e.result.translations.get(language);
        if (translation) {
          setDisplayText((prevText) => `${prevText} ${translation}`);
        } else {
          setDisplayText("ERROR: Translation not available.");
        }
      }
    };

    translationRecognizer.startContinuousRecognitionAsync();
    setStartTime(new Date());
    startTimer();
  }

  function stopRecognition() {
    if (recognizer) {
      recognizer.stopContinuousRecognitionAsync();

      createRecording({
        variables: {
          input: {
            transcription: displayText,
            patient: id,
          },
        },
      });
    }
  }

  const toggleRecognition = () => {
    if (recognizer && isPaused) {
      recognizer.startContinuousRecognitionAsync(
        () => {
          setIsPaused(false);
          setDisplayText((prevText) => `${prevText}`);
          setStartTime(new Date());
          startTimer();
        },
        (err: any) => {
          console.error("Error resuming recognition:", err);
        }
      );
    } else if (recognizer && !isPaused) {
      recognizer.stopContinuousRecognitionAsync(
        () => {
          stopTimer();
          setIsPaused(true);
          setDisplayText((prevText) => `${prevText}`);
        },
        (err: any) => {
          console.error("Error pausing recognition:", err);
        }
      );
    }
  };

  return (
    <div>
      <TransScript
        value={displayText}
        setDisplayText={setDisplayText}
        isRecognizing={isRecognizing}
      />
      <div className="poppins text-white p-4 bg-[url('/speaking_bg.png')] bg-no-repeat w-full h-auto rounded-[30px] my-8">
        <div className="text-center text-white flex flex-col items-center justify-center">
          <div className="flex items-center gap-8">
            <IconButton onClick={toggleRecognition}>
              <Image
                src={!isRecognizing || isPaused ? "/play.png" : "/pause.png"}
                alt={isPaused ? "resume" : "pause"}
                width={50}
                height={50}
              />
            </IconButton>
            <IconButton onClick={sttFromMic} disabled={isRecognizing}>
              <Image
                src="/gradientmicrophone.png"
                alt="start"
                width={147}
                height={120}
              />
            </IconButton>
            <IconButton onClick={() => stopRecognition()}>
              <Image src="/stop.png" alt="stop" width={50} height={50} />
            </IconButton>
          </div>
          <div className="py-4">
            <Image
              src="/voicegraph.png"
              width={417}
              height={70}
              alt="voice graph"
            />
          </div>
          <h6 className="text-[32px] font-medium">{formatTime(pausedTime)}</h6>
        </div>
      </div>
      {loading && <Loader />}
    </div>
  );
};

export default RecordingInProgress;

const formatTime = (time: number | null): string => {
  if (time === null) return "00:00:00";

  const hours = Math.floor(time / 3600000);
  const minutes = Math.floor((time % 3600000) / 60000);
  const seconds = Math.floor((time % 60000) / 1000);

  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};
