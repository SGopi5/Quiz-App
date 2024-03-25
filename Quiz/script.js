const questions=[
    {
        question:"Do you drink?",
        answers:[
            {text:"yes",correct:false},
            {text:"no",correct:false},
            {text:"socially",correct:true},
            {text:"had enough",correct:false},

        ]
    },
    {
        question:"Do you Smoke ?",
        answers:[
            {text:"yes",correct:false},
            {text:"no",correct:true},
            {text:"socially",correct:false},
            {text:"had enough",correct:false},

        ] 
    },
    {
        question:"What do you like?",
        answers:[
            {text:"Hot",correct:false},
            {text:"Beer",correct:false},
            {text:"Hot n Beer mix",correct:true},
            {text:"Hot n Juice mix",correct:false},

        ]
    },
    {
        question:"End Up destination?",
        answers:[
            {text:"London",correct:false},
            {text:"Mumbai",correct:false},
            {text:"Outcastlife",correct:true},
            {text:"Life Flow",correct:false},

        ]
    }
];
const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");

let currentQIndex=0;
let score = 0;

function startQuiz(){
    currentQIndex=0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}
function showQuestion()
{
    resetState();
    let currentQ = questions[currentQIndex];
    let questionNo=currentQIndex+1;
    questionElement.innerHTML=questionNo+". "+currentQ.question;

    currentQ.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click" ,selectAnswer);
    });
}


function resetState(){
    nextButton.style.display="none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}


function selectAnswer(e){
    const selectBtn = e.target;
    const isCorrect= selectBtn.dataset.correct === "true";
    if(isCorrect){
        selectBtn.classList.add("correct");
        score++;
    }
    else{
        selectBtn.classList.add("incorrect")
    }
    Array.from(answerButton.children).forEach(button=> {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You Scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQIndex++;
    if (currentQIndex<questions.length) {
        showQuestion();        
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})

startQuiz();