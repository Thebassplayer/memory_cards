const cardsContainer = document.getElementById("cards-container"),
  prevBtn = document.getElementById("prev"),
  nextBtn = document.getElementById("next"),
  currentEl = document.getElementById("current"),
  showBtn = document.getElementById("add-custom-card"),
  questionEl = document.getElementById("question"),
  answerEl = document.getElementById("answer"),
  addCardBtn = document.getElementById("add-card"),
  clearBtn = document.getElementById("delete-all"),
  addContainer = document.getElementById("add-container"),
  numOfInitialCards = 3,
  displayedCards = [];

const initCardsData = [
  {
    question: "What must a variable begin with",
    answer: "A letter, $ or _",
  },
  {
    question: "What is a variable",
    answer: "A container for a piece of data",
  },
  {
    question: "Example oc Case Sensitive",
    answer: "thisIsAVariable",
  },
  {
    question: "What is Hoisting",
    answer: "A letter, $ or _",
  },
  {
    question: "What is Scope",
    answer: "A container for a piece of data",
  },
  {
    question: "What is Bubling",
    answer: "thisIsAVariable",
  },
];

// Keep track current card
let currentActiveCard = 0;

// Store DOM cards
const cardsEl = [];

// Store card data
const cardsData = getCardsData();

// Create all cards
function createCards() {
  cardsData.forEach((data, index) => createCard(data, index));
}

// Create a single card in the Dom
function createCard(data, index) {
  const card = document.createElement("div");
  card.classList.add("card");

  if (index === 0) {
    card.classList.add("active");
  }

  card.innerHTML = `
  <div class="inner-card">
  <div class="inner-card-front">
    <p>
      ${data.question}
    </p>
  </div>
  <div class="inner-card-back">
    <p>
      ${data.answer}
    </p>
  </div>
</div>
  `;

  card.addEventListener("click", () => card.classList.toggle("show-answer"));

  // Add cards to DOM
  cardsEl.push(card);

  cardsContainer.appendChild(card);

  updateCurrentText();
}

// Show number of cards
function updateCurrentText() {
  currentEl.innerText = `${currentActiveCard + 1}/${cardsEl.length}`;
}

// Get cards from local storage
function getCardsData() {
  const cards = JSON.parse(localStorage.getItem("cards"));
  return cards === null ? [] : cards;
}

// Add card to local storage
function setCardsData(cards) {
  localStorage.setItem("cards", JSON.stringify(cards));
}

// Random Card Generator
function randomCardGenerator(displayedCards) {
  let randomCardsNum;

  while (displayedCards.some((el) => el === randomCardsNum)) {
    randomCardsNum = parseInt(Math.random() * initCardsData.length);
  }
  return randomCardsNum;
}

console.log(randomCardGenerator(displayedCards));

// Generate cards
function generateInitCards(initCards) {
  if (!cardsData[0]) {
    let count = 0;

    while (count < numOfInitialCards) {
      let randomCardsNum = parseInt(Math.random() * initCards.length);

      if (!displayedCards.some((el) => el === randomCardsNum)) {
        displayedCards.push(randomCardsNum);
        const question = initCards[randomCardsNum].question;
        const answer = initCards[randomCardsNum].answer;

        if (question.trim() && answer.trim()) {
          const newCard = { question, answer };

          cardsData.push(newCard);
          setCardsData(cardsData);
        }

        count++;
      }
    }
  }
}

generateInitCards(initCardsData);

createCards();

// Event Listeners

// Next button
nextBtn.addEventListener("click", () => {
  cardsEl[currentActiveCard].className = "card left";

  currentActiveCard++;

  if (currentActiveCard > cardsEl.length - 1) {
    currentActiveCard--;
  }

  cardsEl[currentActiveCard].className = "card active";

  updateCurrentText();
});

// Previous button
prevBtn.addEventListener("click", () => {
  cardsEl[currentActiveCard].className = "card right";

  currentActiveCard--;

  if (currentActiveCard < 0) {
    currentActiveCard = 0;
  }

  cardsEl[currentActiveCard].className = "card active";

  updateCurrentText();
});

// Show add container
showBtn.addEventListener("click", () => addContainer.classList.add("show"));

// Hide add container
addContainer.addEventListener("click", () =>
  addContainer.classList.remove("show")
);

// Add new card
addCardBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  const question = questionEl.value;
  const answer = answerEl.value;

  if (question.trim() && answer.trim()) {
    const newCard = { question, answer };

    createCard(newCard);

    questionEl.value = "";
    answerEl.value = "";

    addContainer.classList.remove("show");

    cardsData.push(newCard);
    setCardsData(cardsData);
  }

  window.location.reload();
});

// Clear cards button
clearBtn.addEventListener("click", () => {
  localStorage.clear();
  cardsContainer.innerHTML = "";
  window.location.reload();
});

questionEl.addEventListener("click", (e) => {
  e.stopPropagation();
});

answerEl.addEventListener("click", (e) => {
  e.stopPropagation();
});
