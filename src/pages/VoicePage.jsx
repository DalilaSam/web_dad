import 'regenerator-runtime';
import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export const VoicePage = () => {
  const [isListening, setIsListening] = useState(false);
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    // Comprueba si el navegador es compatible
    if (!browserSupportsSpeechRecognition) {
      console.error("Browser doesn't support speech recognition.");
    }
  }, [browserSupportsSpeechRecognition]);

  //lleva el comienzo del micro
  const handleStartMic = () => {
    SpeechRecognition.startListening({ continuous: true });
    setIsListening(true);
  };

  //lleva la pausa del micro
  const handleStopMic = () => {
    SpeechRecognition.stopListening();
    setIsListening(false);
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const AddText = () => {
    setOutputText(outputText + inputText + ' '); 
    setInputText(''); 
  };

  const handleReset = () => {
    resetTranscript(); // Resetea el speech-to-text
    setInputText(''); // Resetea el input text
    setOutputText(''); // Resetea el output text
  };

  return (
    <div className="divMic">
      {browserSupportsSpeechRecognition ? (
        <div>
          <h2>Microphone: {listening ? 'on' : 'off'}</h2>
          <br/>
          <button onClick={handleStartMic}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-mic-fill" viewBox="0 0 16 16">
              <path d="M5 3a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0z"/>
              <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5"/>
            </svg>
          </button>
          
          <button onClick={handleStopMic}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">
              <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5m5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5"/>
            </svg>
          </button>

          <button onClick={handleReset}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-repeat" viewBox="0 0 16 16">
              <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41m-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9"/>
              <path fillRule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5 5 0 0 0 8 3M3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9z"/>
            </svg>
          </button> 

          <input 
            type="text" 
            value={inputText} 
            onChange={handleInputChange} 
            placeholder="Enter text here" 
          />
          <button onClick={AddText}>Add Text</button>

          <p>Texto del input: {outputText}</p> 
          <p>Texto del microfono: {transcript}</p>

        </div>
      ) : (
        <p>Browser doesn't support speech recognition.</p>
      )}
    </div>
  );
}