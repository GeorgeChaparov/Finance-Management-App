"use client"

import { ReactNode, RefObject, useEffect, useRef, useState } from "react";
import style from "./Calculator.module.css"
import { motion, useAnimationControls } from "framer-motion"

type calculatorProps = {content?: ReactNode, resultCallback: Function, closeCallback: Function, title?: string}
function Calculator({content , resultCallback, closeCallback, title}: calculatorProps) {
    const buttonsSymbols = ['c', '(', ')', '/', '7', '8', '9', '*', '4', '5', '6', '-', '1', '2', '3', '+', '.', '0', "del", '='];
    const animationControl = useAnimationControls();
    const amountRef: RefObject<any> = useRef(null);

    const animationDuration = 0.3;
    useEffect(() => {
        animationControl.start("open");
    });

    const onClick = (index:number) => {
        const element: any = amountRef.current;
        const currentValue = element.value;

        let newValue = currentValue;
        if (index === 0) {
            newValue = "";
        }
        else if (index === 18) {
            newValue = currentValue.slice(0, currentValue.length - 1);
        }
        else if (index === 19) {

            if (currentValue === "") {
                return;
            }

            if (!isExpressionValid(currentValue, true)) {
                element.style.color = "red";
                return;
            }

            element.style = "";

            newValue = new Function('return ' + currentValue)();
            element.value = newValue;

            return;
        }
        else {
            newValue += buttonsSymbols[index];
        }

        if (!isExpressionValid(newValue)) return;

        element.style = "";
        element.value = newValue
        
        element.scrollLeft = element.scrollWidth;
    }

    const isExpressionValid = (expression: string, isCompleted: boolean = false) => {
        // Regex to allow only valid characters (numbers, operators, parentheses, and spaces)
        const regex = /^[\d+\-*/().\s]*$/;
        if (!regex.test(expression)) return false;
    
        // Check if the expression starts with an operator or a dot
        if (/^[+\-*/\.]/.test(expression)) return false;
    
        // Check for consecutive operators (e.g., ++, --, **, etc.)
        if (/[+\-*/\.]{2,}/.test(expression)) return false;
    
        // Check for opening a bracket after a number or a number after a closing bracket  
        if (/\d+\(|\)\d+/.test(expression)) return false

        // Check for two dots in on number
        if (/\d+\.\d+\./.test(expression)) return false

        // Check for a number that is not floating point that contais zero followed by a digit 
        if (/(?<!\.|\d+)0\d/.test(expression)) return false
        
        // Check for balanced parentheses
        const stack = [];
        for (let char of expression) {
          if (char === '(') stack.push(char);
          if (char === ')') {
            if (stack.length === 0) return false;
            stack.pop();
          }
        }
    
        if (isCompleted) {
            if (stack.length !== 0) {
                return false; // Unmatched opening parenthesis
            }

            // Check if the expression ends with an operator or a dot
            if (/[+\-*/\.]$/.test(expression)) return false;
        }

        return true;
    };

    function closing(callback: Function|undefined = undefined) {

        animationControl.start("close").then(() => {
            closeCallback();
            if (callback) {
                callback();
            } 
        });
    }

    return(
        <>
            <motion.div 
            initial={"init"} animate={animationControl} transition={{duration: animationDuration}} 
            variants={{
                init: {opacity: 0},
                open: {opacity: 1},
                close: {opacity: 0}
            }}
            className={style.backgroundWrapper} onClick={() => closing()}>
            </motion.div>
            <motion.div
            initial={"init"} animate={animationControl} transition={{duration: animationDuration}} 
            variants={{
                init: {translateY: 800},
                open: {translateY: 0},
                close: {translateY: 800}
            }} 
            className={style.mainWrapper}>
                {title !== undefined && (<input type="text" readOnly  value={title} className={style.defaultTitle}></input>)} 
                {title === undefined && (<input type="text" placeholder="Name" className={style.customTitle}></input>)} 
            
                {content ? content : ""}

                <input type="text" ref={amountRef}  readOnly className={style.amount} placeholder="900 lv"></input>

                <div className={style.buttonsSection}>
                    {buttonsSymbols.map((char, index) => {
                        return <button key={char} type="button" className={style.button} onClick={() => {onClick(index);}}>{char}</button>
                    })}
                </div>

                <button type="button" className={style.addButton} 
                onClick={() => {onClick(19); closing(() => {resultCallback(amountRef.current.value);});}}>
                    Add
                </button>
            </motion.div>
        </>
    );
}

export default Calculator;