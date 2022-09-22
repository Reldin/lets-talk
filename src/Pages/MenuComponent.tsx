import { Link } from "react-router-dom";
import styles from "./MenuComponent.module.css";

interface MenuComponentProps {
  linkText: string;
}

const MenuComponent = (props: MenuComponentProps) => {
  return (
    <div className={styles.main}>
      <Link to="/categories" className={styles.link}>
        {props.linkText}
      </Link>
    </div>
  );
};

export default MenuComponent;
