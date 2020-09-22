interface Quizz {
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

let questions: Question[] = [];
let numberOfQuestions = 1;
let questionNode: HTMLElement[] = [];

let levels: Level[] = [];
let numberOfLevels = 1;
let levelNode: HTMLElement[] = [];

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
const quizzesScreen = document.querySelector(".quizzes-screen");

const createQuizzScreen = document.querySelector(".create-quizz-screen");
const quizzTitle = document.querySelector("#quizz-title") as HTMLInputElement;
const addQuestionButton = document.querySelector(".add-question");
const sendButton = document.querySelector(".post-quizz-button");
const questionsContainer = document.querySelector(
  ".questions-container"
) as HTMLElement;
const levelsContainer = document.querySelector(
  ".levels-container"
) as HTMLElement;

// --------------------------------LOGIN SCREEN------------------------------------
async function login() {
  const data = { email: emailInput.value, password: passwordInput.value };
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
    fetchQuizzes();
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
      quizzes.push({ title: quizz.title, data: quizz.data });
    }
    console.log(quizzes);
  } catch (e) {
    console.error(e);
  }
}

// ---------------------------------CREATE QUIZZ SCREEN---------------------------------------

function createQuizz() {
  getAllQuestions();
  getAllLevels();
  // validar
  sendToServer();
}

function addQuestion() {
  numberOfQuestions++;
  renderCreateQuestion();
}

function addLevel() {
  numberOfLevels++;
  renderCreateLevels();
}

function getAllQuestions() {
  for (let question of questionNode) {
    let newQuestion: Question;
    let answers: Answer[] = [];
    let questionTitle = question.children[1].value;
    // Pegar todas respostas e colcoar num array
    for (let i = 2; i <= 5; i++) {
      answers.push({
        answer: question.children[i].children[0].value,
        answerUrl: question.children[i].children[1].value,
        correct: i === 2 ? true : false,
      });
    }
    newQuestion = { questionTitle, answers };
    console.log(newQuestion);
    questions.push(newQuestion);
  }
}

function getAllLevels() {
  for (let level of levelNode) {
    let newLevel: Level;
    let range = {
      minRange: Number(level.children[1].children[0].value),
      maxRange: Number(level.children[1].children[1].value),
    };
    let title = level.children[2].value;
    let imageUrl = level.children[3].value;
    let description = level.children[4].value;
    newLevel = { title, range, description, imageUrl };
    console.log(newLevel);
    levels.push(newLevel);
  }
}

async function sendToServer() {
  const quizzData: Quizz = {
    title: quizzTitle.value,
    data: {
      levels,
      questions,
    },
  };
  try {
    toggleIsLoadingQuizz();
    //@ts-ignore
    const resp = await axios.post(
      "https://mock-api.bootcamp.respondeai.com.br/api/v1/buzzquizz/quizzes",
      quizzData,
      {
        headers: {
          "User-Token": token,
        },
      }
    );
    console.log(resp);
    renderFromCreateToQuizzes();
  } catch (e) {
    console.error(e);
    alert("Algum erro ocorreu, verifique os campos");
    toggleIsLoadingQuizz();
  }
}

// --------------------------------RENDER FUNCTION----------------------------------

function renderFromLoginToQuizzes() {
  fetchQuizzes();
  loginScreen?.classList.add("display-none");
  mainContainerScreen?.classList.remove("display-none");
  quizzesScreen?.classList.remove("display-none");
}

function renderProvisorio() {
  loginScreen?.classList.add("display-none");
  mainContainerScreen?.classList.remove("display-none");
  createQuizzScreen?.classList.remove("display-none");
  renderCreateQuestion();
  renderCreateLevels();
}

function renderFromCreateToQuizzes() {
  createQuizzScreen?.classList.toggle("display-none");
  quizzesScreen?.classList.toggle("display-none");
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
}

function renderCreateQuestion() {
  let questionDiv = document.createElement("div");
  questionDiv.setAttribute("class", "create-question-container");
  questionDiv.innerHTML = `<h3>Pergunta ${numberOfQuestions}</h3>
    <input class="question-input" type="text" id="question-title${numberOfQuestions}" placeholder="Digite a pergunta">
    <div class="answer-input-container correct-answer">
      <input type="text" id="correct-answer${numberOfQuestions}" placeholder="Digite a resposta correta">
      <input type="text" id="correct-answer-image${numberOfQuestions}" placeholder="Link para imagem correta">
    </div>
    <div class="answer-input-container wrong-answer">
      <input type="text" id="wrong1-answer${numberOfQuestions}" placeholder="Digite a resposta errada 1">
      <input type="text" id="wrong1-answer-image${numberOfQuestions}" placeholder="Link para imagem errada 1">
    </div>
    <div class="answer-input-container wrong-answer">
      <input type="text" id="wrong2-answer${numberOfQuestions}" placeholder="Digite a resposta errada 2">
      <input type="text" id="wrong2-answer-image${numberOfQuestions}" placeholder="Link para imagem errada 2">
    </div>
    <div class="answer-input-container wrong-answer">
      <input type="text" id="wrong3-answer${numberOfQuestions}" placeholder="Digite a resposta errada 3">
      <input type="text" id="wrong3-answer-image${numberOfQuestions}" placeholder="Link para imagem errada 3">
    </div>`;
  questionNode.push(questionDiv);
  questionsContainer.appendChild(questionDiv);
}

function renderCreateLevels() {
  let levelDiv = document.createElement("div");
  levelDiv.setAttribute("class", "create-level-container");
  levelDiv.innerHTML = `
  <h3>Nível ${numberOfLevels}</h3>
  <div class="answer-input-container">
    <input type="text" placeholder="% Minima de Acerto do nível">
    <input type="text"  placeholder="% Máxima de Acerto do nível">
  </div>
    <input class="question-input" type="text"  placeholder="Título do nível">
    <input class="question-input" type="text"  placeholder="Link da imagem do nível">
    <textarea class="question-input"  rows="4" placeholder="Descrição do Nível"></textarea>
`;
  levelNode.push(levelDiv);
  levelsContainer.appendChild(levelDiv);
}
