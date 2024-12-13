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
    console.log(msg);
});

client.login(process.env.DISCORD_TOKEN);