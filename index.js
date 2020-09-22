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
var questions = [];
var numberOfQuestions = 1;
var questionNode = [];
var levels = [];
var numberOfLevels = 1;
var levelNode = [];
// ----------------------------------NODE && NODE LIST------------------------------
var loginScreen = document.querySelector(".login-screen");
var emailInput = document.querySelector(".email-input");
var passwordInput = document.querySelector(".password-input");
var loadingGif = document.querySelector(".loading-gif");
var loadingGifQuizz = document.querySelector(".loading-gif-quizz");
var loginButton = document.querySelector(".login-button");
var mainContainerScreen = document.querySelector("main");
var quizzesScreen = document.querySelector(".quizzes-screen");
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
                    data = { email: emailInput.value, password: passwordInput.value };
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
                    fetchQuizzes();
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
                    quizzes = [];
                    for (_i = 0, _a = resp.data; _i < _a.length; _i++) {
                        quizz = _a[_i];
                        quizzes.push({ title: quizz.title, data: quizz.data });
                    }
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
    for (var _i = 0, questionNode_1 = questionNode; _i < questionNode_1.length; _i++) {
        var question = questionNode_1[_i];
        var newQuestion = void 0;
        var answers = [];
        var questionTitle = question.children[1].value;
        // Pegar todas respostas e colcoar num array
        for (var i = 2; i <= 5; i++) {
            answers.push({
                answer: question.children[i].children[0].value,
                answerUrl: question.children[i].children[1].value,
                correct: i === 2 ? true : false
            });
        }
        newQuestion = { questionTitle: questionTitle, answers: answers };
        console.log(newQuestion);
        questions.push(newQuestion);
    }
}
function getAllLevels() {
    for (var _i = 0, levelNode_1 = levelNode; _i < levelNode_1.length; _i++) {
        var level = levelNode_1[_i];
        var newLevel = void 0;
        var range = {
            minRange: Number(level.children[1].children[0].value),
            maxRange: Number(level.children[1].children[1].value)
        };
        var title = level.children[2].value;
        var imageUrl = level.children[3].value;
        var description = level.children[4].value;
        newLevel = { title: title, range: range, description: description, imageUrl: imageUrl };
        console.log(newLevel);
        levels.push(newLevel);
    }
}
function sendToServer() {
    return __awaiter(this, void 0, void 0, function () {
        var quizzData, resp, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    quizzData = {
                        title: quizzTitle.value,
                        data: {
                            levels: levels,
                            questions: questions
                        }
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    toggleIsLoadingQuizz();
                    return [4 /*yield*/, axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v1/buzzquizz/quizzes", quizzData, {
                            headers: {
                                "User-Token": token
                            }
                        })];
                case 2:
                    resp = _a.sent();
                    console.log(resp);
                    renderFromCreateToQuizzes();
                    return [3 /*break*/, 4];
                case 3:
                    e_3 = _a.sent();
                    console.error(e_3);
                    alert("Algum erro ocorreu, verifique os campos");
                    toggleIsLoadingQuizz();
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
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
        var _i, quizzes_1, quizz, html, quizzDiv;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchQuizzes()];
                case 1:
                    _a.sent();
                    for (_i = 0, quizzes_1 = quizzes; _i < quizzes_1.length; _i++) {
                        quizz = quizzes_1[_i];
                        html = "<p>" + quizz.title + "</h3>";
                        quizzDiv = document.createElement("div");
                        quizzDiv.setAttribute("class", "box-container");
                        quizzDiv.innerHTML = html;
                        quizzesScreen === null || quizzesScreen === void 0 ? void 0 : quizzesScreen.insertAdjacentElement("beforeend", quizzDiv);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function renderCreateQuestion() {
    var questionDiv = document.createElement("div");
    questionDiv.setAttribute("class", "create-question-container");
    questionDiv.innerHTML = "<h3>Pergunta " + numberOfQuestions + "</h3>\n    <input class=\"question-input\" type=\"text\" id=\"question-title" + numberOfQuestions + "\" placeholder=\"Digite a pergunta\">\n    <div class=\"answer-input-container correct-answer\">\n      <input type=\"text\" id=\"correct-answer" + numberOfQuestions + "\" placeholder=\"Digite a resposta correta\">\n      <input type=\"text\" id=\"correct-answer-image" + numberOfQuestions + "\" placeholder=\"Link para imagem correta\">\n    </div>\n    <div class=\"answer-input-container wrong-answer\">\n      <input type=\"text\" id=\"wrong1-answer" + numberOfQuestions + "\" placeholder=\"Digite a resposta errada 1\">\n      <input type=\"text\" id=\"wrong1-answer-image" + numberOfQuestions + "\" placeholder=\"Link para imagem errada 1\">\n    </div>\n    <div class=\"answer-input-container wrong-answer\">\n      <input type=\"text\" id=\"wrong2-answer" + numberOfQuestions + "\" placeholder=\"Digite a resposta errada 2\">\n      <input type=\"text\" id=\"wrong2-answer-image" + numberOfQuestions + "\" placeholder=\"Link para imagem errada 2\">\n    </div>\n    <div class=\"answer-input-container wrong-answer\">\n      <input type=\"text\" id=\"wrong3-answer" + numberOfQuestions + "\" placeholder=\"Digite a resposta errada 3\">\n      <input type=\"text\" id=\"wrong3-answer-image" + numberOfQuestions + "\" placeholder=\"Link para imagem errada 3\">\n    </div>";
    questionNode.push(questionDiv);
    questionsContainer.appendChild(questionDiv);
}
function renderCreateLevels() {
    var levelDiv = document.createElement("div");
    levelDiv.setAttribute("class", "create-level-container");
    levelDiv.innerHTML = "\n  <h3>N\u00EDvel " + numberOfLevels + "</h3>\n  <div class=\"answer-input-container\">\n    <input type=\"text\" placeholder=\"% Minima de Acerto do n\u00EDvel\">\n    <input type=\"text\"  placeholder=\"% M\u00E1xima de Acerto do n\u00EDvel\">\n  </div>\n    <input class=\"question-input\" type=\"text\"  placeholder=\"T\u00EDtulo do n\u00EDvel\">\n    <input class=\"question-input\" type=\"text\"  placeholder=\"Link da imagem do n\u00EDvel\">\n    <textarea class=\"question-input\"  rows=\"4\" placeholder=\"Descri\u00E7\u00E3o do N\u00EDvel\"></textarea>\n";
    levelNode.push(levelDiv);
    levelsContainer.appendChild(levelDiv);
}
