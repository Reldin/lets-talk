import React, { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { authActions, userSignup } from "../../store/authSlice";
import styles from "./Signup.module.css";

const Signup = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [inputErrorMessage, setInputErrorMessage] = useState<string>("");

  const appDispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isSuccess, isError, errorMessage, isAuthenticated } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    appDispatch(authActions.clearState());
  }, [isAuthenticated, navigate, appDispatch]);

  const submitForm = (event: FormEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (password !== passwordConfirmation) {
      setInputErrorMessage("Passwords are no the same.");
      return;
    }
    if (username.length < 5) {
      setInputErrorMessage("Username is too short.");
      return;
    }
    if (password.length < 5) {
      setInputErrorMessage("Password is too short.");
      return;
    }

    appDispatch(userSignup({ username, password, email }))
      .unwrap()
      .then((resp) => {
        console.log(resp);
      })
      .catch((err: Error) => {
        console.log(err);
      });
    if (isSuccess) {
      setUsername("");
      setPassword("");
      setPasswordConfirmation("");
      setEmail("");
    }
    setInputErrorMessage("");
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.main}>
        <p>Signup</p>
        <form className={styles.signupform} onSubmit={submitForm} method="POST">
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
        {inputErrorMessage.length > 0 && <div>{inputErrorMessage}</div>}
        {isError && <div className={styles.error_div}>{errorMessage} </div>}
        {isSuccess && <div className={styles.error_div}>{errorMessage}</div>}
      </div>
    </section>
  );
};

export default Signup;
