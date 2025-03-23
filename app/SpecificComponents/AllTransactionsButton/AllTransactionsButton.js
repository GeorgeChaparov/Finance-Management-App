"use client"

import style from "./AllTransactionsButton.module.css"
import { useRouter } from "next/navigation";
import { monthsEnum } from "../../../utilities";

function AllTransactionsButton() {
    const router = useRouter();

    const currentMonth = new Date().getMonth();

    const goToTransactions = (event) => {
        router.push(`/transactions/${monthsEnum[currentMonth]}`)
    }

    return(
        <button onClick={goToTransactions} className={style.allButton}>See all</button>
    );
}

export default AllTransactionsButton;