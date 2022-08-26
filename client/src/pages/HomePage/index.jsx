import { React } from "react";
import axios from "axios";

function HomePage() {
  axios
    .get("http://127.0.0.1:3001/monitoramento")
    .then((response) => console.log(response));

  return (
    <div>
      <h1>teste</h1>
    </div>
  );
}

export default HomePage;
