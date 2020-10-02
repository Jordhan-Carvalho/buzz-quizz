import { Question, Level, Answer, Quizz } from "../interfaces";
import {
  toggleIsLoadingQuizz,
  renderFromCreateToQuizzes,
} from "../renderFunctions";
import { firstLetterUpperCase } from "../helperFunctions";

// -----------------------MODULE STATUS-----------------------
let questions: Question[] = [];
let numberOfQuestions = 1;
let questionNode: HTMLElement[] = [];
let levels: Level[] = [];
let numberOfLevels = 1;
let levelNode: HTMLElement[] = [];
// ------------------------MODULE NODES---------------------------
const quizzTitle = document.querySelector("#quizz-title") as HTMLInputElement;
const sendButton = document.querySelector(".post-quizz-button") as HTMLElement;
const questionsContainer = document.querySelector(
  ".questions-container"
) as HTMLElement;
const levelsContainer = document.querySelector(
  ".levels-container"
) as HTMLElement;
const fontColor = document.querySelector(
  "#quizz-font-color"
) as HTMLInputElement;
const themeColor = document.querySelector(
  "#quizz-bg-color"
) as HTMLInputElement;

// @TODO TESTAR USANDO EVENT LISTENER
function createQuizz(edit = false, token: string, quizzId?: string) {
  try {
    getAllQuestions();
    getAllLevels();
    if (edit) {
      updateQuizz(quizzId as string, token);
    } else {
      sendToServer(token);
    }
  } catch (error) {
    alert(error.message);
    console.error(error);
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

function checkQuestionMark(question: string) {
  const isValidCheckMark =
    question.charAt(question.length - 1) !== "?" ||
    question.indexOf("?") !== question.length - 1;

  if (isValidCheckMark) {
    throw new Error(
      "É obrigatorio terminar a pergunta com '?', e só se pode ter 1 pergunta por bloco de perguntas."
    );
  }
}

function getAllQuestions() {
  questions = [];

  for (let question of questionNode) {
    let newQuestion: Question;
    let answers: Answer[] = [];
    // @ts-ignore
    let questionTitle = firstLetterUpperCase(question.children[1].value.trim());

    checkQuestionMark(questionTitle);

    for (let i = 2; i <= 5; i++) {
      const answer = firstLetterUpperCase(
        //@ts-ignore
        question.children[i].children[0].value.trim()
      );
      //@ts-ignore
      const answerUrl = question.children[i].children[1].value.trim();

      answers.push({
        answer,
        answerUrl,
        correct: i === 2 ? true : false,
      });

      if (answer === "" || answerUrl === "") {
        throw new Error("Campo de resposta vazio");
      }
    }

    newQuestion = { questionTitle, answers };
    questions.push(newQuestion);
  }
}

function getAllLevels() {
  levels = [];

  for (let level of levelNode) {
    let newLevel: Level;
    let range = {
      //@ts-ignore
      minRange: Number(level.children[1].children[0].value.trim()),
      //@ts-ignore
      maxRange: Number(level.children[1].children[1].value.trim()),
    };
    //@ts-ignore
    let title = firstLetterUpperCase(level.children[2].value.trim());
    //@ts-ignore
    let imageUrl = level.children[3].value.trim();
    //@ts-ignore
    let description = firstLetterUpperCase(level.children[4].value.trim());
    let isInvalid =
      title === "" ||
      imageUrl === "" ||
      description === "" ||
      isNaN(range.minRange) ||
      isNaN(range.maxRange);

    if (isInvalid) {
      throw new Error("Preencha todos os campos do nivel");
    }

    newLevel = { title, range, description, imageUrl };
    levels.push(newLevel);
  }
}

async function sendToServer(token: string) {
  const quizzData: Quizz = {
    title: firstLetterUpperCase(quizzTitle.value.trim()),
    data: {
      levels,
      questions,
      config: {
        fontColor: fontColor.value.trim(),
        themeColor: themeColor.value.trim(),
      },
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
    renderFromCreateToQuizzes();
  } catch (e) {
    console.error(e);
    alert("Preencha todos os campos");
  }

  toggleIsLoadingQuizz();
}

async function updateQuizz(id: string, token: string) {
  const quizzData: Quizz = {
    title: firstLetterUpperCase(quizzTitle.value.trim()),
    data: {
      levels,
      questions,
      config: {
        fontColor: fontColor.value.trim(),
        themeColor: themeColor.value.trim(),
      },
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
    renderFromCreateToQuizzes();
  } catch (e) {
    console.error(e);
    alert("Preencha todos os campos");
  }

  toggleIsLoadingQuizz();
}

// ---------------------------------RENDER FUNCTIONS------------------------------------

export function renderCreateQuizz(token: string) {
  // sendButton.setAttribute("onclick", `createQuizz(false, ${token})`);
  sendButton.addEventListener("click", () => {
    createQuizz(false, token);
  });
  sendButton.innerText = "Publicar";
  questionsContainer.innerHTML = "";
  levelsContainer.innerHTML = "";
  questionNode = [];
  levelNode = [];
  quizzTitle.value = "";
  numberOfQuestions = 1;
  numberOfLevels = 1;
  renderCreateQuestion();
  renderCreateLevels();
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

export function renderEditQuizz(quizz: Quizz, token: string) {
  // sendButton.setAttribute(
  //   "onclick",
  //   `createQuizz(true, ${token} ,${quizz.id})`
  // );
  // @@@@@@@@@@@@@@@@ TODO
  // remove previous button if any
  //create newButton
  const sendQuizzButton = document.createElement("button");

  sendButton.addEventListener("click", () => {
    createQuizz(true, token, quizz.id);
  });
  sendButton.innerText = "Atualizar";
  questionsContainer.innerHTML = "";
  levelsContainer.innerHTML = "";
  questionNode = [];
  levelNode = [];
  quizzTitle.value = quizz.title;
  fontColor.value = quizz.data.config.fontColor;
  themeColor.value = quizz.data.config.themeColor;
  for (let i = 0; i < quizz.data.questions.length; i++) {
    renderCreateQuestion(quizz.data.questions[i], i + 1, true);
  }
  for (let i = 0; i < quizz.data.levels.length; i++) {
    renderCreateLevels(quizz.data.levels[i], i + 1, true);
  }
}
