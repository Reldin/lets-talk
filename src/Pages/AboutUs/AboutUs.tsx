import styles from "./AboutUs.module.css";

const AboutUs = () => {
  return (
    <section className={styles.wrapper}>
      <h1>About Us</h1>
      <div className={styles.main}>
        <h2>Synopsis</h2>
        <hr />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <hr />
        <h2>Contact Us</h2>
        <p>
          Email:
          <br />
          Phonenumber:
        </p>
      </div>
    </section>
  );
};

export default AboutUs;
