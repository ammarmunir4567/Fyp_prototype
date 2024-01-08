import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faMicrophoneSlash } from '@fortawesome/free-solid-svg-icons';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import logo from './Assets/icons8-expert-ios-16-filled/icon.png'

import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
  RedirectToSignIn,
} from "@clerk/clerk-react";
 



const clerkPubKey = "pk_test_cGVhY2VmdWwtbW9zcXVpdG8tMzYuY2xlcmsuYWNjb3VudHMuZGV2JA";
const openAIApiKey = "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"

export default function GPT() {
    const [queries, setQueries] = useState(['two employees are fighting', 'how to deal with an angry employee']);
    const { transcript, resetTranscript, listening } = useSpeechRecognition();
    const [inputValue, setInputValue] = useState('');

 


  const handleNewQuery = () => {
    // Logic for handling a new query
  };

  const handleClearConversations = () => {
    setQueries([]);
  };

function result(){
  setQueries([...queries, inputValue]);
  setInputValue('');
  resetTranscript();
}



  const handleSubmit = (event) => {
    event.preventDefault();
    if (listening && inputValue.trim()) {
      setQueries([...queries, inputValue]);
      setInputValue('');
      resetTranscript();
    }
  };

  const handleInputChange = (event) => {
    if (!listening) {
      setInputValue(event.target.value);
    }
  };

  const startListening = () => {
    SpeechRecognition.startListening({ continuous: true });
    setInputValue(''); // Clear the manual input when starting to listen
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
    setInputValue(transcript); // Update the input with the final transcript
  };

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return <span>Browser doesn't support speech recognition.</span>;
  }


  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-neutral-800 p-4 flex flex-col">
        <button onClick={handleNewQuery} className="mb-4 p-2 w-full rounded-md border border-white border-opacity-20 text-white text-sm font-normal">New Query</button>
        <div className="flex-grow overflow-auto">
          {queries.map((q, index) => (
            <div key={index} className="p-2 text-gray-200 text-sm font-normal">{q}</div>
          ))}
        </div>
        <button onClick={handleClearConversations} className="mt-2 p-2 w-full rounded-md border border-white border-opacity-20 text-white text-sm font-normal">Clear Conversations</button>
        <span  className="mt-2 p-2 w-full rounded-md border text-center border-white border-opacity-20 text-white text-sm font-normal">Settings
         <div className='pl-36 pb-2'> <UserButton /></div>
        </span>
        
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-4 flex flex-col justify-between">
        <div className="text-center ">
 
          <h1 className="text-4xl font-semibold mb-4  " style={{position:'absolute' , left:"55%", bottom:"70%" }} >HR Expert System</h1>
          <img src={logo} alt="Logo" style={{position:'absolute' , left:"60%", bottom:"50%" }} />
        </div>
        <form className="flex border-t border-gray-300 pt-4" onSubmit={handleSubmit}>
          {listening ? (
            // If listening, disable manual input
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              className="flex-grow p-2 border border-gray-300 rounded"
              placeholder="Listening..."
              disabled
            />
          ) : (
            // If not listening, enable manual input
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              className="flex-grow p-2 border border-gray-300 rounded"
              placeholder="Enter your Query Here"
            />
          )}
          <button type="submit" onClick={result} className="p-2 ml-2 rounded-md border border-black border-opacity-10 shadow bg-white text-zinc-700 text-sm font-normal">Search</button>

          {/* Mic Icon Button */}
          <button onClick={listening ? stopListening : startListening} className="p-2 ml-2">
            {listening ? <FontAwesomeIcon icon={faMicrophone} /> : <FontAwesomeIcon icon={faMicrophoneSlash} />}
          </button>
        </form>
      </div>
    </div>
  );
}
