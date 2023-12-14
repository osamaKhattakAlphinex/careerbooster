"use client";

import { useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const AudioComponent = () => {
  //subscribe to thapa technical for more awesome videos

  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true, language: "en-US" });
  const { transcript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    console.log("Your browser does not support speech recognition");
  }
  useEffect(() => {
    startListening();
  }, []);
  return (
    <div>
      <div>{transcript}</div>

      <div>
        <button onClick={SpeechRecognition.stopListening}>
          Stop Listening
        </button>
      </div>
    </div>
  );
};

export default AudioComponent;

// import { useEffect } from "react";
// import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";

// const AudioRecording = () => {
//   const recorderControls = useAudioRecorder();
//   const addAudioElement = (blob: any) => {
//     const url = URL.createObjectURL(blob);
//     console.log(url);
//   };
//   useEffect(() => {
//     recorderControls.startRecording();
//   }, []);

//   return (
//     <div>
//       <AudioRecorder
//         onRecordingComplete={(blob) => addAudioElement(blob)}
//         recorderControls={recorderControls}
//       />
//       <button onClick={recorderControls.stopRecording}>Stop recording</button>
//     </div>
//   );
// };

// export default AudioRecording;
