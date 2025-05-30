"use client"

import { HTMLInputTypeAttribute, useEffect, useRef } from "react";

type inputProps = { className: string,  callbacks?: Function[],  events?: string[],  type?:  HTMLInputTypeAttribute, placeholder?: string, attributes?: Object}  

export default function Input({className, callbacks, events, type = "text", placeholder="", attributes={}} : inputProps) {
    const buttonRef: any = useRef(null)
    useEffect(() => {
        events?.forEach((event, index) => {
            buttonRef.current.addEventListener(event, callbacks?.[index]);
        });
    }, [buttonRef, events, callbacks])

  return (
    <input ref={buttonRef} className={className} type={type} placeholder = {placeholder} {...attributes}/>
  );
}