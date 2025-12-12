import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
import onCommands from "./handlers/message/onCommands.js";
import onError from "./handlers/message/onError.js";
import { Query } from "mongoose";
import onStart from "./handlers/message/onStart.js";
dotenv.config();
const chanelId = "@IT_Park91";
//https://t.me/academy_100x_uz

export const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

bot.on("message", async function (msg) {
  try {
    const chatId = msg?.chat?.id;
    const firstname = msg?.chat?.first_name;
    const text = msg?.text;

    if (!text) return onError(msg, bot);

    // Check channel subscription
    try {
      const chatmember = await bot.getChatMember(chanelId, chatId);
      
      if (chatmember.status === "left" || chatmember.status === "kicked") {
        return bot.sendMessage(
          chatId,
          `Assalomu aleykum, ${firstname}! Botdan foydalanish uchun avval @IT_Park91 kanaliga obuna bo'ling!`,
          { 
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: "Kanalga o'tish",
                    url: "https://t.me/IT_Park91",
                  },
                ],
                [
                  {
                    text: "✅ Obunani tasdiqlash",
                    callback_data: "confirm_subscription",
                  },
                ],
              ],
            },
          }
        );
      }
    } catch (subErr) {
      console.warn("Subscription check warning:", subErr.message);
      // Continue anyway if subscription check fails
    }

    if (text.startsWith("/")) {
      return await onCommands(msg, bot);
    }

    return onError(msg, bot);
  } catch (err) {
    console.error("Message handler error:", err);
    return onError(msg, bot);
  }
});


bot.on("callback_query", async (query) => {
  try {
    const data = query.data;
    const chatId = query.message.chat.id;
    const firstname = query.message.chat.first_name;

    if (data === "confirm_subscription") {
      try {
        const chatmember = await bot.getChatMember(chanelId, chatId);
        
        if (chatmember.status === "left" || chatmember.status === "kicked") {
          return bot.sendMessage(
            chatId,
            `Kechirasiz, ${firstname}! Siz hali @IT_Park91 kanaliga obuna bo'lmagansiz. Iltimos obuna bo'ling va qayta urinib ko'ring.`,
            { 
              reply_markup: {
                inline_keyboard: [
                  [
                    {
                      text: "Kanalga o'tish",
                      url: "https://t.me/IT_Park91",
                    },
                  ],
                  [
                    {
                      text: "✅ Obunani tasdiqlash",
                      callback_data: "confirm_subscription",
                    },
                  ],
                ],
              },
            }
          );
        } else {
          return onStart(query.message, bot);
        }
      } catch (subErr) {
        console.warn("Subscription check warning:", subErr.message);
        return bot.sendMessage(chatId, `✅ Rahmat! Botdan foydalanishingiz mumkin.`);
      }
    }
  } catch (err) {
    console.error("Callback query error:", err);
  }
});

console.log("Bot ishga tushdi...");