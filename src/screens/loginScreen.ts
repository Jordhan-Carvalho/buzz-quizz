import { renderFromLoginToQuizzes, toggleIsLoading } from "../renderFunctions";

const pageBody = document.querySelector("body");

async function login() {
  const emailInput = document.querySelector(".email-input") as HTMLInputElement;
  const passwordInput = document.querySelector(
    ".password-input"
  ) as HTMLInputElement;

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
    const resp = await axios.post(
      "https://mock-api.bootcamp.respondeai.com.br/api/v1/buzzquizz/users",
      data
    );
    const token = resp.data.token;
    renderFromLoginToQuizzes(token);
  } catch (e) {
    alert("Email ou senha incorretos");
    console.error(e);
    window.location.reload();
  }
}

// ---------------------------------RENDER FUNCTION-----------------------------

export function renderLogin() {
  const loginContainer = document.createElement("section");
  loginContainer.setAttribute("class", "login-screen");

  loginContainer.innerHTML = `
  <h1>BuzzQuizz</h1>
  <h3>O Quiz que você Quizzer</h3>
  <div class="login-container">
    <input
      class="email-input"
      type="email"
      name="email"
      placeholder="E-mail"
    />
    <input
      class="password-input"
      type="password"
      name="password"
      placeholder="Senha"
    />
    <button class="login-button">Entrar</button>
    <div class="loading-gif display-none">
      <img src="./assets/images/loadingBtn.gif" alt="" />
    </div>
  </div>
`;

  const buttonLogin = loginContainer.querySelector(".login-button");
  buttonLogin.addEventListener("click", () => login());
  pageBody.insertAdjacentElement("afterbegin", loginContainer);
}
