import React, { useEffect } from 'react'
import style from "./AddTransaction.module.css"
import Input from '@/src/components/basic/input/Input'
import DummyAddTransactionButton from '@/src/components/dummy-add-transaction-button/DummyAddTransactionButton'
import { motion, useAnimationControls } from 'framer-motion'

export default function AddTransaction({closeCallback}:{closeCallback: Function}) {
  const finalButtonsControls = useAnimationControls();
  
  useEffect(() => {
    finalButtonsControls.start("action");
  }, [finalButtonsControls]);

  return (
    <form className={style.addTransaction}>
        <Input className={style.title} type={"text"} placeholder={"New Category"}></Input>
    
        <div className={style.buttonsContainer}>
          <DummyAddTransactionButton 
            actionCallback={() => {
              finalButtonsControls.start("init");
              setTimeout(() => {closeCallback()}, 200);
            }}
            controls={finalButtonsControls} 
            variants={{
              init: {rotate: "0deg",  translateX: "calc(50vw - 62px)", backgroundColor: "rgb(194, 194, 194)", transition:{duration: 0.2, ease:"easeInOut"}}, 
              action:{rotate: "-135deg",  translateX: 0, backgroundColor: "rgb(255, 255, 255)", transition:{duration: 0.3, ease:"easeInOut", delay: 0.2}}}}
            style={{position: "relative", bottom: "", left:""}}
          />

          <motion.button
          initial={"init"}
          animate={finalButtonsControls}
          variants={{
            init:{translateX: "calc(-50vw + 62px)", transition:{duration: 0.2, ease:"easeInOut"}, fontSize: "16px", width: "50px"},
            action:{translateX: 0, transition:{duration: 0.3, ease:"easeInOut", delay: 0.2}, fontSize: "32px", width: "112px"}
          }}
          type="button" className={style.addButton}>
            Add
          </motion.button>
        </div>

        
    </form>
  )
}
