const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ]
});

const token = process.env.TOKEN;
const channelId = '1390354957927972894';

async function updateCount(guild) {
  await guild.members.fetch();
  const members = guild.memberCount;
  const channel = guild.channels.cache.get(channelId);
  if (!channel) return;
  await channel.setName(`〔🍪〕Members: ${members}`);
}

client.once('ready', async () => {
  const guild = client.guilds.cache.first();
  if (!guild) return;
  await updateCount(guild);
});

client.on('guildMemberAdd', async (member) => {
  await updateCount(member.guild);
});

client.on('guildMemberRemove', async (member) => {
  await updateCount(member.guild);
});

client.login(token);
