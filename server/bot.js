require("dotenv").config();
const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");

const orion = require("solar-orionjs")({
  server: "172.16.40.9",
  port: 17778,
  auth: {
    username: "redes2020",
    password: "OT#internet2018",
  },
});

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
  ],
}); //create new client

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.login(process.env.TOKEN);
const event = new EmbedBuilder()
  .setColor(0xff0000)
  .setTitle("teste")
  .setDescription("testando embed builder")
  .setTimestamp();

client.on("messageCreate", (interaction) => {
  if (interaction.content === "top") {
    orion.query(
      {
        query: `
          SELECT TOP 1 
          DAY(EventTime) AS DayTime, 
          MONTH(EventTime) AS MonthTime, 
          year(EventTime) AS YearTime, 
          HOUR(EventTime) AS HourTime, 
          MINUTE(EventTime) AS MinuteTime, 
          SECOND(EventTime) AS SecondTime, 
          Message, 
          EventTime, 
          EventID,
          EventType,
          n.NodeID,
          ncp.NodeID AS NCPNode,
          IPAddress,
          NodeName,
          Location,
          NodeDescription,
          POP_ID,
          City,
          Department
          FROM  
          Orion.Events AS e, 
          Orion.Nodes AS n,
          Orion.NodesCustomProperties AS ncp
          WHERE 
          EventType LIKE "1" AND networknode=n.nodeid AND networknode=ncp.nodeid
          OR 
          EventType LIKE "5" AND networknode=n.nodeid AND networknode=ncp.nodeid
          OR 
          EventType LIKE "10" AND networknode=n.nodeid AND networknode=ncp.nodeid
          OR 
          EventType LIKE "11" AND networknode=n.nodeid AND networknode=ncp.nodeid
          ORDER BY EventTime DESC;
                      `,
        //query: `SELECT TOP 15 GETDATE() AS Time, Message, EventTime, EventType FROM Orion.Events WHERE EventType LIKE "1" OR EventType LIKE "5" OR EventType LIKE "10" OR EventType LIKE "11" ORDER BY EventTime DESC`,
      },
      function (result) {
        console.log(result);
        const exampleEmbed = new EmbedBuilder()
          .setColor(0xff0000)
          .setTitle(result.results[0].NodeName);
        client.channels.cache
          .get(`994225969193828484`)
          .send({ embeds: [exampleEmbed] });
      }
    );
  }
});

// const adicionar = () => {
//   orion.query(
//     {
//       query: `
//       SELECT TOP 15
//       DAY(EventTime) AS DayTime,
//       MONTH(EventTime) AS MonthTime,
//       year(EventTime) AS YearTime,
//       HOUR(EventTime) AS HourTime,
//       MINUTE(EventTime) AS MinuteTime,
//       SECOND(EventTime) AS SecondTime,
//       Message,
//       EventTime,
//       EventID,
//       EventType,
//       n.NodeID,
//       ncp.NodeID,
//       IPAddress,
//       NodeName,
//       Location,
//       NodeDescription,
//       POP_ID,
//       City,
//       Department,
//       City
//       FROM
//       Orion.Events AS e,
//       Orion.Nodes AS n,
//       Orion.NodesCustomProperties AS ncp
//       WHERE
//       EventType LIKE "1" AND networknode=n.nodeid AND networknode=ncp.nodeid
//       OR
//       EventType LIKE "5" AND networknode=n.nodeid AND networknode=ncp.nodeid
//       OR
//       EventType LIKE "10" AND networknode=n.nodeid AND networknode=ncp.nodeid
//       OR
//       EventType LIKE "11" AND networknode=n.nodeid AND networknode=ncp.nodeid
//       ORDER BY EventTime DESC;
//                   `,
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
//             SELECT TOP 15
//             DAY(EventTime) AS DayTime,
//             MONTH(EventTime) AS MonthTime,
//             year(EventTime) AS YearTime,
//             HOUR(EventTime) AS HourTime,
//             MINUTE(EventTime) AS MinuteTime,
//             SECOND(EventTime) AS SecondTime,
//             Message,
//             EventTime,
//             EventID,
//             EventType,
//             n.NodeID,
//             ncp.NodeID,
//             IPAddress,
//             NodeName,
//             Location,
//             NodeDescription,
//             POP_ID,
//             City,
//             Department,
//             City
//             FROM
//             Orion.Events AS e,
//             Orion.Nodes AS n,
//             Orion.NodesCustomProperties AS ncp
//             WHERE
//             EventType LIKE "1" AND networknode=n.nodeid AND networknode=ncp.nodeid
//             OR
//             EventType LIKE "5" AND networknode=n.nodeid AND networknode=ncp.nodeid
//             OR
//             EventType LIKE "10" AND networknode=n.nodeid AND networknode=ncp.nodeid
//             OR
//             EventType LIKE "11" AND networknode=n.nodeid AND networknode=ncp.nodeid
//             ORDER BY EventTime DESC;
//                   `,
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
//                     .get(`994225969193828484`)
//                     .send(
//                       `${eventNew[i].description} \nData: ${eventNew[i].time}\n`
//                     );
//                   IDEvent.unshift(eventNew[i].id);
//                   IDEvent.pop();
//                   console.log(eventNew[i].description);
//                   eventNew = [];
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
