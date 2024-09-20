require('dotenv').config();
const { TwitterApi } = require('twitter-api-v2');

// Set up Twitter client with environment variables
const client = new TwitterApi({
  appKey: process.env.API_KEY,
  appSecret: process.env.API_SECRET,
  accessToken: process.env.ACCESS_TOKEN,
  accessSecret: process.env.ACCESS_SECRET,
});

// Function to get user info for "codersadhu"
const getUserInfo = async () => {
  try {
    // Fetch user info by username
    const user = await client.v2.userByUsername('codersadhu');

    // Display user information
    console.log('User Info:');
    console.log(`Username: ${user.data.username}`);
    console.log(`Name: ${user.data.name}`);
    console.log(`ID: ${user.data.id}`);
    console.log(`Description: ${user.data.description}`);
    console.log(`Followers Count: ${user.data.public_metrics.followers_count}`);
    console.log(`Following Count: ${user.data.public_metrics.following_count}`);
    console.log(`Tweet Count: ${user.data.public_metrics.tweet_count}`);
  } catch (error) {
    console.error('Error fetching user info:', error);
  }
};

// Call the function to fetch and display user info
getUserInfo();
