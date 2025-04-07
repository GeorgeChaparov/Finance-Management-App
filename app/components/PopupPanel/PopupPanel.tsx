import { CSSProperties, ReactNode } from "react";

type PopupPanelProps = {width?: string, height?: string, left?: string, display?: string, borderRadius?: string, children?: ReactNode}

function PopupPanel({width="calc(100% - 20px)", height="300px", left="10px", display="flex", borderRadius ="20px", children}: PopupPanelProps) {

    const styles: CSSProperties ={
        width: width,
        height: height,
        
        position: "fixed",
        
        bottom: 72,
        left: left,
        
        backgroundColor: "white",
        
        display: display,

        flexWrap: "wrap",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",


        borderRadius: borderRadius,
    }

    return(
        <div style={styles}>
            {children}
        </div>
    );
}
export default PopupPanel;