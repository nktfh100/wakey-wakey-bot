const { SlashCommandBuilder } = require('@discordjs/builders');
const Guild = require('../database/guild.model');
const logger = require('../utils/logger');
const moveMember = require('../utils/moveMember');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('move')
		.setDescription('Move user across voice channels until they undeafen')
		.addStringOption(option =>
			option.setName('user')
				.setDescription('User to move')
				.setRequired(true)
		),
	async execute(client, interaction) {
		const memberTag = interaction.options.getString("user", true);
		// Check if the command argument is a valid member tag
		if (!memberTag.startsWith("<@!") || !memberTag.endsWith(">")) {
			await interaction.reply({ content: "You have to @ a valid user!", ephemeral: true });
			return;
		}
		const memberId = memberTag.replace("<@!", "").replace(">", "");

		const targetMemberObj = await interaction.guild.members.fetch(memberId);

		let result = await moveMember(targetMemberObj, interaction);

		if (result) {
			await interaction.reply({ content: `Started moving ${memberTag}`, ephemeral: true });
		}
	},
};
