"use client"

import { motion, Transition, Variants } from "framer-motion";
import { FormEvent, ReactNode, use } from "react";
import { authenticate, signin } from "@/src/lib/authActions";
import {useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

type animatedFormBackgroundProps = {children: ReactNode, className: string, animationVariants: Variants, transition: Transition, submitCallbackType?: "createUser" | "loginUser"}

let callbackUrl: null | string = null;
let router: AppRouterInstance;

async function validateCreateInputs(e: FormEvent<HTMLFormElement>) {
  e.preventDefault();

  const form = e.target as HTMLFormElement;
  signin(new FormData(form));
}

async function validateLoginInputs(e: FormEvent<HTMLFormElement>) {
  e.preventDefault();

  const form = e.target as HTMLFormElement;
  authenticate(new FormData(form));
}

export default function AnimatedFormBackground({children, className, animationVariants, transition, submitCallbackType} : animatedFormBackgroundProps) {
  const searchParams = useSearchParams();
  callbackUrl = searchParams.get('callbackUrl');
  router = useRouter();

  return (
    <motion.form
    initial={"init"} animate={"animate"}
    transition={transition}
    variants={animationVariants}
    className={className}
    onSubmit={submitCallbackType == 'createUser' ? validateCreateInputs : validateLoginInputs}
    >
      {children}
    </motion.form>
  );
}