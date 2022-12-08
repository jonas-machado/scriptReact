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

  const notifySuc = (text) =>
    toast.success(text, {
      theme: "dark",
      pauseOnFocusLoss: true,
    });

  const validationRegister = yup.object().shape({
    email: yup.string().email("Email").required("Email"),
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
      name: values.nome,
      password: values.password,
    }).then((response) => {
      if (response.data.msg == "Usuário já cadastrado") {
        notify(response.data.msg);
      } else if (response.data.msg == "Cadastrado com sucesso") {
        notifySuc(response.data.msg);
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
              <Row className={styles.toCenter}>
                <ErrorMessage
                  component="label"
                  name="email"
                  className={styles.formError}
                />
                <Col className={`${styles.divEmail} input-group mb-3`}>
                  <span className="input-group-text" id="basic-addon1">
                    Email
                  </span>
                  <Field
                    name="email"
                    className={`${styles.formField} form-control `}
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                </Col>
              </Row>
              <Row className={styles.toCenter}>
                <ErrorMessage
                  component="label"
                  name="nome"
                  className={styles.formError}
                />
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
                </Col>
              </Row>
              <Row className={styles.toCenter}>
                <ErrorMessage
                  component="label"
                  name="password"
                  className={styles.formError}
                />

                <Col className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    Senha
                  </span>
                  <Field
                    name="password"
                    className={`${styles.formField} form-control`}
                  />
                </Col>
              </Row>
              <Row className={styles.toCenter}>
                <ErrorMessage
                  component="label"
                  name="confirmPassword"
                  className={styles.formError}
                />
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
                </Col>
              </Row>

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
