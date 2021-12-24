import React from "react";
import {useRef, useEffect} from 'react';
import ControlPanelCard from "./ControlPanelCard.jsx";

const {desktopCapturer} = require('electron');

const TimerWindow = () => {

  const videoRef = useRef(null);

  useEffect(() => {
    const getUserMedia = async () => {
      try {
        const inputSources = await desktopCapturer.getSources({
          types: ['window'],
          name: 'Timer'
        });
        for (const source of inputSources) {
          if (source.name === 'Timer') {
            const stream = await navigator.mediaDevices.getUserMedia({
              audio: false,
              video: {
                mandatory: {
                  chromeMediaSource: 'desktop',
                  chromeMediaSourceId: source.id
                }
              }
            });
            videoRef.current.srcObject = stream;
            break;
          }
        }
      } catch (e) {
        console.log(e);
      }
    };
    getUserMedia();
  }, []);
  return <ControlPanelCard className="timer-window" cardTitle="Timer Window" children={
    <video ref={videoRef} autoPlay className='video'></video>
  } />;
};

export default TimerWindow;
