"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function renderFromLoginToQuizzes() {
    renderQuizzes();
    loginScreen === null || loginScreen === void 0 ? void 0 : loginScreen.classList.add("display-none");
    mainContainerScreen === null || mainContainerScreen === void 0 ? void 0 : mainContainerScreen.classList.remove("display-none");
    mainHeader === null || mainHeader === void 0 ? void 0 : mainHeader.classList.remove("display-none");
    quizzesScreen === null || quizzesScreen === void 0 ? void 0 : quizzesScreen.classList.remove("display-none");
}
function renderFromCreateToQuizzes() {
    renderQuizzes();
    createQuizzScreen === null || createQuizzScreen === void 0 ? void 0 : createQuizzScreen.classList.toggle("display-none");
    quizzesScreen === null || quizzesScreen === void 0 ? void 0 : quizzesScreen.classList.toggle("display-none");
}
function renderFromQuizzesToCreate(quizz) {
    questionsContainer.innerHTML = "";
    levelsContainer.innerHTML = "";
    questionNode = [];
    levelNode = [];
    if (quizz) {
        renderEditQuizz(quizz);
    }
    else {
        renderCreateQuizz();
    }
    createQuizzScreen === null || createQuizzScreen === void 0 ? void 0 : createQuizzScreen.classList.toggle("display-none");
    quizzesScreen === null || quizzesScreen === void 0 ? void 0 : quizzesScreen.classList.toggle("display-none");
}
function renderFromQuizzesToQuizz(e, quizz) {
    const clickedEle = e.target;
    if (clickedEle.classList.contains("md"))
        return;
    renderSingleQuestion(quizz);
    quizzesScreen === null || quizzesScreen === void 0 ? void 0 : quizzesScreen.classList.toggle("display-none");
    singleQuizzScreen === null || singleQuizzScreen === void 0 ? void 0 : singleQuizzScreen.classList.toggle("display-none");
}
function renderFromQuizzToEndGame(quizz) {
    renderResults(quizz);
    singleQuizzScreen === null || singleQuizzScreen === void 0 ? void 0 : singleQuizzScreen.classList.toggle("display-none");
    endGameScreen === null || endGameScreen === void 0 ? void 0 : endGameScreen.classList.toggle("display-none");
}
function toggleIsLoading() {
    loadingGif === null || loadingGif === void 0 ? void 0 : loadingGif.classList.toggle("display-none");
    loginButton === null || loginButton === void 0 ? void 0 : loginButton.classList.toggle("display-none");
}
function toggleIsLoadingQuizz() {
    loadingGifQuizz === null || loadingGifQuizz === void 0 ? void 0 : loadingGifQuizz.classList.toggle("display-none");
    sendButton === null || sendButton === void 0 ? void 0 : sendButton.classList.toggle("display-none");
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
function renderQuizzes() {
    return __awaiter(this, void 0, void 0, function* () {
        yield fetchQuizzes();
        quizzesScreen.innerHTML = "";
        let newQuizzDiv = `<div class="box-container new-quizz-container" onclick="renderFromQuizzesToCreate()">
                        <h3>Novo Quizz</h3>
                        <ion-icon name="add-circle"></ion-icon>
                      </div>`;
        quizzesScreen === null || quizzesScreen === void 0 ? void 0 : quizzesScreen.insertAdjacentHTML("beforeend", newQuizzDiv);
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
            editIcon === null || editIcon === void 0 ? void 0 : editIcon.addEventListener("click", function (e) {
                renderFromQuizzesToCreate(quizz);
            });
            quizzesScreen === null || quizzesScreen === void 0 ? void 0 : quizzesScreen.insertAdjacentElement("beforeend", quizzDiv);
        }
    });
}
function renderCreateQuestion(singleQuestion, i, isEdit = false) {
    if (isEdit)
        numberOfQuestions = i;
    let questionDiv = document.createElement("div");
    questionDiv.setAttribute("class", "create-question-container");
    questionDiv.innerHTML = `<h3>Pergunta ${numberOfQuestions}</h3>
    <input class="question-input" type="text" placeholder="Digite a pergunta" value="${isEdit ? singleQuestion === null || singleQuestion === void 0 ? void 0 : singleQuestion.questionTitle : ""}" >
    <div class="answer-input-container correct-answer">
      <input type="text" placeholder="Digite a resposta correta" value="${isEdit ? singleQuestion === null || singleQuestion === void 0 ? void 0 : singleQuestion.answers[0].answer : ""}">
      <input type="text" placeholder="Link para imagem correta" value="${isEdit ? singleQuestion === null || singleQuestion === void 0 ? void 0 : singleQuestion.answers[0].answerUrl : ""}">
    </div>
    <div class="answer-input-container wrong-answer">
      <input type="text" placeholder="Digite a resposta errada 1" value="${isEdit ? singleQuestion === null || singleQuestion === void 0 ? void 0 : singleQuestion.answers[1].answer : ""}">
      <input type="text" placeholder="Link para imagem errada 1" value="${isEdit ? singleQuestion === null || singleQuestion === void 0 ? void 0 : singleQuestion.answers[1].answerUrl : ""}">
    </div>
    <div class="answer-input-container wrong-answer">
      <input type="text" placeholder="Digite a resposta errada 2" value="${isEdit ? singleQuestion === null || singleQuestion === void 0 ? void 0 : singleQuestion.answers[2].answer : ""}">
      <input type="text" placeholder="Link para imagem errada 2" value="${isEdit ? singleQuestion === null || singleQuestion === void 0 ? void 0 : singleQuestion.answers[2].answerUrl : ""}">
    </div>
    <div class="answer-input-container wrong-answer">
      <input type="text" placeholder="Digite a resposta errada 3" value="${isEdit ? singleQuestion === null || singleQuestion === void 0 ? void 0 : singleQuestion.answers[3].answer : ""}">
      <input type="text" placeholder="Link para imagem errada 3" value="${isEdit ? singleQuestion === null || singleQuestion === void 0 ? void 0 : singleQuestion.answers[3].answerUrl : ""}">
    </div>`;
    questionNode.push(questionDiv);
    questionsContainer.appendChild(questionDiv);
    setTimeout(() => {
        questionDiv.classList.add("display-visible");
    }, 0);
}
function renderCreateLevels(singleLevel, i, isEdit = false) {
    if (isEdit)
        numberOfLevels = i;
    let levelDiv = document.createElement("div");
    levelDiv.setAttribute("class", "create-level-container");
    levelDiv.innerHTML = `
  <h3>Nível ${numberOfLevels}</h3>
  <div class="answer-input-container">
    <input type="text" placeholder="% Minima de Acerto do nível" value="${isEdit ? singleLevel === null || singleLevel === void 0 ? void 0 : singleLevel.range.minRange : ""}">
    <input type="text"  placeholder="% Máxima de Acerto do nível" value="${isEdit ? singleLevel === null || singleLevel === void 0 ? void 0 : singleLevel.range.maxRange : ""}">
  </div>
    <input class="question-input" type="text"  placeholder="Título do nível" value="${isEdit ? singleLevel === null || singleLevel === void 0 ? void 0 : singleLevel.title : ""}">
    <input class="question-input" type="text"  placeholder="Link da imagem do nível" value="${isEdit ? singleLevel === null || singleLevel === void 0 ? void 0 : singleLevel.imageUrl : ""}">
    <textarea class="question-input level-desc"  rows="4" placeholder="Descrição do Nível">${isEdit ? singleLevel === null || singleLevel === void 0 ? void 0 : singleLevel.description : ""}</textarea>
`;
    levelNode.push(levelDiv);
    levelsContainer.appendChild(levelDiv);
    setTimeout(() => {
        levelDiv.classList.add("display-visible");
    }, 0);
}
function renderSingleQuestion(singleQuizz) {
    singleQuizzScreen.innerHTML = "";
    const answersArray = singleQuizz.data.questions[currentQuestion - 1].answers.sort(() => Math.random() - 0.5);
    let headerHtml = ` <h1>${singleQuizz.title}</h1>
  <header class="question-header">
    <h3>${currentQuestion}. ${singleQuizz.data.questions[currentQuestion - 1].questionTitle}</h3>
  </header> `;
    let answersContainer = document.createElement("div");
    answersContainer.setAttribute("class", "answers-container");
    for (let i = 0; i < 4; i++) {
        answersContainer.innerHTML += `<div class="single-answer-container"  ${answersArray[i].correct ? "correct" : ""}>
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
        let singleAnswerContainer = answersContainer.querySelector(`.single-answer-container:nth-child(${i})`);
        singleAnswerContainer === null || singleAnswerContainer === void 0 ? void 0 : singleAnswerContainer.addEventListener("click", function () {
            //@ts-ignore
            selectAnswer(this, singleQuizz);
        });
    }
    singleQuizzScreen === null || singleQuizzScreen === void 0 ? void 0 : singleQuizzScreen.insertAdjacentHTML("afterbegin", headerHtml);
    singleQuizzScreen === null || singleQuizzScreen === void 0 ? void 0 : singleQuizzScreen.insertAdjacentElement("beforeend", answersContainer);
    document.documentElement.style.setProperty("--azulPrincipal", `${singleQuizz.data.config.themeColor}`);
    document.documentElement.style.setProperty("--quizzFontColor", `${singleQuizz.data.config.fontColor}`);
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
    endGameScreen === null || endGameScreen === void 0 ? void 0 : endGameScreen.insertAdjacentHTML("afterbegin", html);
}
