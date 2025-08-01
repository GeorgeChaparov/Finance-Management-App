"use client"

import Input from '@/src/components/basic/input/Input'
import React, { useEffect, useState } from 'react'
import style from './page.module.css'
import { useAnimationControls } from 'framer-motion'
import Label from '@/src/components/basic/label/Label'
import { useParams } from 'next/navigation'

const radioButtonsVariants = {
  active:{backgroundColor: "rgba(116, 74, 87, 1)", transition: {duration:0.2}},
  inactive:{backgroundColor: "rgba(116, 74, 87, 0)", transition: {duration:0.2}}
}

export const RadioButtons = () => {
  const expensControl = useAnimationControls();
  const incomeControl = useAnimationControls();
  const bankControl = useAnimationControls();
  const cashControl = useAnimationControls();
  const [selectedType, setSelectedType] = useState("income");
  const [selectedMethod, setSelectedMethod] = useState("bank");

  const params = useParams();
  const typeOfTransactions = params?.type || "income";

  useEffect(() => {
    if (typeOfTransactions === "expense") setSelectedType("expense");
  }, [typeOfTransactions]);

  useEffect(() => {
    bankControl.start(selectedMethod == "bank" ? "active" : "inactive");
    cashControl.start(selectedMethod == "bank" ? "inactive" : "active");
  }, [selectedMethod, bankControl, cashControl]);
  
  useEffect(() => {
    expensControl.start(selectedType == "expense" ? "active" : "inactive");
    incomeControl.start(selectedType == "expense" ? "inactive" : "active");
  }, [selectedType, expensControl, incomeControl]);


  return (
    <>
      <Input attributes={{ value: "expense", defaultChecked: selectedType == "expense", name: "transactionType", id: "expenseRadio", hidden: true, type: "radio", onClick: () => setSelectedType("expense")}}/>
      <Input attributes={{ value: "income", defaultChecked: selectedType == "income", name: "transactionType", id: "incomeRadio", hidden: true, type: "radio", onClick: () => setSelectedType("income")}}/>
      <Input attributes={{ value: "bank", defaultChecked: selectedMethod == "bank", name: "transactionMethot", id: "bankRadio", hidden: true, type: "radio", onClick: () => {setSelectedMethod("bank")}}}/>
      <Input attributes={{ value: "cash", defaultChecked: selectedMethod == "cash", name: "transactionMethot", id: "cashRadio", hidden: true, type: "radio", onClick: () => {setSelectedMethod("cash")}}}/>
      
      <section className={style.section}>
        <Label attributes={{className: style.radioButton, htmlFor: "expenseRadio"}} motionAttributes={{animate: expensControl, variants: radioButtonsVariants}}>Expense</Label>
        <Label attributes={{className: style.radioButton, htmlFor: "incomeRadio"}} motionAttributes={{animate: incomeControl, variants: radioButtonsVariants}}>Income</Label>
      </section>

      <section className={style.section}>
        <Label attributes={{className: style.radioButton, htmlFor: "bankRadio"}} motionAttributes={{animate: bankControl, variants: radioButtonsVariants}}>Bank</Label>
        <Label attributes={{className: style.radioButton, htmlFor: "cashRadio"}} motionAttributes={{animate: cashControl, variants: radioButtonsVariants}}>Cash</Label>
      </section>
    </>
  )
}