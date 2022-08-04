const { Permissions } = require("discord.js");
const logger = require("./logger");

async function moveMember(memberObj, interaction) {
    const originalChannelId = memberObj.voice.channelId;
    const guildVoiceChannels = (await memberObj.guild.channels.fetch()).filter(c => c.isVoice() && c.permissionsFor(memberObj).has(Permissions.FLAGS.CONNECT));

    if (!memberObj) {
        return false;
    }

    if (guildVoiceChannels.size < 2) {
        console.log("not enough channels")
        if (interaction) {
            interaction.reply({ content: `There are not enough voice channels!`, ephemeral: true })
        }
        return false;
    }

    if (!memberObj.voice.channelId) {
        if (interaction) {
            interaction.reply({ content: `<@!${memberObj.id}> is not in a voice channel!`, ephemeral: true })
        }
        return false;
    }

    if (!memberObj.voice.selfDeaf) {
        if (interaction) {
            interaction.reply({ content: `<@!${memberObj.id}> is not deafened!`, ephemeral: true })
        }
        return false;
    }

    // logger.info(`Started moving ${memberObj.displayName}`)

    let channels = guildVoiceChannels.random(2);
    let channelIndex = 0;

    const timer = setInterval(async () => {
        try {
            if (!memberObj.voice.channelId) {
                return clearInterval(timer);
            }
            if (!memberObj.voice.selfDeaf) {
                clearInterval(timer);
                memberObj.voice.setChannel(originalChannelId)
                return;
            }
            const targetChannel = channels.at(channelIndex);
            channelIndex = channelIndex == 0 ? 1 : 0;
            await memberObj.voice.setChannel(targetChannel);
        } catch (err) {
            if(!err.message.includes('Target user is not connected to voice')) {
                console.log("ERROR");
                logger.error(err);
                clearInterval(timer);
            }
        }
    }, 1000);
    return true;
}

module.exports = moveMember;