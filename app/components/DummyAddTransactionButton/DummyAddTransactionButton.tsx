"use client"

import { AnimationControls, motion, TargetAndTransition, VariantLabels, Variants } from "framer-motion";
import { MouseEventHandler } from "react";

type DummyAddTransactionButtonProps = {actionCallback: MouseEventHandler<HTMLButtonElement>, variants: Variants, controls: boolean | TargetAndTransition | VariantLabels | AnimationControls, style: object, text?: string}

function DummyAddTransactionButton({actionCallback, variants, controls, style, text = ""}: DummyAddTransactionButtonProps) {

    let _style = {
        zIndex: 3,
        position: "absolute",

        width: "50px",
        height: "50px",

        backgroundColor: "rgb(255, 255, 255)",
        backgroundImage: "url('/add.png')",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",

        bottom: "35px",
        left: "calc(50vw - 25px)",

        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",

        borderRadius: "50%",
        borderWidth: "0"
    }

    style = {..._style, ...style};
    
    return(
        <motion.button 
        initial="init" animate={controls}
        variants= {variants}
        onClick={actionCallback} style={{...style}}>
            {text}
        </motion.button>
    );
}

export default DummyAddTransactionButton;