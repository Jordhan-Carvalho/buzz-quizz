import { Quizz } from "../interfaces";
import { renderFromQuizzToEndGame } from "../index";
import { calculateScoreAndLevel } from "./endGameScreen";

// --------------------MODULE STATUS-------------------------
let currentQuestion = 1;
let acertos = 0;
// --------------------NODE && NODELIST-------------------------
const singleQuizzScreen = document.querySelector(
  ".single-quizz-screen"
) as HTMLElement;

function selectAnswer(answer: HTMLElement, singleQuizz: Quizz) {
  changeAnswersBG();
  currentQuestion++;

  if (answer.hasAttribute("correct")) acertos++;
  const endGame = singleQuizz.data.questions.length < currentQuestion;

  if (endGame) {
    setTimeout(function () {
      calculateScoreAndLevel(singleQuizz, acertos);
      renderFromQuizzToEndGame(singleQuizz);
    }, 2000);
  } else {
    setTimeout(function () {
      renderSingleQuestion(singleQuizz);
    }, 2000);
  }
}

function changeAnswersBG() {
  const answersNode = singleQuizzScreen?.querySelectorAll(
    ".single-answer-container"
  ) as NodeListOf<Element>;
  for (let answer of answersNode) {
    answer.hasAttribute("correct")
      ? answer.classList.toggle("correct")
      : answer.classList.toggle("wrong");
  }
}

// ------------------------------RENDER FUNCTIONS----------------------------------

export function renderSingleQuestion(singleQuizz: Quizz) {
  singleQuizzScreen.innerHTML = "";
  const answersArray = singleQuizz.data.questions[
    currentQuestion - 1
  ].answers.sort(() => Math.random() - 0.5);

  let headerHtml = ` <h1>${singleQuizz.title}</h1>
  <header class="question-header">
    <h3>${currentQuestion}. ${
    singleQuizz.data.questions[currentQuestion - 1].questionTitle
  }</h3>
  </header> `;

  let answersContainer = document.createElement("div");
  answersContainer.setAttribute("class", "answers-container");

  for (let i = 0; i < 4; i++) {
    answersContainer.innerHTML += `<div class="single-answer-container"  ${
      answersArray[i].correct ? "correct" : ""
    }>
    <figure class="answer-image-container">
      <img
        src="${answersArray[i].answerUrl}"
        alt="resposta quizz"
      />
    </figure>
    <div class="border-container">
      <p>${answersArray[i].answer}</p>
    </div>
  </div>`;
  }

  for (let i = 1; i <= 4; i++) {
    let singleAnswerContainer = answersContainer.querySelector(
      `.single-answer-container:nth-child(${i})`
    );
    singleAnswerContainer?.addEventListener("click", function () {
      //@ts-ignore
      selectAnswer(this, singleQuizz);
    });
  }

  singleQuizzScreen?.insertAdjacentHTML("afterbegin", headerHtml);
  singleQuizzScreen?.insertAdjacentElement("beforeend", answersContainer);
  document.documentElement.style.setProperty(
    "--azulPrincipal",
    `${singleQuizz.data.config.themeColor}`
  );
  document.documentElement.style.setProperty(
    "--quizzFontColor",
    `${singleQuizz.data.config.fontColor}`
  );
  setTimeout(() => {
    answersContainer.classList.add("display-visible");
  }, 0);
}
