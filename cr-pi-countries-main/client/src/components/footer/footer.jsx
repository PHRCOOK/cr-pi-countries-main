import styles from "../css-modules/footer.module.css";
import { memo } from "react";

const Footer = () => {
  return (
    <footer>
      <div className={styles.container}>CREATED BY RUBIÑO PABLO</div>
    </footer>
  );
};

export default memo(Footer);
