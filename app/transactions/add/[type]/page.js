"use client";

import { useRef, useEffect, useState } from "react";
import style from "./page.module.css";

const monthsEnum = {1: 'Jan', 2: 'Feb', 3: 'Mar', 4: 'Apr', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Aug', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dec'};
const date = new Date();
let today = `${monthsEnum[date.getMonth() + 1]} ${date.getDate()}, ${date.getFullYear()}`;

let hours = date.getHours();

const period = hours >= 12 ? "pm" : "am";

hours = hours < 13 ? hours : hours - 12;
hours = hours > 10 ? hours : `0${hours}`;

let minutes = date.getMinutes();
minutes = minutes > 10 ? minutes : `0${minutes}`;

let time = `${hours}:${minutes} ${period}`;
export default function AddTransaction({ params }) {
  const datePickerRef = useRef(null);
  const timePickerRef = useRef(null);
  const incomeButtonRef = useRef(null);
  const expenseButtonRef = useRef(null);
  const bankButtonRef = useRef(null);
  const cashButtonRef = useRef(null);
  const [transactionDate, setTransactionDate] = useState(today);
  const [transactionTime, setTransactionTime] = useState(time);
  
  const typeOfTransactions = params.type;

  const openDatePicker = () => {
    datePickerRef.current.showPicker();
  };

  const openTimePicker = () => {
    timePickerRef.current.showPicker();
  };

  const selectIncomeButton = () => {
    incomeButtonRef.current.classList.add(style.selectedButton);
    expenseButtonRef.current.classList.remove(style.selectedButton);   
  };
  
  const selectExpenseButton = () => {
    expenseButtonRef.current.classList.add(style.selectedButton);
    incomeButtonRef.current.classList.remove(style.selectedButton);
  };

  const selectBankButton = () => {
    bankButtonRef.current.classList.add(style.selectedButton);
    cashButtonRef.current.classList.remove(style.selectedButton);
  };

  const selectCashButton = () => {
    cashButtonRef.current.classList.add(style.selectedButton);
    bankButtonRef.current.classList.remove(style.selectedButton);
  };

  useEffect(() => {
    const datePicker = datePickerRef.current;
    const timePicker = timePickerRef.current;
    const handleDateChange = (event) => {
      const value = datePicker.value;
      const splitedDate = value.split("-");
      const year = splitedDate[0];
      let mount = splitedDate[1];
      const date = splitedDate[2];

      setTransactionDate(`${monthsEnum[Number(mount)]} ${date}, ${year}`);

      datePicker.blur();
    };

    const handleTimeChange = (event) => {
      const value = timePicker.value;
      const sliceIndex = value.indexOf(":");
      let hour = value.slice(0, sliceIndex);
      const minutes = value.slice(sliceIndex + 1);

      const period = hour >= 12 ? "pm" : "am";

      hour = hour < 13 ? hour : hour - 12;
      console.log(value);
      
      hour = hour < 10 && period === "pm" ? `0${hour}` : hour;
      
      setTransactionTime(`${hour}:${minutes} ${period}`);

      timePicker.blur();
    };

    if (datePicker) {
      datePicker.addEventListener("change", handleDateChange);
    }

    if (timePicker) {
      timePicker.addEventListener("change", handleTimeChange);
    }

    return () => {
      if (datePicker) {
        datePicker.removeEventListener("change", handleDateChange);
      }

      if (timePicker) {
        timePicker.addEventListener("change", handleTimeChange);
      }

    };
  }, []);


  useEffect(() => {
    switch (typeOfTransactions) {
      case "income":
        selectIncomeButton();
        break;
      case "expense":
        selectExpenseButton();
        break;
      default:
        break;
    }

    selectBankButton();
  }, [typeOfTransactions]);

  return (
    <div className={style.wrapper}>
      <div className={style.contentWrapperOne}>
        <input type="text" placeholder="Name" className={style.name}></input>
        <div className={style.dateTimePicker}>
          <div>
            <p className={style.datePicker}>
              {transactionDate}
            </p>
            <input onFocus={openDatePicker} ref={datePickerRef} id="datePicker" type="date" className={style.picker} />
          </div>

          <div className={style.timePickerContainer}>
            <p className={style.timePicker}>
              {transactionTime}
            </p>
            <input onFocus={openTimePicker} ref={timePickerRef} id="timePicker" type="time" className={style.picker} />
          </div>
        </div>

        <div>
          <button onClick={selectExpenseButton} ref={expenseButtonRef} className={style.radioButton}>Expense</button>
          <button onClick={selectIncomeButton} ref={incomeButtonRef} className={style.radioButton}>Income</button>
        </div>

        <div>
          <button onClick={selectBankButton} ref={bankButtonRef} className={style.radioButton}>Bank</button>
          <button onClick={selectCashButton} ref={cashButtonRef} className={style.radioButton}>Cash</button>
        </div>

        <button className={style.category}>
          <div className={style.categoryImage}></div>
          Categories
        </button>
      </div>
      <div className={style.contentWrapperTwo}>
        <textarea className={style.note} placeholder="Note"></textarea>

        <input type="text" className={style.amount} value="95 lv"></input>
      </div>
    </div>
  );
}
