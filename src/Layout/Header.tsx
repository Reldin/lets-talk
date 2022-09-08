import { Link } from "react-router-dom";
import styles from "./Header.module.css";

interface HeaderProps {
  link1: string;
  link2: string;
  link3: string;
  home: string;
  isAuth: boolean;
  logout: () => void;
}

const Header = (props: HeaderProps) => {
  return (
    <header className={styles.main}>
      <div className={styles.icon}>
        <Link to="/">{props.home}</Link>
      </div>
      <div className={styles.home}>
        <nav className={styles.linkcontainer}>
          <Link to={props.link1}>{props.link1}</Link>
          {props.isAuth && (
            <button className={styles.main_button} onClick={props.logout}>
              logout
            </button>
          )}
          {!props.isAuth && (
            <>
              <Link to={props.link2}>Sign Up</Link>
              <Link to={props.link3}>{props.link3}</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
