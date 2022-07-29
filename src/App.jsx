import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import "./App.css";

function App() {

  

  const validationLogin = yup.object().shape({
    email: yup.string().email('Errrrrrrrrouuuuuuuu').required('Tem email não parça?'),
    password: yup.string().min(8).required('Segurança da nasa, tem que colocar')
  })

  const validationRegister = yup.object().shape({
    email: yup.string().email('Errrrrrrrrouuuuuuuu').required('Tem email não parça?'),
    password: yup.string().min(8).required('Segurança da nasa, tem que colocar'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Ta tirando com a minha cara?')
  })
  
  const handleClickRegister = (values) => console.log(values)
  const handleClickLogin = (values) => console.log(values)
  return (
    <div id="containter" className="container">
      <h1>Login</h1>
      <Formik initialValues={{}} onSubmit={handleClickLogin} validationSchema={validationLogin}>
        <Form className="login-form">
          <div className="login-form-group">
            <Field name="email" className="form-field" placeholder="Email" />
            <ErrorMessage component="span" name="email" className="form-error"/>
          </div>
          <div className="login-form-group">
            <Field name="password" className="form-field" placeholder="Senha" />
            <ErrorMessage component="span" name="password" className="form-error"/>
          </div>
          <input class="a" id="login" type="submit"/>
        </Form>
      </Formik>
      <h1>Cadastro</h1>
      <Formik initialValues={{}} onSubmit={handleClickRegister} validationSchema={validationRegister}>
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
          <input class="a" id="login" type="submit"/>
        </Form>
      </Formik>
      <h1></h1>
    </div>
  );
}

export default App;
