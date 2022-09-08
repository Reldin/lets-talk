import { FormEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { authActions, userLogin } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

import styles from "./Login.module.css";

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const isError = useAppSelector((state) => state.auth.error.isError);
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth, navigate]);
  const submitForm = (event: FormEvent) => {
    event.preventDefault();
    event.stopPropagation();

    dispatch(userLogin({ username, password }))
      .unwrap()
      .then((_data) => dispatch(authActions.setUsername(username)))
      .catch((_err) => {
        console.log("Failed to login");
      });

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
          {isError && (
            <div className={styles.error}>
              Failed to login.
              <br /> Check inputs.
            </div>
          )}

          <button className={styles.submitbtn}>Login</button>
        </form>
      </div>
    </section>
  );
};

export default Login;
