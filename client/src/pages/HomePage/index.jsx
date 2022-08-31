import { React, useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import Event from "../../components/Event";

function HomePage() {
  const [alarmes, setAlarmes] = useState([]);
  console.log(alarmes);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:3001/monitoramento")
      .then((response) => setAlarmes(response.data.results));
  }, []);

  return (
    <div>
      {alarmes.map((alarme) => (
        <Event
          key={alarme.EventTime}
          name={alarme.Message}
          time={alarme.EventTime.substr(0, 19).split("T").join("\n")}
        />
      ))}
    </div>
  );
}

export default HomePage;
