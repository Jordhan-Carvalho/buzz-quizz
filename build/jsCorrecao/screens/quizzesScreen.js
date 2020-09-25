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
function fetchQuizzes() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            isLoading();
            // @ts-ignore
            const resp = yield axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v1/buzzquizz/quizzes", {
                headers: {
                    "User-token": token,
                },
            });
            quizzes = [];
            for (let quizz of resp.data) {
                quizzes.push({ id: quizz.id, title: quizz.title, data: quizz.data });
            }
        }
        catch (e) {
            console.error(e);
        }
        isLoading();
    });
}
function deleteQuizz(quizzId) {
    return __awaiter(this, void 0, void 0, function* () {
        const presp = prompt("Tem certeza? pra apagar digite SIM");
        if (presp !== "SIM")
            return;
        try {
            //@ts-ignore
            yield axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v1/buzzquizz/quizzes/${quizzId}`, {
                headers: {
                    "User-Token": token,
                },
            });
            renderQuizzes();
        }
        catch (e) {
            console.error(e);
        }
    });
}
