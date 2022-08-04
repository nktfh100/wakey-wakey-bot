require('custom-env').env();
const logger = require("./utils/logger");
const { Client, Intents } = require('discord.js');
const loadCommands = require('./commands/loadCommands');
const mongoose = require('mongoose');
const loadEvents = require('./events.js/loadEvents');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES] });

loadCommands(client);
loadEvents(client);

mongoose.connect(process.env.MONGODB_URL).then(() => {
	logger.info("Connected to MongoDB");
	client.login(process.env.TOKEN);
});
