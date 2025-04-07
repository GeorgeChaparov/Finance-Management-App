"use client"
import { useRouter } from 'next/navigation'
import PopupPanel from '../../../../components/PopupPanel/PopupPanel';
import style from "./DateSelectPanelAndButton.module.css"
import { CSSProperties, useState } from 'react';


function DateSelectPanelAndButton({text}:{text: string}) {
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

    let divDisplayOption = showPopupPanel ? "flex" : "none";

    const invisibleDivStyles: CSSProperties ={

        zIndex: 2,
        position: "fixed",

        width: "100vw",
        height: "100vh",

        display: divDisplayOption,
    }

    return(
        <>
            <div onClick={handleToggle} style={invisibleDivStyles}></div>
            <button className={style.button} onClick={handleToggle}>{text}</button>
            <PopupPanel display={showPopupPanel ? "flex" : "none"}>
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
            </PopupPanel>
        </>  
    );
}

export default DateSelectPanelAndButton;