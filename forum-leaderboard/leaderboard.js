const { JSDOM } = require("jsdom");
const { document } = new JSDOM('<!doctype html><html><body><div id="posts-container"></div></body></html>').window;

const forumLatest = "https://cdn.freecodecamp.org/curriculum/forum-latest/latest.json";
const forumTopicUrl = "https://forum.freecodecamp.org/t/";
const forumCategoryUrl = "https://forum.freecodecamp.org/c/";
const avatarUrl = "https://sea1.discourse-cdn.com/freecodecamp";

const postsContainer = document.getElementById("posts-container");

// Display data in Activity column 
const timeAgo = (time) => {
  const currentTime = new Date(); // the current time and date
  const lastPost = new Date(time); // the date of the last activity on a topic,
  const minutes = Math.floor((currentTime - lastPost) / 60000);
  const hours = Math.floor((currentTime - lastPost) / 3600000);
  const days = Math.floor((currentTime - lastPost) / 86400000);
  // If the amount of minutes that have passed is less than 60
  if (minutes < 60) {
    return `${minutes}m ago`;
  }
  // If the amount of hours that have passed is less than 24
  if (hours < 24) {
    return `${hours}h ago`;
  } else {
    return `${days}d ago`;
  }
};

// To populate the forum leaderboard with data, you need to request the data from an API. 
// It's known as an asynchronous operation, which means that tasks execute independently of the main program flow.
// Using the async keyword to create an asynchronous function, which returns a promise.
const fetchData = async () => {
  try {
    const res = await fetch(forumLatest);
    const data = await res.json();
    showLatestPosts(data); // calling function to see changes
  } catch (err) {
    console.log(err)
  }
};

fetchData();

// To display data on the page
const showLatestPosts = (data) => {
  const { topic_list, users } = data; // Destructuring to these properties from data object
  const { topics } = topic_list; // Destructuring the topics array from the topic_list object
  postsContainer.innerHTML = topics.map((item) => { // Call map() on topics and assign it innerHTML
    const {
      id,
      title,
      views,
      posts_count,
      slug,
      posters,
      category_id,
      bumped_at,
    } = item; // Destructuring properties from the item object
    // Building out the table to display the forum data
    return `
    <tr>
      <td>
        <p class="post-title">${title}</p>
      </td>
      <td></td>
      <td>${posts_count - 1}</td>
      <td>${views}</td>
      <td></td>
    </tr>`;
  }).join(""); // To remove commas in columns 
};