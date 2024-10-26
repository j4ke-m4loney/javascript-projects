// Get the elements related to the playlist and control buttons
const playlistSongs = document.getElementById("playlist-songs");
const playButton = document.getElementById("play");
const pauseButton = document.getElementById("pause");
const nextButton = document.getElementById("next");
const previousButton = document.getElementById("previous");
const shuffleButton = document.getElementById("shuffle");

// Array of songs available for the playlist
const allSongs = [
  // List of song objects with details like id, title, artist, duration, and source
  {
    id: 0,
    title: "Scratching The Surface",
    artist: "Quincy Larson",
    duration: "4:25",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/scratching-the-surface.mp3",
  },
  {
    id: 1,
    title: "Can't Stay Down",
    artist: "Quincy Larson",
    duration: "4:15",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/can't-stay-down.mp3",
  },
  {
    id: 2,
    title: "Still Learning",
    artist: "Quincy Larson",
    duration: "3:51",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/still-learning.mp3",
  },
  {
    id: 3,
    title: "Cruising for a Musing",
    artist: "Quincy Larson",
    duration: "3:34",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/cruising-for-a-musing.mp3",
  },
  {
    id: 4,
    title: "Never Not Favored",
    artist: "Quincy Larson",
    duration: "3:35",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/never-not-favored.mp3",
  },
  {
    id: 5,
    title: "From the Ground Up",
    artist: "Quincy Larson",
    duration: "3:12",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/from-the-ground-up.mp3",
  },
  {
    id: 6,
    title: "Walking on Air",
    artist: "Quincy Larson",
    duration: "3:25",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/walking-on-air.mp3",
  },
  {
    id: 7,
    title: "Can't Stop Me. Can't Even Slow Me Down.",
    artist: "Quincy Larson",
    duration: "3:52",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/cant-stop-me-cant-even-slow-me-down.mp3",
  },
  {
    id: 8,
    title: "The Surest Way Out is Through",
    artist: "Quincy Larson",
    duration: "3:10",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/the-surest-way-out-is-through.mp3",
  },
  {
    id: 9,
    title: "Chasing That Feeling",
    artist: "Quincy Larson",
    duration: "2:43",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/chasing-that-feeling.mp3",
  },
];

// Create a new Audio object for playback
const audio = new Audio();
// User data to keep track of current songs and playback state
let userData = {
  songs: [...allSongs], // Copy of all available songs
  currentSong: null, // Currently playing song, if any
  songCurrentTime: 0, // Current playback time for the song
};

// Function to play a song by its ID
const playSong = (id) => {
  // Find the song to play based on the given ID
  const song = userData?.songs.find((song) => song.id === id);
  audio.src = song.src;
  audio.title = song.title;

  if (userData?.currentSong === null || userData?.currentSong.id !== song.id) {
    audio.currentTime = 0;

    // Resume from the last known time if the same song is played
  } else {
    audio.currentTime = userData?.songCurrentTime;
  }
  userData.currentSong = song; // Update the current son
  playButton.classList.add("playing"); // Add "playing" class to indicate song is playing

  // Update the display and accessibility features
  highlightCurrentSong();
  setPlayerDisplay();
  setPlayButtonAccessibleText();
  audio.play(); // Start playing the song
};

// Function to pause the currently playing song
const pauseSong = () => {
  userData.songCurrentTime = audio.currentTime; // Save the current time
  playButton.classList.remove("playing"); // Remove "playing" class
  audio.pause(); // Pause the audio
};

// Function to play the next song in the playlist
const playNextSong = () => {
  if (userData?.currentSong === null) {
    playSong(userData?.songs[0].id); // If no song is playing, start with the first one
  } else {
    const currentSongIndex = getCurrentSongIndex(); // Get the index of the current song
    const nextSong = userData?.songs[currentSongIndex + 1]; // Get the next song in the list

    playSong(nextSong.id);// Play the next song
  }
};

// Function to play the previous song in the playlist
const playPreviousSong = () => {
  if (userData?.currentSong === null) return; // Do nothing if no song is playing
  else {
    const currentSongIndex = getCurrentSongIndex(); // Get the index of the current song
    const previousSong = userData?.songs[currentSongIndex - 1]; // Get the previous song

    playSong(previousSong.id); // Play the previous song
  }
};

// Function to shuffle the playlist
const shuffle = () => {
  userData?.songs.sort(() => Math.random() - 0.5); // Randomly shuffle the songs array
  userData.currentSong = null; // Reset the current song
  userData.songCurrentTime = 0; // Reset playback time

  renderSongs(userData?.songs); // Update the playlist display
  pauseSong(); // Pause the audio
  setPlayerDisplay(); // Update player display
  setPlayButtonAccessibleText(); // Update accessibility features
};

// Function to delete a song from the playlist
const deleteSong = (id) => {
  if (userData?.currentSong?.id === id) {
    userData.currentSong = null; // Reset the current song
    userData.songCurrentTime = 0; // Reset playback time

    pauseSong(); // Pause the audio
    setPlayerDisplay(); // Update player display
  }

  userData.songs = userData?.songs.filter((song) => song.id !== id); // Remove the song from the list
  renderSongs(userData?.songs); // Update the playlist display
  highlightCurrentSong(); // Highlight the currently playing song, if any
  setPlayButtonAccessibleText(); // Update accessibility features

  // If there are no songs left, display a "Reset Playlist" button
  if (userData?.songs.length === 0) {
    const resetButton = document.createElement("button");
    const resetText = document.createTextNode("Reset Playlist");

    resetButton.id = "reset";
    resetButton.ariaLabel = "Reset playlist";
    resetButton.appendChild(resetText);
    playlistSongs.appendChild(resetButton);

    // Add an event listener to reset the playlist when the button is clicked
    resetButton.addEventListener("click", () => {
      userData.songs = [...allSongs]; // Restore all songs

      renderSongs(sortSongs()); // Re-sort and render songs
      setPlayButtonAccessibleText(); // Update accessibility features  
      resetButton.remove(); // Remove the reset button
    });

  }

};

// Function to update the player display with the current song's details
const setPlayerDisplay = () => {
  const playingSong = document.getElementById("player-song-title");
  const songArtist = document.getElementById("player-song-artist");
  const currentTitle = userData?.currentSong?.title;
  const currentArtist = userData?.currentSong?.artist;

  playingSong.textContent = currentTitle ? currentTitle : ""; // Update song title
  songArtist.textContent = currentArtist ? currentArtist : ""; // update artist name
};

// Function to highlight the currently playing song in the playlist
const highlightCurrentSong = () => {
  const playlistSongElements = document.querySelectorAll(".playlist-song");
  const songToHighlight = document.getElementById(
    `song-${userData?.currentSong?.id}`
  );

  playlistSongElements.forEach((songEl) => {
    songEl.removeAttribute("aria-current"); // Clear "aria-current" from all songs
  });

  if (songToHighlight) songToHighlight.setAttribute("aria-current", "true"); // Highlight the current song
};

// Function to render the songs in the playlist
const renderSongs = (array) => {
  const songsHTML = array
    .map((song) => {
      // Generate HTML structure for each song item
      return `
      <li id="song-${song.id}" class="playlist-song">
      <button class="playlist-song-info" onclick="playSong(${song.id})">
          <span class="playlist-song-title">${song.title}</span>
          <span class="playlist-song-artist">${song.artist}</span>
          <span class="playlist-song-duration">${song.duration}</span>
      </button>
      <button onclick="deleteSong(${song.id})" class="playlist-song-delete" aria-label="Delete ${song.title}">
          <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="8" fill="#4d4d62"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M5.32587 5.18571C5.7107 4.90301 6.28333 4.94814 6.60485 5.28651L8 6.75478L9.39515 5.28651C9.71667 4.94814 10.2893 4.90301 10.6741 5.18571C11.059 5.4684 11.1103 5.97188 10.7888 6.31026L9.1832 7.99999L10.7888 9.68974C11.1103 10.0281 11.059 10.5316 10.6741 10.8143C10.2893 11.097 9.71667 11.0519 9.39515 10.7135L8 9.24521L6.60485 10.7135C6.28333 11.0519 5.7107 11.097 5.32587 10.8143C4.94102 10.5316 4.88969 10.0281 5.21121 9.68974L6.8168 7.99999L5.21122 6.31026C4.8897 5.97188 4.94102 5.4684 5.32587 5.18571Z" fill="white"/></svg>
        </button>
      </li>
      `;
    })
    .join(""); // Join the generated HTML strings into a single HTML structure 

  playlistSongs.innerHTML = songsHTML; // Insert the HTML into the playlist container
};

// Update the play button's accessible text based on the song
const setPlayButtonAccessibleText = () => {
  const song = userData?.currentSong || userData?.songs[0]; // Select current or first song

  playButton.setAttribute(
    "aria-label",
    song?.title ? `Play ${song.title}` : "Play" // Set accessible label text
  );
};

// Get the index of the current song in the playlist
const getCurrentSongIndex = () => userData?.songs.indexOf(userData?.currentSong);

// Event listener for play, pause, next and previous buttons
playButton.addEventListener("click", () => {
  if (userData?.currentSong === null) {
    playSong(userData?.songs[0].id); // Play the first song if none is playing
  } else {
    playSong(userData?.currentSong.id); // Play the current song
  }
});

pauseButton.addEventListener("click", pauseSong); // Pause button functionality 

nextButton.addEventListener("click", playNextSong);// Play the next song

previousButton.addEventListener("click", playPreviousSong); // Play the previous song

shuffleButton.addEventListener("click", shuffle); // Shuffle songs 

// When the song ends, play the next song or reset the player
audio.addEventListener("ended", () => {
  const currentSongIndex = getCurrentSongIndex();
  const nextSongExists = userData?.songs[currentSongIndex + 1] !== undefined;

  if (nextSongExists) {
    playNextSong(); // Play the next song if it exists
  } else {
    // Reset if no next song is availiable
    userData.currentSong = null;
    userData.songCurrentTime = 0;
    pauseSong();
    setPlayerDisplay();
    highlightCurrentSong();
    setPlayButtonAccessibleText();
  }
});

// Function to sort songs alphabetically by title
const sortSongs = () => {
  userData?.songs.sort((a, b) => {
    if (a.title < b.title) {
      return -1;
    }

    if (a.title > b.title) {
      return 1;
    }

    return 0;
  });

  return userData?.songs; // Return sorted song list
};

// Initial rendering setting of play button text
renderSongs(sortSongs());
setPlayButtonAccessibleText();