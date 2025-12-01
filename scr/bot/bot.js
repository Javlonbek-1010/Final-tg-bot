import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";

dotenv.config();


 export const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

 bot.on("message", (msg) => {
   const chatId = msg.chat.id;
   const firstName = msg.from.first_name;
   
   bot.sendMessage(chatId, `Salom, ${firstName}! Bot ishga tushdi!`);
 });

console.log("Bot ishga tushdi ....");

