import styles from "./MenuComponent.module.css";

const MenuComponent = (props: any) => {
  return (
    <div className={styles.main}>
      <a className={styles.link}>Start Chat</a>
    </div>
  );
};

export default MenuComponent;
