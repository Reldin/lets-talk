import React, { FormEvent, useState } from "react";
import styles from "./Signup.module.css";

const Signup = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const submitForm = (event: FormEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (password !== passwordConfirmation) {
      return;
    }
    if (username.length < 5 || password.length < 5) return;

    setUsername("");
    setPassword("");
    setPasswordConfirmation("");
    setEmail("");
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.main}>
        <p>Signup</p>
        <form className={styles.signupform} onSubmit={submitForm}>
          <div className={styles.formcontrol}>
            <label>username</label>
            <input
              type="text"
              onChange={(e: React.FocusEvent<HTMLInputElement>) =>
                setUsername(e.currentTarget.value)
              }
              value={username || ""}
              className={styles.formcontrol_input}
              autoComplete="username"
            />
          </div>
          <div className={styles.formcontrol}>
            <label>password</label>
            <input
              type="password"
              onChange={(e: React.FocusEvent<HTMLInputElement>) =>
                setPassword(e.currentTarget.value)
              }
              value={password || ""}
              className={styles.formcontrol_input}
              autoComplete="new-password"
            />
          </div>
          <div className={styles.formcontrol}>
            <label>password again</label>
            <input
              type="password"
              onChange={(e: React.FocusEvent<HTMLInputElement>) =>
                setPasswordConfirmation(e.currentTarget.value)
              }
              value={passwordConfirmation || ""}
              className={styles.formcontrol_input}
              autoComplete="new-password"
            />
          </div>
          <div className={styles.formcontrol}>
            <label>Email</label>
            <input
              type="email"
              onChange={(e: React.FocusEvent<HTMLInputElement>) =>
                setEmail(e.currentTarget.value)
              }
              value={email || ""}
              className={styles.formcontrol_input}
            />
          </div>
          <button className={styles.submitbtn}>Signup</button>
        </form>
      </div>
    </section>
  );
};

export default Signup;
