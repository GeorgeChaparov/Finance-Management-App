"use client"

import style from "./MenuButtons.module.css"

import { useRouter } from 'next/navigation'
import Image from "next/image";
import homeImage from "@/public/home.png"
import settingsImage from "@/public/settings.png"
import { motion, useAnimationControls} from "framer-motion";
import { useEffect, useState } from "react";

type MenuButtonsProps = {isInHome: boolean, hide: boolean}

function MenuButtons({isInHome, hide}: MenuButtonsProps) {
    const router = useRouter();
    const [showMenu, setShowMenu] = useState(true);
    const animationControl = useAnimationControls() 

    useEffect(() => {
        if (hide) {
            animationControl.start("animate").then(() => {setShowMenu(false)});
        }
    })

    const showStyle ={
        display: "block"
    }

    const hideStyle ={
        display: "none"
    }

    const loadHome = () =>{
        router.push('/')
    };

    const loadSettings = () =>{
        if (isInHome) {
            router.push('/profile_settings')
        }
    };

    return(
        showMenu && <motion.div 
        initial = {"init"}
        animate = {animationControl}
        variants={{
            init: {translateY: hide ? 0 : ""},
            animate: {translateY: hide ? 60 : "", transition: {ease: "easeIn"}}
        }}
        className={style.menu}>
            <div onClick={loadHome} className={style.homeContainer}>
                <Image className={style.homeImage} src={homeImage} alt="home image"/>
                <p style ={isInHome ? showStyle : hideStyle}>Home</p>
            </div>

            <div onClick={loadSettings} className={style.settingsContainer}>
                <Image className={style.settingsImage} src={settingsImage} alt="settings image"/>
                <p style ={isInHome ? hideStyle : showStyle}>Settings</p>
            </div>
        </motion.div>
        
    );
}

export default MenuButtons;