// Starea globală (ar fi bine de salvat în baza de date pe viitor)
let currentXP = 1250;

// Logica de Joc
const questions = [
    { q: "Care este formula chimică a apei?", a: ["H2O", "CO2", "NaCl", "O2"], correct: 0 },
    { q: "Cine a scris 'Luceafărul'?", a: ["Bacovia", "Eminescu", "Creangă", "Slavici"], correct: 1 },
    { q: "Cât este 15% din 200?", a: ["20", "30", "15", "45"], correct: 1 }
];

let currentQIndex = 0;
let score = 0;
let timeLeft = 15;
let timerId;

function startGame() {
    const startDiv = document.getElementById('game-start');
    const quizDiv = document.getElementById('game-quiz');
    if (startDiv && quizDiv) {
        startDiv.classList.add('hidden');
        quizDiv.classList.remove('hidden');
        renderQuestion();
    }
}

function renderQuestion() {
    if (currentQIndex >= questions.length) return showResult();
    
    const q = questions[currentQIndex];
    document.getElementById('question-text').innerText = q.q;
    
    const container = document.getElementById('options-container');
    container.innerHTML = '';
    
    q.a.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.className = "option-btn";
        btn.innerText = opt;
        btn.onclick = () => checkAnswer(index);
        container.appendChild(btn);
    });
    
    startTimer();
}

function startTimer() {
    clearInterval(timerId);
    timeLeft = 15;
    document.getElementById('timer').innerText = timeLeft;
    timerId = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').innerText = timeLeft;
        if (timeLeft <= 0) {
            currentQIndex++;
            renderQuestion();
        }
    }, 1000);
}

function checkAnswer(index) {
    if (index === questions[currentQIndex].correct) {
        score += (100 + timeLeft * 5);
    }
    currentQIndex++;
    renderQuestion();
}

function showResult() {
    clearInterval(timerId);
    document.getElementById('game-quiz').classList.add('hidden');
    document.getElementById('game-result').classList.remove('hidden');
    document.getElementById('final-score').innerText = score;
    
    // Update XP vizual
    currentXP += score;
    const xpNav = document.getElementById('user-xp-nav');
    if (xpNav) xpNav.innerText = currentXP.toLocaleString() + " XP";
}
