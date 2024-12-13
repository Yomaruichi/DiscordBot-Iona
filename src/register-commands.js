import dotenv from 'dotenv'
dotenv.config()

import { REST, Routes } from 'discord.js';

const commands = [
    {
        name: 'alecz',
        description: "Alecz's face",
    }
];

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
    try{
        console.log('Started refreshing application (/) commands');
        await rest.put(
            Routes.applicationGuildCommands(process.env.USER_ID, process.env.SERVER_ID),
            { body: commands },
        );
        console.log('Successfully reloaded application (/) commands');
    } catch (error){
        console.error(error);
    }
})();