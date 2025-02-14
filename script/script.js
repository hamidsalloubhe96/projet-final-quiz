const questions = [
    { question: "Que signifie HTML ?", choices: ["HyperText Markup Language", "Hyper Trainer Markup Language", "HyperText Machine Language", "Hyper Technical Markup Language"], answer: "HyperText Markup Language" },
    { question: "Que signifie CSS ?", choices: ["Computer Style Sheets", "Creative Style Sheets", "Cascading Style Sheets", "Colorful Style Sheets"], answer: "Cascading Style Sheets" },
    { question: "Quelle année a été créée JavaScript ?", choices: ["1990", "1995", "2000", "2005"], answer: "1995" },
    { question: "Quelle propriété CSS permet de changer la couleur du texte ?", choices: ["background-color", "color", "text-color", "font-color"], answer: "color" },
    { question: "Quelle balise HTML est utilisée pour insérer un script JavaScript ?", choices: ["<js>", "<javascript>", "<script>", "<code>"], answer: "<script>" },
    { question: "Quel attribut HTML est utilisé pour lier un fichier CSS externe ?", choices: ["src", "href", "rel", "link"], answer: "href" },
    { question: "Quel langage est utilisé pour interagir avec une API REST ?", choices: ["Python", "JavaScript", "PHP", "C++"], answer: "JavaScript" },
    { question: "Quelle méthode HTTP est utilisée pour récupérer des données depuis un serveur ?", choices: ["GET", "POST", "DELETE", "UPDATE"], answer: "GET" },
    { question: "Quel framework JavaScript est utilisé pour créer des interfaces utilisateur dynamiques ?", choices: ["React", "Laravel", "Django", "Spring"], answer: "React" },
    { question: "Quel mot-clé permet de déclarer une variable en JavaScript ?", choices: ["let", "var", "const", "declare"], answer: "let" },
    { question: "Que signifie JSON ?", choices: ["JavaScript Object Notation", "Java Syntax Object Notation", "Java Serialized Object Notation", "Java Source Open Notation"], answer: "JavaScript Object Notation" },
    { question: "Quelle fonction permet d’afficher du texte dans la console en JavaScript ?", choices: ["print()", "console.log()", "display()", "log.console()"], answer: "console.log()" },
    { question: "Quelle propriété CSS permet de rendre un élément invisible ?", choices: ["display: none;", "visibility: hidden;", "opacity: 0;", "Toutes ces réponses"], answer: "Toutes ces réponses" },
    { question: "Quel langage est principalement utilisé pour styliser les pages web ?", choices: ["HTML", "JavaScript", "CSS", "PHP"], answer: "CSS" },
    { question: "Quel sélecteur CSS cible tous les éléments d’une page ?", choices: ["*", "#", ".", "//"], answer: "*" },
    { question: "Quel framework CSS est le plus populaire ?", choices: ["Bootstrap", "Tailwind", "Foundation", "Materialize"], answer: "Bootstrap" },
    { question: "Quelle balise est utilisée pour créer un lien hypertexte en HTML ?", choices: ["<link>", "<a>", "<url>", "<href>"], answer: "<a>" },
    { question: "Quelle est la balise HTML correcte pour insérer une image ?", choices: ["<img>", "<image>", "<src>", "<pic>"], answer: "<img>" },
    { question: "Quel attribut est utilisé pour définir le texte alternatif d'une image ?", choices: ["title", "alt", "desc", "caption"], answer: "alt" },
    { question: "Quelle méthode JavaScript permet d’ajouter un élément dans un tableau ?", choices: ["add()", "append()", "push()", "insert()"], answer: "push()" },
    { question: "Que signifie AJAX ?", choices: ["Asynchronous JavaScript and XML", "Advanced Java Application X", "Automated Java and XML", "None of the above"], answer: "Asynchronous JavaScript and XML" },
    { question: "Quelle méthode permet d’arrêter un intervalle en JavaScript ?", choices: ["clearTimeout()", "clearInterval()", "stopInterval()", "cancelInterval()"], answer: "clearInterval()" },
    { question: "Quelle propriété CSS est utilisée pour définir une grille de mise en page ?", choices: ["grid-template", "display: grid;", "grid-layout", "grid-box"], answer: "display: grid;" },
    { question: "Quel est le but principal d'un CDN ?", choices: ["Stocker des bases de données", "Accélérer le chargement des fichiers statiques", "Créer des animations CSS", "Gérer les erreurs JavaScript"], answer: "Accélérer le chargement des fichiers statiques" },
    { question: "Quelle API est utilisée pour stocker des données localement dans un navigateur ?", choices: ["SessionStorage", "LocalStorage", "Cookies", "Toutes ces réponses"], answer: "Toutes ces réponses" },
    { question: "Quelle bibliothèque JavaScript est utilisée pour manipuler facilement le DOM ?", choices: ["jQuery", "Vue.js", "Django", "Flask"], answer: "jQuery" },
    { question: "Quel attribut HTML est utilisé pour spécifier l'icône d'un site web ?", choices: ["icon", "favicon", "rel", "meta"], answer: "favicon" },
    { question: "Quel est l’objectif principal du SEO ?", choices: ["Sécuriser un site web", "Améliorer le référencement d’un site", "Augmenter la vitesse de chargement", "Créer un site responsive"], answer: "Améliorer le référencement d’un site" },
    { question: "Quel est le rôle de Node.js ?", choices: ["Exécuter JavaScript côté serveur", "Créer des pages HTML", "Styler des éléments HTML", "Gérer une base de données"], answer: "Exécuter JavaScript côté serveur" }
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 20;
let hasAnswered = false;

const questionElement = document.getElementById("question");
const choicesContainer = document.getElementById("choices");
const scoreElement = document.getElementById("score");
const timerElement = document.getElementById("timer");
const messageElement = document.getElementById("message");
const questionNumberElement = document.getElementById("question-number");
const historyElement = document.getElementById("history");
const historyContainer = document.getElementById("history-container");
const toggleHistoryBtn = document.getElementById("toggle-history-btn");
const prevButton = document.getElementById("prev-btn");
const nextButton = document.getElementById("next-btn");

const correctSound = document.getElementById("correct-sound");
const wrongSound = document.getElementById("wrong-sound");
const clickSound = document.getElementById("click-sound");


toggleHistoryBtn.addEventListener("click", () => {
    if (historyContainer.style.display === "none") {
        historyContainer.style.display = "block";
        toggleHistoryBtn.textContent = "Masquer l'historique";
    } else {
        historyContainer.style.display = "none";
        toggleHistoryBtn.textContent = "Voir l'historique";
    }
});


prevButton.addEventListener("click", () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
});

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    }
});

function startTimer() {
    clearInterval(timer);
    timeLeft = 25;
    timerElement.textContent = `⏳ Temps restant : ${timeLeft}s`;

    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `⏳ Temps restant : ${timeLeft}s`;

        if (timeLeft === 0) {
            clearInterval(timer);
            checkAnswer(""); 
        }
    }, 1000);
}

function loadQuestion() {
    clearChoices();
    clearInterval(timer);
    startTimer();
    hasAnswered = false;
    messageElement.textContent = "";
    nextButton.disabled = true;

    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    questionNumberElement.textContent = `Question ${currentQuestionIndex + 1} / ${questions.length}`;

    currentQuestion.choices.forEach(choice => {
        const button = document.createElement("button");
        button.textContent = choice;
        button.onclick = () => {
            if (!hasAnswered) {
                clickSound.play();
                checkAnswer(choice);
                hasAnswered = true;
            }
        };
        choicesContainer.appendChild(button);
    });
}

function clearChoices() {
    choicesContainer.innerHTML = "";
}

function checkAnswer(selectedChoice) {
    clearInterval(timer);
    const correctAnswer = questions[currentQuestionIndex].answer;
    const buttons = choicesContainer.getElementsByTagName("button");

    for (let btn of buttons) {
        btn.disabled = true;
        btn.classList.add("disabled");
    }

    let listItem = document.createElement("li");
    if (selectedChoice === correctAnswer) {
        score += 5;
        messageElement.textContent = "🎉 Bonne réponse !";
        messageElement.className = "correct";
        correctSound.play();
        listItem.className = "correct-answer";
        listItem.textContent = `✅ ${questions[currentQuestionIndex].question} - Réponse : ${selectedChoice}`;
    } else {
        messageElement.textContent = "❌ Mauvaise réponse !";
        messageElement.className = "wrong";
        wrongSound.play();
        listItem.className = "wrong-answer";
        listItem.textContent = `❌ ${questions[currentQuestionIndex].question} - Mauvaise réponse : ${selectedChoice} (Bonne : ${correctAnswer})`;
    }

    historyElement.appendChild(listItem);
    scoreElement.textContent = `Score : ${score}`;
    nextButton.disabled = false;
}

loadQuestion();
