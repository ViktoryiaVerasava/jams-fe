import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import styles from "../styles/login.module.css";
import { UsersApi } from "../services";
import TopLink from "../components/shared/TopLink";
import Button from "../components/shared/Button";

const formInitValues = {
  firstName: "",
  lastName: "",
  instrument: "",
  email: "",
  password: "",
  phone: "",
};

const Register = () => {
  const [message, setMessage] = useState("");

  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("/login");
    }
  }, []);

  const signUp = async ({
    firstName,
    lastName,
    email,
    password,
    phone,
    instrument,
  }) => {
    const resp = await UsersApi.signUp({
      firstName,
      lastName,
      email,
      password,
      phone,
      instrument,
    });
    if (resp.status === 201) {
      router.push("/");
    } else {
      setMessage(resp.message);
    }
  };

  return (
    <div className={styles.container}>
      <TopLink link="/login" label="Login" />
      <h5>Please fill the from below</h5>
      <Formik
        initialValues={formInitValues}
        validationSchema={Yup.object({
          firstName: Yup.string().required("Required"),
          lastName: Yup.string().required("Required"),
          instrument: Yup.string().required("Required"),
          phone: Yup.string()
            .matches(/^\d+$/, "Must be digits only")
            .min(5, "Must be from 5 up to 10 digits")
            .max(10, "Must be from 5 up to 10 digits")
            .required("Required"),
          password: Yup.string()
            .max(20, "Must be 20 characters or less")
            .min(5, "Must be 5 characters or more")
            .required("Required"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          await signUp(values);
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
                name="firstName"
                placeholder="First Name"
                className={styles.field}
              />
              <ErrorMessage
                name="firstName"
                component="div"
                className={styles.error}
              />
            </div>
            <div>
              <Field
                name="lastName"
                placeholder="Last Name"
                className={styles.field}
              />
              <ErrorMessage
                name="lastName"
                component="div"
                className={styles.error}
              />
            </div>
            <div>
              <Field
                name="instrument"
                placeholder="Instrument"
                className={styles.field}
              />
              <ErrorMessage
                name="instrument"
                component="div"
                className={styles.error}
              />
            </div>
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
                name="phone"
                placeholder="Phone"
                className={styles.field}
              />
              <ErrorMessage
                name="phone"
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
            <Button label="Register" disabled={isSubmitting} />
          </Form>
        )}
      </Formik>
      {message ? <div className={styles.error}>{message}</div> : ""}
    </div>
  );
};

export default Register;
