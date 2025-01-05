const { JSDOM } = require("jsdom");
const { document } = new JSDOM('<!doctype html><html><body><div id="posts-container"></div></body></html>').window;

const forumLatest = "https://cdn.freecodecamp.org/curriculum/forum-latest/latest.json";
const forumTopicUrl = "https://forum.freecodecamp.org/t/";
const forumCategoryUrl = "https://forum.freecodecamp.org/c/";
const avatarUrl = "https://sea1.discourse-cdn.com/freecodecamp";

const postsContainer = document.getElementById("posts-container");

// To populate the forum leaderboard with data, you need to request the data from an API. 
// It's known as an asynchronous operation, which means that tasks execute independently of the main program flow.
// Using the async keyword to create an asynchronous function, which returns a promise.
const fetchData = async () => {
  try {
    const res = await fetch(forumLatest);
    const data = await res.json();

  } catch (err) {
    console.log(err)
  }
};

fetchData();

// To display data on the page
const showLatestPosts = (data) => {

};