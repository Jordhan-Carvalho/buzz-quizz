import { Quizz, Level } from "../interfaces";

// -----------------MODULE STATUS----------------------
let score = 0;
let resultLevel: Level = {
  title: "Voce eh praticamente um aluno de Hogwarst!",
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit.Repellendus, qui! Doloremque, id? Nam perspiciatis suscipitlaboriosam sapiente eligendi obcaecati placeat minus, magni fugaomnis tempore incidunt ratione, mollitia rem facere?",
  imageUrl:
    "https://i.pinimg.com/564x/41/2d/83/412d83a778c691059de368b047c2a52f.jpg",
  range: { minRange: 0, maxRange: 100 },
};
let acertos = 0;

export function calculateScoreAndLevel(quizz: Quizz, sQuizzAcertos: number) {
  acertos = sQuizzAcertos;
  score = Math.round((acertos / quizz.data.questions.length) * 100);
  for (let level of quizz.data.levels) {
    if (score >= level.range.minRange && score <= level.range.maxRange) {
      resultLevel = level;
      return;
    }
  }
}

// --------------------------------RENDER FUNCTIONS----------------------------

export function renderResults(quizz: Quizz, endGameScreen: HTMLElement) {
  let html = `<h1>${quizz.title}</h1>
  <header class="question-header">
    <h3>Voce acertou ${acertos} de ${quizz.data.questions.length} perguntas ! Score: ${score}%</h3>
  </header>
  <div class="result-container">
    <div class="result-text-container">
      <h3>${resultLevel.title}</h3>
      <p>
        ${resultLevel.description}
      </p>
    </div>
    <figure class="result-image-container">
      <img
        src="${resultLevel.imageUrl}"
        alt=""
      />
    </figure>
  </div>`;

  endGameScreen?.insertAdjacentHTML("afterbegin", html);
}
