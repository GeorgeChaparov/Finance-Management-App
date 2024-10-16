function PopupPanel({width="calc(100% - 20px)", height="300px", left="10px", display="flex", borderRadius ="20px", elements}) {

    const styles ={
        width: width,
        height: height,
        
        position: "fixed",
        
        bottom: 72,
        left: left,
        
        backgroundColor: "white",
        
        display: display,

        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        flexDirection: "center",
        justifyContent: "center",


        borderRadius: borderRadius,
    }

    return(
        <div style={styles}>
            {elements}
        </div>
    );
}
export default PopupPanel;