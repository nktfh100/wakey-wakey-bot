const Guild = require("../database/guild.model");
const logger = require("../utils/logger");
const moveMember = require("../utils/moveMember");

module.exports = {
    name: 'voiceStateUpdate',
    once: false,
    async execute(client, oldState, newState) {
        if (process.env.NODE_ENV != 'development' && newState.id == newState.guild.ownerId) {
            return;
        }
        
        const guildData = await Guild.findOneAndUpdate({ guildId: newState.guild.id }, {}, { upsert: true, new: true, setDefaultsOnInsert: true });
        
        if (guildData.on && !oldState.selfDeaf && newState.selfDeaf) {
            moveMember(await newState.guild.members.fetch(newState.id));
            return;
        }
    },
};