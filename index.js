require('dotenv').config();
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
  try {
    await guild.members.fetch();
    const members = guild.memberCount;
    const channel = guild.channels.cache.get(channelId);
    if (!channel) return;
    await channel.setName(`〔🍪〕Members: ${members}`);
  } catch (err) {
    console.error('❌ Errore updateCount:', err);
  }
}

client.once('ready', async () => {
  console.log(`✅ Bot attivo come ${client.user.tag}`);
  const guild = client.guilds.cache.first();
  if (!guild) return console.error('❌ Il bot non è in nessun server');
  await updateCount(guild); 
});

client.on('guildMemberAdd', async (member) => {
  console.log('➡️ Nuovo membro:', member.user.tag);
  await updateCount(member.guild); 
});

client.on('guildMemberRemove', async (member) => {
  console.log('⬅️ Membro rimosso:', member.user.tag);
  await updateCount(member.guild);
});

client.login(token);
