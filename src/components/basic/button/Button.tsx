"use client"

import { ReactNode, useEffect, useRef } from "react";

type buttonProps = {children?: ReactNode, className?: string, callbacks?: Function[], events?: string[], type?: "button" | "reset" | "submit" | undefined}  

export default function Button({children, className, callbacks, events, type = "button"} : buttonProps) {
    const buttonRef: any = useRef(null)

    useEffect(() => {
        events?.forEach((event, index) => {
            buttonRef.current.addEventListener(event, callbacks?.[index]);
        });
    }, [buttonRef, events, callbacks])

  return (
    <button ref={buttonRef} className={className} type={type}>{children}</button>
  );
}