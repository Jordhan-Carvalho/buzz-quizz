function calculateScoreAndLevel(quizz: Quizz) {
  score = Math.round((acertos / quizz.data.questions.length) * 100);
  for (let level of quizz.data.levels) {
    if (score >= level.range.minRange && score <= level.range.maxRange) {
      resultLevel = level;
      return;
    }
  }
}
