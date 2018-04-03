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
  const rWnd = document.querySelector('.rewindToStart');
  const ffWd = document.querySelector('.forward');
  const imageBanner = document.querySelector('#houseImages');
  const houseInfo = document.querySelector('.house-info');
  let infoHouse = null;
  const clipBar = document.querySelector('#clipBar');
  const clipTiming = document.querySelector('#clipTiming');
  const muteBtn = document.querySelector('#muteBtn');
  const volumeBar = document.querySelector('#volumeBar');


  // FUNCTION STACK
  function loadMovie() {

    // 1. turn on the lightbox, set clip bar and volume
    lightbox.classList.add('show-lightbox');
    clipBar.value = 0;
    volumeBar.value = 0.6;
    vidPlayer.volume = 0.6;

    // 2. grab the right video based on clas name
    var house = this.className.split(' ')[1].capIt();

    // 3. put path together and make the video play
    vidPlayer.src = `video/House-${house}.${vidPlayer.currentSrc.split('.')[1]}`;
    console.log(house)

    videoTitle.textContent = house;
    changeMe.textContent = house;

    // 4. Display House Information
    houseDetails.forEach((e, i) => {
      for (var key in e) {
        if (key === house) {
          houseInfo.innerHTML = e[house];
        }
      }
    })

    vidPlayer.load();
    vidPlayer.play();

    showTime();

    animateBanners(this.dataset.offset);
  }

  // show clip currentTime, Duration in m:s, move time range bar.
  function showTime() {
    // update range time location based on time
    var clipBarValue = vidPlayer.currentTime * (100 / vidPlayer.duration);
    clipBar.value = clipBarValue;
    // convert currentTime and Duration in min:sec
    var curmins = Math.floor(vidPlayer.currentTime / 60);
    var cursecs = Math.floor(vidPlayer.currentTime - curmins * 60);
    var durmins = Math.floor(vidPlayer.duration / 60);
    var dursecs = Math.floor(vidPlayer.duration - durmins * 60);
    if (cursecs < 10) {
      cursecs = "0" + cursecs;
    }
    if (dursecs < 10) {
      dursecs = "0" + dursecs;
    }
    if (curmins < 10) {
      curmins = "0" + curmins;
    }
    if (durmins < 10) {
      durmins = "0" + durmins;
    }
    // display to player
    let clipTime = curmins + ":" + cursecs;
    let clipDur = durmins + ":" + dursecs;
    clipTiming.textContent = `${clipTime} / ${clipDur}`;
  }


  // animate banners across the screen
  function animateBanners(offset) {
    // grab offset value and move it by 600px which is the picure size.
    imageBanner.style.right = (offset * 600) + "px";
  }


  function closeBox() {
    lightbox.classList.remove('show-lightbox');
    vidPlayer.pause();
    vidPlayer.currentTime = 0;
    clipBar.value = 0;
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
    vidPlayer.currentTime = 0;
    clipBar.value = 0;
  }

  function updateTime() {
    let time = vidPlayer.duration * (clipBar.value / 100);
    vidPlayer.currentTime = time;

    // update bar value matching clip time
    vidPlayer.addEventListener('timeuppdate', () => {
      // slider value
      let sliderValue = (100 / vidPlayer.duration) * vidPlayer.currentTime;
      clipBar.value = sliderValue;
    })

    // pause video when moving slider
    clipBar.addEventListener('mousedown', () => {
      vidPlayer.pause();
    })
    // play back video when mouseup after slider move
    clipBar.addEventListener('mouseup', () => {
      vidPlayer.play();
    })
  }

  // mute button with color change on it.
  function muteMe() {
    var theVolumeSVG = this.firstElementChild;
    if(vidPlayer.muted) {
      vidPlayer.muted = false;
      theVolumeSVG.dataset.icon = "volume-up";
      volumeBar.value = 0.6;
      vidPlayer.volume = 0.6;
    } else {
      vidPlayer.muted = true;
       theVolumeSVG.dataset.icon = "volume-off";
      volumeBar.value = 0;
      vidPlayer.volume = 0;
    }
  }
  
  // update volume with volume bar
  function changeVolume() {
    vidPlayer.volume = volumeBar.value;
  }
  

  // ADD EVENT LISTENER STACK
  sigils.forEach(sigil => sigil.addEventListener('click', loadMovie));
  closeLightbox.addEventListener('click', closeBox);
  vidPlayer.addEventListener('ended', closeBox);
  playPause.addEventListener('click', togglePlay);
  rWnd.addEventListener('click', rWindVid);
  clipBar.addEventListener('change', updateTime);
  vidPlayer.addEventListener('timeupdate', showTime);
  muteBtn.addEventListener('click', muteMe);
  volumeBar.addEventListener('change', changeVolume);
})();
