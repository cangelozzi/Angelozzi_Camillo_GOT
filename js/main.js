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



  // FUNCTION STACK
  function loadMovie() {

    // turn on the lightbox
    lightbox.classList.add('show-lightbox');

    // 2. grab the right video based on clas name
    var House = this.className.split(' ')[1].capIt();
    console.log(House)

    vidPlayer.play();
  }

  function closeBox() {
    lightbox.classList.remove('show-lightbox');
    vidPlayer.pause();
    vidPlayer.currentTime = 0;
  }



  // ADD EVENT LISTENER STACK
  sigils.forEach(sigil => sigil.addEventListener('click', loadMovie));
  closeLightbox.addEventListener('click', closeBox);
})();
