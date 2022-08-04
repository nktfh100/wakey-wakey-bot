const logger = require("../utils/logger");

module.exports = {
    name: 'guildDelete',
    once: false,
    async execute(client, guild) {

        logger.info(`Left guild ${guild.name}`);
        logger.info(`Currently in ${client.guilds.cache.size} guilds!`);
    },
};
