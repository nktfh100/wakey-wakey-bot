const mongoose = require('mongoose');

const guildSchema = mongoose.Schema(
    {
        guildId: {
            type: String,
            required: true,
            unique: true,
        },
        on: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true,
    }
);

const Guild = mongoose.model('Guild', guildSchema);

module.exports = Guild;
