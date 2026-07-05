const audio = document.getElementById("audioPlayer");
const tracks = Array.from(document.querySelectorAll(".track"));
const playAll = document.getElementById("playAll");

let currentIndex = -1;

const playIcon = `
<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
  <polygon points="8,5 19,12 8,19"></polygon>
</svg>`;

const pauseIcon = `
<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
  <rect x="6" y="5" width="4" height="14"></rect>
  <rect x="14" y="5" width="4" height="14"></rect>
</svg>`;

function resetButtons() {
  document.querySelectorAll(".play-button").forEach(btn => {
    btn.innerHTML = playIcon;
  });
}

function playTrack(index) {
  const track = tracks[index];
  if (!track) return;

  tracks.forEach(t => t.classList.remove("active"));
  track.classList.add("active");

  currentIndex = index;
  audio.src = track.dataset.src;
  audio.play();

  resetButtons();
  track.querySelector(".play-button").innerHTML = pauseIcon;
}

tracks.forEach((track, index) => {
  const playButton = track.querySelector(".play-button");
  const title = track.querySelector(".title");

  playButton.innerHTML = playIcon;

  function toggleTrack() {
    if (currentIndex === index && !audio.paused) {
      audio.pause();
      playButton.innerHTML = playIcon;
    } else {
      playTrack(index);
    }
  }

  playButton.addEventListener("click", toggleTrack);
  title.addEventListener("click", toggleTrack);
});

playAll.addEventListener("click", () => {
  playTrack(0);
});

audio.addEventListener("ended", () => {
  if (currentIndex + 1 < tracks.length) {
    playTrack(currentIndex + 1);
  } else {
    resetButtons();
    tracks.forEach(t => t.classList.remove("active"));
    currentIndex = -1;
  }
});
