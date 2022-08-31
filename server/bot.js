require("dotenv").config()
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });
  try{
  client.on("message", msg => {
    if (msg.content === "ping") {
      msg.reply("pong");
    }
  })
}
  catch{err => console.log(err)}
  client.login(process.env.TOKEN);
  console.log(process.env.TOKEN)