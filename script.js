let currentMode = "";
let generatedContent = "";
let difficulty = 2000; // Default: Hard (2 seconds)
let level = 1; // Starting level

const numbersModeBtn = document.getElementById("numbersMode");
const wordsModeBtn = document.getElementById("wordsMode");
const gameArea = document.getElementById("gameArea");
const displayArea = document.getElementById("displayArea");
const userInput = document.getElementById("userInput");
const submitBtn = document.getElementById("submitBtn");
const feedback = document.getElementById("feedback");
const levelTitle = document.getElementById("levelTitle");
const difficultyDropdown = document.getElementById("difficulty");
const saveSettingsBtn = document.getElementById("saveSettings");

numbersModeBtn.addEventListener("click", () => startGame("Numbers"));
wordsModeBtn.addEventListener("click", () => startGame("Words"));
submitBtn.addEventListener("click", checkAnswer);
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") checkAnswer();
});
saveSettingsBtn.addEventListener("click", saveSettings);

function startGame(mode) {
  currentMode = mode;
  level = 1;
  nextLevel();
}

function nextLevel() {
  levelTitle.innerText = `Level ${level} - ${currentMode} Mode`;
  generatedContent = generateContent(currentMode, level);
  displayArea.innerText = generatedContent;
  gameArea.classList.remove("hidden");
  userInput.value = "";
  feedback.innerText = "";
  setTimeout(() => {
    displayArea.innerText = "";
  }, difficulty);
}

function generateContent(mode, level) {
  if (mode === "Numbers") {
    const length = Math.min(4 + level - 1, 10); // Increases up to 10 digits
    let numbers = "";
    for (let i = 0; i < length; i++) {
      numbers += Math.floor(Math.random() * 10); // Random single digit
    }
    return numbers;
  } else {
    const wordsPool = ["apple", "banana", "cherry", "grape", "lemon", "mango", "peach", "kiwi", "berry", "melon"];
    const wordCount = Math.min(4 + level - 1, 10); // Increases up to 10 words
    return wordsPool.sort(() => 0.5 - Math.random()).slice(0, wordCount).join(" ");
  }
}

function checkAnswer() {
  const userAnswer = userInput.value.trim();
  if (userAnswer === generatedContent) {
    feedback.innerText = "Correct! Moving to the next level.";
    feedback.style.color = "green";
    level++;
    setTimeout(nextLevel, 1000); // Wait 1 second before showing next level
  } else {
    feedback.innerText = `Incorrect! Correct answer: ${generatedContent}`;
    feedback.style.color = "
