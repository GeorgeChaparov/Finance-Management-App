"use client"

import { useEffect, useState } from "react";
import style from "./AddTransactionButton.module.css"
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence, useAnimationControls } from "framer-motion";

function AddTransactionButton({hide}) {
    const router = useRouter();
    const controls = useAnimationControls();
    const [showAddPanel, setShowAddPanel] = useState(false);

    useEffect(() => {
        controls.start(!showAddPanel ? "init" : "rotate");
    },[showAddPanel, controls])

    const showAndHideAddOptions = (event) =>{
        document.body.classList.toggle("disableScroll");
        setShowAddPanel(!showAddPanel);
    }

    const loadScan = (event) =>{
        //router.push('/')
    };

    const loadIncome = (event) =>{
        document.body.classList.toggle("disableScroll");
        setShowAddPanel(!showAddPanel);
        setTimeout(() => {router.push('/transactions/add/income')}, 200)
    };

    const loadExpense = (event) =>{
        document.body.classList.toggle("disableScroll");
        setShowAddPanel(!showAddPanel);
        setTimeout(() => {router.push('/transactions/add/expense')}, 200)
    };

    const optionsTextVariants = {
        init:{opacity: 0},
        animate:{opacity:1},
        exit:{opacity: 0, transition:{delay: 0}},
        transition:{delay: 0.2}
    }

    return(
        <>
            {!hide && (<>
                <motion.button 
                initial="init" animate={controls}
                variants={{
                    init:{rotate: "0deg",  translateX: 0, transition:{duration: 0.3, ease: "easeInOut"}}, 
                    rotate:{rotate: "135deg", transition:{duration: 0.3, ease:"circInOut"}} }}
                onClick={showAndHideAddOptions} className={style.addButton}></motion.button>
                <AnimatePresence>
                {showAddPanel && (
                    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.1}} exit={{opacity: 0}} className={style.background}>
                        <div className={style.addOptions}>
                            <motion.div 
                            initial={{translate: "102px 104px"}}
                            animate={{translate: "0px 0px"}}
                            exit={{translate: "102px 104px"}}
                            className={style.expenseOption}> 
                                <button onClick={loadExpense} className={style.expenseButton}></button>
                                <motion.p 
                                initial={optionsTextVariants.init} 
                                animate={optionsTextVariants.animate}
                                exit={optionsTextVariants.exit}
                                transition={optionsTextVariants.transition}>
                                    Expense
                                </motion.p>
                            </motion.div>
                            <motion.div 
                            initial={{translateY: "155px"}}
                            animate={{translateY: "0px"}}
                            exit={{translateY: "155px"}}
                            className={style.scanAndCloseOptions}>
                                <div className={style.scanOptions}> 
                                    <button onClick={loadScan} className={style.scanButton}></button>
                                    <motion.p
                                    initial={optionsTextVariants.init} 
                                    animate={optionsTextVariants.animate}
                                    exit={optionsTextVariants.exit}
                                    transition={optionsTextVariants.transition}>
                                        Scan
                                    </motion.p>
                                </div> 
                            </motion.div> 
                            <motion.div 
                            initial={{translate: "-102px 104px"}}
                            animate={{translate: "0px 0px"}}
                            exit={{translate: "-102px 104px"}}
                            className={style.incomeOptions}> 
                                <button onClick={loadIncome} className={style.incomeButton}></button>
                                <motion.p
                                initial={optionsTextVariants.init} 
                                animate={optionsTextVariants.animate}
                                exit={optionsTextVariants.exit}
                                transition={optionsTextVariants.transition}>Income
                                </motion.p>
                            </motion.div>

                        </div>
                    </motion.div>     
                )}
                </AnimatePresence>
            </>)}
            
        </>
    );
}

export default AddTransactionButton;