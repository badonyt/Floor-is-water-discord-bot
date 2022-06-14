const https = require("https");
let Leaderboard = NaN;
const httpsrequestlinkany =
	"https://www.speedrun.com/api/v1/leaderboards/o6gn8291/category/5dwnm8gd?var-7891w53n=4qyg0edq";
const Discord = require("discord.js");
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
const prefix = ".";
let finaldata;
const httpsrequestlinkdie = "https://www.speedrun.com/api/v1/leaderboards/o6gn8291/category/ndxnzjok?var-7891w53n=4qyg0edq"
// let sendlink;
const fs = require("fs");
client.commands = new Discord.Collection();

const commandFiles = fs
	.readdirSync("./commands/")
	.filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	client.commands.set(command.name, command);
}

client.once("ready", () => {
	console.log(`The bot ${client.user.tag} is online!`);
	client.user.setActivity(`${prefix}help and ${prefix}commands`, {
		type: "PLAYING",
	});
});

client.on("message", (message) => {
	if(!message.author.bot && message.guildId == 960241221937291334){
		var datae = new Date();
		
		console.log(`${message.author.tag} {${message.guild}, #${message.channel.name}}: ${message.content}                      date: ${datae.toLocaleString()}`)
		
		const chan = client.channels.cache.get("960241222620954677")
		chan.send(`${message.author.tag} {${message.guild}, #${message.channel.name}}: ${message.content}                      date: ${datae.toLocaleString()}`)
	}
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	if (command == "ping") {
		var yourping = new Date().getTime() - message.createdTimestamp;
		var botping = Math.round(client.ws.ping);
		console.log(`The users ${message.author.tag} ping is ${yourping}`);
		message.channel.send(`Bots ping: ${botping}`);
	} else if (command == "anywr1.1") {
		try {
			https.get(httpsrequestlinkany, (response) => {
				let body = "";
				response.on("data", (chunk) => {
					body += chunk;
				});
				let bodyString;

				response.on("end", () => {
					bodyString = body.toString();
					finaldata = bodyString;
					console.log(body);
					require("fs").writeFileSync(
						"SpeedrunLeaderboardany.json",
						JSON.stringify(body)
					);
					Leaderboard = require("./SpeedrunLeaderboardany.json");
					console.log(Leaderboard.data);

					message.channel.send(
						"The link of the wr is " +
							JSON.parse(Leaderboard).data.runs[0].run.weblink +
							" with a time of " +
							JSON.parse(Leaderboard).data.runs[0].run.times
								.primary_t
					);
				});
			});
		} catch (err) {
			console.log("We couldnt perform this action try again later");
			message.channel.send(
				"We couldnt perform this action try again later"
			);
			message.channel.send(err);
		}
	} else if (command == "help") {
		client.commands.get("help").execute(message, args);
	} else if (command == "sendauthor") {
		message.author.send("test");
	} else if (command == "chad") {
		if (message.member.permissions.has("ADMINISTRATOR")) {
			message.channel.send("yes");
		} else {
			message.channel.send("no");
		}
	} else if (command == "server") {
		message.author.send("ok");
	} else if (command == "commands") {
		message.channel.send("ping, anywr1.1, diewr1.1, help");
	}else if(command == "diewr1.1"){
		try {
			https.get(httpsrequestlinkdie, (response) => {
				let body = "";
				response.on("data", (chunk) => {
					body += chunk;
				});
				let bodyString;

				response.on("end", () => {
					bodyString = body.toString();
					finaldata = bodyString;
					console.log(body);
					require("fs").writeFileSync(
						"SpeedrunLeaderboardie.json",
						JSON.stringify(body)
					);
					Leaderboard = require("./SpeedrunLeaderboardie.json");
					console.log(Leaderboard.data);

					message.channel.send(
						"The link of the wr is " +
							JSON.parse(Leaderboard).data.runs[0].run.weblink +
							" with a time of " +
							JSON.parse(Leaderboard).data.runs[0].run.times
								.primary_t
					);
				});
			});
		} catch (err) {
			console.log("We couldnt perform this action try again later");
			message.channel.send(
				"We couldnt perform this action try again later"
			);
			message.channel.send(err);
		}
	}
});

const configs = require('./config.json');
client.login(configs.token);
