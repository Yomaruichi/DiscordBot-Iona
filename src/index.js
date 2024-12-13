import dotenv from 'dotenv'
dotenv.config()

import { Client, GatewayIntentBits } from 'discord.js';

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent,
    ],

});

client.on('ready', (c) => {
    console.log(`Logged in as ${c.user?.tag}`);
});

client.on('messageCreate', (msg) => {

    if (msg.author.bot){
        return;
    } 

    if (msg.content === 'hello'){
        msg.reply('hi');
    }
});

client.on('interactionCreate', (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === "alecz") {
        interaction.reply("https://cdn.discordapp.com/attachments/795533957299044376/1052200340042301480/IMG_20221213_202746.jpg?ex=675d79ee&is=675c286e&hm=2de5dfe5a75c811f3dc1f7e8eebff27b81da3302187913ade2725e96f02a356d&");
    }
});

client.login(process.env.DISCORD_TOKEN);