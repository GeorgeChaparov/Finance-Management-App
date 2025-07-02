"use client"

import React, { useEffect } from 'react'
import style from "./page.module.css"
import Button from '@/src/components/basic/button/Button';
import DummyAddTransactionButton from '@/src/components/dummy-add-transaction-button/DummyAddTransactionButton';
import { useAnimationControls } from 'framer-motion';
import { useRouter } from 'next/navigation';


export default function AddCancleButton() {
  const finalButtonsControls = useAnimationControls();
  const router = useRouter();
  
  useEffect(() => {
    finalButtonsControls.start("action");
  }, [finalButtonsControls])

  return (
    <section className={style.contentWrapperThree}>
      <DummyAddTransactionButton 
        actionCallback={() => {
          finalButtonsControls.start("init");
          setTimeout(() => {router.back()}, 200);
        }}
        controls={finalButtonsControls} 
        variants={{
          init: {rotate: "0deg",  translateX: "calc(50vw - 55px)", backgroundColor: "rgb(194, 194, 194)", transition:{duration: 0.2, ease:"easeInOut"}}, 
          action:{rotate: "-135deg",  translateX: 0, backgroundColor: "rgb(255, 255, 255)", transition:{duration: 0.3, ease:"easeInOut", delay: 0.2}}}}
        style={{position: "relative", bottom: "", left:""}}
      />
      <Button
        motionAttributes={{
          initial: "init", 
          animate:finalButtonsControls, 
          variants: {
            init:{translateX: "calc(-50vw + 55px)", transition:{duration: 0.2, ease:"easeInOut"}, fontSize: "16px", width: "50px"},
            action:{translateX: 0, transition:{duration: 0.3, ease:"easeInOut", delay: 0.2}, fontSize: "32px", width: "112px"}
          }
        }}
        attributes={{className: style.addButton}}>
        Add
      </Button>
    </section>
  )
}
