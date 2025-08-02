
import React, { useEffect, useState } from 'react'
import style from "./AddTransaction.module.css"
import Input from '@/src/components/basic/input/Input'
import DummyAddTransactionButton from '@/src/components/dummy-add-transaction-button/DummyAddTransactionButton'
import { motion, useAnimationControls } from 'framer-motion'
import Image from 'next/image'
import { createCategoryAction } from '@/src/lib/actions/categoryAction'
import { categoryIconsPath } from "@/src/consts"
import { ServerResponse } from '@/types/ServerRespons'

export default function AddTransaction({closeCallback, addCallback}:{closeCallback: Function, addCallback: Function}) {
  const finalButtonsControls = useAnimationControls();
  const [files, setFiles] = useState<string[]>([]);

  const handleSubmit = async (formData: FormData) => {
    const response: ServerResponse = await createCategoryAction(formData);

    if (!response.successful) alert(response.message);
    else addCallback(response.data != null ? response.data: null);

    closeCallback();
  }

  useEffect(() => {
    finalButtonsControls.start("action");
  }, [finalButtonsControls]);

  useEffect(() => {
    const fetchData = async () => {
    try {
      await fetch("/file-list.json")
      .then(res => res.json())
      .then(setFiles)
      .catch(console.error);
    } catch (err) {
      console.error('Failed to fetch:', err);
    }
  };

  fetchData();
  }, []);

  return (
    <form className={style.addTransaction} action={handleSubmit}>
      <Input attributes={{name:"name", required: true, className: style.title, placeholder: "New Category", type: "text", maxLength: 45}}></Input>
      {files.map((file, index) => {        
        if (index === 0) {
          return (
            <div key={index} className={style.icon}>
              <input type="radio" name="iconName" id={file} hidden={true} value={file} defaultChecked/>
              <label htmlFor={file}>
                <Image src={categoryIconsPath + file} width={20} height={20}  alt=''></Image>
              </label>
            </div>
          )
        }

        return (
          <div key={index} className={style.icon}>
            <input type="radio" name="iconName" id={file} hidden={true} value={file} autoComplete="off"/>
            <label htmlFor={file}>
              <Image src={categoryIconsPath + file} width={20} height={20} alt=''></Image>
            </label>
          </div>
        )
      })}
      
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
        type="submit" className={style.addButton}>
          Add
        </motion.button>
      </div>
    </form>
  )
}
