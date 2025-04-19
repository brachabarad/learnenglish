const words = ["cat", "dog", "banana", "apple", "red", "blue", "book", "pen"];
const balloonContainer = document.getElementById("balloon-container");
const spokenWordSpan = document.getElementById("spoken-word");
const startBtn = document.getElementById("startBtn");
const scoreDisplay = document.getElementById("score");

let correctWord = "";
let firstTry = true;
let score = 0;
let difficulty = "easy"; // For now, hardcoded to 'easy' = 3 balloons

startBtn.addEventListener("click", startRound);

function startRound() {
  balloonContainer.innerHTML = "";
  firstTry = true;

  const choices = getRandomWords(difficulty === "easy" ? 3 : 4);
  correctWord = choices[Math.floor(Math.random() * choices.length)];

  spokenWordSpan.textContent = correctWord;
  speakWord(correctWord);

  choices.forEach(word => {
    const balloon = document.createElement("div");
    balloon.className = "balloon";
    balloon.textContent = word;
    balloon.addEventListener("click", () => handleClick(word, balloon));
    balloonContainer.appendChild(balloon);
  });
}

function getRandomWords(n) {
  const shuffled = [...words].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

function speakWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-US";
  speechSynthesis.speak(utterance);
}

function handleClick(selectedWord, balloonEl) {
  if (selectedWord === correctWord) {
    balloonEl.style.backgroundColor = "green";
    score += 1;
    if (firstTry) score += 1; // Bonus
    updateScore();
    disableAllBalloons();
    startBtn.textContent = "Next Round ▶️";
  } else {
    balloonEl.style.backgroundColor = "gray";
    balloonEl.style.pointerEvents = "none";
    firstTry = false;
  }
}

function disableAllBalloons() {
  document.querySelectorAll(".balloon").forEach(b => {
    b.style.pointerEvents = "none";
  });
}

function updateScore() {
  scoreDisplay.textContent = `Score: ${score}`;
}
