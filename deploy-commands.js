require('custom-env').env();
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const loadCommands = require('./commands/loadCommands');
const logger = require('./utils/logger');

const commands = loadCommands();
logger.info(`Loaded ${commands.length} commands.`)
const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands })
	.then(() => logger.info('Successfully registered application commands.'))
	.catch(logger.error);