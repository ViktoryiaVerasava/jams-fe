import styles from "../styles/login.module.css";
import { UsersApi } from "../services";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";

import Button from "../components/shared/Button";

const Login = () => {
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");

  const email = useRef(null);
  const password = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (!!token) {
      localStorage.setItem("token", token);
      router.push("/");
    }
  }, [token]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("/");
    }
  }, []);

  const signIn = async (event) => {
    event.preventDefault();
    const resp = await UsersApi.signIn({
      email: email.current.value,
      password: password.current.value,
    });
    setToken(resp.accessToken);
    setMessage(resp.message);
  };

  return (
    <div className={styles.container}>
      <h5>Please sign in</h5>
      <form className={styles.form}>
        <input ref={email} placeholder="email" />
        <input ref={password} placeholder="password" type="password" />
        <Button label="Login" onClick={signIn} />
      </form>
      {message ? <div className={styles.error}>Wrong credentials</div> : ""}
    </div>
  );
};

export default Login;
