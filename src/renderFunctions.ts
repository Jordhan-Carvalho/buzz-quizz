import { Quizz } from "./interfaces";
import { renderQuizzes } from "./screens/quizzesScreen";
import {
  renderEditQuizz,
  renderCreateQuizz,
} from "./screens/createQuizzScreen";
import { renderSingleQuestion } from "./screens/singleQuizzScreen";
import { renderResults } from "./screens/endGameScreen";

// ----------------------MODULE STATUS----------------------------------------------
let token = "";

// ----------------------------------NODE && NODE LIST------------------------------
// ---Create Quizz nodes---
const createQuizzScreen = document.querySelector(".create-quizz-screen");

// ---Screen nodes---
const mainContainerScreen = document.querySelector("main");
const mainHeader = document.querySelector(".main-header");
const quizzesScreen = document.querySelector(".quizzes-screen") as HTMLElement;
const endGameScreen = document.querySelector(".end-game-screen");
const singleQuizzScreen = document.querySelector(
  ".single-quizz-screen"
) as HTMLElement;

export function renderFromLoginToQuizzes(loginToken: string) {
  const loginScreen = document.querySelector(".login-screen");
  token = loginToken;
  renderQuizzes(token);
  loginScreen?.classList.add("display-none");
  mainContainerScreen?.classList.remove("display-none");
  mainHeader?.classList.remove("display-none");
  quizzesScreen?.classList.remove("display-none");
}

export function renderFromCreateToQuizzes() {
  renderQuizzes(token);
  createQuizzScreen?.classList.toggle("display-none");
  quizzesScreen?.classList.toggle("display-none");
}

export function renderFromQuizzesToCreate(quizz?: Quizz) {
  if (quizz) {
    renderEditQuizz(quizz, token);
  } else {
    renderCreateQuizz(token);
  }
  createQuizzScreen?.classList.toggle("display-none");
  quizzesScreen?.classList.toggle("display-none");
}

export function renderFromQuizzesToQuizz(e: Event, quizz: Quizz) {
  const clickedEle = e.target as HTMLElement;
  if (clickedEle.classList.contains("md")) return;
  renderSingleQuestion(quizz);
  quizzesScreen?.classList.toggle("display-none");
  singleQuizzScreen?.classList.toggle("display-none");
}

export function renderFromQuizzToEndGame(quizz: Quizz) {
  renderResults(quizz, endGameScreen as HTMLElement);
  singleQuizzScreen?.classList.toggle("display-none");
  endGameScreen?.classList.toggle("display-none");
}

export function toggleIsLoading() {
  const loadingGif = document.querySelector(".loading-gif");
  const loginButton = document.querySelector(".login-button");

  loadingGif?.classList.toggle("display-none");
  loginButton?.classList.toggle("display-none");
}

export function toggleIsLoadingQuizz() {
  const loadingGifQuizz = document.querySelector(".loading-gif-quizz");
  const sendButton = document.querySelector(
    ".post-quizz-button"
  ) as HTMLElement;
  loadingGifQuizz?.classList.toggle("display-none");
  sendButton?.classList.toggle("display-none");
}
