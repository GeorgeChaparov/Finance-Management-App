"use client"

import style from "./MenuButtons.module.css"

import { useRouter } from 'next/navigation'
import Image from "next/image";
import homeImage from "./Home.png"
import settingsImage from "./settings.png"

function MenuButtons({isInHome}) {
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
        <>
            <div className={style.menu}>
                <div onClick={loadHome} className={style.homeContainer}>
                    <Image className={style.homeImage} src={homeImage} alt="home image"/>
                    <p style ={isInHome ? showStyle : hideStyle}>Home</p>
                </div>

                <div onClick={loadSettings} className={style.settingsContainer}>
                    <Image className={style.settingsImage} src={settingsImage} alt="settings image"/>
                    <p style ={isInHome ? hideStyle : showStyle}>Settings</p>
                </div>
            </div>
        </>
    );
}

export default MenuButtons;