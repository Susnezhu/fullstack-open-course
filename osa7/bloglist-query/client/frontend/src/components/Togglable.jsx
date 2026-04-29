import { useState, useImperativeHandle } from "react";
import styles from "../styles/default"

const Togglable = ({ buttonLabel, formsRef, children }) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(formsRef, () => {
    return { toggleVisibility };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility} style={styles.lightBtn}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <button onClick={toggleVisibility} style={styles.lightBtn}>cancel</button>
      </div>
    </div>
  );
};

export default Togglable;
