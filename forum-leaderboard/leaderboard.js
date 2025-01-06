const { JSDOM } = require("jsdom");
const { document } = new JSDOM('<!doctype html><html><body><div id="posts-container"></div></body></html>').window;

const forumLatest = "https://cdn.freecodecamp.org/curriculum/forum-latest/latest.json";
const forumTopicUrl = "https://forum.freecodecamp.org/t/";
const forumCategoryUrl = "https://forum.freecodecamp.org/c/";
const avatarUrl = "https://sea1.discourse-cdn.com/freecodecamp";

const postsContainer = document.getElementById("posts-container");

// Building out a category object to hold all forum categories and classNames for styling
const allCategories = {
  299: { category: "Career Advice", className: "career" },
  409: { category: "Project Feedback", className: "feedback" },
  417: { category: "freeCodeCamp Support", className: "support" },
  421: { category: "JavaScript", className: "javascript" },
  423: { category: "HTML - CSS", className: "html-css" },
  424: { category: "Python", className: "python" },
  432: { category: "You Can Do This!", className: "motivation" },
  560: { category: "Backend Development", className: "backend" }
};

// Function to retrieve the category name from allCategories 
const forumCategory = (id) => {
  let selectedCategory = {}; // Used to store category name and class name for each category 

  if (allCategories.hasOwnProperty(id)) { // Checks is allCategories object has a property of id
    const { className, category } = allCategories[id]; // Destructure className and category from allCategories

    selectedCategory.className = className; // Adding to selectedCategory object
    selectedCategory.category = category; // Adding to selectedCategory object
  } else {
    selectedCategory.className = "general";
    selectedCategory.category = "General";
    selectedCategory.id = 1;
  }
  const url = `${forumCategoryUrl}${selectedCategory.className}/${id}`; // Every category has a URL that points to the category of freeCodeCamp forum
  const linkText = selectedCategory.category; // This will display the name of the category
  const linkClass = `category ${selectedCategory.className}`; // Class names used to apply styles from the anchor element

  return `<a href="${url}" class="${linkClass}" target="_blank">${linkText}</a>`;

};

// Display data in the Activity column 
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

// Function to convert Views count more readable format ex: 1K instead of 1000
const viewCount = (views) => {
  if (views >= 1000) {
    return `${Math.floor(views / 1000)}k`;
  } else {
    return views;
  }
};

// Function that presents avatars participating in the conversation
const avatars = (posters, users) => {
  return posters.map((poster) => { // Start by looping through posters array to get all avatars 
    const user = users.find((user) => user.id === poster.user_id); // Find correct users in user array
    if (user) {
      const avatar = user.avatar_template.replace(/{size}/, 30); // Customize Avatar size
      const userAvatarUrl = avatar.startsWith("/user_avatar/") // Construct the userAvatarUrl
        ? avatarUrl.concat(avatar)
        : avatar;
      return `<img src="${userAvatarUrl}" alt="${user.name}">` // Return the image for the user avatar
    }
  }).join("");
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
        <a class="post-title" target="_blank" href="${forumTopicUrl}${slug}/${id}">${title}</a>
        ${forumCategory(category_id)}
      </td>
      <td>
        <div class="avatar-container">
          ${avatars(posters, users)}
        </div>
      </td>
      <td>${posts_count - 1}</td>
      <td>${viewCount(views)}</td> 
      <td>${timeAgo(bumped_at)}</td>
    </tr>`;
  }).join(""); // To remove commas in columns 
};