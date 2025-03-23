"use client"

import style from "./MenuButtons.module.css"

import { useRouter } from 'next/navigation'
import Image from "next/image";
import homeImage from "@/public/home.png"
import settingsImage from "@/public/settings.png"
import { motion } from "framer-motion";

function MenuButtons({isInHome, hide}) {
    const router = useRouter();
    
    const showStyle ={
        display: "block"
    }

    const hideStyle ={
        display: "none"
    }

    const loadHome = (event) =>{
        router.push('/')
    };

    const loadSettings = (event) =>{
        if (isInHome) {
            router.push('/settings')
        }
    };

    return(
        <motion.div 
        initial = {hide ? {translateY: 0} : ""}
        animate = {hide ? {translateY: 60, transition:{ease: "easeIn"}} : ""}
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