"use client";

import style from "./page.module.css";
import { ChangeEvent, useEffect, useState } from "react";
import { useParams, useRouter} from "next/navigation";
import { motion, useAnimationControls } from "framer-motion";
import { Months, toggleElementScroll } from "@/src/consts";
import BackgroundCircles from "@/src/components/background-circles/BackgroundCircles";
import Calculator from "@/src/components/calculator/Calculator";
import DummyAddTransactionButton from "@/src/components/dummy-add-transaction-button/DummyAddTransactionButton";
import Menu from "@/src/components/menu/Menu";

const radioButtonsVariants = {
  active:{backgroundColor: "rgba(116, 74, 87, 1)", transition: {duration:0.2}},
  inactive:{backgroundColor: "rgba(116, 74, 87, 0)", transition: {duration:0.2}}
}

export default function AddTransaction() {
  const [transactionDate, setTransactionDate] = useState("Feb 14, 1999");
  const [transactionTime, setTransactionTime] = useState("00:00 am");
  const [selectedType, setSelectedType] = useState("income");
  const [selectedMethod, setSelectedMethod] = useState("bank");
  const [dateValue, setDateValue] = useState("");
  const [timeValue, setTimeValue] = useState("");
  const [openCalculator, setOpenCalculator] = useState(false);
  const [calculatorResult, setCalculatorResult] = useState(0);

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
    const today = `${Months[date.getMonth() + 1]} ${date.getDate()}, ${date.getFullYear()}`;
    
    let hours = date.getHours();
    const period = hours >= 12 ? "pm" : "am";
    hours = hours % 12 || 12; 
    const minutes = String(date.getMinutes()).padStart(2, "0");
    
    setTransactionDate(today);
    setTransactionTime(`${hours}:${minutes} ${period}`);

    finalButtonsControls.start("action");
  }, [finalButtonsControls]);

  const handleDateChange = (e:ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const value = target.value;

    if (!value) {
      return;
    }

    const [year, month, day] = value.split("-");
    setTransactionDate(`${Months[Number(month)]} ${day}, ${year}`);
    setDateValue(value);
  };

  const handleTimeChange = (e:ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const value = target.value;
    
    if (!value) {
      return;
    }

    const [hours, minutes] = value.split(":");
    const hoursInNumbers = Number(hours);
    const period = hoursInNumbers >= 12 ? "pm" : "am";
    const formattedHours = (hoursInNumbers % 12 || 12).toString().padStart(2, "0");
    
    setTransactionTime(`${formattedHours}:${minutes} ${period}`);
    setTimeValue(value);
  };

  const handleCalculatorResult = (result:number) => {
    setCalculatorResult(result);
  };

  const handleCloseCalculator = () => {
    setOpenCalculator(false);
    toggleElementScroll(document.body);
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
    <>
      <BackgroundCircles  
      circles={[
        {
          variants:{init: {top: "200px", left: "-320px"}, animate: {left:"calc(50% - 300px)"}}, 
          radius: 320
        },
        {
          variants:{init: {top: "70px", right: "-260px"}, animate: {left:"50%"}, },
          radius: 260
        },
        {
          variants:{init: {top: "0px", right: "-150px"}, animate: {left:"calc(50% - 150px)"}, },
          radius: 150
        },
        {
          variants:{init: {bottom: "70px", right: "-220px"}, animate: {left:"calc(50% - 160px)"}}, 
          radius: 220
        },
        {
          variants:{init: {bottom: "100px", right: "-220px"}, animate: {left:"50%"}}, 
          radius: 220
        },
      ]} 
      transitionDelay={0.1}
      height="100vh">
      </BackgroundCircles> 

      <form className={style.page}>
        {openCalculator && (<Calculator resultCallback={handleCalculatorResult} closeCallback={handleCloseCalculator} />)}

        <section className={style.contentWrapperOne}>
          <input type="text" placeholder="Name" className={style.name} />

          <section className={style.dateTimePicker}>
            <div>
              <label htmlFor="datePicker" className={style.datePicker}>{transactionDate}</label>
              <input
                id="datePicker"
                type="date"
                value={dateValue}
                onChange={handleDateChange} className={style.picker}
                onClick={(e) => {
                  const target = e.target as HTMLInputElement;
                  target.showPicker();
                }} 
              />
            </div>

            <div className={style.timePickerContainer}>
              <label htmlFor="timePicker" className={style.timePicker}>{transactionTime}</label>
              <input
                id="timePicker"
                type="time"
                value={timeValue}
                onChange={handleTimeChange} className={style.picker}
                onClick={(e) => {
                  const target = e.target as HTMLInputElement;
                  target.showPicker();
                }}  
              />
            </div>
          </section>

          <section>
            <motion.button type="button"
              animate={expensControl} variants={radioButtonsVariants}
              className={style.radioButton} onClick={() => setSelectedType("expense")}
            >
              Expense
            </motion.button>
            <motion.button type="button"
              animate={incomeControl} variants={radioButtonsVariants}
              className={style.radioButton} onClick={() => {setSelectedType("income"); }}
            >
              Income
            </motion.button>
          </section>

          <section>
            <motion.button type="button"
              animate={bankControl} variants={radioButtonsVariants}
              className={style.radioButton} onClick={() => setSelectedMethod("bank")}
            >
              Bank
            </motion.button>
            <motion.button type="button"
              animate={cashControl} variants={radioButtonsVariants}
              className={style.radioButton} onClick={() => setSelectedMethod("cash")}
            >
              Cash
            </motion.button>
          </section>

          <button type="button" className={style.category}>
            <div className={style.categoryImage}></div>
            Categories
          </button>
        </section>
              
        <section className={style.contentWrapperTwo}>
          <textarea className={style.note} placeholder="Note"></textarea>
          <input onFocus={() => {setOpenCalculator(true)}} type="number" className={style.amount} placeholder="Amount" value={calculatorResult} readOnly />
        </section>

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

          <motion.button
            initial={"init"}
            animate={finalButtonsControls}
            variants={{
              init:{translateX: "calc(-50vw + 55px)", transition:{duration: 0.2, ease:"easeInOut"}, fontSize: "16px", width: "50px"},
              action:{translateX: 0, transition:{duration: 0.3, ease:"easeInOut", delay: 0.2}, fontSize: "32px", width: "112px"}
            }}
            type="button" className={style.addButton}>
            Add
          </motion.button>
        </section>
          
        <Menu hide={true}/>
      </form>
    </>
  );
}