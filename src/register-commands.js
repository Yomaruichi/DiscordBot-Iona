require('dotenv').config();
const { REST, Routes } = require('discord.js');
const path = require('path');
const fs = require('fs');

const commands = [];
const commandsPath = path.join(__dirname, 'commands');

// Recursively find all command files
const commandFiles = fs.readdirSync(commandsPath, { recursive: true })
    .filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(path.join(commandsPath, file));
    if ('data' in command && 'execute' in command) {
        commands.push(command.data.toJSON());
        console.log(`Found command: /${command.data.name}`);
    } else {
        console.warn(`[WARNING] ${file} is missing "data" or "execute" — skipped`);
    }
}

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
    try {
        console.log(`\nRegistering ${commands.length} application command(s)...`);
        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.SERVER_ID),
            { body: commands },
        );
        console.log('Successfully registered all commands.');
    } catch (error) {
        console.error(error);
    }
})();