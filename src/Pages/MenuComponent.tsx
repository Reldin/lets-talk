import styles from "./MenuComponent.module.css";

interface MenuComponentProps {
  linkText: string;
}

const MenuComponent = (props: MenuComponentProps) => {
  return (
    <div className={styles.main}>
      <a href="/" className={styles.link}>
        {props.linkText}
      </a>
    </div>
  );
};

export default MenuComponent;
