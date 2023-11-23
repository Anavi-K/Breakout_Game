// Function to toggle audio playback and change the image
function toggleAudio() {
    var audio = document.getElementById('backgroundAudio');
    var image = document.getElementById('soundImage');
  
    // Check the current state of the audio
    if (audio.paused) {
      // If paused, play the audio and switch to the first image
      audio.play();
      image.src = './images/volume.png';
    } else {
      // If playing, pause the audio and switch to the second image
      audio.pause();
      image.src = './images/mute.png';
    }
  }