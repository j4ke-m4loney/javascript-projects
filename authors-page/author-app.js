const authorContainer = document.getElementById('author-container');
const loadMoreBtn = document.getElementById('load-more-btn');

let startingIndex = 0;
let endingIndex = 8;
let authorDataArr = [];

/* Creating the API to fetch Author data and selecting only a mox of 8 authors to be loaded on the page 
through the displayAuthors function*/

fetch('https://cdn.freecodecamp.org/curriculum/news-author-page/authors.json')
  .then((res) => res.json())
  .then((data) => {
    authorDataArr = data;
    displayAuthors(authorDataArr.slice(startingIndex, endingIndex));
  })
  .catch((err) => { // Error to appear if no authors are loaded on the page. 
    authorContainer.innerHTML = '<p class="error-msg">There was an error loading the authors</p>'
  });


// Making the Load More Authors button fetch more authors whenever it's clicked. 
// Doing this by adding a click event to the button and carefully incrementing the startingIndex and endingIndex variables.

const fetchMoreAuthors = () => {
  startingIndex += 8;
  endingIndex += 8;

  displayAuthors(authorDataArr.slice(startingIndex, endingIndex));

  // Condition to show there is no more authors to load on the page
  if (authorDataArr.length <= endingIndex) {
    loadMoreBtn.disabled = true; // setting loadMoreBtn to disabled
    loadMoreBtn.style.cursor = "not-allowed"; // Change cursor value from pointer to not allowed
    loadMoreBtn.textContent = 'No more data to load'; // changing button text
  }
};

// Details of the authors to be presented on the page

const displayAuthors = (authors) => {
  authors.forEach(({ author, image, url, bio }, index) => {
    authorContainer.innerHTML += `
    <div id="${index}" class="user-card">
      <h2 class="author-name">${author}</h2>
      <img class="user-img" src="${image}" alt="${author} avatar" />
      <div class="purple-divider"></div>
      <p class="bio">${bio.length > 50 ? bio.slice(0, 50) + "..." : bio}}</p> <!-- Logic to ensure authors bios stay under 50 characters -->
      <a class="author-link" href="${url}" target="_blank">${author}'s author page</a>
    </div>
  `;
  });
};

// Load More Authors Button event listener for when btn is clicked - 8 more authors will be added. 

loadMoreBtn.addEventListener("click", fetchMoreAuthors)