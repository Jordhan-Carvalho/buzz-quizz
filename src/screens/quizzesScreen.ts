async function fetchQuizzes() {
  try {
    isLoading();
    // @ts-ignore
    const resp = await axios.get(
      "https://mock-api.bootcamp.respondeai.com.br/api/v1/buzzquizz/quizzes",
      {
        headers: {
          "User-token": token,
        },
      }
    );
    quizzes = [];

    for (let quizz of resp.data) {
      quizzes.push({ id: quizz.id, title: quizz.title, data: quizz.data });
    }
  } catch (e) {
    console.error(e);
  }

  isLoading();
}

async function deleteQuizz(quizzId: string) {
  const presp = prompt("Tem certeza? pra apagar digite SIM");
  if (presp !== "SIM") return;

  try {
    //@ts-ignore
    await axios.delete(
      `https://mock-api.bootcamp.respondeai.com.br/api/v1/buzzquizz/quizzes/${quizzId}`,
      {
        headers: {
          "User-Token": token,
        },
      }
    );
    renderQuizzes();
  } catch (e) {
    console.error(e);
  }
}
