const { Client, GatewayIntentBits, ChannelType } = require('discord.js');
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers]
});

const token = process.env.TOKEN;
const channelId = '1401242406338170880';

async function updateCount(guild, fetchMembers) {
  if (fetchMembers) await guild.members.fetch();
  const members = guild.memberCount;
  const channel = guild.channels.cache.get(channelId) || await guild.channels.fetch(channelId).catch(() => null);
  if (!channel) return console.error('Canale non trovato o non accessibile');
  if (![ChannelType.GuildVoice, ChannelType.GuildText].includes(channel.type)) return console.error('Tipo canale non valido per rinomina');
  await channel.setName(`〔🍪〕Members: ${members}`).catch(e => console.error('Errore nel rinominare:', e));
}

client.once('ready', async () => {
  const guild = client.guilds.cache.first();
  if (!guild) return;
  await updateCount(guild, true);
});

client.on('guildMemberAdd', async (member) => {
  await updateCount(member.guild, false);
});

client.on('guildMemberRemove', async (member) => {
  await updateCount(member.guild, false);
});

client.login(token);
