const { SlashCommandBuilder } = require('@discordjs/builders');
const Guild = require('../database/guild.model');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('wakey')
		.setDescription('Turn wakey on or off')
		.addStringOption(option =>
			option.setName('value')
				.setDescription('on or off')
				.setRequired(true)
				.addChoices(
					{ name: 'on', value: 'on' },
					{ name: 'off', value: 'off' }
				)),
	async execute(client, interaction) {
		const isOn = interaction.options.getString("value", true) == "on";
		await Guild.findOneAndUpdate({ guildId: interaction.guild.id }, { on: isOn }, { new: true, upsert: true, setDefaultsOnInsert: true });
		await interaction.reply({ content: isOn ? "Wakey Wakey turned on." : "Wakey Wakey turned off.", ephemeral: true });
	},
};
