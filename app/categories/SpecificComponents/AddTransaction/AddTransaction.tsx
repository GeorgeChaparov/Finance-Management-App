import React from 'react'
import style from "./AddTransaction.module.css"
import Input from '@/app/components/Basic/Input/Input'
import Button from '@/app/components/Basic/Button/Button'

export default function AddTransaction() {
  return (
    <form className={style.addTransaction}>
        <Input className={style.Title} type={"text"} placeholder={"New Category"}></Input>
    
        <div className={"buttonsContainer"}>
            <Button type={"button"}></Button>
            <Button type={"button"}></Button>
        </div>
    </form>
  )
}
