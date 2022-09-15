require("dotenv").config();

const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 10;

// const orion = require("solar-orionjs")({
//   server: "172.16.40.9",
//   port: 17778,
//   auth: {
//     username: "redes2020",
//     password: "OT#internet2018",
//   },
// });

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const axios = require("axios");

const jwt = require("jsonwebtoken");

const { Client, GatewayIntentBits } = require("discord.js");

const db = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "35796482",
  database: "banco",
});

app.use(express.json());
app.use(
  cors({
    origin: ["http://127.0.0.1:5173"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    key: "userId",
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 24 * 1000,
    },
  })
);

const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    res.send("Precisa do token");
  } else {
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        res.json({ auth: false, msg: "falhou" });
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  }
};

app.get("/isUserAuth", verifyJWT, (req, res) => {
  res.send("Autenticado");
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  db.query(
    "SELECT * FROM banco.usuarios WHERE email = ?",
    email,
    (err, result) => {
      if (err) {
        res.send(err);
      }
      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (err, response) => {
          if (response) {
            const id = result[0].idusuarios;
            const email = result[0].email;
            const token = jwt.sign({ email, id }, process.env.SECRET_KEY, {
              expiresIn: 300,
            });

            req.session.user = result;

            res.json({ auth: true, token: token, result: result });
          } else {
            res.send({ msg: "Alguma coisa deu errada" });
          }
        });
      } else {
        res.json({ auth: false, msg: "Alguma coisa deu errada" });
      }
    }
  );
});

app.post("/register", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  db.query(
    "SELECT * FROM banco.usuarios WHERE email = ?",
    [email],
    (err, response) => {
      if (err) {
        res.send(err);
      }
      if (response.length == 0) {
        bcrypt.hash(password, saltRounds, (err, hash) => {
          if (err) {
            console.log(err);
          }
          db.query(
            "INSERT INTO banco.usuarios (email, password) VALUES (?, ?)",
            [email, hash],
            (err, result) => {
              if (err) {
                res.send(err);
              }
              res.send({ msg: "Cadastrado com sucesso" });
            }
          );
        });
      } else {
        res.send({ msg: "Usuário já cadastrado" });
      }
    }
  );
});

//monitoramento
// app.get("/monitoramento", (req, res) => {
//   orion.query(
//     {
//       query: `SELECT TOP 25 Message, EventTime, EventType FROM Orion.Events WHERE EventType LIKE "1" OR EventType LIKE "5" OR EventType LIKE "10" OR EventType LIKE "11" ORDER BY EventTime DESC`,
//     },
//     function (result) {
//       res.send(result);
//     }
//   );
// });

//discord bot

// const client = new Client({
//   intents: [
//     GatewayIntentBits.Guilds,
//     GatewayIntentBits.MessageContent,
//     GatewayIntentBits.GuildMessages,
//   ],
// }); //create new client

// client.on("ready", () => {
//   console.log(`Logged in as ${client.user.tag}!`);
// });

// client.login(process.env.TOKEN);
// client.on("messageCreate", async (interaction) => {
//   if (interaction.content === "top") {
//     await interaction.reply("deu certo meu bom");
//   }
// });

// const adicionar = () => {
//   orion.query(
//     {
//       query: `
//                 SELECT TOP 15 DAY(EventTime) AS DayTime,
//                 MONTH(EventTime) AS MonthTime,
//                 year(EventTime) AS YearTime,
//                 HOUR(EventTime) AS HourTime,
//                 MINUTE(EventTime) AS MinuteTime,
//                 SECOND(EventTime) AS SecondTime,
//                 Message,
//                 EventTime,
//                 EventID,
//                 EventType FROM Orion.Events WHERE EventType LIKE "1" OR EventType LIKE "5" OR EventType LIKE "10" OR EventType LIKE "11" ORDER BY EventTime DESC;
//                 `,
//       //query: `SELECT TOP 15 GETDATE() AS Time, Message, EventTime, EventType FROM Orion.Events WHERE EventType LIKE "1" OR EventType LIKE "5" OR EventType LIKE "10" OR EventType LIKE "11" ORDER BY EventTime DESC`,
//     },
//     function (result) {
//       let IDEvent = [];
//       result.results.map((event) => {
//         try {
//           let evento = {
//             description: event.Message,
//             time: `${("0" + event.DayTime).slice(-2)}/${(
//               "0" + event.MonthTime
//             ).slice(-2)}/${event.YearTime} ${("0" + event.HourTime).slice(
//               -2
//             )}:${("0" + event.MinuteTime).slice(-2)}:${(
//               "0" + event.SecondTime
//             ).slice(-2)}`,
//           };
//           IDEvent.push(event.EventID);
//         } catch (err) {
//           console.log(err);
//         }
//       });
//       setInterval(() => {
//         orion.query(
//           {
//             query: `
//                 SELECT TOP 15 DAY(EventTime) AS DayTime,
//                 MONTH(EventTime) AS MonthTime,
//                 year(EventTime) AS YearTime,
//                 HOUR(EventTime) AS HourTime,
//                 MINUTE(EventTime) AS MinuteTime,
//                 SECOND(EventTime) AS SecondTime,
//                 Message,
//                 EventTime,
//                 EventID,
//                 EventType FROM Orion.Events WHERE EventType LIKE "1" OR EventType LIKE "5" OR EventType LIKE "10" OR EventType LIKE "11" ORDER BY EventTime DESC;
//                 `,
//             //query: `SELECT TOP 15 GETDATE() AS Time, Message, EventTime, EventType FROM Orion.Events WHERE EventType LIKE "1" OR EventType LIKE "5" OR EventType LIKE "10" OR EventType LIKE "11" ORDER BY EventTime DESC`,
//             //query: `SELECT Message, EventTime, GETDATE() AS [GetDate], GETUTCDATE() AS [getUTCDate] FROM Orion.Events`,
//           },
//           function (result) {
//             let eventNew = [];
//             result.results.map((event) => {
//               let eventN = {
//                 description: event.Message,
//                 time: `${("0" + event.DayTime).slice(-2)}/${(
//                   "0" + event.MonthTime
//                 ).slice(-2)}/${event.YearTime} ${("0" + event.HourTime).slice(
//                   -2
//                 )}:${("0" + event.MinuteTime).slice(-2)}:${(
//                   "0" + event.SecondTime
//                 ).slice(-2)}`,
//                 id: event.EventID,
//               };
//               eventNew.unshift(eventN);
//             });
//             try {
//               for (let i = 0; i < eventNew.length; i++) {
//                 if (!IDEvent.includes(eventNew[i].id)) {
//                   client.channels.cache
//                     .get(`1017773873321754695`)
//                     .send(
//                       `${eventNew[i].description} \nData: ${eventNew[i].time}\n`
//                     );
//                   IDEvent.unshift(eventNew[i].id);
//                   IDEvent.pop();
//                   eventNew = [];
//                   console.log(eventNew[i].description);
//                 } else {
//                   console.log("repetido");
//                 }
//               }
//             } catch (err) {
//               console.log(err);
//             }
//           }
//         );
//       }, 10000);
//     }
//   );
// };
// adicionar();
//   setInterval(() =>{
//   orion.query({query:`SELECT TOP 15 Message, EventTime, EventType FROM Orion.Events WHERE EventType LIKE "1" OR EventType LIKE "5" OR EventType LIKE "10" OR EventType LIKE "11" ORDER BY EventTime DESC`},
//   function (result){
//     const message = result.results[0].Message
//     const time = result.results[0].EventTime
//     const messagePast = result.results[1].Message
//     const verify = result.results.map((event) =>{
//         state.push(event.Message)
//     })
//     if(!message == state[0]){
//     client.channels.cache.get(`994225969193828484`).send(`${message} // ${time.substr(0, 19).split("T").join(" ")}`)
//     console.log(state[0])
//     state.push(message)
//     }else{console.log("repetido")}
//   })
// }, 10000)

app.listen(3001, () => {
  console.log("Rodando na porta 3001");
});
