const { ActivityType } = require("discord.js")
module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		let activities = [`¡Hola Mundo!`], i = 0;
		setInterval(() => client.user.setActivity({ name: `${activities[i++ % activities.length]}`, type: ActivityType.Playing }), 22000);
	}
};
