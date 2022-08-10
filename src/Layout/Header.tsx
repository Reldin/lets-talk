import { Link } from "react-router-dom";
import styles from "./Header.module.css";

interface HeaderProps {
  link1: string;
  link2: string;
  link3: string;
}

const Header = (props: HeaderProps) => {
  return (
    <header className={styles.main}>
      <nav className={styles.linkcontainer}>
        <Link to={props.link1}>{props.link1}</Link>
        <Link to={props.link2}>{props.link2}</Link>
        <Link to={props.link3}>{props.link3}</Link>
      </nav>
    </header>
  );
};

export default Header;
