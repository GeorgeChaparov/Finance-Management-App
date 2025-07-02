"use client"

import { motion } from "framer-motion";
import { LabelHTMLAttributes, ReactNode} from "react";

type labelProps = { children?: ReactNode, attributes?: LabelHTMLAttributes<HTMLLabelElement>, motionAttributes?: any}  

export default function Label({children, motionAttributes, attributes={}} : labelProps) {
  if (motionAttributes) {
    return (
      <motion.label {...attributes} {...motionAttributes}>{children}</motion.label>
    );
  }
  else {
    return (
      <label {...attributes}>{children}</label>
    );
  }
}