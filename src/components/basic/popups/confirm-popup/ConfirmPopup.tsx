"use client"

import React, { createContext, useContext, useState, useRef, ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';
import style from "./ConfirmPopup.module.css"
import { AnimationControls, motion, useAnimationControls } from 'framer-motion';

interface ConfirmOptions {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

type ConfirmFn = (options: ConfirmOptions) => Promise<boolean>;
interface DialogProps extends ConfirmOptions {
  onClose: (result: boolean) => void;
}

const ConfirmContext = createContext<ConfirmFn | null>(null);
let animationControl: AnimationControls;
const animationDuration = 0.1;

export const useConfirm = (): ConfirmFn => {
  const ctx = useContext(ConfirmContext);
  if (!ctx) {
    throw new Error('useConfirm must be used within ConfirmProvider');
  }
  return ctx;
};

export const ConfirmProvider = ({ children } : { children: ReactNode }) => {
  const [options, setOptions] = useState<ConfirmOptions | null>(null);
  const resolveRef = useRef<(value: boolean) => void>(() => {});
  animationControl = useAnimationControls();


  useEffect(() => {
    if (options) setTimeout(() => {animationControl.start("open")}, 0);
  }, [options])

  const confirm: ConfirmFn = (opts) => {
    const merged = {
      confirmText: 'Confirm',
      cancelText: 'Cancel',
      ...opts,
    };
    
    setOptions(merged);

    return new Promise<boolean>((resolve) => {
      resolveRef.current = resolve;
    });
  };

  const handleClose = async (choice: boolean) => {

    await animationControl.start("close").then(() => {   
      setOptions(null);
      resolveRef.current?.(choice);
    });
  };

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}
      {options && <ConfirmDialog {...options} onClose={handleClose} />}
    </ConfirmContext.Provider>
  );
};

const ConfirmDialog = ({ title, message, confirmText, cancelText, onClose } : DialogProps) => {
  return createPortal(<>
    <div
    className={style.wrapper} 
    onClick={async () => await onClose(false)}>
    </div>

    <motion.div
    initial={"init"} 
    animate={animationControl} 
    transition={{duration: animationDuration}} 
    variants={{
        init: {opacity: 0},
        open: {opacity: [0, 1], scale: [1.1, 1], transition:{times:[0, 1]}},
        close: {translateY:-100, opacity: 0, scale: [1, 1.1], transition:{times:[0, 1]}}
    }} 
    className={style.background}>
        {title && <h2 className={style.title}>{title}</h2>}
          <p className={style.message}>{message}</p>
          <div className={style.buttonWrapper}>
            <button
              onClick={() => onClose(false)}
              className={style.cencelButton}
            >
              {cancelText}
            </button>
            <button
              onClick={() => onClose(true)}
              className={style.confirmButton}
            >
              {confirmText}
            </button>
          </div>
      </motion.div>
  </>,
    document.body
  );
};

// const confirm = useConfirm();
// const handleConfirmAction = async () => {
//   setTimeout(async () => {
//     const ok = await confirm({ message: '', title: '' });
//       if (ok) {
//         proceed
//       }
//     })
//   };
//};
