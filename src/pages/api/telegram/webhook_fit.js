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

  // Add a small delay to make messages appear naturally
  await new Promise((resolve) => setTimeout(resolve, 800));
}

async function simulateConversation(chatId, trigger) {
  switch (trigger) {
    case "/start":
      await sendMessage(
        chatId,
        "🏋️‍♂️ Welcome to FitnessBuddy AI! I'm here to help you track your fitness journey and earn rewards."
      );
      await sendMessage(
        chatId,
        "Ready to get started? Upload activities to earn $FIT tokens or get a personalized workout!",
        [
          [{ text: "📸 Upload Activity", callback_data: "upload" }],
          [{ text: "💪 Get Workout", callback_data: "workout_start" }],
          [{ text: "💰 Check Balance", callback_data: "balance" }],
        ]
      );
      break;

    case "upload":
      await sendMessage(
        chatId,
        "Perfect! Send me a screenshot of your Apple Fitness activity rings."
      );
      await sendMessage(
        chatId,
        "Tip: Make sure all three rings are visible in the screenshot! 🎯"
      );
      break;

    case "photo_uploaded":
      await sendMessage(chatId, "🔍 Analyzing your activity rings...");
      await sendMessage(
        chatId,
        "✨ Great work! I can see you've closed your rings."
      );
      await sendMessage(
        chatId,
        "🎉 You've earned 10 $FIT tokens for this achievement!",
        [
          [{ text: "📸 Upload Another", callback_data: "upload" }],
          [{ text: "💰 View Balance", callback_data: "balance" }],
        ]
      );
      break;

    case "balance":
      // In production, fetch real balance from database
      const fakeBalance = 10;
      await sendMessage(chatId, `💰 Your current balance: ${fakeBalance} $FIT`);
      await sendMessage(
        chatId,
        "Keep closing those rings to earn more tokens! What would you like to do next?",
        [
          [{ text: "📸 Upload Activity", callback_data: "upload" }],
          [{ text: "📊 View Stats", callback_data: "stats" }],
        ]
      );
      break;

    case "stats":
      await sendMessage(
        chatId,
        "📊 Your Fitness Stats:\n\n" +
          "🏃‍♂️ Activities Tracked: 1\n" +
          "🎯 Rings Closed: 1\n" +
          "💰 Total $FIT Earned: 10"
      );
      await sendMessage(chatId, "Ready to add another achievement?", [
        [{ text: "📸 Upload Activity", callback_data: "upload" }],
        [{ text: "💪 Get Workout", callback_data: "workout_start" }],
      ]);
      break;

    case "workout_start":
      await sendMessage(
        chatId,
        "💪 Let's get you a workout! What would you like to focus on today?",
        [
          [
            { text: "💪 Arms", callback_data: "workout_arms" },
            { text: "🦵 Legs", callback_data: "workout_legs" },
          ],
          [
            { text: "🏃 Core", callback_data: "workout_core" },
            { text: "🏋️ Full Body", callback_data: "workout_full" },
          ],
        ]
      );
      break;

    case "workout_arms":
      await sendMessage(
        chatId,
        "💪 Here's your Arms workout:\n\n" +
          "1️⃣ Push-ups: 3 sets of 12-15 reps\n" +
          "2️⃣ Diamond Push-ups: 3 sets of 8-12 reps\n" +
          "3️⃣ Tricep Dips: 3 sets of 12-15 reps\n" +
          "4️⃣ Pike Push-ups: 3 sets of 8-12 reps\n" +
          "5️⃣ Arm Circles: 3 sets of 30 seconds\n\n" +
          "Rest 60-90 seconds between sets"
      );
      await sendMessage(
        chatId,
        "Ready to get started? Don't forget to share your workout results!",
        [
          [{ text: "📸 Share Results", callback_data: "upload" }],
          [{ text: "🔄 Different Workout", callback_data: "workout_start" }],
        ]
      );
      break;

    case "workout_legs":
      await sendMessage(
        chatId,
        "🦵 Here's your Legs workout:\n\n" +
          "1️⃣ Bodyweight Squats: 4 sets of 15-20 reps\n" +
          "2️⃣ Lunges: 3 sets of 12 reps per leg\n" +
          "3️⃣ Jump Squats: 3 sets of 10-15 reps\n" +
          "4️⃣ Calf Raises: 4 sets of 20 reps\n" +
          "5️⃣ Wall Sit: 3 sets of 45 seconds\n\n" +
          "Rest 60-90 seconds between sets"
      );
      await sendMessage(
        chatId,
        "Ready to crush leg day? Share your results when done!",
        [
          [{ text: "📸 Share Results", callback_data: "upload" }],
          [{ text: "🔄 Different Workout", callback_data: "workout_start" }],
        ]
      );
      break;

    case "workout_core":
      await sendMessage(
        chatId,
        "🏃 Here's your Core workout:\n\n" +
          "1️⃣ Planks: 3 sets of 45 seconds\n" +
          "2️⃣ Russian Twists: 3 sets of 20 reps\n" +
          "3️⃣ Mountain Climbers: 3 sets of 30 seconds\n" +
          "4️⃣ Bicycle Crunches: 3 sets of 20 reps\n" +
          "5️⃣ Leg Raises: 3 sets of 12-15 reps\n\n" +
          "Rest 45-60 seconds between sets"
      );
      await sendMessage(
        chatId,
        "Time to strengthen that core! Share your workout when finished!",
        [
          [{ text: "📸 Share Results", callback_data: "upload" }],
          [{ text: "🔄 Different Workout", callback_data: "workout_start" }],
        ]
      );
      break;

    case "workout_full":
      await sendMessage(
        chatId,
        "🏋️ Here's your Full Body workout:\n\n" +
          "1️⃣ Burpees: 3 sets of 10 reps\n" +
          "2️⃣ Push-ups: 3 sets of 12-15 reps\n" +
          "3️⃣ Bodyweight Squats: 3 sets of 15-20 reps\n" +
          "4️⃣ Mountain Climbers: 3 sets of 30 seconds\n" +
          "5️⃣ Plank to Downward Dog: 3 sets of 10 reps\n\n" +
          "Rest 60-90 seconds between sets"
      );
      await sendMessage(
        chatId,
        "Let's get that full body workout in! Share your results after!",
        [
          [{ text: "📸 Share Results", callback_data: "upload" }],
          [{ text: "🔄 Different Workout", callback_data: "workout_start" }],
        ]
      );
      break;
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

      // Answer callback query to remove loading state
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

      if (message.photo) {
        await simulateConversation(chatId, "photo_uploaded");
      }
    }

    res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Webhook error:", error);
    res.status(500).json({ error: "Error processing webhook" });
  }
}
