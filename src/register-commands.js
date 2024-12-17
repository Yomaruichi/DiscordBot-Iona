require('dotenv').config();
const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');

const commands = [
    {
        name: 'alecz',
        description: "Alecz's face",
    },
    {
        name: 'rafael',
        description: "Rafael's face",
    },
    {
        name: 'dice',
        description: 'roll dice',
        options: [
            {
                name: "pieces",
                description: "Number of dice",
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
            {
                name: "sides",
                description: "Number of sides of the dice",
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
        ]
    },
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