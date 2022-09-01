require("dotenv").config()
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages]}); //create new client

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.login(process.env.TOKEN);

  client.on('messageCreate', async interaction => {  
  console.log(interaction)
    if (interaction.content === 'quem eu amo mais que tudo?') {
      await interaction.reply('Com certeza é a Amanda Isabelly Borba!');
    }
  });
