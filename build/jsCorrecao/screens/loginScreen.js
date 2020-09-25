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
function login() {
    return __awaiter(this, void 0, void 0, function* () {
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
            const resp = yield axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v1/buzzquizz/users", data);
            token = resp.data.token;
            renderFromLoginToQuizzes();
        }
        catch (e) {
            alert("Email ou senha incorretos");
            console.error(e);
            window.location.reload();
        }
    });
}
