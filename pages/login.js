import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import styles from "../styles/login.module.css";
import { UsersApi } from "../services";
import TopLink from "../components/shared/TopLink";
import Button from "../components/shared/Button";

const Login = () => {
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");

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

  const signIn = async ({ email, password }) => {
    const resp = await UsersApi.signIn({
      email,
      password,
    });
    if (resp.accessToken) {
      setToken(resp.accessToken);
    }
    setMessage(resp.message);
  };

  return (
    <div className={styles.container}>
      <TopLink link="/register" label="Register" />
      <h5>Please sign in</h5>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object({
          password: Yup.string()
            .max(20, "Must be 20 characters or less")
            .min(5, "Must be 5 characters or more")
            .required("Required"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          await signIn(values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, handleChange }) => (
          <Form
            className={styles.form}
            onChange={(e) => {
              setMessage("");
              handleChange(e);
            }}
          >
            <div>
              <Field
                name="email"
                placeholder="Email"
                className={styles.field}
              />
              <ErrorMessage
                name="email"
                component="div"
                className={styles.error}
              />
            </div>
            <div>
              <Field
                type="password"
                name="password"
                placeholder="Password"
                className={styles.field}
              />
              <ErrorMessage
                name="password"
                component="div"
                className={styles.error}
              />
            </div>
            <Button label="Login" disabled={isSubmitting} />
          </Form>
        )}
      </Formik>
      {message ? <div className={styles.error}>{message}</div> : ""}
    </div>
  );
};

export default Login;
