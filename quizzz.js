// Select Elements
let countSpan = document.querySelector(".count span");
let bullets = document.querySelector(".bullets");
let bulletsSpanContainer = document.querySelector(".bullets .spans");
let quizArea = document.querySelector(".quiz-area");
let answersArea = document.querySelector(".answers-area");
let NextButton = document.querySelector(".Next-button");
let backButton = document.querySelector(".back-button");
let resultsContainer = document.querySelector(".results");
let countdownElement = document.querySelector(".countdown");
const arr = [];
let allayBack = 0;
let s = 0;


// Set Options
let currentIndex = 0;



function getQuestions() {
    let myRequest = new XMLHttpRequest();

    myRequest.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let questionsObject = JSON.parse(this.responseText);
            let qCount = questionsObject.length;

            // Create Bullets + Set Questions Count
            createBullets(qCount);

            // Add Question Data
            addQuestionData(questionsObject[currentIndex], qCount);

            // Start CountDown
            //   countdown(3, qCount);////

            backButton.onclick = () => {
                // Get Right Answer
                let answers = document.getElementsByName("question");
                for (let i = 0; i < answers.length; i++) {
                    if (answers[i].checked) {
                        SaveAnswers(currentIndex, answers[i].dataset.answer)
                    }
                }
                let theRightAnswer = questionsObject[currentIndex].right_answer;
                if (currentIndex != 0) {
                    // Handle Bullets Class

                    handleBullets(0);
                    // Increase Index
                    currentIndex--;

                    // Remove Previous Question
                    quizArea.innerHTML = "";
                    answersArea.innerHTML = "";

                    // Add Question Data
                    addQuestionData(questionsObject[currentIndex], qCount);
                    NextButton.innerHTML = "التالي";

                }

            };
            // Click On Submit
            NextButton.onclick = () => {
                // console.log(arr[7]);
                // Get Right Answer

                let theRightAnswer = questionsObject[currentIndex].right_answer;
                let answers = document.getElementsByName("question");
                for (let i = 0; i < answers.length; i++) {
                    if (answers[i].checked) {
                        SaveAnswers(currentIndex, answers[i].dataset.answer)
                    }
                }

                // Increase Index
                currentIndex++;



                // Remove Previous Question
                quizArea.innerHTML = "";
                answersArea.innerHTML = "";
                if (currentIndex === qCount - 1) {
                    NextButton.innerHTML = "انهاء";
                }
                else {
                    NextButton.innerHTML = "التالي";
                }

                // Add Question Data
                addQuestionData(questionsObject[currentIndex], qCount);

                // Handle Bullets Class
                handleBullets(1);
                console.log(theRightAnswer);
                console.log(arr);
                // Start CountDown

                checkAllAnswer(qCount, questionsObject);
                // Show Results
                showResults(qCount);

            };
        }
    };

    myRequest.open("GET", "html-question.json", true);
    myRequest.send();
}

getQuestions();

function createBullets(num) {
    countSpan.innerHTML = num;

    // Create Spans
    for (let i = 0; i < num; i++) {
        // Create Bullet
        let theBullet = document.createElement("span");

        // Check If Its First Span
        if (i === 0) {
            theBullet.className = "on";
        }

        // Append Bullets To Main Bullet Container
        bulletsSpanContainer.appendChild(theBullet);
    }
}

function addQuestionData(obj, count) {
    if (currentIndex < count) {
        // Create H2 Question Title
        let questionTitle = document.createElement("h2");

        // Create Question Text
        let questionText = document.createTextNode(obj["title"]);

        // Append Text To H2
        questionTitle.appendChild(questionText);

        // Append The H2 To The Quiz Area
        quizArea.appendChild(questionTitle);

        // Create The Answers
        for (let i = 1; i <= 4; i++) {
            // Create Main Answer Div
            let mainDiv = document.createElement("div");

            // Add Class To Main Div
            mainDiv.className = "answer";

            // Create Radio Input
            let radioInput = document.createElement("input");

            // Add Type + Name + Id + Data-Attribute
            radioInput.name = "question";
            radioInput.type = "radio";
            radioInput.id = `answer_${i}`;
            radioInput.dataset.answer = obj[`answer_${i}`];

            // Make First Option Selected
            if (radioInput.dataset.answer === arr[currentIndex]) {
                radioInput.checked = true;
            }

            // Create Label
            let theLabel = document.createElement("label");

            // Add For Attribute
            theLabel.htmlFor = `answer_${i}`;

            // Create Label Text
            let theLabelText = document.createTextNode(obj[`answer_${i}`]);

            // Add The Text To Label
            theLabel.appendChild(theLabelText);

            // Add Input + Label To Main Div
            mainDiv.appendChild(radioInput);
            mainDiv.appendChild(theLabel);

            // Append All Divs To Answers Area
            answersArea.appendChild(mainDiv);
        }
    }
}
function checkAnswerr(rAnswer, ChoosenAnswer) {

    console.log("rAnswer", rAnswer);
    console.log("ChoosenAnswer", ChoosenAnswer);
    if (rAnswer === ChoosenAnswer) {
        s++;
        console.log("rrrr");
    }
}
function checkAllAnswer(count, questionsObject) {
    if (count === currentIndex) {
        for (let i = 0; i < count; i++) {
            console.log(i);
            checkAnswerr(questionsObject[i].right_answer, arr[i]);
        }
    }
}

function handleBullets(BackOrNext) {
    let bulletsSpans = document.querySelectorAll(".bullets .spans span");
    let arrayOfSpans = Array.from(bulletsSpans);
    arrayOfSpans.forEach((span, index) => {
        if (currentIndex === index) {
            if (BackOrNext === 1) {
                span.className = "on";
            }
            else {
                span.className = "";
            }

        }
    });
}

function showResults(count) {
    let theResults;

    if (currentIndex === count) {

        quizArea.remove();
        answersArea.remove();
        NextButton.remove();
        bullets.remove();
        console.log("sssss", s);
        if (rightAnswers > count / 2 && rightAnswers < count) {
            theResults = `<span class="good">Good</span>, ${rightAnswers} From ${count}`;
        } else if (rightAnswers === count) {
            theResults = `<span class="perfect">Perfect</span>, All Answers Is Good`;
        } else {
            theResults = `<span class="bad">Bad</span>, ${rightAnswers} From ${count}`;
        }

        resultsContainer.innerHTML = theResults;
        resultsContainer.style.padding = "10px";
        resultsContainer.style.backgroundColor = "white";
        resultsContainer.style.marginTop = "10px";
    }
}


function SaveAnswers(indexx, Number) {
    arr[indexx] = Number;
    console.log(indexx)
    console.log(arr[indexx])
}