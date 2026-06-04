require('dotenv').config();
const { Client, GatewayIntentBits, Partials, Collection, MessageFlags } = require('discord.js');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

mongoose.connection.on('connected', () => console.log('Connected to the database'));

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent,
    ],
    partials: [
        Partials.Channel,
        Partials.Message,
        Partials.User,
        Partials.GuildMember,
    ],
});

// Load slash commands from the /commands folder (recursive)
client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath, { recursive: true })
    .filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(path.join(commandsPath, file));
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    } else {
        console.warn(`[WARNING] ${file} is missing "data" or "execute"`);
    }
}

// DB connection
(async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB);
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
    }
})();

client.once('ready', (c) => {
    console.log(`Logged in as ${c.user.tag}`);
    console.log(`Loaded ${client.commands.size} command(s)`);
});

client.on('messageCreate', (msg) => {
    if (msg.author.bot) return;

    if (msg.content.toLowerCase() === 'hello') {
        msg.reply('hi');
    }
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) {
        console.error(`No command found for: ${interaction.commandName}`);
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(`Error executing /${interaction.commandName}:`, error);
        const errorMsg = { content: 'Something went wrong executing that command.', flags: MessageFlags.Ephemeral };
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp(errorMsg);
        } else {
            await interaction.reply(errorMsg);
        }
    }
});

client.login(process.env.DISCORD_TOKEN);