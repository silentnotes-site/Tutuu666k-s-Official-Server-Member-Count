const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers
    ]
});

const token = 'MTM5Njk5MzA0NTk5MTUyNjUyMQ.GTfIKo.rrwcmH8StmSf95D8J3N1QsYaTJrHFxUcUeZxG8';
const channelId = '1390354957927972894';

client.once('ready', async () => {
    console.log(`Bot attivo come ${client.user.tag}`);
    const guild = client.guilds.cache.first();
    if (!guild) return console.error('Il bot non è in nessun server');

    const channel = guild.channels.cache.get(channelId);
    if (!channel) return console.error('Canale non trovato');

    const members = guild.members.cache.filter(m => !m.user.bot).size;
    await channel.setName(`〔🍪〕Members: ${members}`);
});

client.on('guildMemberAdd', async (member) => {
    const channel = member.guild.channels.cache.get(channelId);
    if (!channel) return;

    const members = member.guild.members.cache.filter(m => !m.user.bot).size;
    await channel.setName(`〔🍪〕Members: ${members}`);
});

client.on('guildMemberRemove', async (member) => {
    const channel = member.guild.channels.cache.get(channelId);
    if (!channel) return;

    const members = member.guild.members.cache.filter(m => !m.user.bot).size;
    await channel.setName(`〔🍪〕Members: ${members}`);
});

client.login(token);
