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

function renderFromQuizzesToCreate(quizz = false) {
  questionsContainer.innerHTML = "";
  levelsContainer.innerHTML = "";
  questionNode = [];
  levelNode = [];
  if (quizz) {
    renderEditQuizz(quizz);
  } else {
    renderCreateQuizz();
  }
  createQuizzScreen?.classList.toggle("display-none");
  quizzesScreen?.classList.toggle("display-none");
}

function renderFromQuizzesToQuizz(e, quizz) {
  const clickedEle = e.target;
  if (clickedEle.classList.contains("md")) return;
  renderSingleQuestion(quizz);
  quizzesScreen?.classList.toggle("display-none");
  singleQuizzScreen?.classList.toggle("display-none");
}

function renderFromQuizzToEndGame(quizz) {
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

function renderEditQuizz(quizz) {
  sendButton.setAttribute("onclick", `createQuizz(true, ${quizz.id})`);
  sendButton.innerText = "Atualizar";
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

function renderCreateQuizz() {
  sendButton.setAttribute("onclick", `createQuizz()`);
  sendButton.innerText = "Publicar";
  quizzTitle.value = "";
  numberOfQuestions = 1;
  numberOfLevels = 1;
  renderCreateQuestion();
  renderCreateLevels();
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
      <ion-icon class="delete-icon" onclick="deleteQuizz(${quizz.id})" name="trash"></ion-icon>
      <ion-icon class="edit-icon"   name="create"></ion-icon>
    </div>`;
    let quizzDiv = document.createElement("div");
    quizzDiv.setAttribute("class", "box-container");
    quizzDiv.addEventListener("click", function (e) {
      renderFromQuizzesToQuizz(e, quizz);
    });
    quizzDiv.innerHTML = html;
    let editIcon = quizzDiv.querySelector(".edit-icon");
    editIcon?.addEventListener("click", function (e) {
      renderFromQuizzesToCreate(quizz);
    });
    quizzesScreen?.insertAdjacentElement("beforeend", quizzDiv);
  }
}

function renderCreateQuestion(singleQuestion = false, i = 1, isEdit = false) {
  if (isEdit) numberOfQuestions = i;

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

function renderCreateLevels(singleLevel = false, i = 1, isEdit = false) {
  if (isEdit) numberOfLevels = i;

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

function renderSingleQuestion(singleQuizz) {
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

function renderResults(quizz) {
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
