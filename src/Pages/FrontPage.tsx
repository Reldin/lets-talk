import FrontImage from "./FrontImage";
import styles from "./FrontPage.module.css";
import MenuComponent from "./MenuComponent";

const FrontPage = (props: any) => {
  return (
    <div className={styles.background}>
      <FrontImage />
      <MenuComponent linkText="Click here for categories" />
    </div>
  );
};

export default FrontPage;
