// pages/api/telegram/webhook.js

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

async function sendMessage(chatId, text, keyboard = null) {
  const payload = {
    chat_id: chatId,
    text,
    parse_mode: "HTML",
    ...(keyboard && { reply_markup: { inline_keyboard: keyboard } }),
  };

  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  await new Promise((resolve) => setTimeout(resolve, 800));
}

async function simulateConversation(chatId, trigger) {
  switch (trigger) {
    case "/start":
      await sendMessage(
        chatId,
        "🧙‍♂️ Welcome to DeFi Sage! Your trusted advisor for crypto insights and alerts."
      );
      await sendMessage(chatId, "What wisdom do you seek today?", [
        [{ text: "🔥 Hot DeFi Projects", callback_data: "defi_hot" }],
        [{ text: "🚨 Set Price Alerts", callback_data: "price_alerts" }],
        [{ text: "📈 Market Analysis", callback_data: "market_analysis" }],
        [{ text: "🐕 Meme Coins", callback_data: "meme_trending" }],
      ]);
      break;

    case "price_alerts":
      await sendMessage(
        chatId,
        "⚡️ Current Active Alerts:\n\n" +
          "1. ETH < $3,000 ⬇️\n" +
          "2. BTC > $52,000 ⬆️\n" +
          "3. PEPE < $0.000001 ⬇️\n\n" +
          "Select alert type:",
        [
          [
            { text: "⬆️ Above Price", callback_data: "alert_above" },
            { text: "⬇️ Below Price", callback_data: "alert_below" },
          ],
          [
            { text: "📊 View Alerts", callback_data: "view_alerts" },
            { text: "❌ Clear Alerts", callback_data: "clear_alerts" },
          ],
        ]
      );
      break;

    case "alert_above":
      await sendMessage(
        chatId,
        "📈 Popular tokens to track:\n\n" +
          "• BTC ($48,250)\n" +
          "• ETH ($2,850)\n" +
          "• SOL ($98.5)\n" +
          "• PEPE ($0.0000009)\n\n" +
          "Send token and price like:\n" +
          "<code>BTC 50000</code>"
      );
      break;

    case "alert_below":
      await sendMessage(
        chatId,
        "📉 Support levels to watch:\n\n" +
          "• BTC ($47,500)\n" +
          "• ETH ($2,800)\n" +
          "• SOL ($95.0)\n" +
          "• PEPE ($0.0000008)\n\n" +
          "Send token and price like:\n" +
          "<code>ETH 2800</code>"
      );
      break;

    case "market_analysis":
      await sendMessage(
        chatId,
        "🧙‍♂️ DeFi Sage's Market Vision:\n\n" +
          "🌍 Market Overview:\n" +
          "• Market Sentiment: Bullish\n" +
          "• 24h Volume: $52B (+8%)\n" +
          "• BTC Dominance: 51%\n\n" +
          "⚠️ Critical Levels:\n" +
          "BTC: $47,500 Support | $49,800 Resist\n" +
          "ETH: $2,800 Support | $3,100 Resist\n\n" +
          "🔥 Trending:\n" +
          "1. L2s (+18% 24h)\n" +
          "2. Gaming (+15% 24h)\n" +
          "3. Meme (+12% 24h)"
      );
      await sendMessage(chatId, "Want to set price alerts for these levels?", [
        [{ text: "🚨 Set Alert", callback_data: "price_alerts" }],
        [{ text: "🔄 Refresh Analysis", callback_data: "market_analysis" }],
      ]);
      break;

    case "defi_hot":
      await sendMessage(chatId, "Choose your path of enlightenment:", [
        [
          { text: "💸 Yield Farms", callback_data: "defi_yield" },
          { text: "🔄 DEX", callback_data: "defi_dex" },
        ],
        [
          { text: "🏦 Lending", callback_data: "defi_lending" },
          { text: "🎮 GameFi", callback_data: "defi_gamefi" },
        ],
        [{ text: "🚨 Price Alerts", callback_data: "price_alerts" }],
      ]);
      break;

    case "meme_trending":
      await sendMessage(
        chatId,
        "🧙‍♂️ The Sage's Meme Watchlist:\n\n" +
          "1. 🐸 PEPE\n" +
          "• Price: $0.0000009\n" +
          "• 24h: +15%\n" +
          "• Alert: Set at $0.000001 ⬆️\n\n" +
          "2. 🤖 WOJAK\n" +
          "• Price: $0.0004\n" +
          "• 24h: +8%\n" +
          "• Volume: $2.5M\n\n" +
          "3. 🦊 SHIB\n" +
          "• Price: $0.00001\n" +
          "• 24h: +5%\n" +
          "• Volume: $150M"
      );
      await sendMessage(
        chatId,
        "⚠️ The Sage advises: Meme coins are highly volatile!",
        [
          [{ text: "🚨 Set Alert", callback_data: "price_alerts" }],
          [{ text: "🔄 Refresh Prices", callback_data: "meme_trending" }],
        ]
      );
      break;

    // Handle other cases from previous implementation...
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
    return;
  }

  try {
    const { message, callback_query } = req.body;

    if (callback_query) {
      const chatId = callback_query.from.id;
      await simulateConversation(chatId, callback_query.data);

      await fetch(
        `https://api.telegram.org/bot${BOT_TOKEN}/answerCallbackQuery`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            callback_query_id: callback_query.id,
          }),
        }
      );
    }

    if (message) {
      const chatId = message.chat.id;

      if (message.text === "/start") {
        await simulateConversation(chatId, "/start");
      }

      // Handle price alert settings
      if (message.text && message.text.includes(" ")) {
        const [token, price] = message.text.split(" ");
        if (!isNaN(price)) {
          await sendMessage(
            chatId,
            `🚨 Alert set!\n\n` +
              `Token: ${token.toUpperCase()}\n` +
              `Target: $${price}\n\n` +
              `I'll notify you when the price crosses this level.`,
            [[{ text: "🔄 Set Another Alert", callback_data: "price_alerts" }]]
          );
        }
      }
    }

    res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Webhook error:", error);
    res.status(500).json({ error: "Error processing webhook" });
  }
}
