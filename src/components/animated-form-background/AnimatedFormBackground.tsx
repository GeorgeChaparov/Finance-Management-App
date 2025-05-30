"use client"

import { motion, Transition, Variants } from "framer-motion";
import { FormEvent, FormEventHandler, ReactNode } from "react";

type animatedFormBackgroundProps = {children: ReactNode, className: string, animationVariants: Variants, transition: Transition, submitCallbackType?: "createUser" | "loginUser"}

async function validateCreateInputs(e: FormEvent<HTMLFormElement>) {
  console.log(e);
}

async function validateLoginInputs(e: FormEvent<HTMLFormElement>) {
  console.log(e);
}

export default function AnimatedFormBackground({children, className, animationVariants, transition, submitCallbackType} : animatedFormBackgroundProps) {
  return (
    <motion.form
    initial={"init"} animate={"animate"}
    transition={transition}
    variants={animationVariants}
    className={className}
    onSubmit={submitCallbackType == 'createUser' ? validateCreateInputs : validateLoginInputs}
    method="POST"
    >
      {children}
    </motion.form>
  );
}