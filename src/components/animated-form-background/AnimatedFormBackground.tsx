"use client"

import { motion, Transition, Variants } from "framer-motion";
import { FormEvent, ReactNode, use } from "react";

type animatedFormBackgroundProps = {children: ReactNode, className: string, animationVariants: Variants, transition: Transition, submitCallbackType?: "createUser" | "loginUser"}

async function validateCreateInputs(e: FormEvent<HTMLFormElement>) {
  e.preventDefault();

  let form = e.target as HTMLFormElement;
  const formData = new FormData(form);

  const username = formData.get("username");
  const password = formData.get("password");
  const email = formData.get("email");
  
  if (!username || !password || !email) {
    console.log("No empty fields allowed.");
  }

  const response = await fetch("/api/users", {
    method: "POST", 
    body: JSON.stringify({username: username, password: password, email: email})
  })

  if(!response.ok)
  {
    console.log(await response.text());
    return;
  }

  form.action = `/home/${await response.json()}}`;
  form.submit();
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