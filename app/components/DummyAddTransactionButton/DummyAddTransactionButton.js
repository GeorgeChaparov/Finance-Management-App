"use client"

import { motion } from "framer-motion";

function DummyAddTransactionButton({ActionCallback, variants, controls, _style, text = ""}) {

    let style = {
        zIndex: 3,
        position: "fixed",

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

    style = {...style, _style};
    
    return(
        <motion.button 
        initial="init" animate={controls}
        variants= {variants}
        onClick={ActionCallback} style={{...style}}>
            {text}
        </motion.button>
    );
}

export default DummyAddTransactionButton;