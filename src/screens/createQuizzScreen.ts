function createQuizz(edit = false, quizzId?: string) {
  // validar
  if (!getAllQuestions()) return;
  getAllQuestions();
  if (!getAllLevels()) return;
  getAllLevels();
  if (edit) {
    updateQuizz(quizzId as string);
  } else {
    sendToServer();
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

function checkQuestionMark(question: string): boolean {
  if (
    question.charAt(question.length - 1) !== "?" ||
    question.indexOf("?") !== question.length - 1
  ) {
    alert(
      "É obrigatorio terminar a pergunta com '?', e só se pode ter 1 pergunta por bloco de perguntas."
    );
    return false;
  }

  return true;
}

function getAllQuestions(): boolean {
  questions = [];
  for (let question of questionNode) {
    let newQuestion: Question;
    let answers: Answer[] = [];
    let questionTitle = firstLetterUpperCase(question.children[1].value.trim());
    if (!checkQuestionMark(questionTitle)) return false;
    // Pegar todas respostas e colcoar num array
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
        alert("Preencha todos os campos");
        return false;
      }
    }

    newQuestion = { questionTitle, answers };
    questions.push(newQuestion);
  }

  return true;
}

function getAllLevels(): boolean {
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

    if (
      title === "" ||
      imageUrl === "" ||
      description === "" ||
      isNaN(range.minRange) ||
      isNaN(range.maxRange)
    ) {
      alert("Preencha todos os campos");
      return false;
    }
    newLevel = { title, range, description, imageUrl };
    levels.push(newLevel);
  }

  return true;
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
  console.log(quizzData);
  // return;

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
    console.log("enviado");
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
    console.log("FOI CARLAHOOOOOO");
    renderFromCreateToQuizzes();
  } catch (e) {
    console.error(e);
    alert("Preencha todos os campos");
  }
  toggleIsLoadingQuizz();
}
