function createQuizz(edit = false, quizzId?: string) {
  try {
    getAllQuestions();
    getAllLevels();
    if (edit) {
      updateQuizz(quizzId as string);
    } else {
      sendToServer();
    }
  } catch (error) {
    alert(error.message);
    console.error(error);
  }
}

function addQuestion() {
  numberOfQuestions++;
  renderCreateQuestion();
}

function addLevel() {
  numberOfLevels++;
  renderCreateLevels();
}

function checkQuestionMark(question: string) {
  const isValidCheckMark =
    question.charAt(question.length - 1) !== "?" ||
    question.indexOf("?") !== question.length - 1;

  if (isValidCheckMark) {
    throw new Error(
      "É obrigatorio terminar a pergunta com '?', e só se pode ter 1 pergunta por bloco de perguntas."
    );
  }
}

function getAllQuestions() {
  questions = [];

  for (let question of questionNode) {
    let newQuestion: Question;
    let answers: Answer[] = [];
    let questionTitle = firstLetterUpperCase(question.children[1].value.trim());

    checkQuestionMark(questionTitle);

    for (let i = 2; i <= 5; i++) {
      const answer = firstLetterUpperCase(
        question.children[i].children[0].value.trim()
      );
      const answerUrl = question.children[i].children[1].value.trim();

      answers.push({
        answer,
        answerUrl,
        correct: i === 2 ? true : false,
      });

      if (answer === "" || answerUrl === "") {
        throw new Error("Campo de resposta vazio");
      }
    }

    newQuestion = { questionTitle, answers };
    questions.push(newQuestion);
  }
}

function getAllLevels() {
  levels = [];

  for (let level of levelNode) {
    let newLevel: Level;
    let range = {
      minRange: Number(level.children[1].children[0].value.trim()),
      maxRange: Number(level.children[1].children[1].value.trim()),
    };
    let title = firstLetterUpperCase(level.children[2].value.trim());
    let imageUrl = level.children[3].value.trim();
    let description = firstLetterUpperCase(level.children[4].value.trim());
    let isInvalid =
      title === "" ||
      imageUrl === "" ||
      description === "" ||
      isNaN(range.minRange) ||
      isNaN(range.maxRange);

    if (isInvalid) {
      throw new Error("Preencha todos os campos do nivel");
    }

    newLevel = { title, range, description, imageUrl };
    levels.push(newLevel);
  }
}

async function sendToServer() {
  const quizzData: Quizz = {
    title: firstLetterUpperCase(quizzTitle.value.trim()),
    data: {
      levels,
      questions,
      config: {
        fontColor: fontColor.value.trim(),
        themeColor: themeColor.value.trim(),
      },
    },
  };

  try {
    toggleIsLoadingQuizz();
    //@ts-ignore
    await axios.post(
      "https://mock-api.bootcamp.respondeai.com.br/api/v1/buzzquizz/quizzes",
      quizzData,
      {
        headers: {
          "User-Token": token,
        },
      }
    );
    renderFromCreateToQuizzes();
  } catch (e) {
    console.error(e);
    alert("Preencha todos os campos");
  }

  toggleIsLoadingQuizz();
}

async function updateQuizz(id: string) {
  const quizzData: Quizz = {
    title: firstLetterUpperCase(quizzTitle.value.trim()),
    data: {
      levels,
      questions,
      config: {
        fontColor: fontColor.value.trim(),
        themeColor: themeColor.value.trim(),
      },
    },
  };

  try {
    toggleIsLoadingQuizz();
    // @ts-ignore
    await axios.put(
      `https://mock-api.bootcamp.respondeai.com.br/api/v1/buzzquizz/quizzes/${id}`,
      quizzData,
      { headers: { "User-Token": token } }
    );
    renderFromCreateToQuizzes();
  } catch (e) {
    console.error(e);
    alert("Preencha todos os campos");
  }

  toggleIsLoadingQuizz();
}
