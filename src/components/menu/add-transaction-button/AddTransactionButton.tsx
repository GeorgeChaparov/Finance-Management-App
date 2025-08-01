"use client"

import { MouseEventHandler, useEffect, useState } from "react";
import style from "./AddTransactionButton.module.css"
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence, useAnimationControls } from "framer-motion";
import { toggleElementScroll } from "@/src/consts";
import Button from "../../basic/button/Button";

type AddTransactionButtonProps = {hide: boolean}

function AddTransactionButton({hide}: AddTransactionButtonProps) {
    const router = useRouter();
    const controls = useAnimationControls();
    const [showAddPanel, setShowAddPanel] = useState(false);

    useEffect(() => {
        controls.start(!showAddPanel ? "open" : "close");
    },[showAddPanel, controls])

    const showAndHideAddOptions = () => {
        toggleElementScroll(document.body);
        setShowAddPanel((prev) => {return !prev});
    }

    const close = async () => {
        toggleElementScroll(document.body);
        const ready = await controls.start("close");

        return ready
    }

    const loadScan = (e: any) => {
        //router.push('/')
    };

    const loadIncome = (e: any) => {
        e.stopPropagation()
        close().then(() => {
            router.push('/transactions/add/income');
        })
    };

    const loadExpense = (e: any) => {
        e.stopPropagation()
        close().then(() => {
            router.push('/transactions/add/expense');
        })
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
                initial="open" animate={controls}
                variants={{
                    open:{rotate: "0deg",  translateX: 0, transition:{duration: 0.3, ease: "easeInOut"}}, 
                    close:{rotate: "135deg", transition:{duration: 0.3, ease:"circInOut"}} }}
                onClick={showAndHideAddOptions} className={style.addButton}></motion.button>
                <AnimatePresence>
                {showAddPanel && (
                    <motion.div 
                    initial={{opacity: 0}} 
                    animate={{opacity: 1}} 
                    transition={{duration: 0.1}} 
                    exit={{opacity: 0}} 
                    className={style.background}
                    onClick={showAndHideAddOptions}>
                        <div className={style.addOptions}>
                            <motion.div 
                            initial={{translate: "102px 104px"}}
                            animate={{translate: "0px 0px"}}
                            exit={{translate: "102px 104px"}}
                            className={style.expenseOption}> 
                                <Button attributes={{onClick: loadExpense, className: style.expenseButton}}></Button>
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
                                    <Button attributes={{onClick: loadScan, className: style.scanButton}}></Button>
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
                                <Button attributes={{onClick: loadIncome, className: style.incomeButton}}></Button>
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