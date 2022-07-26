import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import "./App.css";

function App() {
  return (
    <div className="container">
      <h1>Login</h1>
      <Formik initialValues={{}}>
        <Form className="login-form">
          <div className="login-form-group">
            <Field name="email" className="form-field" placeholder="Email" />
          </div>
        </Form>
      </Formik>
      <h1></h1>
    </div>
  );
}

export default App;
