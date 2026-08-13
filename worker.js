export default {
  async fetch(request, env) {
    if (request.method === "GET") {
      return new Response("Bettehraz Bot is running!");
    }

    if (request.method !== "POST") {
      return new Response("OK");
    }

    try {
      const update = await request.json();

      if (update.message) {
        const chatId = update.message.chat.id;
        const text = update.message.text || "";

        if (text === "/start") {
          await fetch(`https://api.telegram.org/bot${env.BOT_TOKEN}/sendMessage`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              chat_id: chatId,
              text:
                "🎮 Bettehraz Bot\n\n" +
                "🏀 /basket 100\n" +
                "🎲 /dice 100\n" +
                "🎯 /dart 100\n\n" +
                "💰 /balance\n\n" +
                "🇮🇷 فارسی و 🇬🇧 English"
            })
          });
        }
      }

      return new Response("OK");
    } catch (error) {
      return new Response("OK");
    }
  }
};
