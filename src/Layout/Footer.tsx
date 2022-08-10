import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

const Footer = (props: any) => {
  return (
    <footer className={styles.main}>
      <ul className={styles.linklist}>
        <li>
          <Link to="/about">About us</Link>
        </li>
        <li>
          <Link to="/about">Contact us</Link>
        </li>
        <li>
          <Link to="/about">Privacy</Link>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
