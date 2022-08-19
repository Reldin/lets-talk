import { FormEvent, useState } from "react";

import styles from "./Login.module.css";

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const submitForm = (event: FormEvent) => {
    event.preventDefault();
    event.stopPropagation();

    setUsername("");
    setPassword("");
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.main}>
        <p>Login</p>
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
              autoComplete="current-password"
            />
          </div>

          <button className={styles.submitbtn}>Login</button>
        </form>
      </div>
    </section>
  );
};

export default Login;
