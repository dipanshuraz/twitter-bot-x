require('dotenv').config();
const { TwitterApi } = require('twitter-api-v2');

console.log('HELLO DEPLOYED !!!')

// Twitter API credentials loaded from the .env file
const client = new TwitterApi({
  appKey: process.env.API_KEY,
  appSecret: process.env.API_SECRET,
  accessToken: process.env.ACCESS_TOKEN,
  accessSecret: process.env.ACCESS_SECRET,
});

// Create a read/write client instance
const rwClient = client.readWrite;

// Define your bot username to prevent self-replies
const BOT_USERNAME = '0xAGX'; // Replace with your bot's username

// Function to listen to mentions and reply when "@AGX msg me" is found
const listenAndReply = async () => {
  try {
    // Fetch recent mentions of your bot
    const mentions = await rwClient.v2.search(`@${BOT_USERNAME}`, { max_results: 10 });

    // Loop through the mentions
    for (const tweet of mentions.data) {
      const tweetText = tweet.text.toLowerCase();

      // Check if the tweet contains "@AGX msg me" (case insensitive)
      if (tweetText.includes(`@${BOT_USERNAME.toLowerCase()} msg me`)) {
        // Ensure the bot is not replying to itself
        if (tweet.author_id !== rwClient.currentUser?.id_str) {
          const replyText = `@${tweet.username} Here's your message! 🚀`;

          // Post the reply
          await rwClient.v2.reply(replyText, tweet.id);
          console.log(`Replied to @${tweet.username}`);
        }
      }
    }
  } catch (error) {
    console.error('Error replying to tweets:', error);
  }
};

// Run the bot every minute to check for new mentions
setInterval(listenAndReply, 60000);
