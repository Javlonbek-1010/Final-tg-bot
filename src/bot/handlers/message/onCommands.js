import User from "../../../models/User.js";
import onStart from "./onStart.js";

async function onCommands(msg, bot) {
  const chatId = msg.chat.id;
  const firstname = msg.chat.first_name;
  const text = msg.text;

  if (text === "/start") {
    return await onStart(msg, bot);
  }

  if (text === "/users") {
    const userSoni = await User.countDocuments();
    const allUsers = await User.find();
    console.log(allUsers);

    for (let user of allUsers) {
      await bot.sendMessage(chatId, `Foydalanuvchi: 
      Ismi: ${user.firstname}
      Username: ${user.username}
      chatId: ${user.chatId}
      `);
    }

    return bot.sendMessage(chatId, `Foydaluvchilar [${userSoni}]:`);
  }

  if (text === "/profile") {
    const existingUser = await User.findOne({ chatId: chatId });

    if (!existingUser) {
      return bot.sendMessage(chatId, `Siz ro'yxatdan o'tmagansiz. /start bosing!`);
    }

    return bot.sendMessage(chatId, `Sizning profilingiz:
    Ismingiz: ${existingUser.firstname}
    UserName: ${existingUser.username}
    Balansingiz: ${existingUser.balance} so'm
    Faol holat: ${existingUser.active ? "Faol" : "Nofaol"}
    chatId: ${existingUser.chatId}
    `);
  }

  if (text === "/help") {
    return bot.sendMessage(chatId, `Yordam kerakmi, ${firstname}?`);
  }

  return bot.sendMessage(chatId, `Xatolik, buyruq topilmadi... /start bosing!`);
}

export default onCommands;
