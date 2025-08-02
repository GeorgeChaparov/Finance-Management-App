"use client"

import Image from "next/image";
import style from "./Transaction.module.css"
import Button from "../basic/button/Button";
import { Transaction as TransactionClass} from "@/src/types/Transaction";
import { redirect } from "next/navigation";
import { categoryIconsPath } from "@/src/consts";
import { useEffect, useRef } from "react";
import { animate } from "framer-motion";

type Transaction = {transaction: TransactionClass, isOnHomePage?: boolean, onClick?: Function}

function Transaction({transaction, isOnHomePage = false}: Transaction) {
    const amount = transaction.amount;
    const amountStyle = transaction.isExpense == 0 ? "amountPositive" : "amountNegative";
    const endAmount = `${isOnHomePage ? Math.abs(amount) : amount}lv`;

    const dateOrTime = isOnHomePage ? transaction.date : transaction.time;

    const nameRef = useRef<HTMLDivElement>(null);
    const categoryRef = useRef<HTMLDivElement>(null);
    const nameAnimationLoopActivated = useRef(false);
    const categoryAnimationLoopActivated = useRef(false);

    useEffect(() => {
        if (nameAnimationLoopActivated.current) {
            return
        }

        nameAnimationLoopActivated.current = true;

        const name = nameRef.current;
        
        if (!name) return;

        if (name.scrollWidth <= name.clientWidth) {
            return;
        }

        const originalText = name.textContent  || "";
        const gap = "\u00A0".repeat(10);

        const duplicated = originalText + gap + originalText;
            
        name.textContent = duplicated;
        requestAnimationFrame(() => {
            const originalContentWidth = name.scrollWidth / 2;
            
            let animation: ReturnType<typeof animate>;
            
            const loopScroll = () => {
                setTimeout(() => {
                    animation = animate(0, originalContentWidth + 25, {
                        duration: 10,
                        ease: "linear",
                        onUpdate(latest) {
                            name.scrollLeft = latest;
                        },
                        onComplete() {
                            name.scrollLeft = 0;
                            setTimeout(() => {loopScroll();}, 1000)
                        },
                    });
                }, 2000)
            };
        
            loopScroll();
        
            // Clean up on unmount
            return () => animation?.stop();
        })
        
    }, []);

    useEffect(() => {
        if (categoryAnimationLoopActivated.current) {
            return
        }

        categoryAnimationLoopActivated.current = true;

        const category = categoryRef.current;
        
        if (!category) return;

        if (category.scrollWidth <= category.clientWidth) {
            return;
        }

        const originalText = category.textContent  || "";
        const gap = "\u00A0".repeat(10);

        const duplicated = originalText + gap + originalText;
            
        category.textContent = duplicated;
        requestAnimationFrame(() => {
            const originalContentWidth = category.scrollWidth / 2;
            
            let animation: ReturnType<typeof animate>;
            
            const loopScroll = () => {
                setTimeout(() => {
                    animation = animate(0, originalContentWidth + 20, {
                        duration: 10,
                        ease: "linear",
                        onUpdate(latest) {
                            category.scrollLeft = latest;
                        },
                        onComplete() {
                            category.scrollLeft = 0;
                            setTimeout(() => {loopScroll();}, 1000)
                        },
                    });
                }, 2000)
            };
        
            loopScroll();
        
            // Clean up on unmount
            return () => animation?.stop();
        })
        
    }, []);

    return(
        <Button attributes={{onClick: async () => { redirect(`/transaction/${transaction.id}`)}, className: style.background}}>
            <Image className={style.logo} src={categoryIconsPath + transaction.iconName} alt={transaction.iconName} width="30" height="30"/>
            <div className={isOnHomePage ? style.homePageNameAndCategoryWrapper : style.nameAndCategoryWrapper}>
                <p ref={nameRef} className={ style.name}>{transaction.name}</p>
                <p ref={categoryRef} className={style.category}>{transaction.category}</p>
            </div>
            <div className={style.amountAndDateWrapper}>
                <p className={amountStyle}>{endAmount}</p>
                <p className={style.dateOrTime}>{dateOrTime}</p>
            </div>
        </Button>
    )
}

export default Transaction;