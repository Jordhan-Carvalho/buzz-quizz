function selectAnswer(answer: HTMLElement, singleQuizz: Quizz) {
  changeAnswersBG();
  currentQuestion++;
  if (answer.hasAttribute("correct")) acertos++;

  const endGame = singleQuizz.data.questions.length < currentQuestion;
  if (endGame) {
    setTimeout(function () {
      calculateScoreAndLevel(singleQuizz);
      renderFromQuizzToEndGame(singleQuizz);
    }, 2000);
  } else {
    setTimeout(function () {
      renderSingleQuestion(singleQuizz);
    }, 2000);
  }
}

function changeAnswersBG() {
  const answersNode = singleQuizzScreen?.querySelectorAll(
    ".single-answer-container"
  ) as NodeListOf<Element>;
  for (let answer of answersNode) {
    answer.hasAttribute("correct")
      ? answer.classList.toggle("correct")
      : answer.classList.toggle("wrong");
  }
}
