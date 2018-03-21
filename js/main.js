// Javascript Document
(() => {
  console.log('JS initialized!');

  // VARIABLES STACK
  const vidPlayer = document.querySelector('video');
  const playButton = document.querySelectorAll('button')[0];
  const pauseButton = document.querySelectorAll('button')[1];
  const rewindButton = document.querySelectorAll('button')[2];


  // FUNCTION STACK
  function volOn() {
    vidPlayer.muted = false;
  }

  function volOff() {
    vidPlayer.muted = true;
  }

  function rewindVid() {
    vidPlayer.currentTime -= 5;
  }

  function playVid() {
    vidPlayer.play();
  }

  function pauseVid() {
    vidPlayer.pause();
  }

  // ADD EVENT LISTENER STACK
  vidPlayer.addEventListener('mouseover', volOn);
  vidPlayer.addEventListener('mouseout', volOff);
  rewindButton.addEventListener('click', rewindVid);
  playButton.addEventListener('click', playVid);
  pauseButton.addEventListener('click', pauseVid);

})();
