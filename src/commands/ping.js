const { EmbedBuilder, PermissionsBitField, PermissionFlagsBits } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("🏓 → Pong")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  run: async (client, interaction) => {
    const embed = new EmbedBuilder()
      .setTitle('🏓 ¡Pong!')
      .addFields({ name: '__Cliente:__', value: `\`\`\`cs\n${client.ws.ping} ms\`\`\`` })
      .addFields({ name: '__Mensajes:__', value: `\`\`\`cs\n${Math.floor(interaction.createdTimestamp - Date.now())} ms\`\`\`` })
      .setThumbnail("https://cdn.discordapp.com/attachments/909121957562314803/911329911556419604/ksRB6ZE.png")
      .setColor("8bc091")
    interaction.reply({ embeds: [embed] })

  }
};
