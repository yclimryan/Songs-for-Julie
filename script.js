const audio = document.getElementById("audioPlayer");
const tracks = Array.from(document.querySelectorAll(".track"));
const playAll = document.getElementById("playAll");

let currentIndex = -1;

function playTrack(index) {
  const track = tracks[index];
  if (!track) return;

  tracks.forEach(t => t.classList.remove("active"));
  track.classList.add("active");

  currentIndex = index;
  audio.src = track.dataset.src;
  audio.play();

  document.querySelectorAll(".play-button").forEach(btn => btn.textContent = "▶");
  track.querySelector(".play-button").textContent = "⏸";
}

tracks.forEach((track, index) => {
  const playButton = track.querySelector(".play-button");
  const title = track.querySelector(".title");

  function toggleTrack() {
    if (currentIndex === index && !audio.paused) {
      audio.pause();
      playButton.textContent = "▶";
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
  }
});
