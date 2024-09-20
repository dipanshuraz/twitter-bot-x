require("dotenv").config();
const axios = require("axios");
const { TwitterApi } = require("twitter-api-v2");

const client = new TwitterApi({
  appKey: process.env.CONSUMER_KEY,
  appSecret: process.env.CONSUMER_SECRET,
  accessToken: process.env.ACCESS_TOKEN,
  accessSecret: process.env.ACCESS_TOKEN_SECRET,
});

console.log({
  CONSUMER_KEY: process.env.CONSUMER_KEY,
  CONSUMER_SECRET: process.env.CONSUMER_SECRET,
  ACCESS_TOKEN: process.env.ACCESS_TOKEN,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
});

async function getRandomQuote() {
  try {
    // Use ZenQuotes API
    const response = await axios.get("https://zenquotes.io/api/random");
    if (response.status === 200) {
      return response.data[0].q; // Return the quote
    } else {
      throw new Error("Failed to fetch the quote");
    }
  } catch (error) {
    console.error("Error fetching quote:", error);
    return "Quote not available"; // Default message if fetching fails
  }
}

async function postTweet(tweetText) {
  try {
    const { data } = await client.v2.tweet(tweetText);
    console.log("Successfully tweeted:", data);
  } catch (error) {
    console.error("Error posting tweet:", error);
  }
}

(async function () {
  const quote = await getRandomQuote();
  console.log("Fetched Quote:", quote); // Optional: print the fetched quote
  postTweet(quote); // Post the fetched quote as a tweet
})();
