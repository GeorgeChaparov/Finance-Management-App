"use client"
import { useState } from "react";
import style from "./AddTransactionButton.module.css"
import { useRouter } from 'next/navigation'

function AddTransactionButton() {
    const router = useRouter();
    const [showAddPanel, setShowAddPanel] = useState(false);

    const showAddOptions = (event) =>{
        document.body.classList.add("disableScroll");
        setShowAddPanel(true);
    }

    const hideAddOptions = (event) =>{
        document.body.classList.remove("disableScroll");
        setShowAddPanel(false);
    }
    let optionsBackgroundDisplay = showAddPanel ? "block" : "none";
    const OptionsBackgroundStyle = {
        width: "100vw",
        height: "100vh",

        backgroundColor: "rgba(0, 0, 0, 0.92)",

        zIndex: 2,
        position: "fixed",

        top: 0,
        left: 0,

        display: optionsBackgroundDisplay,
    }

    const loadScan = (event) =>{
        //router.push('/')
    };

    const loadIncome = (event) =>{
        router.push('/transactions/add/income')
    };

    const loadExpense = (event) =>{
        router.push('/transactions/add/expense')
    };

    return(
        <>
            <button onClick={showAddOptions} className={style.addButton}></button>

            <div style={OptionsBackgroundStyle}>
                <div className={style.addOptions}>
                    <div className={style.expenseOption}> 
                        <button onClick={loadExpense} className={style.expenseButton}></button>
                        <p>Expense</p>
                    </div>
                    <div className={style.scanAndCloseOptions}>
                        <div className={style.scanOptions}> 
                            <button onClick={loadScan} className={style.scanButton}></button>
                            <p>Scan</p>
                        </div>
                        <button onClick={hideAddOptions} className={style.closeButton}></button>
                    </div> 
                    <div className={style.incomeOptions}> 
                        <button onClick={loadIncome} className={style.incomeButton}></button>
                        <p>Income</p>
                    </div>
                      
                </div>
            </div>         
        </>
    );
}

export default AddTransactionButton;