import React from 'react'
import style from "./Product.module.css"

export default function Product({product} : {product:{title:string, priceQuantity?:string, quantity?:string, unit?:string, discount?:string, price:string}}) {
  return (
    <div className={style.product}>
        <div className={style.titleAndUnitsWrapper}>
            <div className={style.titleAndQuantityWrapper}>
                <span className={style.title}>{product.title}</span>
                {product.priceQuantity == undefined ? "" : <span className={style.priceQuantity}>{product.priceQuantity} {product.unit}</span>}
            </div>
            
            {product.quantity == undefined ? "" : <span className={style.quantity}>{product.quantity} </span>}
        </div>

        <div className={style.priceWrapper}>
            {product.discount == "0" ? "" : <span className={style.discount + " amountNegative"}>{product.price} - {product.discount}</span>}
            <span className={style.price + " amountNegative"}>{Number(product.price) - Number(product.discount)}lv</span>
        </div>
    </div>
  )
}
