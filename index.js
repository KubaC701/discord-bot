const { Client, GatewayIntentBits } = require("discord.js");
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async (message) => {
  const [_index, word] = message.content.toLowerCase().split(' ');
  const messages = await message.channel.messages.fetch({ limit: 2 });
  const lastMessage = messages.last();
  const [_lastIndex, lastWord] = lastMessage.content.toLowerCase().split(' ');
  const hasTheSameLetter =
    word?.[0] === lastWord?.[lastWord.length - 1];
  const index = parseInt(_index, 10);
  const lastIndex = parseInt(_lastIndex, 10);
  if (
    isNaN(index) ||
    isNaN(lastIndex) ||
    index !== lastIndex + 1 ||    
    !hasTheSameLetter
  )
    message.delete();

})

client.login(process.env.TOKEN);
