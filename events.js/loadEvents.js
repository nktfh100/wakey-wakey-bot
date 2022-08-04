const fs = require('node:fs');
const path = require('node:path');
const logger = require('../utils/logger');

function loadEvents(client) {
	const eventFiles = fs.readdirSync(__dirname).filter(file => file.endsWith('.event.js'));

	for (const file of eventFiles) {
		const filePath = path.join(__dirname, file);
		const event = require(filePath);
		if (event.once) {
			client.once(event.name, (...args) => event.execute(client, ...args));
		} else {
			client.on(event.name, (...args) => event.execute(client, ...args));
		}
	}
	logger.info(`Loaded ${eventFiles.length} events.`);
}

module.exports = loadEvents;