import { bot } from "../../bot.js";

function onCommands(msg) {
  const chatId = msg.chat.id;
  const firstname = msg.chat.first_name;
  const text = msg.text;

  if (text == "/start") {
    return bot.sendMessage(
      chatId,
      `Assalomu aleykum, xush kelibsiz, ${firstname}`
    );
  }

  if (text == "/help") {
    return bot.sendMessage(chatId, `Yordam kerakmi, ${firstname}?`);
  }

  return bot.sendMessage(chatId, `Xatolik, buyruq topilmadi... /start bosing!`);

}

export default onCommands;