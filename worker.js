const TOKEN = "PUT_YOUR_BOT_TOKEN_HERE";

export default {
  async fetch(request) {
    if (request.method !== "POST") {
      return new Response("Bettehraz Bot is running!");
    }

    const update = await request.json();

    if (!update.message) {
      return new Response("OK");
    }

    const message = update.message;
    const text = message.text || "";

    if (text === "/start") {
      await sendMessage(
        message.chat.id,
        "🎮 Bettehraz Bot\n\n🏀 /basket 100\n🎲 /dice 100\n🎯 /dart 100\n\n💰 /balance\n\n🇮🇷 فارسی و 🇬🇧 English"
      );
    }

    return new Response("OK");
  }
};

async function sendMessage(chatId, text) {
  await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: text
    })
  });
}
