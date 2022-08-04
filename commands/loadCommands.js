const fs = require('node:fs');
const path = require('node:path');

const { Collection } = require('discord.js');
const logger = require('../utils/logger');

function loadCommands(client) {
    let commands = [];
    if (client) {
        client.commands = new Collection();
    }
    const commandFiles = fs.readdirSync(__dirname).filter(file => file.endsWith('.command.js'));

    for (const file of commandFiles) {
        const filePath = path.join(__dirname, file);
        const command = require(filePath);
        if (client) {
            client.commands.set(command.data.name, command);
        } else {
            commands.push(command.data.toJSON());
        }
    }


    if (!client) {
        return commands;
    } else {
        logger.info(`Loaded ${client.commands.size} commands.`)
    }
}

module.exports = loadCommands;