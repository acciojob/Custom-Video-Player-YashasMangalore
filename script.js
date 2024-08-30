const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// Toggle Play/Pause
function togglePlay() {
    if (video.paused) {
        video.play();
        toggle.textContent = '❚ ❚'; // Change button to Pause
    } else {
        video.pause();
        toggle.textContent = '►'; // Change button to Play
    }
}

// Update Progress Bar
function updateProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.width = `${percent}%`;
}

// Scrub Video
function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

// Skip Time
function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

// Update Video Settings
function updateRange() {
    video[this.name] = this.value;
}

// Event Listeners
toggle.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', updateProgress);

progress.addEventListener('click', scrub);
progress.addEventListener('mousedown', () => progress.addEventListener('mousemove', scrub));
progress.addEventListener('mouseup', () => progress.removeEventListener('mousemove', scrub));

skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('input', updateRange));
