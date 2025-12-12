import User from "../../../models/User.js";

const chanelId = "@9_1_BOT";

async function onStart(msg, bot) {
  const chatId = msg.chat.id;
  const firstname = msg.chat.first_name;

  try {
    // Check if user is subscribed to the channel
    const chatmember = await bot.getChatMember(chanelId, chatId);

    // If not subscribed, show subscription message
    if (chatmember.status === "left" || chatmember.status === "kicked") {
      return bot.sendMessage(
        chatId,
        `Assalomu aleykum, ${firstname}! 👋\n\nBotdan foydalanish uchun avval @9_1_BOT kanaliga obuna bo'ling!`,
        { 
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "📱 Kanalga o'tish",
                  url: "https://t.me/9_1_BOT",
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

    // User is subscribed, proceed with start command
    const existingUser = await User.findOne({ chatId: chatId });

    if (!existingUser) {
      const newUser = new User({
        firstname: firstname,
        chatId: chatId,
        username: msg.chat.username || null
      });
      await newUser.save();
    }

    return bot.sendMessage(
      chatId,
      `
👋 Assalomu alaykum, ${firstname}!

📚 100x Academy o'quv markazining rasmiy botiga xush kelibsiz!

Bu bot orqali siz:
• Kurslarimiz haqida batafsil ma'lumot olasiz  
• Kurslarga onlayn ro'yxatdan o'tishingiz mumkin  
• Jadval va to'lovlar haqida ma'lumot olasiz  

Quyidagi menyudan kerakli bo'limni tanlang 👇
      `,
      {
        reply_markup: {
          keyboard: [
            [{ text: "📚 Kurslar" }, { text: "✍️ Ro'yxatdan o'tish" }],
            [{ text: "ℹ️ Markaz haqida" }, { text: "💬 Fikr bildirish" }],
            [{ text: "❓ Yordam" }],
          ],
          resize_keyboard: true,
        },
      }
    );
  } catch (err) {
    console.warn("Subscription check warning:", err.message);
    
    // If subscription check fails, still proceed with start
    const existingUser = await User.findOne({ chatId: chatId });

    if (!existingUser) {
      const newUser = new User({
        firstname: firstname,
        chatId: chatId,
        username: msg.chat.username || null
      });
      await newUser.save();
    }

    return bot.sendMessage(
      chatId,
      `
👋 Assalomu alaykum, ${firstname}!

📚 100x Academy o'quv markazining rasmiy botiga xush kelibsiz!

Bu bot orqali siz:
• Kurslarimiz haqida batafsil ma'lumot olasiz  
• Kurslarga onlayn ro'yxatdan o'tishingiz mumkin  
• Jadval va to'lovlar haqida ma'lumot olasiz  

Quyidagi menyudan kerakli bo'limni tanlang 👇
      `,
      {
        reply_markup: {
          keyboard: [
            [{ text: "📚 Kurslar" }, { text: "✍️ Ro'yxatdan o'tish" }],
            [{ text: "ℹ️ Markaz haqida" }, { text: "💬 Fikr bildirish" }],
            [{ text: "❓ Yordam" }],
          ],
          resize_keyboard: true,
        },
      }
    );
  }
}

export default onStart;
