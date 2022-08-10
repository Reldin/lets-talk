import styles from "./FrontPage.module.css";
import MenuComponent from "./MenuComponent";

const FrontPage = (props: any) => {
  return (
    <div className={styles.background}>
      <MenuComponent linkText="Start Chat" />
    </div>
  );
};

export default FrontPage;
