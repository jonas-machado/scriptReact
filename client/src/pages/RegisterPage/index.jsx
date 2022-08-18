import React, { useEffect, useState } from "react";
import * as yup from "yup";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function RegisterPage() {
  const notify = () =>
    toast.info(
      "Wow so easy! chegou sua vez de pagar salgadinho, parabéns, estamos esperando",
      {
        theme: "dark",
      }
    );

  const validationRegister = yup.object().shape({
    email: yup
      .string()
      .email("Errrrrrrrrouuuuuuuu")
      .required("Tem email não parça?"),
    password: yup.string().required("Tem que colocar"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Ta tirando com a minha cara?"),
  });

  const handleClickRegister = (values) => {
    Axios.post("http://127.0.0.1:3001/register", {
      email: values.email,
      password: values.password,
    }).then();
  };

  Axios.defaults.withCredentials = true;

  return (
    <Container id="container" className="register-container">
      <h1 className="h1Cadastro">Cadastro</h1>

      <Form onSubmit={handleClickRegister} className="col login-form">
        <Row>
          <Col>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">E-mail</InputGroup.Text>
              <Form.Control
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </InputGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Nome</InputGroup.Text>
              <Form.Control
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </InputGroup>
          </Col>
          <Col xs={8}>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Sobrenome</InputGroup.Text>
              <Form.Control
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </InputGroup>
          </Col>
        </Row>
        <Col>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Senha</InputGroup.Text>
            <Form.Control
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
        </Col>
        <Col>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Confimar senha</InputGroup.Text>
            <Form.Control
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
        </Col>
        <Col className="btn-enviar d-grid gap-2">
          <input className="a" id="register" type="submit" />
        </Col>
      </Form>
      {/* <button onClick={notify}>Notify!</button> */}
      {/* <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      /> */}
    </Container>
  );
}

export default RegisterPage;
