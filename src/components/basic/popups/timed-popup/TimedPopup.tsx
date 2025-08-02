"use client"

import React, { useEffect } from 'react';
import style from "./TimedPopup.module.css"
import { motion, useAnimationControls } from 'framer-motion';
const enterExitAnimationDuration = 0.1;

export default function TimedPopup({message, duration}: {message: string, duration: number}) {
  const backgroundAnimationControl = useAnimationControls();
  const timeBarAnimationControl = useAnimationControls();
  
  useEffect(() => {
    backgroundAnimationControl.start("open").then(() => {
      timeBarAnimationControl.start("start");
      setTimeout(() => {
        backgroundAnimationControl.start("close");
      }, duration * 1000);
    });
  });

  return (
    <motion.div
    initial={"init"} 
    animate={backgroundAnimationControl} 
    transition={{duration: enterExitAnimationDuration}} 
    variants={{
      init: {opacity: 0, scale: 0},
      open: {opacity: [1, 1], scale: [1.1, 1], transition:{times:[0, 1]}},
      close: {translateY:-100, opacity: 0, scale: [1, 1.1], transition:{times:[0, 1]}}
    }} 
    className={style.background}>
      <p className={style.message}>{message}</p>
      <motion.div
      initial={"init"} 
      animate={timeBarAnimationControl} 
      variants={{
        init: {width:"100%"},
        start: {width: ["100%", "0%"], transition:{times:[0, 1], duration: duration}}
      }}
      className={style.timeBar}>
      
      </motion.div>
    </motion.div>
  );
}
