const logger = require("../utils/logger");

module.exports = {
    name: 'guildCreate',
    once: false,
    async execute(client, guild) {

        logger.info(`Joined guild ${guild.name}`);
        logger.info(`Currently in ${client.guilds.cache.size} guilds!`);
    },
};
