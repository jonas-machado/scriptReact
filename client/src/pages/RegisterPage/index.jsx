import React, { useEffect, useState } from "react";
import * as yup from "yup";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import "./style.css";
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
      <div className="htmlCadastro">
        <Container id="container" className="register-container">
          <h1 className="h1Cadastro">Cadastro</h1>
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
            <Form className="col login-form">
              <Row>
                <Col className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    Email
                  </span>
                  <Field
                    name="email"
                    className="form-field form-control"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                  <ErrorMessage
                    component="span"
                    name="email"
                    className="form-error"
                  />
                </Col>
              </Row>
              <Row className="name2">
                <Col className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    Nome completo
                  </span>
                  <Field
                    name="nome"
                    className="form-field form-control"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                  <ErrorMessage
                    component="span"
                    name="nome"
                    className="form-error"
                  />
                </Col>
              </Row>
              <Col className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  Senha
                </span>
                <Field name="password" className="form-field form-control" />
                <ErrorMessage
                  component="span"
                  name="password"
                  className="form-error"
                />
              </Col>
              <Col className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  Confirmar senha
                </span>
                <Field
                  name="confirmPassword"
                  className="form-field form-control"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
                <ErrorMessage
                  component="span"
                  name="confirmPassword"
                  className="form-error"
                />
              </Col>
              <Col className="btn-enviar d-grid gap-2">
                <input className="a" id="register" type="submit" />
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
