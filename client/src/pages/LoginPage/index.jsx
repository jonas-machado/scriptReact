import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import styles from "./style.module.css";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function LoginPage() {
  const notify = (text) =>
    toast.info("Opa", {
      theme: "dark",
    });
  //setTimeout(notify(), 1550);
  let navigate = useNavigate();
  const [loginStatus, setLoginStatus] = useState(false);

  const validationLogin = yup.object().shape({
    email: yup
      .string()
      .email("Coloque no padrão: @email.com")
      .required("Insira o e-mail"),
    password: yup.string().required("Insira a senha"),
  });

  const handleClickLogin = (values) => {
    Axios.post("http://127.0.0.1:3001/login", {
      email: values.email,
      password: values.password,
    })
      .then((result) => {
        if (!result.data.auth) {
          setLoginStatus(false);
        } else {
          localStorage.setItem("token", result.data.token);
          setLoginStatus(true);
          userAuthenticated();
        }
      })
      .catch((error) => {
        throw error;
      });
  };

  const userAuthenticated = () => {
    Axios.get("http://127.0.0.1:3001/isUserAuth", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    }).then(() => {
      navigate("/home");
    });
  };

  Axios.defaults.withCredentials = true;

  return (
    <div className={styles.bgBody}>
      <Container id="container" className={styles.loginContainer}>
        <Col>
          <h1 className={styles.loginH1}>Login</h1>
          <Formik
            initialValues={{ email: "", password: "", confirmPassword: "" }}
            onSubmit={handleClickLogin}
            validationSchema={validationLogin}
          >
            <Form className={styles.loginForm}>
              <div className={styles.loginFormGroup}>
                <Field
                  name="email"
                  className={styles.formField}
                  placeholder="Email"
                />
                <ErrorMessage
                  component="span"
                  name="email"
                  className={styles.loginFormError}
                />
              </div>
              <div className={styles.loginFormGroup}>
                <Field
                  name="password"
                  className={styles.formField}
                  placeholder="Senha"
                />
                <ErrorMessage
                  component="span"
                  name="password"
                  className={styles.loginFormError}
                />
              </div>
              <input className={styles.a} id="login" type="submit" />
            </Form>
          </Formik>
        </Col>
      </Container>
    </div>
  );
}

export default LoginPage;
