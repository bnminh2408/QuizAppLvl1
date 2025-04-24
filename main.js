let currentQuestion = 0;
let score = 0;

const startScreen = document.getElementById("start-screen");
const startBtn = document.getElementById("start-btn");
const quizContainer = document.getElementById("quiz-container");

const modeSelect = document.getElementById("mode-select");
const randomBtn = document.getElementById("random-btn");
const themaBtn = document.getElementById("thema-btn");
const themaAuswahl = document.getElementById("thema-auswahl");
const themaButtons = document.querySelectorAll(".thema-btn");

const questionBox = document.getElementById("question-box");
const answersBox = document.getElementById("answers-box");
const nextBtn = document.getElementById("next-btn");
const resultBox = document.getElementById("result-box");
const restartBtn = document.getElementById("restart-btn");
// Fragen mischen
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
// === Start-Logik ===
startBtn.addEventListener("click", () => {
    startScreen.style.display = "none";
    modeSelect.style.display = "block"; // Jetzt kommt die Modus-Auswahl
});
// Zufallsmodus
randomBtn.addEventListener("click", () => {
    questions = [...allQuestions];
    shuffleArray(questions);
    modeSelect.style.display = "none";
    quizContainer.style.display = "block";
    currentQuestion = 0;
    score = 0;
    showQuestion();
});

// Themenauswahl anzeigen
themaBtn.addEventListener("click", () => {
    modeSelect.style.display = "none";
    themaAuswahl.style.display = "block";

});

// Thema auswählen
themaButtons.forEach(button => {
    button.addEventListener("click", () => {
        const selectedTopic = button.getAttribute("data-topic");
        questions = allQuestions.filter(q => q.category === selectedTopic);

        themaAuswahl.style.display = "none";
        quizContainer.style.display = "block";
        currentQuestion = 0;
        score = 0;
        showQuestion();
    });
});

// Quiz Logic
function showQuestion() {
    let q = questions[currentQuestion];
    questionBox.innerText = q.question;
    answersBox.innerHTML = "";

    q.answers.forEach(answer => {
        let btn = document.createElement("button");
        btn.innerText = answer;
        btn.classList.add("answer-btn");
        btn.addEventListener("click", () => selectAnswer(answer));
        answersBox.appendChild(btn);
    });

    nextBtn.style.display = "none";
    resultBox.innerText = "";
}

function selectAnswer(answer) {
    const correct = questions[currentQuestion].correct;
    if (answer === correct) {
        resultBox.innerText = "✅ Richtig!";
        score++;
    } else {
        resultBox.innerText = "❌ Falsch!";
    }
    nextBtn.style.display = "inline-block";
}

nextBtn.addEventListener("click", () => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion();

    } else {
        showResult();
    }
});

function showResult() {
    questionBox.innerText = "Quiz beendet!";
    answersBox.innerHTML = "";
    resultBox.innerText = `Du hast ${score} von ${questions.length} richtig. 🎉`;
    nextBtn.style.display = "none";
    restartBtn.style.display = "inline-block"; // hier wird der Restart-Button gezeigt
}
restartBtn.addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;
    restartBtn.style.display = "none";
    startScreen.style.display = "block";
    quizContainer.style.display = "none";
});

// Starten 
showQuestion();