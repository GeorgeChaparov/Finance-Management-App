"use client"

import {motion, useAnimationControls} from "framer-motion";
import { CSSProperties } from "react";

type Switch = { checkboxId: string,  callback: Function, checked?: boolean, 
                    width?: string, height?: string, defaulSwitchColor?: string, activeSwitchColor?: string, defaultNobColor?: string, activeNobColor?: string, nobRadius?: string,
}  

export default function Switch({checkboxId, callback, checked = false, width = "52px", height = "30px", defaulSwitchColor = "rgb(255, 255, 255)", activeSwitchColor = "rgb(255, 255, 255)", defaultNobColor = "black", activeNobColor = "black", nobRadius = "24px"} : Switch) {  
  const control = useAnimationControls();

  const SwitchStyle: CSSProperties = {
    width: width,
    height: height,

    borderRadius: "100px",

    backgroundColor: defaulSwitchColor,

    position: "relative",
  }

  const NobStyle: CSSProperties = {
    width: nobRadius,
    height: nobRadius,
    borderRadius: "100px",

    backgroundColor: defaultNobColor,

    position: "absolute",
    top: (Number(height.split("p")[0]) / 2) - (Number(nobRadius.split("p")[0]) / 2),
  }
  
  function toggle(value: boolean) {
    console.log(value);
    
    control.start(value ? "animate" : "init");
  }

  return (
    <motion.div style={SwitchStyle}
    initial = {checked ? "animate" : "init"}
    animate = {control}
    variants={{
      init: {backgroundColor: defaulSwitchColor},
      animate: {backgroundColor: activeSwitchColor}
    }}>
      <motion.label htmlFor={checkboxId} style={NobStyle}
      initial = {checked ? "animate" : "init"}
      animate = {control}
      variants={{
        init: {left: 0, backgroundColor: defaultNobColor},
        animate: {left: `calc(100% - ${nobRadius})`, backgroundColor: activeNobColor}
      }}>
      </motion.label>
      <input hidden id={checkboxId} type="checkbox"
      onChange={(e) => { 
        let value = e.target.checked;
        value = checked ? !value : value; // we have to do that because if the switch is activated by default the result is inverted.
        toggle(value);
        callback(value);
      }}/>
    </motion.div>
  );
} 