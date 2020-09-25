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
    try {
        getAllQuestions();
        getAllLevels();
        if (edit) {
            updateQuizz(quizzId);
        }
        else {
            sendToServer();
        }
    }
    catch (error) {
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
function checkQuestionMark(question) {
    const isValidCheckMark = question.charAt(question.length - 1) !== "?" ||
        question.indexOf("?") !== question.length - 1;
    if (isValidCheckMark) {
        throw new Error("É obrigatorio terminar a pergunta com '?', e só se pode ter 1 pergunta por bloco de perguntas.");
    }
}
function getAllQuestions() {
    questions = [];
    for (let question of questionNode) {
        let newQuestion;
        let answers = [];
        let questionTitle = firstLetterUpperCase(question.children[1].value.trim());
        checkQuestionMark(questionTitle);
        for (let i = 2; i <= 5; i++) {
            const answer = firstLetterUpperCase(question.children[i].children[0].value.trim());
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
        let newLevel;
        let range = {
            minRange: Number(level.children[1].children[0].value.trim()),
            maxRange: Number(level.children[1].children[1].value.trim()),
        };
        let title = firstLetterUpperCase(level.children[2].value.trim());
        let imageUrl = level.children[3].value.trim();
        let description = firstLetterUpperCase(level.children[4].value.trim());
        let isInvalid = title === "" ||
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
