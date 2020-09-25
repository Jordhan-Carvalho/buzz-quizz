// ----------------------------------APP STATS------------------------------
let token = "";
let quizzes = [];
// ---create quizz stats---
let questions = [];
let numberOfQuestions = 1;
let questionNode = [];
let levels = [];
let numberOfLevels = 1;
let levelNode = [];
// ---single quizz stats---
let currentQuestion = 1;
let acertos = 0;
//---end game stats---
let score = 0;
let resultLevel = {
  title: "Voce eh praticamente um aluno de Hogwarst!",
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit.Repellendus, qui! Doloremque, id? Nam perspiciatis suscipitlaboriosam sapiente eligendi obcaecati placeat minus, magni fugaomnis tempore incidunt ratione, mollitia rem facere?",
  imageUrl:
    "https://i.pinimg.com/564x/41/2d/83/412d83a778c691059de368b047c2a52f.jpg",
  range: { minRange: 0, maxRange: 100 },
};

// ----------------------------------NODE && NODE LIST------------------------------
// ---Login Nodes---
const loginScreen = document.querySelector(".login-screen");
const emailInput = document.querySelector(".email-input");
const passwordInput = document.querySelector(".password-input");
const loadingGif = document.querySelector(".loading-gif");
const loadingGifQuizz = document.querySelector(".loading-gif-quizz");
const loginButton = document.querySelector(".login-button");

// ---Create Quizz nodes---
const createQuizzScreen = document.querySelector(".create-quizz-screen");
const quizzTitle = document.querySelector("#quizz-title");
const addQuestionButton = document.querySelector(".add-question");
const sendButton = document.querySelector(".post-quizz-button");
const questionsContainer = document.querySelector(".questions-container");
const levelsContainer = document.querySelector(".levels-container");
const fontColor = document.querySelector("#quizz-font-color");
const themeColor = document.querySelector("#quizz-bg-color");

// ---Screen nodes---
const mainContainerScreen = document.querySelector("main");
const mainHeader = document.querySelector(".main-header");
const quizzesScreen = document.querySelector(".quizzes-screen");
const endGameScreen = document.querySelector(".end-game-screen");
const singleQuizzScreen = document.querySelector(".single-quizz-screen");
const loadingScreen = document.querySelector(".loading-screen");
