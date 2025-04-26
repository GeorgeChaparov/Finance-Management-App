import AnimatedFormBackground from "../components/AnimatedFormBackground/AnimatedFormBackground";
import BackgroundCircles from "../components/BackgroundCircles/BackgroundCircles";
import Button from "../components/Basic/Button/Button";
import Input from "../components/Basic/Input/Input";
import style from "./page.module.css"
import { backgroundAnimation } from "@/utilities";

export default function Page() {
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
        className={style.backgroundBlur}>
          <p className={style.title}>Sign Up</p>
          <Input className={style.email} type="email" placeholder="Email"/>
          <Input className={style.username} type="text" placeholder="Username"/>
          <Input className={style.password} type="password" placeholder="Password"/>
          <Button className={style.submitButton} type="submit">Sign Up</Button>
        </AnimatedFormBackground>
    </div>
  );
}