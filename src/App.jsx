import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import "./App.css";

function App() {

  const validationLogin = yup.object().shape({
    email: yup.string().email('Errrrrrrrrouuuuuuuu').required('Tem email não parça?'),
    password: yup.string().min(8).required('Segurança da nasa, tem que colocar')
  })

  const handleClickLogin = (values) => console.log(values)
  return (
    <div className="container">
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
          <button className="button" type="submit">Login</button>
        </Form>
      </Formik>
      <h1></h1>
    </div>
  );
}

export default App;
