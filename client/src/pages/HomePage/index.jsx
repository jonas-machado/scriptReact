import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const notify = () =>
  toast.info("Opa", {
    theme: "dark",
  });

function HomePage() {
  return (
    <>
      <button onClick={notify}>teste</button>
      <ToastContainer />
    </>
  );
}

export default HomePage;
