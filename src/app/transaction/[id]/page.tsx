import React from 'react'
import style from "./page.module.css"
import Product from '@/src/components/product/Product';
import Menu from '@/src/components/menu/Menu';

export default  function ProductsList({params}: {params:any}) {
  
  return (
    <div className={style.page}>
      <div className={style.infoWrapper}>
        <div className={style.titleAndTypeWrapper}>
          <span className={style.title}>Lidl</span>

          <span className={style.type}>Groceries</span>
        </div>

        <div className={style.dateWrapper}>
          <span className={style.date}>Jan 14, 2024</span>

          <span className={style.dayOfWeek}>Monday</span>
        </div>
      </div>

      <div className={style.totalAmount + " amountNegative"}>100lv</div>

      <section className={style.products}>
      <Product product={{title:"My very long product with units and everything!!!", price:"20.69", quantity:"1.924 x 9.99", discount:"0.69"}}></Product>
        <Product product={{title:"Meat", price:"20.69", quantity:"1.924 x 9.99", discount:"0.69"}}></Product>
        <Product product={{title:"Banana", priceQuantity:"250", unit:"g", price:"9.98", quantity:"2.000 x 4.99", discount:"0"}}></Product>
        <Product product={{title:"Bread", price:"5", discount:"0"}}></Product>
        <Product product={{title:"My very long product with units and everything!!!", price:"20.69", quantity:"1.924 x 9.99", discount:"0.69"}}></Product>
        <Product product={{title:"Meat", price:"20.69", quantity:"1.924 x 9.99", discount:"0.69"}}></Product>
        <Product product={{title:"Banana", priceQuantity:"250", unit:"g", price:"9.98", quantity:"2.000 x 4.99", discount:"0"}}></Product>
        <Product product={{title:"Bread", price:"5", discount:"0"}}></Product>
        <Product product={{title:"My very long product with units and everything!!!", price:"20.69", quantity:"1.924 x 9.99", discount:"0.69"}}></Product>
        <Product product={{title:"Meat", price:"20.69", quantity:"1.924 x 9.99", discount:"0.69"}}></Product>
        <Product product={{title:"Banana", priceQuantity:"250", unit:"g", price:"9.98", quantity:"2.000 x 4.99", discount:"0"}}></Product>
        <Product product={{title:"Bread", price:"5", discount:"0"}}></Product>
        <Product product={{title:"My very long product with units and everything!!!", price:"20.69", quantity:"1.924 x 9.99", discount:"0.69"}}></Product>
        <Product product={{title:"Meat", price:"20.69", quantity:"1.924 x 9.99", discount:"0.69"}}></Product>
        <Product product={{title:"Banana", priceQuantity:"250", unit:"g", price:"9.98", quantity:"2.000 x 4.99", discount:"0"}}></Product>
        <Product product={{title:"Bread", price:"5", discount:"0"}}></Product>
        <Product product={{title:"My very long product with units and everything!!!", price:"20.69", quantity:"1.924 x 9.99", discount:"0.69"}}></Product>
        <Product product={{title:"Meat", price:"20.69", quantity:"1.924 x 9.99", discount:"0.69"}}></Product>
        <Product product={{title:"Banana", priceQuantity:"250", unit:"g", price:"9.98", quantity:"2.000 x 4.99", discount:"0"}}></Product>
        <Product product={{title:"Bread", price:"5", discount:"0"}}></Product>
        <Product product={{title:"My very long product with units and everything!!!", price:"20.69", quantity:"1.924 x 9.99", discount:"0.69"}}></Product>
        <Product product={{title:"Meat", price:"20.69", quantity:"1.924 x 9.99", discount:"0.69"}}></Product>
        <Product product={{title:"Banana", priceQuantity:"250", unit:"g", price:"9.98", quantity:"2.000 x 4.99", discount:"0"}}></Product>
        <Product product={{title:"Bread", price:"5", discount:"0"}}></Product>
      </section>

      <Menu></Menu>
    </div>
   
  )
}
