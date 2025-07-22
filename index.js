const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers]
});

const token = process.env.TOKEN;
const channelId = '1390354957927972894';

async function updateCount(guild, fetchMembers) {
  if (fetchMembers) await guild.members.fetch();
  const members = guild.memberCount;
  const channel = await guild.channels.fetch(channelId);
  if (!channel) return;
  await channel.setName(`〔🍪〕Members: ${members}`);
}

client.once('ready', async () => {
  const guild = client.guilds.cache.first();
  if (!guild) return;
  await updateCount(guild, true);
});

client.on('guildMemberAdd', async (member) => {
  await updateCount(member.guild, true);
});

client.on('guildMemberRemove', async (member) => {
  await updateCount(member.guild, false);
});

client.login(token);
