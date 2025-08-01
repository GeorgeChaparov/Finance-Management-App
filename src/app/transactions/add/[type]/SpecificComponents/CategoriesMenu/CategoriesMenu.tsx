"use client"

import Button from '@/src/components/basic/button/Button';
import React, { useEffect, useState } from 'react'
import style from "./CategoriesMenu.module.css"
import { motion, useAnimationControls } from 'framer-motion';
import { categoryIconsPath, toggleElementScroll } from '@/src/consts';
import Image from 'next/image';

export default function CategoryMenu({categories}:{categories: Record<string, string>[]}) {
  const [showCategories, setShowCategories]: any = useState(false);
  const [currentCategoryId, setcurrentCategoryId]: any = useState(0);

  const animationControl = useAnimationControls();
  const animationDuration = 0.3;

  const toggleCategories = () => {
    setShowCategories((prev:any) => {return !prev})
  }

  const closeCategories = async (e?: any) => {
    toggleElementScroll(document.body);
    await animationControl.start("close").then(() => {
      if (e) {
        const categoryId = e.target.value;
        categories.forEach((category, index) => {
          if (category.id == categoryId) setcurrentCategoryId(index);
        })
      }

      toggleElementScroll(document.body);
      toggleCategories();
    });
  }

  useEffect(() => {
    if (showCategories) setTimeout(() => {animationControl.start("open")}, 100);
  }, [showCategories, animationControl])

  return (
    <>
      <Button attributes={{type: "button", className: style.categoryButton, onClick: toggleCategories}}>
        <Image className={style.categoryImage} src={ categoryIconsPath + categories[currentCategoryId].iconName } width={20} height={20} alt={categories[currentCategoryId].iconName}/>
        {categories[currentCategoryId].name}
      </Button>

      {categories.map((category, index) => {
        if (index == currentCategoryId) {
          return (<input key={index} type="radio" name='categoryId' id={`categoryId_${index}`} value={category.id} hidden required readOnly defaultChecked onChange={closeCategories}/>)
        } else {
          return (<input key={index} type="radio" name='categoryId' id={`categoryId_${index}`} value={category.id} hidden required readOnly onChange={closeCategories}/>)
        }
      })}

      {showCategories && <>
          <motion.div
          initial={"init"} 
          animate={animationControl} 
          transition={{duration: animationDuration}} 
          variants={{
              init: {opacity: 0},
              open: {opacity: 1},
              close: {opacity: 0}
          }}
          className={style.backgroundWrapper} 
          onClick={async () => await closeCategories()}>
          </motion.div>
          
          <motion.div
          initial={"init"} 
          animate={animationControl} 
          transition={{duration: animationDuration}} 
          variants={{
              init: {translateY: 800},
              open: {translateY: 0},
              close: {translateY: 800}
          }} 
          className={style.mainWrapper}>

          {categories.map((category, index) => {
            if (index == currentCategoryId) {
              return (
                <label key={index} htmlFor={`categoryId_${index}`} className={style.category}>
                  <Image className={style.categoryImage} src={ categoryIconsPath + category.iconName } width={20} height={20} alt={category.iconName}/>
                  {category.name}
                </label>)
            } else {
              return (
                <label key={index} htmlFor={`categoryId_${index}`} className={style.category}>
                  <Image className={style.categoryImage} src={ categoryIconsPath + category.iconName } width={20} height={20} alt={category.iconName}/>
                  {category.name}
                </label>
              )
            }
          })}
          </motion.div>
      </>}
    </>
  )
}
