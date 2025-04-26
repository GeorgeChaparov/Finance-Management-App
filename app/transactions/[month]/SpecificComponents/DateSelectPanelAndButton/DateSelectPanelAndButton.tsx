"use client"

import { useRouter } from 'next/navigation'
import style from "./DateSelectPanelAndButton.module.css"
import { useState } from 'react';


export default function DateSelectPanelAndButton({text}:{text: string}) {
    const [showPopupPanel, setShowPopupPanel] = useState(false);
    const router = useRouter();
    
    const handleToggle = () => {
      setShowPopupPanel(!showPopupPanel);
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
                    <div>
                        <button onClick={monthOnClick} className={style.monthButton}>Jan</button>    
                        <button onClick={monthOnClick} className={style.monthButton}>Feb</button> 
                        <button onClick={monthOnClick} className={style.monthButton}>Mar</button> 
                    </div>

                    <div>
                        <button onClick={monthOnClick} className={style.monthButton}>Apr</button>
                        <button onClick={monthOnClick} className={style.monthButton}>May</button>    
                        <button onClick={monthOnClick} className={style.monthButton}>Jun</button> 
                    </div>

                    <div>
                        <button onClick={monthOnClick} className={style.monthButton}>Jul</button> 
                        <button onClick={monthOnClick} className={style.monthButton}>Aug</button>
                        <button onClick={monthOnClick} className={style.monthButton}>Sep</button>     
                    </div>

                    <div>
                        <button onClick={monthOnClick} className={style.monthButton}>Oct</button> 
                        <button onClick={monthOnClick} className={style.monthButton}>Nov</button> 
                        <button onClick={monthOnClick} className={style.monthButton}>Dec</button>
                    </div>
                </section>
            </div>}
            
        </>  
    );
}