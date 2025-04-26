"use client"

import style from "./BackgroundCircles.module.css"
import circleImage from "@/public/circle.png"
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { backgroundAnimation } from "@/utilities";

type BackgroundCirclesProps = {circles: Array<{variants: Variants, radius: number}>, height?: string, transitionDelay?: number, transitionDuration?: number}
export default function BackgroundCircles({circles, height, transitionDelay = backgroundAnimation.delay, transitionDuration = backgroundAnimation.duration}: BackgroundCirclesProps) {

  return (
    <div className={style.circles} style={height ? {height: height, top: 0} : {}}>
      {circles.map((circle, index) => {
        return(
          <motion.div 
          key={index}
          initial={"init"} animate={"animate"}
          transition={{delay: transitionDelay, duration: transitionDuration}}
          variants={circle.variants}
          className={style.circle}>
            <Image width={circle.radius} height={circle.radius} src={circleImage} alt=""></Image>
          </motion.div>
        )
      })}
    </div>
  );
}