"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import style from "./page.module.css";
import { monthsEnum } from "@/utilities";
import Wrapper from "@/app/components/Wrapper/Wrapper";
import Menu from "@/app/components/Menu/Menu";
import { motion, useAnimationControls } from "framer-motion";
import DummyAddTransactionButton from "@/app/components/DummyAddTransactionButton/DummyAddTransactionButton";
import { useRouter } from "next/navigation";

const radioButtonsVariants = {
  active:{backgroundColor: "rgb(120, 120, 120)", transition: {duration:0.2}},
  inactive:{backgroundColor: "rgb(0, 0, 0)", transition: {duration:0.2}}
}

export default function AddTransaction() {
  const [transactionDate, setTransactionDate] = useState("Feb 14, 1999");
  const [transactionTime, setTransactionTime] = useState("00:00 am");
  const [selectedType, setSelectedType] = useState("income");
  const [selectedMethod, setSelectedMethod] = useState("bank");
  const [dateValue, setDateValue] = useState("");
  const [timeValue, setTimeValue] = useState("");

  const params = useParams();
  const typeOfTransactions = params?.type || "income";

  const router = useRouter();
  const finalButtonsControls = useAnimationControls();
  const expensControl = useAnimationControls();
  const incomeControl = useAnimationControls();
  const bankControl = useAnimationControls();
  const cashControl = useAnimationControls();

  useEffect(() => {
    const date = new Date();
    const today = `${monthsEnum[date.getMonth() + 1]} ${date.getDate()}, ${date.getFullYear()}`;
    
    let hours = date.getHours();
    const period = hours >= 12 ? "pm" : "am";
    hours = hours % 12 || 12; 
    const minutes = String(date.getMinutes()).padStart(2, "0");
    
    setTransactionDate(today);
    setTransactionTime(`${hours}:${minutes} ${period}`);

    finalButtonsControls.start("action");
  }, [finalButtonsControls]);

  const handleDateChange = (e) => {
    const value = e.target.value;

    if (!value) {
      return;
    }

    const [year, month, day] = value.split("-");
    setTransactionDate(`${monthsEnum[Number(month)]} ${day}, ${year}`);
    setDateValue(value);
  };

  const handleTimeChange = (e) => {
    const value = e.target.value;

    if (!value) {
      return;
    }

    const [hours, minutes] = value.split(":");
    const period = hours >= 12 ? "pm" : "am";
    const formattedHours = (hours % 12 || 12).toString().padStart(2, "0");
    
    setTransactionTime(`${formattedHours}:${minutes} ${period}`);
    setTimeValue(value);
  };

  useEffect(() => {
    if (typeOfTransactions === "expense") {
      setSelectedType("expense");
    }

  }, [typeOfTransactions]);

  useEffect(() => {
    expensControl.start(selectedType == "expense" ? "active" : "inactive");
    incomeControl.start(selectedType == "expense" ? "inactive" : "active");
  }, [selectedType, expensControl, incomeControl]);

  useEffect(() => {
    bankControl.start(selectedMethod == "bank" ? "active" : "inactive");
    cashControl.start(selectedMethod == "bank" ? "inactive" : "active");
  }, [selectedMethod, bankControl, cashControl]);

  return (
    <Wrapper padding="30" style={{display:"flex", width:"100vw", height:"100vh"}}  >
      <div className={style.contentWrapperOne}>
        <input type="text" placeholder="Name" className={style.name} />
        
        <div className={style.dateTimePicker}>
          <div>
            <label htmlFor="datePicker" className={style.datePicker}>{transactionDate}</label>
            <input
              id="datePicker"
              type="date"
              value={dateValue}
              onClick={(e) => {e.target.showPicker()}}
              onChange={handleDateChange}
              className={style.picker}
            />
          </div>

          <div className={style.timePickerContainer}>
            <label htmlFor="timePicker" className={style.timePicker}>{transactionTime}</label>
            <input
            id="timePicker"
              type="time"
              value={timeValue}
              onClick={(e) => {e.target.showPicker()}}
              onChange={handleTimeChange}
              className={style.picker}
            />
          </div>
        </div>

        <div>
          <motion.button type="button"
            animate={expensControl}
            variants={radioButtonsVariants}
            className={style.radioButton}
            onClick={() => setSelectedType("expense")}
          >
            Expense
          </motion.button>
          <motion.button type="button"
            animate={incomeControl}
            variants={radioButtonsVariants}
            className={style.radioButton}
            onClick={() => {setSelectedType("income"); }}
          >
            Income
          </motion.button>
        </div>

        <div>
          <motion.button type="button"
            animate={bankControl}
            variants={radioButtonsVariants}
            className={style.radioButton}
            onClick={() => setSelectedMethod("bank")}
          >
            Bank
          </motion.button>
          <motion.button type="button"
            animate={cashControl}
            variants={radioButtonsVariants}
            className={style.radioButton}
            onClick={() => setSelectedMethod("cash")}
          >
            Cash
          </motion.button>
        </div>

        <button type="button" className={style.category}>
          <div className={style.categoryImage}></div>
          Categories
        </button>
      </div>
      
      <div className={style.contentWrapperTwo}>
        <textarea className={style.note} placeholder="Note"></textarea>
        <input type="number" className={style.amount} placeholder="Amount" />
      </div>

      <div className={style.contentWrapperThree}>
        <motion.button
         initial={"init"}
         animate={finalButtonsControls}
         variants={{
          init:{translateX: -151, transition:{duration: 0.2, ease:"easeInOut"}, fontSize: "16px", width: "50px"},
          action:{translateX: 0, transition:{duration: 0.3, ease:"easeInOut", delay: 0.2}, fontSize: "32px", width: "112px"}
        }}
         type="button" className={style.addButton}>Add</motion.button>
      </div>
      <DummyAddTransactionButton 
        ActionCallback={() => {
          finalButtonsControls.start("init");
          setTimeout(() => {router.back()}, 200)
        }}
        controls={finalButtonsControls} 
        variants={{
          init: {rotate: "0deg",  translateX: 0, transition:{duration: 0.2, ease:"easeInOut"}}, 
          action:{rotate: "-135deg",  translateX: -150, transition:{duration: 0.3, ease:"easeInOut", delay: 0.2}}}}
      />
      <Menu hide={true}/>
    </Wrapper>
  );
}