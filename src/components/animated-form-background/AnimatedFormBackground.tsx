"use client"

import { motion, Transition, Variants } from "framer-motion";
import { ReactNode } from "react";

type animatedFormBackgroundProps = {children: ReactNode, className: string, animationVariants: Variants, transition: Transition}

export default function AnimatedFormBackground({children, className, animationVariants, transition} : animatedFormBackgroundProps) {
  return (
    <motion.form
    initial={"init"} animate={"animate"}
    transition={transition}
    variants={animationVariants}
    className={className}>
        {children}
    </motion.form>
  );
}