let currentQuestion = 0;
let score = 0;

const questionBox = document.getElementById("question-box");
const answersBox = document.getElementById("answers-box");
const nextBtn = document.getElementById("next-btn");
const resultBox = document.getElementById("result-box");
const restartBtn = document.getElementById("restart-btn");

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
    showQuestion();
});

// Starten 
showQuestion();