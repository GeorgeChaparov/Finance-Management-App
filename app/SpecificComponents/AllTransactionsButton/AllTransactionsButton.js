"use client"

import style from "./AllTransactionsButton.module.css"
import { useRouter } from "next/navigation";

function AllTransactionsButton() {
    const router = useRouter();

    const monthsEnum = {1: 'Jan', 2: 'Feb', 3: 'Mar', 4: 'Apr', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Aug', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dec'};
    const currentMonth = new Date().getMonth();

    const goToTransactions = (event) => {
        router.push(`/transactions/${monthsEnum[currentMonth]}`)
    }

    return(
        <button onClick={goToTransactions} className={style.allButton}>See all</button>
    );
}

export default AllTransactionsButton;