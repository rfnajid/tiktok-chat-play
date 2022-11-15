require('dotenv').config();
const { WebcastPushConnection } = require('tiktok-live-connector');

// Username of someone who is currently live
let tiktokUsername = process.env.TIKTOK_USERNAME;

console.log(`reading live chat from ${tiktokUsername} streams`);

// Create a new wrapper object and pass the username
let tiktokLiveConnection = new WebcastPushConnection(tiktokUsername);

// Connect to the chat (await can be used as well)
tiktokLiveConnection.connect().then(state => {
    console.info(`Connected to roomId ${state.roomId}`);
}).catch(err => {
    console.error('Failed to connect', err);
})

// Define the events that you want to handle
// In this case we listen to chat messages (comments)
tiktokLiveConnection.on('chat', data => {
    console.log(`${data.uniqueId} writes: ${data.comment}`);
})

// And here we receive gifts sent to the streamer
tiktokLiveConnection.on('gift', data => {
    console.log(`${data.uniqueId} --------------- sends ${data.giftId}`);
})

tiktokLiveConnection.on('like', data => {
    console.log(`${data.uniqueId} sent ${data.likeCount} likes, total likes: ${data.totalLikeCount}`);
})

tiktokLiveConnection.on('follow', (data) => {
    console.log(data.uniqueId, "followed!");
})

tiktokLiveConnection.on('share', (data) => {
    console.log(data.uniqueId, "has shared!");
})