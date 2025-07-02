"use client"

import { motion } from "framer-motion";
import { ButtonHTMLAttributes, ReactNode } from "react";

type buttonProps = { children?: ReactNode, attributes?: ButtonHTMLAttributes<HTMLButtonElement>, motionAttributes?: any}  

export default function Button({children, motionAttributes, attributes={}} : buttonProps) {
  if (motionAttributes) {
    return (
      <motion.button {...attributes} {...motionAttributes}>{children}</motion.button>
    );
  }
  else {
    return (
      <button {...attributes}>{children}</button>
    );
  }
}