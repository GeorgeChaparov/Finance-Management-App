"use server"

import BackgroundCircles from "@/src/components/background-circles/BackgroundCircles";
import style from "./page.module.css"
import { backgroundAnimation } from "@/src/consts";
import AnimatedFormBackground from "@/src/components/animated-form-background/AnimatedFormBackground";
import Input from "@/src/components/basic/input/Input";
import Button from "@/src/components/basic/button/Button";

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
        ]}></BackgroundCircles>
        <AnimatedFormBackground
        transition={{delay: backgroundAnimation.delay, duration: backgroundAnimation.duration}}
        animationVariants={{
          init: {bottom: "-714px"}, animate: {top: "max(50% - 357px , calc(50% - ((100% - 100px) / 2))) "}
        }}
        className={style.backgroundBlur}
        submitCallbackType={"createUser"}>
          <p className={style.title}>Sign Up</p>
          <Input attributes={{className: style.email, type: "email", placeholder: "Email", name: "email", required: true}}></Input>
          <Input attributes={{className: style.username, type: "text", placeholder: "Username", name: "username", required: true}}></Input>
          <Input attributes={{className: style.password, type: "password", placeholder: "Password", name: "password", required: true}}></Input>
          <Button attributes={{className: style.submitButton, type: "submit"}}>Sign Up</Button>
        </AnimatedFormBackground>
    </div>
  );
}