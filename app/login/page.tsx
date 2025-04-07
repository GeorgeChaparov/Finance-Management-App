"use client"

import style from "./page.module.css"
import circleImage from "@/public/circle.png"
import { motion, useAnimationControls } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";

export default function Login() {
  const transitionDuration = 0.4;
  const transitionDelay = 0.35;
  const animationControl = useAnimationControls();

  useEffect(() => {
    animationControl.start("animate");
  })

  return (
    <div className={style.page}>
        <div className={style.circles}>
          <motion.div 
          initial={"init"} animate={animationControl}
          transition={{delay: transitionDelay, duration: transitionDuration}}
          variants={{
            init: {top: "100px", left: "-300px"}, animate: {left:"calc(50% - 224px)"}
          }}
          className={style.circle}>
            <Image width={300} height={300} src={circleImage} alt=""></Image>
          </motion.div>
          <motion.div 
          initial={"init"} animate={animationControl}
          transition={{delay: transitionDelay, duration: transitionDuration}}
          variants={{
            init: {top: 0, right: "-200px"}, animate: {left:"calc(50% - 50px)"}
          }}
          className={style.circle}>
            <Image width={200} height={200} src={circleImage} alt=""></Image>
          </motion.div>
          <motion.div 
          initial={"init"} animate={animationControl}
          transition={{delay: transitionDelay, duration: transitionDuration}}
          variants={{
            init: {bottom: 0, right: "-400px"}, animate: {left:"calc(50% - 110px)"}
          }}
          className={style.circle}>
            <Image width={400} height={400} src={circleImage} alt=""></Image>
          </motion.div>
        </div>
        <motion.form
        initial={"init"} animate={animationControl}
        transition={{delay: transitionDelay, duration: transitionDuration}}
        variants={{
          init: {bottom: "-714px"}, animate: {top: "max(50% - 357px , calc(50% - ((100% - 100px) / 2))) "}
        }}
        className={style.backgroundBlur}>
          <p className={style.title}>Log In</p>
          <input className={style.username} type="text" placeholder="Username"/>
          <input className={style.password} type="password" placeholder="Password"/>
          <a className={style.forgotPassword} href="http://">Forgot password?</a>
          <button className={style.submitButton} type="submit">Log In</button>
        </motion.form>
    </div>
  );
}