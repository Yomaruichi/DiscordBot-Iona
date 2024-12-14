require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const mongoose = require('mongoose');
mongoose.connection.on('connected', () => console.log('connected to the database'));

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent,
    ],

});

(async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB, { });

    } catch (error) {
        console.log(error);
    }
})();

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
    if (interaction.commandName === "rafael") {
        interaction.reply("https://cdn.discordapp.com/attachments/795533957299044376/1317344875322282045/scoliosis-illustration-e762a2.png?ex=675e5885&is=675d0705&hm=387d72834428daadcf538400b115a8df75c30f2a35238bf14a56d2860b332bd6&");
    }
});

client.login(process.env.DISCORD_TOKEN);