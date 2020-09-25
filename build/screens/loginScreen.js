"use strict";
async function login() {
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
        const resp = await axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v1/buzzquizz/users", data);
        token = resp.data.token;
        renderFromLoginToQuizzes();
    }
    catch (e) {
        alert("Email ou senha incorretos");
        console.error(e);
        window.location.reload();
    }
}
