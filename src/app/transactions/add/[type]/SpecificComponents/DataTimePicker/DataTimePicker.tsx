"use client"

import React, { useState } from 'react'
import style from "./page.module.css"
import { Months } from '@/src/consts';
import Input from '@/src/components/basic/input/Input';

export default function DataTimePicker({rawDate, rawTime, date, time} : {rawDate: string, rawTime: string, date: string, time: string}) {
    const [transactionDate, setTransactionDate] = useState(date);
    const [transactionTime, setTransactionTime] = useState(time);
    const [dateValue, setDateValue] = useState(rawDate);
    const [timeValue, setTimeValue] = useState(rawTime);

    const handleDateChange = (e:any) => {
    const target = e.target as HTMLInputElement;
    const value = target.value;

    if (!value) {
      return;
    }
    
    const [year, month, day] = value.split("-");
    setTransactionDate(`${Months[Number(month)]} ${day}, ${year}`);
    setDateValue(value);
  };

  const handleTimeChange = (e: any) => {
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

    return (
        <section className={style.dateTimePicker}>
            <div>
                <label htmlFor="datePicker" className={style.datePicker}>{transactionDate}</label>
                <Input 
                attributes={{name: "date", id: "datePicker", defaultValue: dateValue, type: "date", className: style.picker,
                    onClick: (e) => {
                        const target = e.target as HTMLInputElement;
                        target.showPicker();
                    },
                    onChange: (e)=>{handleDateChange(e)}
                }} />
            </div>
            <div className={style.timePickerContainer}>
                <label htmlFor="timePicker" className={style.timePicker}>{transactionTime}</label>
                <Input 
                attributes={{name: "time", id: "timePicker", defaultValue: timeValue, type: "time", className: style.picker,
                    onClick: (e) => {
                        const target = e.target as HTMLInputElement;
                        target.showPicker();
                    },
                    onChange: (e)=>{handleTimeChange(e)}
                }} />
            </div>
        </section>
    )
}
