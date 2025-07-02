"use client"

import { useRouter } from 'next/navigation'
import style from "./DateSelectPanel.module.css"
import { useState } from 'react';
import { toggleElementScroll } from '@/src/consts';


export default function DateSelectPanel({text}:{text: string}) {
    const [showPopupPanel, setShowPopupPanel] = useState(false);
    const router = useRouter();
    
    const handleToggle = () => {
        toggleElementScroll(document.body);
        setShowPopupPanel((prev) => {return !prev});
    };

    const monthOnClick = (event: React.MouseEvent<HTMLElement>) =>{
        const target = event.target as HTMLElement;
        const month = target.innerHTML;
        router.push(`/transactions/${month}`); 
    };

    return(
        <>
            <button type="button" onClick={handleToggle} className={style.button}>{text}</button>
            {showPopupPanel && <div onClick={handleToggle} className={style.background}>
                <section className={style.panel}>
                    <button onClick={monthOnClick} className={style.monthButton}>Jan</button>    
                    <button onClick={monthOnClick} className={style.monthButton}>Feb</button> 
                    <button onClick={monthOnClick} className={style.monthButton}>Mar</button> 
                    <button onClick={monthOnClick} className={style.monthButton}>Apr</button>
                    <button onClick={monthOnClick} className={style.monthButton}>May</button>    
                    <button onClick={monthOnClick} className={style.monthButton}>Jun</button> 
                    <button onClick={monthOnClick} className={style.monthButton}>Jul</button> 
                    <button onClick={monthOnClick} className={style.monthButton}>Aug</button>
                    <button onClick={monthOnClick} className={style.monthButton}>Sep</button> 
                    <button onClick={monthOnClick} className={style.monthButton}>Oct</button> 
                    <button onClick={monthOnClick} className={style.monthButton}>Nov</button> 
                    <button onClick={monthOnClick} className={style.monthButton}>Dec</button>
                </section>
            </div>}
            
        </>  
    );
}