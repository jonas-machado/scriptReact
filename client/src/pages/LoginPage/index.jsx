import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import "./style.css";
import Axios from "axios"

function LoginPage() {

  Axios.defaults.withCredentials = true

  const validationLogin = yup.object().shape({
    email: yup.string().email('Errrrrrrrrouuuuuuuu').required('Tem email não parça?'),
    password: yup.string().required('Tem que colocar')
  })

  const validationRegister = yup.object().shape({
    email: yup.string().email('Errrrrrrrrouuuuuuuu').required('Tem email não parça?'),
    password: yup.string().required('Tem que colocar'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Ta tirando com a minha cara?')
  })
  
  const handleClickLogin = values => {
    Axios.post("http://127.0.0.1:3001/login", {
      email: values.email,
      password: values.password,
    }).then(result =>{
      console.log(result)
      console.log("funcionando")
    }).catch(error => {
      throw error;
    });
  }

  const handleClickRegister = values => {
    Axios.post("http://127.0.0.1:3001/register", {
      email: values.email,
      password: values.password,
    }).then(result =>{
      console.log(result)
      console.log("funcionando")
    })
  }

  useEffect(() => {
    Axios.get("http://127.0.0.1:3001/login").then((response) => {
      if(response.data.loggedIn == true){
      alert(response.data.user[0].email)
      }
  })
  }, [])

  return (
    <div id="container" className="container" >
      <h1>Login</h1>
      <Formik initialValues={{email: "", password: "", confirmPassword: ""}} onSubmit={handleClickLogin} validationSchema={validationLogin}>
        <Form className="login-form">
          <div className="login-form-group">
            <Field name="email" className="form-field" placeholder="Email" />
            <ErrorMessage component="span" name="email" className="form-error"/>
          </div>
          <div className="login-form-group">
            <Field name="password" className="form-field" placeholder="Senha" />
            <ErrorMessage component="span" name="password" className="form-error"/>
          </div>
          <input className="a" id="login" type="submit" />
        </Form>
      </Formik>
      <h1 className="h1Cadastro">Cadastro</h1>
      <Formik initialValues={{email: "", password: "", confirmPassword: ""}} onSubmit={handleClickRegister} validationSchema={validationRegister}>
        <Form className="login-form">
          <div className="login-form-group">
            <Field name="email" className="form-field" placeholder="Email" />
            <ErrorMessage component="span" name="email" className="form-error"/>
          </div>
          <div className="login-form-group">
            <Field name="password" className="form-field" placeholder="Senha" />
            <ErrorMessage component="span" name="password" className="form-error"/>
          </div>
          <div className="login-form-group">
            <Field name="confirmPassword" className="form-field" placeholder="Confirme sua senha" />
            <ErrorMessage component="span" name="confirmPassword" className="form-error"/>
          </div>
          <input className="a" id="register" type="submit"/>
        </Form>
      </Formik>
      <h1></h1>
    </div>
  );
}

export default LoginPage;
