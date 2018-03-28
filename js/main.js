// Javascript Document

(() => {
  console.log('JS initialized!');

  String.prototype.capIt = function () {
    return this.replace(this.charAt(), this.charAt().toUpperCase());
  }

  // VARIABLES STACK
  const sigils = document.querySelectorAll('.sigilContainer');
  const lightbox = document.querySelector('.lightbox');
  const closeLightbox = lightbox.querySelector('.close-lightbox');
  const vidPlayer = document.querySelector('video');
  const changeMe = document.querySelector('#changeMe');
  const videoTitle = document.querySelector('#videoTitle');
  const playPause = document.querySelector('.play-pause');
  const rWnd = document.querySelector('.rewind');
  const ffWd = document.querySelector('.forward');


  // FUNCTION STACK
  function loadMovie() {

    // turn on the lightbox
    lightbox.classList.add('show-lightbox');

    // 2. grab the right video based on clas name
    var house = this.className.split(' ')[1].capIt();
    console.log(house)

    // 3. put path together and make the video play
    vidPlayer.src = `video/House-${house}.${vidPlayer.currentSrc.split('.')[1]}`;

    changeMe.textContent = house;
    videoTitle.textContent = house;

    vidPlayer.load();
    vidPlayer.play();
  }

  function closeBox() {
    lightbox.classList.remove('show-lightbox');
    vidPlayer.pause();
    vidPlayer.currentTime = 0;
  }

  function togglePlay() {
    var theSVG = this.firstElementChild;

    if (vidPlayer.paused) {
      theSVG.dataset.icon = "pause-circle";
      vidPlayer.play();
    } else {
      theSVG.dataset.icon = "play-circle";
      vidPlayer.pause();
    }
  }

  function rWindVid() {
    console.log('rewind')
  }

  function ffWdVid() {
    console.log('forward')
  }


  // ADD EVENT LISTENER STACK
  sigils.forEach(sigil => sigil.addEventListener('click', loadMovie));
  closeLightbox.addEventListener('click', closeBox);
  vidPlayer.addEventListener('ended', closeBox);
  playPause.addEventListener('click', togglePlay);
  rWnd.addEventListener('click', rWindVid);
  ffWd.addEventListener('click', ffWdVid);
})();
