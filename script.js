const startBtn = document.getElementById("startBtn");
const input = document.getElementById("imageInput");
const preview = document.getElementById("preview");
const result = document.getElementById("result");
const speedVal = document.getElementById("speedVal");
const caption = document.getElementById("caption");
const loader = document.getElementById("loader");
const questionStep = document.getElementById("questionStep");
const secretInput = document.getElementById("secretInput");
const secretBtn = document.getElementById("secretBtn");
const secretHint = document.getElementById("secretHint");
const progressBarContainer = document.getElementById("progressBarContainer");
const progressBar = document.getElementById("progressBar");

const captions = [
  "Would totally outrun a garden gnome. 🏃‍♂️",
  "Trips over dust bunnies 7 out of 10 times. 🐇",
  "Fast enough to steal your socks. 🧦",
  "Sneaky sprinter when no one's around. 👀",
  "Wakes up at midnight to jog silently. 🌙",
  "Once challenged a cheetah to a staring contest. 🐆",
  "Speed measured in 'object units' (very mysterious). 🤔",
  "Can only move when you blink. 😳",
  "Secretly holds the world record for slow-motion sprints. 🏅",
  "Runs faster if you play classical music nearby. 🎶"
];

const secretPassword = "immobile";

// Hide input and result initially
input.style.display = "none";
result.hidden = true;
preview.hidden = true;
loader.style.display = "none";
startBtn.style.display = "none";
progressBarContainer.hidden = true;

// Step 1: Mystery question
secretBtn.addEventListener("click", () => {
  if (secretInput.value.trim().toLowerCase() === secretPassword) {
    questionStep.style.display = "none";
    startBtn.style.display = "block";
    secretHint.textContent = "";
  } else {
    secretHint.textContent = "Nope! Hint: Think of what not-moving things are called...password is in the title";
    secretInput.value = "";
  }
});

// Step 2: Show file input
startBtn.addEventListener("click", () => {
  startBtn.style.display = "none";
  input.style.display = "block";
});

// Step 3: Handle file upload and fake analysis
input.addEventListener("change", () => {
  const file = input.files[0];
  if (!file) return;

  loader.style.display = "none";
  preview.hidden = true;
  result.hidden = true;
  progressBarContainer.hidden = false;
  progressBar.style.width = "0%";

  // Animate progress bar
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 18 + 7; // random step
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);

      setTimeout(() => {
        progressBarContainer.hidden = true;
        const reader = new FileReader();
        reader.onload = () => {
          preview.src = reader.result;
          preview.hidden = false;

          // Dramatic drumroll before showing result
          speedVal.textContent = "...";
          caption.textContent = "Calculating statue velocity...";
          result.hidden = false;
          setTimeout(() => {
            const randomSpeed = Math.floor(Math.random() * 80) + 1;
            const randomCaption = captions[Math.floor(Math.random() * captions.length)];
            speedVal.textContent = randomSpeed;
            caption.textContent = randomCaption;
            result.querySelector('.speed').classList.remove('drumroll');
            void result.querySelector('.speed').offsetWidth; // reflow for animation
            result.querySelector('.speed').classList.add('drumroll');
          }, 1200);
        };
        reader.readAsDataURL(file);
      }, 500);
    }
    progressBar.style.width = progress + "%";
  }, 180);
});
