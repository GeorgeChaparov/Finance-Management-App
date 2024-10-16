"use client"
import { useRouter } from 'next/navigation'
import PopupPanel from "@/app/components/PopupPanel/PopupPanel";
import style from "./DateSelectPanelAndButton.module.css"
import { useState } from 'react';
function DateSelectPanelAndButton({text}) {
    const [showPopupPanel, setShowPopupPanel] = useState(false);
    const router = useRouter();
    
    const handleToggle = () => {
      setShowPopupPanel(!showPopupPanel);
    };

    const buttonsStyle={
        width: "70px",
        height: "50px",
        margin: "10px 20px",
        backgroundColor: "White",
        borderRadius: "15px",
    }

    const monthOnClick = (event) =>{
        console.log(event.target.innerHTML);
      switch (event.target.innerHTML) {
        case "Jan":
            router.push('/transactions/Jan')
            break;
        case "Feb":
            router.push('/transactions/Feb')
            break;
        case "Mar":
            router.push('/transactions/Mar')
            break;
        case "Apr":
            router.push('/transactions/Apr')
            break;
        case "May":
            router.push('/transactions/May')
            break;
        case "Jun":
            router.push('/transactions/Jun')
            break;
        case "Jul":
            router.push('/transactions/Jul')
            break;
        case "Aug":
            router.push('/transactions/Aug')
            break;
        case "Sep":
            router.push('/transactions/Sep')
            break;
        case "Oct":
            router.push('/transactions/Oct')
            break;
        case "Nov":
            router.push('/transactions/Nov')
            break;
        case "Dec":
            router.push('/transactions/Dec')
            break;
      }  
    };
    
    const popupPanelElements = <>
        <div>
            <button onClick={monthOnClick} style={buttonsStyle}>Jan</button>    
            <button onClick={monthOnClick} style={buttonsStyle}>Feb</button> 
            <button onClick={monthOnClick} style={buttonsStyle}>Mar</button> 
            
        </div>
         
        <div>
            <button onClick={monthOnClick} style={buttonsStyle}>Apr</button>
            <button onClick={monthOnClick} style={buttonsStyle}>May</button>    
            <button onClick={monthOnClick} style={buttonsStyle}>Jun</button> 
             
        </div>

        <div>
            <button onClick={monthOnClick} style={buttonsStyle}>Jul</button> 
            <button onClick={monthOnClick} style={buttonsStyle}>Aug</button>
            <button onClick={monthOnClick} style={buttonsStyle}>Sep</button>     
        </div>
        
        <div>
            <button onClick={monthOnClick} style={buttonsStyle}>Oct</button> 
            <button onClick={monthOnClick} style={buttonsStyle}>Nov</button> 
            <button onClick={monthOnClick} style={buttonsStyle}>Dec</button>
        </div>
       
    </>

    let divDisplayOption = showPopupPanel ? "flex" : "none";

    const invisibleDivStyles ={

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
            <PopupPanel display={showPopupPanel ? "flex" : "none"} elements={popupPanelElements}/>
        </>  
    );
}

export default DateSelectPanelAndButton;