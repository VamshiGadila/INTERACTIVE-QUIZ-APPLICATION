// DOM Elements
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const scoreDisplay = document.getElementById("score-display");
const feedbackElement = document.getElementById("feedback");
const resultContainer = document.getElementById("result-container");
const progressBar = document.getElementById("progress-bar");
const profilePic = document.getElementById("profile-pic");
const usernameElement = document.getElementById("username");
const nameInput = document.getElementById("name-input");
const saveProfileButton = document.getElementById("save-profile");
const totalQuizzesElement = document.getElementById("total-quizzes");
const averageScoreElement = document.getElementById("average-score");
const highestScoreElement = document.getElementById("highest-score");
const historyList = document.getElementById("history-list");

// Quiz State
let currentQuestionIndex = 0;
let score = 0;
let userProfile = {
    name: "Explorer",
    totalQuizzes: 0,
    totalScore: 0,
    highestScore: 0,
    history: []
};

// Question Bank (50 questions)
const questionBank = [
    // General Knowledge
    {
        question: "What is the capital of Japan?",
        answers: [
            { text: "Beijing", correct: false, feedback: "Incorrect. Beijing is the capital of China." },
            { text: "Seoul", correct: false, feedback: "Incorrect. Seoul is the capital of South Korea." },
            { text: "Tokyo", correct: true, feedback: "Correct! Tokyo is the bustling capital of Japan." },
            { text: "Bangkok", correct: false, feedback: "Incorrect. Bangkok is the capital of Thailand." }
        ]
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Venus", correct: false, feedback: "Incorrect. Venus is often called the Morning Star." },
            { text: "Mars", correct: true, feedback: "Correct! Mars appears red due to iron oxide on its surface." },
            { text: "Jupiter", correct: false, feedback: "Incorrect. Jupiter is the largest planet in our solar system." },
            { text: "Saturn", correct: false, feedback: "Incorrect. Saturn is famous for its rings." }
        ]
    },
    {
        question: "Who painted the Mona Lisa?",
        answers: [
            { text: "Vincent van Gogh", correct: false, feedback: "Incorrect. Van Gogh painted 'Starry Night'." },
            { text: "Pablo Picasso", correct: false, feedback: "Incorrect. Picasso was a 20th century artist." },
            { text: "Leonardo da Vinci", correct: true, feedback: "Correct! Da Vinci painted the Mona Lisa in the 16th century." },
            { text: "Michelangelo", correct: false, feedback: "Incorrect. Michelangelo was a sculptor and painter of the Sistine Chapel." }
        ]
    },
    {
        question: "What is the largest ocean on Earth?",
        answers: [
            { text: "Atlantic Ocean", correct: false, feedback: "Incorrect. The Atlantic is the second largest." },
            { text: "Indian Ocean", correct: false, feedback: "Incorrect. The Indian Ocean is the third largest." },
            { text: "Pacific Ocean", correct: true, feedback: "Correct! The Pacific covers about 30% of Earth's surface." },
            { text: "Arctic Ocean", correct: false, feedback: "Incorrect. The Arctic is the smallest ocean." }
        ]
    },
    {
        question: "Which element has the chemical symbol 'O'?",
        answers: [
            { text: "Gold", correct: false, feedback: "Incorrect. Gold's symbol is Au." },
            { text: "Oxygen", correct: true, feedback: "Correct! Oxygen is essential for human life." },
            { text: "Osmium", correct: false, feedback: "Incorrect. Osmium's symbol is Os." },
            { text: "Oganesson", correct: false, feedback: "Incorrect. Oganesson's symbol is Og." }
        ]
    },
    // Science and Technology
    {
        question: "What is the main component of the Sun?",
        answers: [
            { text: "Liquid lava", correct: false, feedback: "Incorrect. The Sun is not made of molten rock." },
            { text: "Hydrogen", correct: true, feedback: "Correct! The Sun is about 70% hydrogen and 28% helium." },
            { text: "Oxygen", correct: false, feedback: "Incorrect. Oxygen is present in much smaller quantities." },
            { text: "Iron", correct: false, feedback: "Incorrect. Iron is more common in planetary cores." }
        ]
    },
    {
        question: "Which programming language is known as the 'language of the web'?",
        answers: [
            { text: "Python", correct: false, feedback: "Incorrect. Python is a general-purpose language." },
            { text: "Java", correct: false, feedback: "Incorrect. Java is used for enterprise applications." },
            { text: "C++", correct: false, feedback: "Incorrect. C++ is used for system programming." },
            { text: "JavaScript", correct: true, feedback: "Correct! JavaScript runs in web browsers." }
        ]
    },
    {
        question: "What does 'HTTP' stand for?",
        answers: [
            { text: "HyperText Transfer Protocol", correct: true, feedback: "Correct! HTTP is the foundation of data communication for the web." },
            { text: "High-Tech Text Process", correct: false, feedback: "Incorrect. That's not what HTTP stands for." },
            { text: "Hyperlink Text Technology", correct: false, feedback: "Incorrect. HTTP is about data transfer, not just hyperlinks." },
            { text: "Home Tool Transfer Protocol", correct: false, feedback: "Incorrect. HTTP is not related to home tools." }
        ]
    },
    {
        question: "Which scientist developed the theory of relativity?",
        answers: [
            { text: "Isaac Newton", correct: false, feedback: "Incorrect. Newton formulated laws of motion and gravity." },
            { text: "Albert Einstein", correct: true, feedback: "Correct! Einstein revolutionized physics with relativity." },
            { text: "Stephen Hawking", correct: false, feedback: "Incorrect. Hawking worked on black holes and cosmology." },
            { text: "Galileo Galilei", correct: false, feedback: "Incorrect. Galileo was a pioneer of modern astronomy." }
        ]
    },
    {
        question: "What is the smallest unit of matter?",
        answers: [
            { text: "Molecule", correct: false, feedback: "Incorrect. Molecules are made of atoms." },
            { text: "Atom", correct: false, feedback: "Incorrect. Atoms consist of smaller particles." },
            { text: "Quark", correct: false, feedback: "Incorrect. While small, quarks aren't the fundamental unit." },
            { text: "Elementary particle", correct: true, feedback: "Correct! Elementary particles like electrons and quarks are currently considered fundamental." }
        ]
    },
    // History
    {
        question: "In which year did World War II end?",
        answers: [
            { text: "1943", correct: false, feedback: "Incorrect. The war was still ongoing in 1943." },
            { text: "1945", correct: true, feedback: "Correct! WWII ended in September 1945." },
            { text: "1947", correct: false, feedback: "Incorrect. The war had been over for two years by 1947." },
            { text: "1939", correct: false, feedback: "Incorrect. 1939 was when the war began." }
        ]
    },
    {
        question: "Who was the first president of the United States?",
        answers: [
            { text: "Thomas Jefferson", correct: false, feedback: "Incorrect. Jefferson was the third president." },
            { text: "Abraham Lincoln", correct: false, feedback: "Incorrect. Lincoln was the 16th president." },
            { text: "George Washington", correct: true, feedback: "Correct! Washington served from 1789-1797." },
            { text: "John Adams", correct: false, feedback: "Incorrect. Adams was the second president." }
        ]
    },
    {
        question: "Which ancient civilization built the pyramids?",
        answers: [
            { text: "Ancient Greeks", correct: false, feedback: "Incorrect. The Greeks came much later." },
            { text: "Ancient Egyptians", correct: true, feedback: "Correct! The pyramids were built as tombs for pharaohs." },
            { text: "Ancient Romans", correct: false, feedback: "Incorrect. The Romans built different structures." },
            { text: "Mesopotamians", correct: false, feedback: "Incorrect. Mesopotamians built ziggurats, not pyramids." }
        ]
    },
    {
        question: "When was the Declaration of Independence signed?",
        answers: [
            { text: "1776", correct: true, feedback: "Correct! It was signed on July 4, 1776." },
            { text: "1789", correct: false, feedback: "Incorrect. That's when the Constitution was ratified." },
            { text: "1492", correct: false, feedback: "Incorrect. That's when Columbus reached the Americas." },
            { text: "1812", correct: false, feedback: "Incorrect. That's when the War of 1812 began." }
        ]
    },
    {
        question: "Which empire was ruled by Julius Caesar?",
        answers: [
            { text: "Greek Empire", correct: false, feedback: "Incorrect. Greece had city-states, not emperors." },
            { text: "Roman Empire", correct: true, feedback: "Correct! Caesar was a key figure in Rome's transition from republic to empire." },
            { text: "Persian Empire", correct: false, feedback: "Incorrect. The Persian Empire was in the Middle East." },
            { text: "Mongol Empire", correct: false, feedback: "Incorrect. The Mongols came much later." }
        ]
    },
    // Geography
    {
        question: "Which is the longest river in the world?",
        answers: [
            { text: "Amazon River", correct: false, feedback: "Incorrect. While the Amazon is the largest by volume, it's not the longest." },
            { text: "Nile River", correct: true, feedback: "Correct! The Nile is approximately 6,650 km long." },
            { text: "Yangtze River", correct: false, feedback: "Incorrect. The Yangtze is Asia's longest river." },
            { text: "Mississippi River", correct: false, feedback: "Incorrect. The Mississippi is North America's longest." }
        ]
    },
    {
        question: "What is the largest desert in the world?",
        answers: [
            { text: "Sahara Desert", correct: false, feedback: "Incorrect. While the Sahara is the largest hot desert, there's a bigger one." },
            { text: "Gobi Desert", correct: false, feedback: "Incorrect. The Gobi is much smaller." },
            { text: "Antarctica", correct: true, feedback: "Correct! Antarctica is the largest cold desert." },
            { text: "Arabian Desert", correct: false, feedback: "Incorrect. The Arabian Desert is smaller than the Sahara." }
        ]
    },
    {
        question: "Which country has the most time zones?",
        answers: [
            { text: "United States", correct: false, feedback: "Incorrect. The US has 6 time zones (including Alaska and Hawaii)." },
            { text: "China", correct: false, feedback: "Incorrect. China uses a single time zone despite its size." },
            { text: "Russia", correct: true, feedback: "Correct! Russia spans 11 time zones." },
            { text: "Canada", correct: false, feedback: "Incorrect. Canada has 6 time zones." }
        ]
    },
    {
        question: "What is the smallest country in the world?",
        answers: [
            { text: "Monaco", correct: false, feedback: "Incorrect. Monaco is small but not the smallest." },
            { text: "Vatican City", correct: true, feedback: "Correct! Vatican City is just 0.44 km²." },
            { text: "San Marino", correct: false, feedback: "Incorrect. San Marino is larger than Vatican City." },
            { text: "Liechtenstein", correct: false, feedback: "Incorrect. Liechtenstein is much larger." }
        ]
    },
    {
        question: "Which continent has the most countries?",
        answers: [
            { text: "Asia", correct: false, feedback: "Incorrect. Asia has about 48 countries." },
            { text: "Europe", correct: false, feedback: "Incorrect. Europe has about 44 countries." },
            { text: "Africa", correct: true, feedback: "Correct! Africa has 54 recognized countries." },
            { text: "North America", correct: false, feedback: "Incorrect. North America has 23 countries." }
        ]
    },
    // Entertainment
    {
        question: "Who directed the movie 'Jurassic Park'?",
        answers: [
            { text: "Steven Spielberg", correct: true, feedback: "Correct! Spielberg directed this 1993 classic." },
            { text: "George Lucas", correct: false, feedback: "Incorrect. Lucas created Star Wars." },
            { text: "James Cameron", correct: false, feedback: "Incorrect. Cameron directed Titanic and Avatar." },
            { text: "Christopher Nolan", correct: false, feedback: "Incorrect. Nolan is known for Inception and The Dark Knight." }
        ]
    },
    {
        question: "Which artist has won the most Grammy Awards?",
        answers: [
            { text: "Michael Jackson", correct: false, feedback: "Incorrect. Jackson won 13 Grammys." },
            { text: "Beyoncé", correct: true, feedback: "Correct! Beyoncé has won 28 Grammys (as of 2021)." },
            { text: "Madonna", correct: false, feedback: "Incorrect. Madonna has won 7 Grammys." },
            { text: "Elvis Presley", correct: false, feedback: "Incorrect. Presley won 3 Grammys." }
        ]
    },
    {
        question: "What is the highest-grossing film of all time?",
        answers: [
            { text: "Avatar", correct: false, feedback: "Incorrect. Avatar was surpassed in 2019." },
            { text: "Avengers: Endgame", correct: false, feedback: "Incorrect. Endgame was briefly #1." },
            { text: "Gone with the Wind", correct: false, feedback: "Incorrect. When adjusted for inflation, it's #1, but not nominally." },
            { text: "Avatar: The Way of Water", correct: true, feedback: "Correct! As of 2023, it surpassed its predecessor." }
        ]
    },
    {
        question: "Which band is known as the 'Fab Four'?",
        answers: [
            { text: "The Rolling Stones", correct: false, feedback: "Incorrect. The Stones are legendary but not the Fab Four." },
            { text: "The Beatles", correct: true, feedback: "Correct! The Beatles revolutionized pop music." },
            { text: "Led Zeppelin", correct: false, feedback: "Incorrect. Zeppelin was a quartet but not called the Fab Four." },
            { text: "Queen", correct: false, feedback: "Incorrect. Queen had four members but different style." }
        ]
    },
    {
        question: "Who played Jack in 'Titanic'?",
        answers: [
            { text: "Brad Pitt", correct: false, feedback: "Incorrect. Pitt wasn't in Titanic." },
            { text: "Johnny Depp", correct: false, feedback: "Incorrect. Depp wasn't in Titanic." },
            { text: "Leonardo DiCaprio", correct: true, feedback: "Correct! DiCaprio starred opposite Kate Winslet." },
            { text: "Matt Damon", correct: false, feedback: "Incorrect. Damon wasn't in Titanic." }
        ]
    }
];

// Select 10 random questions for each quiz
const questions = questionBank.sort(() => 0.5 - Math.random()).slice(0, 10);

// Load user profile from localStorage if available
function loadProfile() {
    const savedProfile = localStorage.getItem('quizProfile');
    if (savedProfile) {
        userProfile = JSON.parse(savedProfile);
        updateProfileDisplay();
    }
}

// Save profile to localStorage
function saveProfile() {
    localStorage.setItem('quizProfile', JSON.stringify(userProfile));
}

// Update profile display
function updateProfileDisplay() {
    usernameElement.textContent = userProfile.name;
    profilePic.textContent = userProfile.name.charAt(0).toUpperCase();
    totalQuizzesElement.textContent = userProfile.totalQuizzes;
    
    const average = userProfile.totalQuizzes > 0 
        ? Math.round((userProfile.totalScore / userProfile.totalQuizzes) * 100 / questions.length)
        : 0;
    averageScoreElement.textContent = `${average}%`;
    
    const highest = Math.round((userProfile.highestScore / questions.length) * 100);
    highestScoreElement.textContent = `${highest}%`;
    
    // Update history
    historyList.innerHTML = '';
    userProfile.history.slice().reverse().forEach((quiz, index) => {
        const quizItem = document.createElement('div');
        quizItem.className = 'history-item';
        const percentage = Math.round((quiz.score / quiz.total) * 100);
        quizItem.innerHTML = `
            <strong>Quiz ${userProfile.totalQuizzes - index}</strong><br>
            ${quiz.date}<br>
            Score: ${quiz.score}/${quiz.total} (${percentage}%)
        `;
        historyList.appendChild(quizItem);
    });
}

// Save profile button event
saveProfileButton.addEventListener('click', () => {
    const newName = nameInput.value.trim();
    if (newName) {
        userProfile.name = newName;
        profilePic.textContent = newName.charAt(0).toUpperCase();
        saveProfile();
        updateProfileDisplay();
        nameInput.value = '';
    }
});

// Initialize quiz
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.classList.add('hidden');
    feedbackElement.classList.add('hidden');
    scoreDisplay.textContent = `Score: ${score}`;
    resultContainer.innerHTML = "";
    updateProgressBar();
    showQuestion();
}

// Show current question
function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("btn");
        button.addEventListener("click", () => selectAnswer(button, answer));
        answerButtons.appendChild(button);
    });
}

// Reset quiz state for new question
function resetState() {
    nextButton.classList.add('hidden');
    feedbackElement.classList.add('hidden');
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

// Handle answer selection
function selectAnswer(button, answer) {
    if (answer.correct) {
        button.classList.add("correct");
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
    } else {
        button.classList.add("wrong");
    }

    // Disable all buttons after selection
    Array.from(answerButtons.children).forEach(btn => {
        btn.disabled = true;
    });

    // Show feedback
    feedbackElement.textContent = answer.feedback;
    feedbackElement.className = 'feedback ' + (answer.correct ? 'correct-feedback' : 'incorrect-feedback');
    feedbackElement.classList.remove('hidden');

    nextButton.classList.remove('hidden');
}

// Update progress bar
function updateProgressBar() {
    const progress = ((currentQuestionIndex) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
}

// Next button event
nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    updateProgressBar();
    
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
});

// Show quiz results
function showResult() {
    const percentage = Math.round((score / questions.length) * 100);
    const resultHTML = `
        <div class='result-box'>
            <h2>Quiz Completed!</h2>
            <p>Your score: ${score}/${questions.length} (${percentage}%)</p>
            <p>${getResultMessage(percentage)}</p>
            <button onclick='startQuiz()' class='btn'>Restart Quiz</button>
        </div>
    `;
    resultContainer.innerHTML = resultHTML;
    
    // Update user profile
    userProfile.totalQuizzes++;
    userProfile.totalScore += score;
    if (score > userProfile.highestScore) {
        userProfile.highestScore = score;
    }
    
    // Add to history
    userProfile.history.push({
        date: new Date().toLocaleDateString(),
        score: score,
        total: questions.length
    });
    
    // Keep only last 5 quizzes in history
    if (userProfile.history.length > 5) {
        userProfile.history.shift();
    }
    
    saveProfile();
    updateProfileDisplay();
}

// Get result message based on percentage
function getResultMessage(percentage) {
    if (percentage >= 90) return "Excellent work! You're a quiz master! 🎯";
    if (percentage >= 70) return "Great job! You know your stuff! 👍";
    if (percentage >= 50) return "Good effort! Keep practicing! 💪";
    if (percentage >= 30) return "Keep trying! You'll improve! ✨";
    return "Don't give up! Review and try again! 🔄";
}

// Initialize the app
loadProfile();
startQuiz();