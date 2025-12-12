function onError(msg, bot) {
  if (msg && bot) {
    const chatId = msg.chat.id;
    return bot.sendMessage(chatId, `Noto'g'ri buyruq. /help bosing!`);
  }
  console.log(`Error!`);
}

export default onError;