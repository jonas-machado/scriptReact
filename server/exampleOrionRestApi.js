const axios = require("axios");

const username = "redes2020";
const password = "OT#internet2018";

const token = Buffer.from(`${username}:${password}`, "utf8").toString("base64");

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
axios
    .post(
        "https://172.16.40.9:17778/SolarWinds/InformationService/v3/Json/Query",
        {
            "query":"SELECT EventID FROM Orion.Events",
        },
        {
            headers: { Authorization: `Basic ${token}`, Host: "172.16.40.9:17778" },
        }
    )
    .catch((err) => console.log(err))
    .then((res) => console.log(res.data));
