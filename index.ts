interface Quizz {
  id?: string;
  title: string;
  data: {
    questions: Question[];
    levels: Level[];
  };
}

interface Level {
  title: string;
  range: { minRange: number; maxRange: number };
  imageUrl: string;
  description: string;
}

interface Question {
  questionTitle: string;
  answers: Answer[];
}

interface Answer {
  answer: string;
  answerUrl: string;
  correct: boolean;
}

// ----------------------------------APP STATS------------------------------
let token = "";
let quizzes: Quizz[] = [];
// ---create quizz stats---
let questions: Question[] = [];
let numberOfQuestions = 1;
let questionNode: HTMLElement[] = [];
let levels: Level[] = [];
let numberOfLevels = 1;
let levelNode: HTMLElement[] = [];
// ---single quizz stats---
let currentQuestion = 1;
let acertos = 0;
//---end game stats---
let score = 0;
let resultLevel: Level = {
  title: "Voce eh praticamente um aluno de Hogwarst!",
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit.Repellendus, qui! Doloremque, id? Nam perspiciatis suscipitlaboriosam sapiente eligendi obcaecati placeat minus, magni fugaomnis tempore incidunt ratione, mollitia rem facere?",
  imageUrl:
    "https://i.pinimg.com/564x/41/2d/83/412d83a778c691059de368b047c2a52f.jpg",
  range: { minRange: 0, maxRange: 100 },
};

// ----------------------------------NODE && NODE LIST------------------------------
const loginScreen = document.querySelector(".login-screen");
const emailInput = document.querySelector(".email-input") as HTMLInputElement;
const passwordInput = document.querySelector(
  ".password-input"
) as HTMLInputElement;
const loadingGif = document.querySelector(".loading-gif");
const loadingGifQuizz = document.querySelector(".loading-gif-quizz");
const loginButton = document.querySelector(".login-button");

const mainContainerScreen = document.querySelector("main");
const mainHeader = document.querySelector(".main-header");

const quizzesScreen = document.querySelector(".quizzes-screen") as HTMLElement;

const endGameScreen = document.querySelector(".end-game-screen");

const singleQuizzScreen = document.querySelector(
  ".single-quizz-screen"
) as HTMLElement;

const createQuizzScreen = document.querySelector(".create-quizz-screen");
const quizzTitle = document.querySelector("#quizz-title") as HTMLInputElement;
const addQuestionButton = document.querySelector(".add-question");
const sendButton = document.querySelector(".post-quizz-button") as HTMLElement;
const questionsContainer = document.querySelector(
  ".questions-container"
) as HTMLElement;
const levelsContainer = document.querySelector(
  ".levels-container"
) as HTMLElement;

const loadingScreen = document.querySelector(".loading-screen") as HTMLElement;

// --------------------------------LOGIN SCREEN------------------------------------
async function login() {
  const data = {
    email: emailInput.value.trim(),
    password: passwordInput.value.trim(),
  };
  if (data.email === "" || data.password === "") {
    alert("Preencher todos os campos");
    return;
  }
  try {
    toggleIsLoading();
    //@ts-ignore
    const resp = await axios.post(
      "https://mock-api.bootcamp.respondeai.com.br/api/v1/buzzquizz/users",
      data
    );
    token = resp.data.token;
    renderFromLoginToQuizzes();
  } catch (e) {
    alert("Email ou senha incorretos");
    console.error(e);
    window.location.reload();
  }
}

// ---------------------------------QUIZZES SCREEN---------------------------------------
async function fetchQuizzes() {
  try {
    isLoading();
    // @ts-ignore
    const resp = await axios.get(
      "https://mock-api.bootcamp.respondeai.com.br/api/v1/buzzquizz/quizzes",
      {
        headers: {
          "User-token": token,
        },
      }
    );
    quizzes = [];
    for (let quizz of resp.data) {
      quizzes.push({ id: quizz.id, title: quizz.title, data: quizz.data });
    }
  } catch (e) {
    console.error(e);
  }
  isLoading();
}

async function deleteQuizz(button: HTMLElement, quizzId: string) {
  const presp = prompt("Tem certeza? pra apagar digite SIM");
  if (presp !== "SIM") return;
  console.log("passou");

  try {
    //@ts-ignore
    await axios.delete(
      `https://mock-api.bootcamp.respondeai.com.br/api/v1/buzzquizz/quizzes/${quizzId}`,
      {
        headers: {
          "User-Token": token,
        },
      }
    );
    console.log("foi");
    renderQuizzes();
  } catch (e) {
    console.error(e);
  }
}

// ---------------------------------CREATE QUIZZ SCREEN---------------------------------------

function createQuizz(edit = false, quizzId?: string) {
  // validar
  if (!getAllQuestions()) return;
  getAllQuestions();
  if (!getAllLevels()) return;
  getAllLevels();
  if (edit) {
    updateQuizz(quizzId as string);
  } else {
    sendToServer();
  }
}

function addQuestion() {
  numberOfQuestions++;
  renderCreateQuestion();
}

function addLevel() {
  numberOfLevels++;
  renderCreateLevels();
}

function checkQuestionMark(question: string): boolean {
  if (
    question.charAt(question.length - 1) !== "?" ||
    question.indexOf("?") !== question.length - 1
  ) {
    alert(
      "É obrigatorio terminar a pergunta com '?', e só se pode ter 1 pergunta por bloco de perguntas."
    );
    return false;
  }
  return true;
}

function getAllQuestions(): boolean {
  questions = [];
  for (let question of questionNode) {
    let newQuestion: Question;
    let answers: Answer[] = [];
    let questionTitle = firstLetterUpperCase(question.children[1].value.trim());
    if (!checkQuestionMark(questionTitle)) return false;
    // Pegar todas respostas e colcoar num array
    for (let i = 2; i <= 5; i++) {
      const answer = firstLetterUpperCase(
        question.children[i].children[0].value.trim()
      );
      const answerUrl = question.children[i].children[1].value.trim();
      answers.push({
        answer,
        answerUrl,
        correct: i === 2 ? true : false,
      });
      if (answer === "" || answerUrl === "") {
        alert("Preencha todos os campos");
        return false;
      }
    }
    newQuestion = { questionTitle, answers };
    questions.push(newQuestion);
  }
  return true;
}

function getAllLevels(): boolean {
  levels = [];
  for (let level of levelNode) {
    let newLevel: Level;
    let range = {
      minRange: Number(level.children[1].children[0].value.trim()),
      maxRange: Number(level.children[1].children[1].value.trim()),
    };
    let title = firstLetterUpperCase(level.children[2].value.trim());
    let imageUrl = level.children[3].value.trim();
    let description = firstLetterUpperCase(level.children[4].value.trim());
    if (
      title === "" ||
      imageUrl === "" ||
      description === "" ||
      isNaN(range.minRange) ||
      isNaN(range.maxRange)
    ) {
      alert("Preencha todos os campos");
      return false;
    }
    newLevel = { title, range, description, imageUrl };
    levels.push(newLevel);
  }
  return true;
}

async function sendToServer() {
  const quizzData: Quizz = {
    title: firstLetterUpperCase(quizzTitle.value.trim()),
    data: {
      levels,
      questions,
    },
  };
  try {
    toggleIsLoadingQuizz();
    //@ts-ignore
    await axios.post(
      "https://mock-api.bootcamp.respondeai.com.br/api/v1/buzzquizz/quizzes",
      quizzData,
      {
        headers: {
          "User-Token": token,
        },
      }
    );
    console.log("enviado");
    renderFromCreateToQuizzes();
  } catch (e) {
    console.error(e);
    alert("Preencha todos os campos");
  }
  toggleIsLoadingQuizz();
}

async function updateQuizz(id: string) {
  const quizzData: Quizz = {
    title: firstLetterUpperCase(quizzTitle.value.trim()),
    data: {
      levels,
      questions,
    },
  };
  try {
    toggleIsLoadingQuizz();
    // @ts-ignore
    await axios.put(
      `https://mock-api.bootcamp.respondeai.com.br/api/v1/buzzquizz/quizzes/${id}`,
      quizzData,
      { headers: { "User-Token": token } }
    );
    console.log("FOI CARLAHOOOOOO");
    renderFromCreateToQuizzes();
  } catch (e) {
    console.error(e);
    alert("Preencha todos os campos");
  }
  toggleIsLoadingQuizz();
}

// ---------------------------------SINGLE QUIZZ SCREEN--------------------------------------

function selectAnswer(answer: HTMLElement, singleQuizz: Quizz) {
  changeAnswers("background");
  currentQuestion++;
  if (answer.hasAttribute("correct")) acertos++;
  console.log(`acertos ${acertos} e currentQuestion ${currentQuestion}`);
  // remove o eventListners de todas botoes
  changeAnswers("removeClick");
  console.log(singleQuizz.data.questions.length);
  const endGame = singleQuizz.data.questions.length < currentQuestion;
  if (endGame) {
    setTimeout(function () {
      calculateScoreAndLevel(singleQuizz);
      renderFromQuizzToEndGame(singleQuizz);
    }, 2000);
  } else {
    setTimeout(function () {
      renderSingleQuestion(singleQuizz);
    }, 2000);
  }
}

function changeAnswers(whatToChange: string) {
  const answersNode = singleQuizzScreen?.querySelectorAll(
    ".single-answer-container"
  ) as NodeListOf<Element>;
  for (let answer of answersNode) {
    if (whatToChange === "background") {
      answer.hasAttribute("correct")
        ? answer.classList.toggle("correct")
        : answer.classList.toggle("wrong");
    } else if (whatToChange === "removeClick") {
      // @ts-ignore
      // removeEventListener("click", teste);
    }
  }
}

// ---------------------------------END GAME SCREEN--------------------------------------

function calculateScoreAndLevel(quizz: Quizz) {
  score = Math.round((acertos / quizz.data.questions.length) * 100);
  for (let level of quizz.data.levels) {
    if (score >= level.range.minRange && score <= level.range.maxRange) {
      resultLevel = level;
      return;
    }
  }
}

// --------------------------------RENDER FUNCTION----------------------------------

function renderFromLoginToQuizzes() {
  renderQuizzes();
  loginScreen?.classList.add("display-none");
  mainContainerScreen?.classList.remove("display-none");
  mainHeader?.classList.remove("display-none");
  quizzesScreen?.classList.remove("display-none");
}

function renderFromCreateToQuizzes() {
  renderQuizzes();
  createQuizzScreen?.classList.toggle("display-none");
  quizzesScreen?.classList.toggle("display-none");
}

function renderFromQuizzesToCreate(quizz?: Quizz) {
  questionsContainer.innerHTML = "";
  levelsContainer.innerHTML = "";
  questionNode = [];
  levelNode = [];
  if (quizz) {
    sendButton.setAttribute("onclick", `createQuizz(true, ${quizz.id})`);
    sendButton.innerText = "Atualizar";
    quizzTitle.value = quizz.title;
    for (let i = 0; i < quizz.data.questions.length; i++) {
      console.log(quizz);
      renderCreateQuestion(quizz.data.questions[i], i + 1, true);
    }
    for (let i = 0; i < quizz.data.levels.length; i++) {
      renderCreateLevels(quizz.data.levels[i], i + 1, true);
    }
  } else {
    sendButton.setAttribute("onclick", `createQuizz()`);
    sendButton.innerText = "Publicar";
    quizzTitle.value = "";
    numberOfQuestions = 1;
    numberOfLevels = 1;
    renderCreateQuestion();
    renderCreateLevels();
  }
  createQuizzScreen?.classList.toggle("display-none");
  quizzesScreen?.classList.toggle("display-none");
}

function renderFromQuizzesToQuizz(e: Event, quizz: Quizz) {
  const clickedEle = e.target as HTMLElement;
  if (clickedEle.classList.contains("md")) return;
  renderSingleQuestion(quizz);
  quizzesScreen?.classList.toggle("display-none");
  singleQuizzScreen?.classList.toggle("display-none");
}

function renderFromQuizzToEndGame(quizz: Quizz) {
  renderResults(quizz);
  singleQuizzScreen?.classList.toggle("display-none");
  endGameScreen?.classList.toggle("display-none");
}

function toggleIsLoading() {
  loadingGif?.classList.toggle("display-none");
  loginButton?.classList.toggle("display-none");
}

function toggleIsLoadingQuizz() {
  loadingGifQuizz?.classList.toggle("display-none");
  sendButton?.classList.toggle("display-none");
}

async function renderQuizzes() {
  await fetchQuizzes();
  quizzesScreen.innerHTML = "";
  let newQuizzDiv = `<div class="box-container new-quizz-container" onclick="renderFromQuizzesToCreate()">
                        <h3>Novo Quizz</h3>
                        <ion-icon name="add-circle"></ion-icon>
                      </div>`;
  quizzesScreen?.insertAdjacentHTML("beforeend", newQuizzDiv);
  for (let quizz of quizzes) {
    let html = `<h3>${quizz.title}</h3>
    <div class="icons-container">
      <ion-icon class="delete-icon" onclick="deleteQuizz(this, ${quizz.id})" name="trash"></ion-icon>
      <ion-icon class="edit-icon"   name="create"></ion-icon>
    </div>`;
    let quizzDiv = document.createElement("div");
    quizzDiv.setAttribute("class", "box-container");
    quizzDiv.addEventListener("click", function (e: Event) {
      renderFromQuizzesToQuizz(e, quizz);
    });
    quizzDiv.innerHTML = html;
    let editIcon = quizzDiv.querySelector(".edit-icon");
    editIcon?.addEventListener("click", function (e: Event) {
      renderFromQuizzesToCreate(quizz);
    });
    quizzesScreen?.insertAdjacentElement("beforeend", quizzDiv);
  }
}

function renderCreateQuestion(
  singleQuestion?: Question,
  i?: number,
  isEdit = false
) {
  if (isEdit) numberOfQuestions = i as number;
  let questionDiv = document.createElement("div");
  questionDiv.setAttribute("class", "create-question-container");
  questionDiv.innerHTML = `<h3>Pergunta ${numberOfQuestions}</h3>
    <input class="question-input" type="text" placeholder="Digite a pergunta" value="${
      isEdit ? singleQuestion?.questionTitle : ""
    }" >
    <div class="answer-input-container correct-answer">
      <input type="text" placeholder="Digite a resposta correta" value="${
        isEdit ? singleQuestion?.answers[0].answer : ""
      }">
      <input type="text" placeholder="Link para imagem correta" value="${
        isEdit ? singleQuestion?.answers[0].answerUrl : ""
      }">
    </div>
    <div class="answer-input-container wrong-answer">
      <input type="text" placeholder="Digite a resposta errada 1" value="${
        isEdit ? singleQuestion?.answers[1].answer : ""
      }">
      <input type="text" placeholder="Link para imagem errada 1" value="${
        isEdit ? singleQuestion?.answers[1].answerUrl : ""
      }">
    </div>
    <div class="answer-input-container wrong-answer">
      <input type="text" placeholder="Digite a resposta errada 2" value="${
        isEdit ? singleQuestion?.answers[2].answer : ""
      }">
      <input type="text" placeholder="Link para imagem errada 2" value="${
        isEdit ? singleQuestion?.answers[2].answerUrl : ""
      }">
    </div>
    <div class="answer-input-container wrong-answer">
      <input type="text" placeholder="Digite a resposta errada 3" value="${
        isEdit ? singleQuestion?.answers[3].answer : ""
      }">
      <input type="text" placeholder="Link para imagem errada 3" value="${
        isEdit ? singleQuestion?.answers[3].answerUrl : ""
      }">
    </div>`;
  questionNode.push(questionDiv);
  questionsContainer.appendChild(questionDiv);
  setTimeout(() => {
    questionDiv.classList.add("display-visible");
  }, 0);
  console.log(`questionNode ${questionNode.length}`);
}

function renderCreateLevels(singleLevel?: Level, i?: number, isEdit = false) {
  if (isEdit) numberOfLevels = i as number;
  let levelDiv = document.createElement("div");
  levelDiv.setAttribute("class", "create-level-container");
  levelDiv.innerHTML = `
  <h3>Nível ${numberOfLevels}</h3>
  <div class="answer-input-container">
    <input type="text" placeholder="% Minima de Acerto do nível" value="${
      isEdit ? singleLevel?.range.minRange : ""
    }">
    <input type="text"  placeholder="% Máxima de Acerto do nível" value="${
      isEdit ? singleLevel?.range.maxRange : ""
    }">
  </div>
    <input class="question-input" type="text"  placeholder="Título do nível" value="${
      isEdit ? singleLevel?.title : ""
    }">
    <input class="question-input" type="text"  placeholder="Link da imagem do nível" value="${
      isEdit ? singleLevel?.imageUrl : ""
    }">
    <textarea class="question-input level-desc"  rows="4" placeholder="Descrição do Nível">${
      isEdit ? singleLevel?.description : ""
    }</textarea>
`;
  levelNode.push(levelDiv);
  levelsContainer.appendChild(levelDiv);
  setTimeout(() => {
    levelDiv.classList.add("display-visible");
  }, 0);
}

function renderSingleQuestion(singleQuizz: Quizz) {
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

  setTimeout(() => {
    answersContainer.classList.add("display-visible");
  }, 0);
}

function renderResults(quizz: Quizz) {
  let html = `<h1>${quizz.title}</h1>
  <header class="question-header">
    <h3>Voce acertou ${acertos} de ${quizz.data.questions.length} perguntas ! Score: ${score}%</h3>
  </header>
  <div class="result-container">
    <div class="result-text-container">
      <h3>${resultLevel.title}</h3>
      <p>
        ${resultLevel.description}
      </p>
    </div>
    <figure class="result-image-container">
      <img
        src="${resultLevel.imageUrl}"
        alt=""
      />
    </figure>
  </div>`;

  endGameScreen?.insertAdjacentHTML("afterbegin", html);
}

// -------------------------------------HELPER FUNCTIONS----------------------------------------

function firstLetterUpperCase(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function isLoading() {
  loadingScreen.classList.toggle("display-none");
}
