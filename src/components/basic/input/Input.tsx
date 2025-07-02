"use client"

import { motion } from "framer-motion";
import { InputHTMLAttributes, ReactNode } from "react";

type inputProps = { children?: ReactNode, attributes?: InputHTMLAttributes<HTMLInputElement>, motionAttributes?: any}  

export default function Input({children, motionAttributes={}, attributes={}} : inputProps) {
  if (motionAttributes) {
    return (
      <motion.input {...attributes} {...motionAttributes}>{children}</motion.input>
    );
  }
  else {
    return (
      <input {...attributes}>{children}</input>
    );
  }
}