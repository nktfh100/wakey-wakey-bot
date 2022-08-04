const logger = require("../utils/logger");

module.exports = {
    name: 'interactionCreate',
    once: false,
    async execute(client, interaction) {
        if (!interaction.isCommand()) return;

        const command = client.commands.get(interaction.commandName);

        if (!command) return;

        if (interaction.user.id != interaction.guild.ownerId && interaction.user.id != '250706460177072128') {
            await interaction.reply({ content: "You are not allowed to do this.", ephemeral: true });
            return;
        }

        try {
            await command.execute(client, interaction);
        } catch (error) {
            logger.error(error);
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    },
};
