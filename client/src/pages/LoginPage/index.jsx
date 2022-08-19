import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import "./style.css";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function LoginPage() {
  const notify = (text) =>
    toast.info("Opa", {
      theme: "dark",
    });
  setTimeout(notify(), 1550);
  let navigate = useNavigate();
  const [loginStatus, setLoginStatus] = useState(false);

  const validationLogin = yup.object().shape({
    email: yup
      .string()
      .email("Errrrrrrrrouuuuuuuu")
      .required("Tem email não parça?"),
    password: yup.string().required("Tem que colocar"),
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
    <div id="container" className="login-container">
      <h1 className="login-h1">Login</h1>
      <Formik
        initialValues={{ email: "", password: "", confirmPassword: "" }}
        onSubmit={handleClickLogin}
        validationSchema={validationLogin}
      >
        <Form className="login-form">
          <div className="login-form-group">
            <Field name="email" className="form-field" placeholder="Email" />
            <ErrorMessage
              component="span"
              name="email"
              className="login-form-error"
            />
          </div>
          <div className="login-form-group">
            <Field name="password" className="form-field" placeholder="Senha" />
            <ErrorMessage
              component="span"
              name="password"
              className="form-error"
            />
          </div>
          <input className="a" id="login" type="submit" />
        </Form>
      </Formik>
    </div>
  );
}

export default LoginPage;
