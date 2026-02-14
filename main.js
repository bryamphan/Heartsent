(function() {
  // Get elements
  const letter = document.getElementById('letter');
  const envelopeScreen = document.getElementById('envelopeScreen');
  const messageModal = document.getElementById('messageModal');
  const questionScreen = document.getElementById('questionScreen');
  const continueBtn = document.getElementById('continueBtn');
  const yesBtn = document.getElementById('yesBtn');
  const noBtn = document.getElementById('noBtn');
  const response = document.getElementById('response');
  const startOverBtn = document.getElementById('startOverBtn');
  const bgMusic = document.getElementById('bgMusic');
  const musicToggleBtn = document.getElementById('musicToggleBtn');

  let answered = false;
  let noClickCount = 0;
  let yesFontSize = 20; // Initial font size in pixels

  // Messages to show when No is clicked
  const noMessages = [
    "are you sure?",
    "girl im dead as a chile",
    "ur clicking the wrong button bro",
    "stop playin this yo last chance",
  ];

  // Open message modal when letter is clicked
  if (letter) {
    letter.addEventListener('click', function() {
      messageModal.classList.add('show');

      // Start music on first user gesture (required by most browsers)
      if (bgMusic) {
        bgMusic.play().then(() => {
          if (musicToggleBtn) {
            musicToggleBtn.classList.remove('hidden');
            musicToggleBtn.textContent = bgMusic.muted ? 'unmute' : 'mute';
          }
        }).catch(() => {
          // If autoplay is blocked for any reason, user can still press the toggle later
          if (musicToggleBtn) {
            musicToggleBtn.classList.remove('hidden');
            musicToggleBtn.textContent = 'play';
          }
        });
      }
    });
  }

  // Mute / unmute music
  if (musicToggleBtn && bgMusic) {
    musicToggleBtn.addEventListener('click', function() {
      // If music hasn't started yet, try to start it
      if (bgMusic.paused) {
        bgMusic.play().catch(() => {
          // ignore
        });
      }
      bgMusic.muted = !bgMusic.muted;
      musicToggleBtn.textContent = bgMusic.muted ? 'unmute' : 'mute';
    });
  }

  // Close letter button - transition to question screen
  if (continueBtn) {
    continueBtn.addEventListener('click', function() {
      messageModal.classList.remove('show');
      setTimeout(() => {
        envelopeScreen.classList.add('hidden');
        questionScreen.classList.remove('hidden');
      }, 300);
    });
  }

  // Close modal when clicking outside the content
  window.addEventListener('click', function(e) {
    if (e.target === messageModal) {
      messageModal.classList.remove('show');
    }
  });

  // "No" button - grow the Yes button when clicked
  function handleNoButton() {
    if (answered) return;

    noClickCount++;

    // Show message
    if (noClickCount <= noMessages.length) {
      const messageIndex = Math.min(noClickCount - 1, noMessages.length - 1);
      response.textContent = noMessages[messageIndex];
      response.classList.remove('hidden');
    }

    // Scale the Yes button dramatically with each click
    if (noClickCount === 1) {
      yesBtn.style.fontSize = '60px';
      yesBtn.style.padding = '40px 80px';
    } else if (noClickCount === 2) {
      yesBtn.style.fontSize = '100px';
      yesBtn.style.padding = '60px 120px';
    } else if (noClickCount === 3) {
      yesBtn.style.fontSize = '150px';
      yesBtn.style.padding = '80px 160px';
    } else if (noClickCount === 4) {
      yesBtn.style.fontSize = '200px';
      yesBtn.style.padding = '100px 200px';
    } else if (noClickCount >= 5) {
      // Fill the entire screen
      yesBtn.style.position = 'fixed';
      yesBtn.style.top = '0';
      yesBtn.style.left = '0';
      yesBtn.style.width = '100vw';
      yesBtn.style.height = '100vh';
      yesBtn.style.fontSize = '300px';
      yesBtn.style.padding = '0';
      yesBtn.style.borderRadius = '0';
      yesBtn.style.zIndex = '9999';
    }
  }

  if (noBtn) {
    noBtn.addEventListener('click', function(e) {
      if (!answered) {
        e.preventDefault();
        handleNoButton();
      }
    });
  }

  // "Yes" button click handler
  if (yesBtn) {
    yesBtn.addEventListener('click', function() {
      if (answered) return;
      answered = true;

      // Get elements
      const celebrationGif = document.getElementById('celebrationGif');
      const questionText = document.querySelector('.question-text');
      const buttonContainer = document.querySelector('.button-container');

      // Hide question text and button container
      if (questionText) {
        questionText.style.display = 'none';
      }
      if (buttonContainer) {
        buttonContainer.style.display = 'none';
      }

      // Show sweet response
      response.textContent = "i knew you would say yes hehe <3 :3";
      response.classList.remove('hidden');

      // Show celebration GIF
      if (celebrationGif) {
        celebrationGif.classList.remove('hidden');
      }

      // Show Start Over button
      if (startOverBtn) {
        setTimeout(() => {
          startOverBtn.classList.remove('hidden');
        }, 800);
      }
    });
  }

  // Start over -> reset everything back to the envelope
  if (startOverBtn) {
    startOverBtn.addEventListener('click', function() {
      answered = false;
      noClickCount = 0;

      // Reset yes button styles
      yesBtn.style.cssText = '';

      // Reset question text/buttons visibility
      const questionText = document.querySelector('.question-text');
      const buttonContainer = document.querySelector('.button-container');
      if (questionText) questionText.style.display = '';
      if (buttonContainer) buttonContainer.style.display = '';

      // Reset response / gif / start over
      response.textContent = '';
      response.classList.add('hidden');
      const celebrationGif = document.getElementById('celebrationGif');
      if (celebrationGif) celebrationGif.classList.add('hidden');
      startOverBtn.classList.add('hidden');

      // Show envelope again
      questionScreen.classList.add('hidden');
      envelopeScreen.classList.remove('hidden');
      messageModal.classList.remove('show');

      // Reset music to start
      if (bgMusic) {
        bgMusic.currentTime = 0;
        // keep playing (optional); comment out next line if you want it to stop
        // bgMusic.pause();
      }
    });
  }
})();
