// Elements
const envelope = document.getElementById("envelope-container");
const letter = document.getElementById("letter-container");
const noBtn = document.querySelector(".no-btn");
const yesBtn = document.querySelector(".btn[alt='Yes']");

const title = document.getElementById("letter-title");
const catImg = document.getElementById("letter-cat");
const buttons = document.getElementById("letter-buttons");
const finalText = document.getElementById("final-text");

// Audio elements
const bgAudio = document.getElementById('bg-audio');
const audioToggle = document.getElementById('audio-toggle');
const volumeSlider = document.getElementById('volume-slider');

function updateAudioButton() {
    if (!audioToggle || !bgAudio) return;
    audioToggle.textContent = bgAudio.muted ? '🔈' : '🔊';
    audioToggle.setAttribute('aria-pressed', (!bgAudio.muted).toString());
}

if (audioToggle) {
    audioToggle.addEventListener('click', () => {
        if (!bgAudio) return;
        if (bgAudio.muted) {
            bgAudio.muted = false;
            // attempt to play; browsers may require user interaction
            bgAudio.play().catch(() => {});
        } else {
            bgAudio.muted = true;
        }
        updateAudioButton();
    });
}

// initialize volume slider and audio button state
if (volumeSlider) {
    const initialVol = (bgAudio && typeof bgAudio.volume === 'number') ? Math.round(bgAudio.volume * 100) : 100;
    volumeSlider.value = initialVol;

    volumeSlider.addEventListener('input', (e) => {
        const val = Number(e.target.value);
        const vol = Math.max(0, Math.min(1, val / 100));
        if (bgAudio) {
            bgAudio.volume = vol;
            bgAudio.muted = vol === 0;
            // if user moves slider, ensure audio plays when unmuted (user-initiated interaction)
            if (!bgAudio.muted) bgAudio.play().catch(() => {});
        }
        updateAudioButton();
    });
}

updateAudioButton();

// Click Envelope

envelope.addEventListener("click", () => {
    envelope.style.display = "none";
    letter.style.display = "flex";

    setTimeout( () => {
        document.querySelector(".letter-window").classList.add("open");
    },50);
});

// Logic to move the NO btn

noBtn.addEventListener("mouseover", () => {
    const min = 200;
    const max = 200;

    const distance = Math.random() * (max - min) + min;
    const angle = Math.random() * Math.PI * 2;

    const moveX = Math.cos(angle) * distance;
    const moveY = Math.sin(angle) * distance;

    noBtn.style.transition = "transform 0.3s ease";
    noBtn.style.transform = `translate(${moveX}px, ${moveY}px)`;
});

// Logic to make YES btn to grow

// let yesScale = 1;

// yesBtn.style.position = "relative"
// yesBtn.style.transformOrigin = "center center";
// yesBtn.style.transition = "transform 0.3s ease";

// noBtn.addEventListener("click", () => {
//     yesScale += 2;

//     if (yesBtn.style.position !== "fixed") {
//         yesBtn.style.position = "fixed";
//         yesBtn.style.top = "50%";
//         yesBtn.style.left = "50%";
//         yesBtn.style.transform = `translate(-50%, -50%) scale(${yesScale})`;
//     }else{
//         yesBtn.style.transform = `translate(-50%, -50%) scale(${yesScale})`;
//     }
// });

// YES is clicked

yesBtn.addEventListener("click", () => {
    title.textContent = "Yippeeee!";

    catImg.src = "./images/cat_dance.gif";

    document.querySelector(".letter-window").classList.add("final");

    buttons.style.display = "none";

    finalText.style.display = "block";
});