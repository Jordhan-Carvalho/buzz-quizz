var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// ----------------------------------APP STATS------------------------------
var token = "";
var quizzes = [];
// ---create quizz stats---
var questions = [];
var numberOfQuestions = 1;
var questionNode = [];
var levels = [];
var numberOfLevels = 1;
var levelNode = [];
// ---single quizz stats---
var currentQuestion = 1;
var acertos = 0;
//---end game stats---
var score = 0;
var resultLevel = {
    title: "Voce eh praticamente um aluno de Hogwarst!",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.Repellendus, qui! Doloremque, id? Nam perspiciatis suscipitlaboriosam sapiente eligendi obcaecati placeat minus, magni fugaomnis tempore incidunt ratione, mollitia rem facere?",
    imageUrl: "https://i.pinimg.com/564x/41/2d/83/412d83a778c691059de368b047c2a52f.jpg",
    range: { minRange: 0, maxRange: 100 }
};
// ----------------------------------NODE && NODE LIST------------------------------
var loginScreen = document.querySelector(".login-screen");
var emailInput = document.querySelector(".email-input");
var passwordInput = document.querySelector(".password-input");
var loadingGif = document.querySelector(".loading-gif");
var loadingGifQuizz = document.querySelector(".loading-gif-quizz");
var loginButton = document.querySelector(".login-button");
var mainContainerScreen = document.querySelector("main");
var quizzesScreen = document.querySelector(".quizzes-screen");
var endGameScreen = document.querySelector(".end-game-screen");
var singleQuizzScreen = document.querySelector(".single-quizz-screen");
var createQuizzScreen = document.querySelector(".create-quizz-screen");
var quizzTitle = document.querySelector("#quizz-title");
var addQuestionButton = document.querySelector(".add-question");
var sendButton = document.querySelector(".post-quizz-button");
var questionsContainer = document.querySelector(".questions-container");
var levelsContainer = document.querySelector(".levels-container");
// --------------------------------LOGIN SCREEN------------------------------------
function login() {
    return __awaiter(this, void 0, void 0, function () {
        var data, resp, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    data = {
                        email: emailInput.value.trim(),
                        password: passwordInput.value.trim()
                    };
                    if (data.email === "" || data.password === "") {
                        alert("Preencher todos os campos");
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    toggleIsLoading();
                    return [4 /*yield*/, axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v1/buzzquizz/users", data)];
                case 2:
                    resp = _a.sent();
                    token = resp.data.token;
                    renderFromLoginToQuizzes();
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    alert("Email ou senha incorretos");
                    console.error(e_1);
                    window.location.reload();
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// ---------------------------------QUIZZES SCREEN---------------------------------------
function fetchQuizzes() {
    return __awaiter(this, void 0, void 0, function () {
        var resp, _i, _a, quizz, e_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v1/buzzquizz/quizzes", {
                            headers: {
                                "User-token": token
                            }
                        })];
                case 1:
                    resp = _b.sent();
                    console.log(resp.data);
                    quizzes = [];
                    for (_i = 0, _a = resp.data; _i < _a.length; _i++) {
                        quizz = _a[_i];
                        quizzes.push({ id: quizz.id, title: quizz.title, data: quizz.data });
                    }
                    console.log("agora o quizz");
                    console.log(quizzes);
                    return [3 /*break*/, 3];
                case 2:
                    e_2 = _b.sent();
                    console.error(e_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function deleteQuizz(button, quizzId) {
    return __awaiter(this, void 0, void 0, function () {
        var presp, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    presp = prompt("Tem certeza? pra apagar digite SIM");
                    if (presp !== "SIM")
                        return [2 /*return*/];
                    console.log("passou");
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    //@ts-ignore
                    return [4 /*yield*/, axios["delete"]("https://mock-api.bootcamp.respondeai.com.br/api/v1/buzzquizz/quizzes/" + quizzId, {
                            headers: {
                                "User-Token": token
                            }
                        })];
                case 2:
                    //@ts-ignore
                    _a.sent();
                    console.log("foi");
                    renderQuizzes();
                    return [3 /*break*/, 4];
                case 3:
                    e_3 = _a.sent();
                    console.error(e_3);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// ---------------------------------CREATE QUIZZ SCREEN---------------------------------------
function createQuizz(edit, quizzId) {
    if (edit === void 0) { edit = false; }
    // validar
    if (!getAllQuestions())
        return;
    getAllQuestions();
    getAllLevels();
    if (edit) {
        updateQuizz(quizzId);
    }
    else {
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
function checkQuestionMark(question) {
    if (question.charAt(question.length - 1) !== "?" ||
        question.indexOf("?") !== question.length - 1) {
        alert("É obrigatorio terminar a pergunta com '?', e só se pode ter 1 pergunta por bloco de perguntas.");
        return false;
    }
    return true;
}
function getAllQuestions() {
    questions = [];
    for (var _i = 0, questionNode_1 = questionNode; _i < questionNode_1.length; _i++) {
        var question = questionNode_1[_i];
        var newQuestion = void 0;
        var answers = [];
        var questionTitle = firstLetterUpperCase(question.children[1].value.trim());
        if (!checkQuestionMark(questionTitle))
            return false;
        // Pegar todas respostas e colcoar num array
        for (var i = 2; i <= 5; i++) {
            answers.push({
                answer: firstLetterUpperCase(question.children[i].children[0].value.trim()),
                answerUrl: question.children[i].children[1].value.trim(),
                correct: i === 2 ? true : false
            });
        }
        newQuestion = { questionTitle: questionTitle, answers: answers };
        questions.push(newQuestion);
    }
    return true;
}
function getAllLevels() {
    for (var _i = 0, levelNode_1 = levelNode; _i < levelNode_1.length; _i++) {
        var level = levelNode_1[_i];
        var newLevel = void 0;
        var range = {
            minRange: Number(level.children[1].children[0].value.trim()),
            maxRange: Number(level.children[1].children[1].value.trim())
        };
        var title = firstLetterUpperCase(level.children[2].value.trim());
        var imageUrl = level.children[3].value.trim();
        var description = firstLetterUpperCase(level.children[4].value.trim());
        newLevel = { title: title, range: range, description: description, imageUrl: imageUrl };
        levels.push(newLevel);
    }
}
function sendToServer() {
    return __awaiter(this, void 0, void 0, function () {
        var quizzData, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    quizzData = {
                        title: firstLetterUpperCase(quizzTitle.value.trim()),
                        data: {
                            levels: levels,
                            questions: questions
                        }
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    toggleIsLoadingQuizz();
                    //@ts-ignore
                    return [4 /*yield*/, axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v1/buzzquizz/quizzes", quizzData, {
                            headers: {
                                "User-Token": token
                            }
                        })];
                case 2:
                    //@ts-ignore
                    _a.sent();
                    console.log("enviado");
                    renderFromCreateToQuizzes();
                    return [3 /*break*/, 4];
                case 3:
                    e_4 = _a.sent();
                    console.error(e_4);
                    alert("Preencha todos os campos");
                    return [3 /*break*/, 4];
                case 4:
                    toggleIsLoadingQuizz();
                    return [2 /*return*/];
            }
        });
    });
}
function updateQuizz(id) {
    return __awaiter(this, void 0, void 0, function () {
        var quizzData, e_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    quizzData = {
                        title: firstLetterUpperCase(quizzTitle.value.trim()),
                        data: {
                            levels: levels,
                            questions: questions
                        }
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    toggleIsLoadingQuizz();
                    // @ts-ignore
                    return [4 /*yield*/, axios.put("https://mock-api.bootcamp.respondeai.com.br/api/v1/buzzquizz/quizzes/" + id, quizzData, { headers: { "User-Token": token } })];
                case 2:
                    // @ts-ignore
                    _a.sent();
                    console.log("FOI CARLAHOOOOOO");
                    renderFromCreateToQuizzes();
                    return [3 /*break*/, 4];
                case 3:
                    e_5 = _a.sent();
                    console.error(e_5);
                    alert("Preencha todos os campos");
                    return [3 /*break*/, 4];
                case 4:
                    toggleIsLoadingQuizz();
                    return [2 /*return*/];
            }
        });
    });
}
// ---------------------------------SINGLE QUIZZ SCREEN--------------------------------------
function selectAnswer(answer, singleQuizz) {
    changeAnswers("background");
    currentQuestion++;
    if (answer.hasAttribute("correct"))
        acertos++;
    console.log("acertos " + acertos + " e currentQuestion " + currentQuestion);
    // remove o eventListners de todas botoes
    changeAnswers("removeClick");
    console.log(singleQuizz.data.questions.length);
    var endGame = singleQuizz.data.questions.length < currentQuestion;
    if (endGame) {
        setTimeout(function () {
            calculateScoreAndLevel(singleQuizz);
            renderFromQuizzToEndGame(singleQuizz);
        }, 2000);
    }
    else {
        setTimeout(function () {
            renderSingleQuestion(singleQuizz);
        }, 2000);
    }
}
function changeAnswers(whatToChange) {
    var answersNode = singleQuizzScreen === null || singleQuizzScreen === void 0 ? void 0 : singleQuizzScreen.querySelectorAll(".single-answer-container");
    for (var _i = 0, answersNode_1 = answersNode; _i < answersNode_1.length; _i++) {
        var answer = answersNode_1[_i];
        if (whatToChange === "background") {
            answer.hasAttribute("correct")
                ? answer.classList.toggle("correct")
                : answer.classList.toggle("wrong");
        }
        else if (whatToChange === "removeClick") {
            // @ts-ignore
            // removeEventListener("click", teste);
        }
    }
}
// ---------------------------------END GAME SCREEN--------------------------------------
function calculateScoreAndLevel(quizz) {
    score = Math.round((acertos / quizz.data.questions.length) * 100);
    for (var _i = 0, _a = quizz.data.levels; _i < _a.length; _i++) {
        var level = _a[_i];
        if (score >= level.range.minRange && score <= level.range.maxRange) {
            resultLevel = level;
            return;
        }
    }
}
// --------------------------------RENDER FUNCTION----------------------------------
function renderFromLoginToQuizzes() {
    renderQuizzes();
    loginScreen === null || loginScreen === void 0 ? void 0 : loginScreen.classList.add("display-none");
    mainContainerScreen === null || mainContainerScreen === void 0 ? void 0 : mainContainerScreen.classList.remove("display-none");
    quizzesScreen === null || quizzesScreen === void 0 ? void 0 : quizzesScreen.classList.remove("display-none");
}
function renderProvisorio() {
    loginScreen === null || loginScreen === void 0 ? void 0 : loginScreen.classList.add("display-none");
    mainContainerScreen === null || mainContainerScreen === void 0 ? void 0 : mainContainerScreen.classList.remove("display-none");
    createQuizzScreen === null || createQuizzScreen === void 0 ? void 0 : createQuizzScreen.classList.remove("display-none");
    renderCreateQuestion();
    renderCreateLevels();
}
function renderFromCreateToQuizzes() {
    renderQuizzes();
    createQuizzScreen === null || createQuizzScreen === void 0 ? void 0 : createQuizzScreen.classList.toggle("display-none");
    quizzesScreen === null || quizzesScreen === void 0 ? void 0 : quizzesScreen.classList.toggle("display-none");
}
function renderFromQuizzesToCreate(quizz) {
    questionsContainer.innerHTML = "";
    levelsContainer.innerHTML = "";
    if (quizz) {
        sendButton.setAttribute("onclick", "createQuizz(true, " + quizz.id + ")");
        sendButton.innerText = "Atualizar";
        quizzTitle.value = quizz.title;
        for (var i = 0; i < quizz.data.questions.length; i++) {
            renderCreateQuestion(quizz.data.questions[i], i + 1, true);
        }
        for (var i = 0; i < quizz.data.levels.length; i++) {
            renderCreateLevels(quizz.data.levels[i], i + 1, true);
        }
    }
    else {
        sendButton.setAttribute("onclick", "createQuizz()");
        sendButton.innerText = "Publicar";
        quizzTitle.value = "";
        levels = [];
        questions = [];
        numberOfQuestions = 1;
        numberOfLevels = 1;
        renderCreateQuestion();
        renderCreateLevels();
    }
    createQuizzScreen === null || createQuizzScreen === void 0 ? void 0 : createQuizzScreen.classList.toggle("display-none");
    quizzesScreen === null || quizzesScreen === void 0 ? void 0 : quizzesScreen.classList.toggle("display-none");
}
function renderFromQuizzesToQuizz(e, quizz) {
    var clickedEle = e.target;
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
function renderQuizzes() {
    return __awaiter(this, void 0, void 0, function () {
        var newQuizzDiv, _loop_1, _i, quizzes_1, quizz;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchQuizzes()];
                case 1:
                    _a.sent();
                    quizzesScreen.innerHTML = "";
                    newQuizzDiv = "<div class=\"box-container new-quizz-container\" onclick=\"renderFromQuizzesToCreate()\">\n                        <h3>Novo Quizz</h3>\n                        <ion-icon name=\"add-circle\"></ion-icon>\n                      </div>";
                    quizzesScreen === null || quizzesScreen === void 0 ? void 0 : quizzesScreen.insertAdjacentHTML("beforeend", newQuizzDiv);
                    _loop_1 = function (quizz) {
                        var html = "<h3>" + quizz.title + "</h3>\n    <div class=\"icons-container\">\n      <ion-icon class=\"delete-icon\" onclick=\"deleteQuizz(this, " + quizz.id + ")\" name=\"trash\"></ion-icon>\n      <ion-icon class=\"edit-icon\"   name=\"create\"></ion-icon>\n    </div>";
                        var quizzDiv = document.createElement("div");
                        quizzDiv.setAttribute("class", "box-container");
                        quizzDiv.addEventListener("click", function (e) {
                            renderFromQuizzesToQuizz(e, quizz);
                        });
                        quizzDiv.innerHTML = html;
                        var editIcon = quizzDiv.querySelector(".edit-icon");
                        editIcon === null || editIcon === void 0 ? void 0 : editIcon.addEventListener("click", function (e) {
                            renderFromQuizzesToCreate(quizz);
                        });
                        quizzesScreen === null || quizzesScreen === void 0 ? void 0 : quizzesScreen.insertAdjacentElement("beforeend", quizzDiv);
                    };
                    for (_i = 0, quizzes_1 = quizzes; _i < quizzes_1.length; _i++) {
                        quizz = quizzes_1[_i];
                        _loop_1(quizz);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function renderCreateQuestion(singleQuestion, i, isEdit) {
    if (isEdit === void 0) { isEdit = false; }
    if (isEdit)
        numberOfQuestions = i;
    var questionDiv = document.createElement("div");
    questionDiv.setAttribute("class", "create-question-container");
    questionDiv.innerHTML = "<h3>Pergunta " + numberOfQuestions + "</h3>\n    <input class=\"question-input\" type=\"text\" placeholder=\"Digite a pergunta\" value=\"" + (isEdit ? singleQuestion === null || singleQuestion === void 0 ? void 0 : singleQuestion.questionTitle : "") + "\" >\n    <div class=\"answer-input-container correct-answer\">\n      <input type=\"text\" placeholder=\"Digite a resposta correta\" value=\"" + (isEdit ? singleQuestion === null || singleQuestion === void 0 ? void 0 : singleQuestion.answers[0].answer : "") + "\">\n      <input type=\"text\" placeholder=\"Link para imagem correta\" value=\"" + (isEdit ? singleQuestion === null || singleQuestion === void 0 ? void 0 : singleQuestion.answers[0].answerUrl : "") + "\">\n    </div>\n    <div class=\"answer-input-container wrong-answer\">\n      <input type=\"text\" placeholder=\"Digite a resposta errada 1\" value=\"" + (isEdit ? singleQuestion === null || singleQuestion === void 0 ? void 0 : singleQuestion.answers[1].answer : "") + "\">\n      <input type=\"text\" placeholder=\"Link para imagem errada 1\" value=\"" + (isEdit ? singleQuestion === null || singleQuestion === void 0 ? void 0 : singleQuestion.answers[1].answerUrl : "") + "\">\n    </div>\n    <div class=\"answer-input-container wrong-answer\">\n      <input type=\"text\" placeholder=\"Digite a resposta errada 2\" value=\"" + (isEdit ? singleQuestion === null || singleQuestion === void 0 ? void 0 : singleQuestion.answers[2].answer : "") + "\">\n      <input type=\"text\" placeholder=\"Link para imagem errada 2\" value=\"" + (isEdit ? singleQuestion === null || singleQuestion === void 0 ? void 0 : singleQuestion.answers[2].answerUrl : "") + "\">\n    </div>\n    <div class=\"answer-input-container wrong-answer\">\n      <input type=\"text\" placeholder=\"Digite a resposta errada 3\" value=\"" + (isEdit ? singleQuestion === null || singleQuestion === void 0 ? void 0 : singleQuestion.answers[3].answer : "") + "\">\n      <input type=\"text\" placeholder=\"Link para imagem errada 3\" value=\"" + (isEdit ? singleQuestion === null || singleQuestion === void 0 ? void 0 : singleQuestion.answers[3].answerUrl : "") + "\">\n    </div>";
    questionNode.push(questionDiv);
    questionsContainer.appendChild(questionDiv);
    console.log("questionNode " + questionNode.length);
}
function renderCreateLevels(singleLevel, i, isEdit) {
    if (isEdit === void 0) { isEdit = false; }
    if (isEdit)
        numberOfLevels = i;
    var levelDiv = document.createElement("div");
    levelDiv.setAttribute("class", "create-level-container");
    levelDiv.innerHTML = "\n  <h3>N\u00EDvel " + numberOfLevels + "</h3>\n  <div class=\"answer-input-container\">\n    <input type=\"text\" placeholder=\"% Minima de Acerto do n\u00EDvel\" value=\"" + (isEdit ? singleLevel === null || singleLevel === void 0 ? void 0 : singleLevel.range.minRange : "") + "\">\n    <input type=\"text\"  placeholder=\"% M\u00E1xima de Acerto do n\u00EDvel\" value=\"" + (isEdit ? singleLevel === null || singleLevel === void 0 ? void 0 : singleLevel.range.maxRange : "") + "\">\n  </div>\n    <input class=\"question-input\" type=\"text\"  placeholder=\"T\u00EDtulo do n\u00EDvel\" value=\"" + (isEdit ? singleLevel === null || singleLevel === void 0 ? void 0 : singleLevel.title : "") + "\">\n    <input class=\"question-input\" type=\"text\"  placeholder=\"Link da imagem do n\u00EDvel\" value=\"" + (isEdit ? singleLevel === null || singleLevel === void 0 ? void 0 : singleLevel.imageUrl : "") + "\">\n    <textarea class=\"question-input level-desc\"  rows=\"4\" placeholder=\"Descri\u00E7\u00E3o do N\u00EDvel\">" + (isEdit ? singleLevel === null || singleLevel === void 0 ? void 0 : singleLevel.description : "") + "</textarea>\n";
    levelNode.push(levelDiv);
    levelsContainer.appendChild(levelDiv);
}
function renderSingleQuestion(singleQuizz) {
    singleQuizzScreen.innerHTML = "";
    var answersArray = singleQuizz.data.questions[currentQuestion - 1].answers.sort(function () { return Math.random() - 0.5; });
    var headerHtml = " <h1>" + singleQuizz.title + "</h1>\n  <header class=\"question-header\">\n    <h3>" + currentQuestion + ". " + singleQuizz.data.questions[currentQuestion - 1].questionTitle + "</h3>\n  </header> ";
    var answersContainer = document.createElement("div");
    answersContainer.setAttribute("class", "answers-container");
    for (var i = 0; i < 4; i++) {
        answersContainer.innerHTML += "<div class=\"single-answer-container\"  " + (answersArray[i].correct ? "correct" : "") + ">\n    <figure class=\"answer-image-container\">\n      <img\n        src=\"" + answersArray[i].answerUrl + "\"\n        alt=\"resposta quizz\"\n      />\n    </figure>\n    <div class=\"border-container\">\n      <p>" + answersArray[i].answer + "</p>\n    </div>\n  </div>";
    }
    for (var i = 1; i <= 4; i++) {
        var singleAnswerContainer = answersContainer.querySelector(".single-answer-container:nth-child(" + i + ")");
        singleAnswerContainer === null || singleAnswerContainer === void 0 ? void 0 : singleAnswerContainer.addEventListener("click", function () {
            //@ts-ignore
            selectAnswer(this, singleQuizz);
        });
    }
    singleQuizzScreen === null || singleQuizzScreen === void 0 ? void 0 : singleQuizzScreen.insertAdjacentHTML("afterbegin", headerHtml);
    singleQuizzScreen === null || singleQuizzScreen === void 0 ? void 0 : singleQuizzScreen.insertAdjacentElement("beforeend", answersContainer);
}
function renderResults(quizz) {
    var html = "<h1>" + quizz.title + "</h1>\n  <header class=\"question-header\">\n    <h3>Voce acertou " + acertos + " de " + quizz.data.questions.length + " perguntas ! Score: " + score + "%</h3>\n  </header>\n  <div class=\"result-container\">\n    <div class=\"result-text-container\">\n      <h3>" + resultLevel.title + "</h3>\n      <p>\n        " + resultLevel.description + "\n      </p>\n    </div>\n    <figure class=\"result-image-container\">\n      <img\n        src=\"" + resultLevel.imageUrl + "\"\n        alt=\"\"\n      />\n    </figure>\n  </div>";
    endGameScreen === null || endGameScreen === void 0 ? void 0 : endGameScreen.insertAdjacentHTML("afterbegin", html);
}
// -------------------------------------HELPER FUNCTIONS----------------------------------------
function firstLetterUpperCase(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
