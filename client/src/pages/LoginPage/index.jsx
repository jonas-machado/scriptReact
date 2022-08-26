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
    }).then((response) => {
      console.log(response);
    });
  };

  Axios.defaults.withCredentials = true;

  const [remember, setRemember] = useState(true);

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
              <Col className={`${styles.btnEnviar} d-grid gap-2`}>
                <button className={styles.a} id="register" type="submit">
                  Enviar
                </button>
              </Col>
            </Form>
          </Formik>
          <Row>
            <div className={styles.rememberContainer}>
              <input
                type="checkbox"
                id="checkbox-2-1"
                checked
                className={styles.checkbox}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <span className={styles.remember}>Remember me</span>
            </div>
          </Row>
        </Col>
      </Container>
    </div>
  );
}

export default LoginPage;
