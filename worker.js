export default {
  async fetch(request, env) {
    console.log("REQUEST:", request.method, request.url);

    if (request.method === "GET") {
      return new Response("Bettehraz Bot is running!");
    }

    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405 });
    }

    try {
      const update = await request.json();

      console.log("TELEGRAM UPDATE:", JSON.stringify(update));

      if (update.message) {
        const chatId = update.message.chat.id;
        const text = update.message.text || "";

        console.log("CHAT ID:", chatId);
        console.log("TEXT:", text);

        if (text === "/start") {
          const response = await fetch(
            `https://api.telegram.org/bot${env.BOT_TOKEN}/sendMessage`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                chat_id: chatId,
                text: "🎮 Bettehraz Bot\n\n🏀 بسکتبال\n🎲 تاس\n🎯 دارت\n\n🇮🇷 فارسی | 🇬🇧 English"
              })
            }
          );

          console.log("TELEGRAM RESPONSE:", await response.text());
        }
      }

      return new Response("OK", { status: 200 });

    } catch (error) {
      console.log("ERROR:", error.message);
      return new Response("OK", { status: 200 });
    }
  }
};
