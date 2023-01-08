const { Client, Collection, GatewayIntentBits, Partials, EmbedBuilder } = require("discord.js");
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildWebhooks, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.DirectMessages, GatewayIntentBits.DirectMessageReactions, GatewayIntentBits.DirectMessageTyping, GatewayIntentBits.MessageContent], shards: "auto", partials: [Partials.Message, Partials.Channel, Partials.GuildMember, Partials.Reaction, Partials.GuildScheduledEvent, Partials.User, Partials.ThreadMember] });
const config = require("./src/config.js");
const Discord = require('discord.js')
const { readdirSync } = require("fs")
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const mongoose = require("mongoose");

let token = config.token

client.commands = new Collection()

const rest = new REST({ version: '10' }).setToken(token);

client.on("ready", async () => {
  try {
    await rest.put(
      Routes.applicationCommands(client.user.id),
      { body: commands },
    );
  } catch (error) {
    console.error(error);
  }
  console.log(`¡Hola mundo!`);
})

//========[>---------<]========\\
//========[> MongoDB <]========\\
//========[>---------<]========\\

mongoose.connect("mongoURL", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Conectado correctamente a MongoDB.")
}).catch(() => {
  console.log("Ocurrió un error al conectarse a MongoDB")
})

//========[>-----------------<]========\\
//========[> Command Handler <]========\\
//========[>-----------------<]========\\

const commands = [];
readdirSync('./src/commands').forEach(async file => {
  const command = require(`./src/commands/${file}`);
  commands.push(command.data.toJSON());
  client.commands.set(command.data.name, command);
})

//========[>---------------<]========\\
//========[> Event Handler <]========\\
//========[>---------------<]========\\

readdirSync('./src/events').forEach(async file => {
  const event = require(`./src/events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
})

//========[>-----------<]========\\
//========[> AntiCrash <]========\\
//========[>-----------<]========\\

process.on('unhandledRejection', (reason, p) => {
  console.log(reason, p)
});

process.on('uncaughtException', (err, origin) => {
  console.log('[ AntiCrash - Error Encontrado ]')
  console.log(err, origin)
});

process.on('uncaughtExceptionMonitor', (err, origin) => {
  console.log('[ AntiCrash - Error Encontrado ]')
  console.log(err, origin)
});

client.on('shardError', error => {
  console.error(error);
});

client.login(token)
