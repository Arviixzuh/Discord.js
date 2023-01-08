const { EmbedBuilder, InteractionType } = require("discord.js");
const { readdirSync } = require("fs");

module.exports = {
  name: 'interactionCreate',
  execute: async (interaction) => {
    let client = interaction.client;
    if (!interaction.type == InteractionType.ApplicationCommand) return;
    if (interaction.user.bot) return;

    readdirSync('./src/commands').forEach(file => {
      const command = require(`../../src/commands/${file}`);
      if (interaction.commandName === command.data.name) {
        command.run(client, interaction)
      }
    })
  }
}
