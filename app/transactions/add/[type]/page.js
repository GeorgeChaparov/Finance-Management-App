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

  const [transactionDate, setTransactionDate] = useState(today);
  const [transactionTime, setTransactionTime] = useState(time);
  
  const openDatePicker = () => {
    datePickerRef.current.showPicker();
  };

  const openTimePicker = () => {
    timePickerRef.current.showPicker();
  };

  // Effect to add event listener for the date picker change
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
  }, []); // Empty dependency array to run only once on mount

  return (
    <div className={style.wrapper}>
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
        <button className={style.radioButton}>Expense</button>
        <button className={style.radioButton}>Income</button>
      </div>

      <div>
        <button className={style.radioButton}>Bank</button>
        <button className={style.radioButton}>Cash</button>
      </div>

      <button className={style.category}>
        <div className={style.categoryImage}></div>
        Categories
      </button>
      
      <textarea className={style.note} placeholder="Note"></textarea>

      <input type="text" className={style.amount} value="95 lv"></input>
    </div>
  );
}
