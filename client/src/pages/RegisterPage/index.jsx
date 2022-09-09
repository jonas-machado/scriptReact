import React, { useEffect, useState } from "react";
import * as yup from "yup";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./style.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Formik, Form, Field, ErrorMessage } from "formik";

function RegisterPage() {
  const notify = (text) =>
    toast.error(text, {
      theme: "dark",
      pauseOnFocusLoss: true,
    });

  const validationRegister = yup.object().shape({
    email: yup.string().email("E-mail incorreto").required("Necessário"),
    password: yup.string().required("Necessário"),
    confirmPassword: yup
      .string()
      .required("Necessário")
      .oneOf([yup.ref("password"), null], "Incorreto"),
    nome: yup.string().required("Necessário"),
  });

  const handleClickRegister = (values) => {
    Axios.post("http://127.0.0.1:3001/register", {
      email: values.email,
      password: values.password,
    }).then((response) => {
      if (response.data.msg == "Usuário já cadastrado") {
        notify(response.data.msg);
      }
    });
  };

  Axios.defaults.withCredentials = true;

  return (
    <>
      <div className={styles.htmlCadastro}>
        <Container id="container" className={styles.registerContainer}>
          <h1 className={styles.h1Cadastro}>Cadastro</h1>
          <Formik
            initialValues={{
              email: "",
              password: "",
              confirmPassword: "",
              nome: "",
            }}
            onSubmit={handleClickRegister}
            validationSchema={validationRegister}
          >
            <Form className={`col ${styles.loginForm}`}>
              <Row>
                <Col className={`${styles.errorField} input-group mb-3`}>
                  <span className="input-group-text" id="basic-addon1">
                    Email
                  </span>
                  <Field
                    name="email"
                    className={`${styles.formField} form-control `}
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                  <ErrorMessage
                    component="span"
                    name="email"
                    className={styles.formError}
                    render={() => {
                      console.log("teste");
                    }}
                  />
                </Col>
              </Row>
              <Row className={styles.name2}>
                <Col className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    Nome completo
                  </span>
                  <Field
                    name="nome"
                    className={`${styles.formField} form-control`}
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                  <ErrorMessage
                    component="span"
                    name="nome"
                    className={styles.formError}
                  />
                </Col>
              </Row>
              <Col className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  Senha
                </span>
                <Field
                  name="password"
                  className={`${styles.formField} form-control`}
                />
                <ErrorMessage
                  component="span"
                  name="password"
                  className={styles.formError}
                />
              </Col>
              <Col className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  Confirmar senha
                </span>
                <Field
                  name="confirmPassword"
                  className={`${styles.formField} form-control`}
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
                <ErrorMessage
                  component="span"
                  name="confirmPassword"
                  className={styles.formError}
                />
              </Col>
              <Col className={`${styles.btnEnviar} d-grid gap-2`}>
                <input className={styles.a} id="register" type="submit" />
              </Col>
            </Form>
          </Formik>
        </Container>
      </div>
      <ToastContainer />
    </>
  );
}

export default RegisterPage;
