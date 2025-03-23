function Wrapper({ children, padding, margin, style, setWidth = true, setHeight = true}) {
    const getStyle = () => {
      let _style = {
        width: "100%",
        height: "100%",
        flexDirection: "column"
      };
  

      const calculateStyle = (propName, values, shouldSetWidth, shouldSetHeight) => {
        const parts = values.split(" ").map(Number);
        const isAllNumbers = parts.every((n) => !isNaN(n));
        if (!isAllNumbers) return;
  
        switch (parts.length) {
          case 1: {
            const [value] = parts;
            if (shouldSetWidth) _style.width = `calc(${_style.width} - ${value * 2}px)`;
            if (shouldSetHeight) _style.height = `calc(${_style.height} - ${value * 2}px)`;
            _style[propName] = `${value}px`;
            break;
          }
          case 2: {
            const [x, y] = parts;
            if (shouldSetWidth) _style.width = `calc(${_style.width} - ${x * 2}px)`;
            if (shouldSetHeight) _style.height = `calc(${_style.height} - ${y * 2}px)`;
            _style[propName] = `${x}px ${y}px`;
            break;
          }
          case 4: {
            const [top, right, bottom, left] = parts;
            if (shouldSetWidth) _style.width = `calc(${_style.width} - ${right + left}px)`;
            if (shouldSetHeight) _style.height = `calc(${_style.height} - ${top + bottom}px)`;
            _style[propName] = `${top}px ${right}px ${bottom}px ${left}px`;
            break;
          }
          default:
            break;
        }
      };
  
      _style = {..._style, ...style};

      if (padding) calculateStyle("padding", padding, setWidth, setHeight);
      if (margin) calculateStyle("margin", margin, setWidth, setHeight);
  
      return _style;
    };
  
    return <div style={getStyle()}>{children}</div>;
  }
  
  export default Wrapper;