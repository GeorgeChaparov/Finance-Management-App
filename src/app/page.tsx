"use server"

import Link from "next/link";
import AnimatedFormBackground from "../components/animated-form-background/AnimatedFormBackground";
import BackgroundCircles from "../components/background-circles/BackgroundCircles";
import style from "./page.module.css"
import { backgroundAnimation } from "@/src/consts";

export default async function Page() {
  return (
    <div className={style.page}>
        <BackgroundCircles  
        circles={[
          {
            variants:{init: {top: "100px", left: "-300px"}, animate: {left:"calc(50% - 224px)"}}, 
            radius: 300
          },
          {
            variants:{init: {top: 0, right: "-200px"}, animate: {left:"calc(50% - 50px)"}, },
            radius: 200
          },
          {
            variants:{init: {bottom: 0, right: "-400px"}, animate: {left:"calc(50% - 110px)"}}, 
            radius: 400
          },
        ]}>
        </BackgroundCircles>
        <AnimatedFormBackground
        transition={{delay: backgroundAnimation.delay, duration: backgroundAnimation.duration}}
        animationVariants={{
          init: {bottom: "-714px"}, animate: {top: "max(50% - 357px , calc(50% - ((100% - 100px) / 2))) "}
        }}
        className={style.backgroundBlur}>
          <h1 className={style.title}>Welcome</h1>
          <div className={style.wrapper}>            
            <Link className={style.signIn} href="/signup" >Sign Up</Link>
            <Link className={style.logIn} href="/login">Have an account? <br />Log in here</Link>
          </div>
        </AnimatedFormBackground>
    </div>
  );
}