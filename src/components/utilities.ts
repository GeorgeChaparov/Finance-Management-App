import { Months, daysOfWeek } from "../consts";

export function convertDateForDisplay(date: string | Date | { month: number, dayOfMonth: number, year: number }) {
    let month: number;
    let dayOfMonth: number;
    let year: number;

    if (typeof date === "string") {
        const splitDate = date.split("-");

        year = Number(splitDate[0]);
        month = Number(splitDate[1]);
        dayOfMonth = Number(splitDate[2]);

    } else if (date instanceof Date) {
        month = date.getMonth() + 1;
        dayOfMonth = date.getDate();
        year = date.getFullYear();
        
    } else {
        month = date.month;
        dayOfMonth = date.dayOfMonth;
        year = date.year;
    }

    return `${Months[month]} ${dayOfMonth}, ${year}`;
}

export function convertTimeForDisplay(date: string | Date) {
    let hours: number;
    let minutes: string;

    if (date instanceof Date) {
        hours = date.getHours();
        minutes = String(date.getMinutes()).padStart(2, "0");
        
    } 
    else {
        const splitDate = date.toString().split(":");

        hours = Number(splitDate[0]);
        minutes = splitDate[1];
    }
    
    const period = hours >= 12 ? "pm" : "am";
    hours = hours % 12 || 12; 
    
    return `${hours.toString().padStart(2, "0")}:${minutes} ${period}`;
}

export function getWeekdayName(date: string | Date): string {
    if (typeof date === "string"){
        date = new Date(date);
    }

  return daysOfWeek[date.getDay()];
}