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
function createQuizz(edit = false, quizzId) {
    // validação
    if (!getAllQuestions())
        return;
    if (!getAllLevels())
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
    const isValidCheckMark = question.charAt(question.length - 1) !== "?" ||
        question.indexOf("?") !== question.length - 1;
    if (isValidCheckMark) {
        alert("É obrigatorio terminar a pergunta com '?', e só se pode ter 1 pergunta por bloco de perguntas.");
        return false;
    }
    return true;
}
function getAllQuestions() {
    questions = [];
    for (let question of questionNode) {
        let newQuestion;
        let answers = [];
        let questionTitle = firstLetterUpperCase(question.children[1].value.trim());
        if (!checkQuestionMark(questionTitle))
            return false;
        for (let i = 2; i <= 5; i++) {
            const answer = firstLetterUpperCase(question.children[i].children[0].value.trim());
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
function getAllLevels() {
    levels = [];
    for (let level of levelNode) {
        let newLevel;
        let range = {
            minRange: Number(level.children[1].children[0].value.trim()),
            maxRange: Number(level.children[1].children[1].value.trim()),
        };
        let title = firstLetterUpperCase(level.children[2].value.trim());
        let imageUrl = level.children[3].value.trim();
        let description = firstLetterUpperCase(level.children[4].value.trim());
        if (title === "" ||
            imageUrl === "" ||
            description === "" ||
            isNaN(range.minRange) ||
            isNaN(range.maxRange)) {
            alert("Preencha todos os campos");
            return false;
        }
        newLevel = { title, range, description, imageUrl };
        levels.push(newLevel);
    }
    return true;
}
function sendToServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const quizzData = {
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
            yield axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v1/buzzquizz/quizzes", quizzData, {
                headers: {
                    "User-Token": token,
                },
            });
            renderFromCreateToQuizzes();
        }
        catch (e) {
            console.error(e);
            alert("Preencha todos os campos");
        }
        toggleIsLoadingQuizz();
    });
}
function updateQuizz(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const quizzData = {
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
            yield axios.put(`https://mock-api.bootcamp.respondeai.com.br/api/v1/buzzquizz/quizzes/${id}`, quizzData, { headers: { "User-Token": token } });
            renderFromCreateToQuizzes();
        }
        catch (e) {
            console.error(e);
            alert("Preencha todos os campos");
        }
        toggleIsLoadingQuizz();
    });
}
