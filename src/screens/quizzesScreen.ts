import axios from "axios";

import { Quizz } from "../interfaces";
import { renderFromQuizzesToCreate, renderFromQuizzesToQuizz } from "../index";
import { isLoading } from "../helperFunctions";

const quizzesScreen = document.querySelector(".quizzes-screen") as HTMLElement;

export async function fetchQuizzes(token: string): Promise<Quizz[]> {
  let quizzes: Quizz[] = [];
  try {
    isLoading();
    const { data } = await axios.get(
      "https://mock-api.bootcamp.respondeai.com.br/api/v1/buzzquizz/quizzes",
      {
        headers: {
          "User-token": token,
        },
      }
    );

    for (let quizz of data) {
      quizzes.push({ id: quizz.id, title: quizz.title, data: quizz.data });
    }
  } catch (e) {
    console.error(e);
  }
  isLoading();
  return quizzes;
}

async function deleteQuizz(quizzId: string, token: string) {
  const presp = prompt("Tem certeza? pra apagar digite SIM");
  if (presp !== "SIM") return;

  try {
    await axios.delete(
      `https://mock-api.bootcamp.respondeai.com.br/api/v1/buzzquizz/quizzes/${quizzId}`,
      {
        headers: {
          "User-Token": token,
        },
      }
    );
    renderQuizzes(token);
  } catch (e) {
    console.error(e);
  }
}

// ---------------------------------RENDER FUNCTIONS------------------------------------

export async function renderQuizzes(token: string) {
  let quizzes = await fetchQuizzes(token);
  quizzesScreen.innerHTML = "";

  const newQuizzDiv = document.createElement("div");
  newQuizzDiv.setAttribute("class", "box-container new-quizz-container");
  newQuizzDiv.addEventListener("click", () => {
    renderFromQuizzesToCreate();
  });
  newQuizzDiv.innerHTML = `<h3>Novo Quizz</h3> <ion-icon name="add-circle"></ion-icon>`;
  quizzesScreen?.insertAdjacentElement("beforeend", newQuizzDiv);

  for (let quizz of quizzes) {
    let html = `<h3>${quizz.title}</h3>
    <div class="icons-container">
      <ion-icon class="delete-icon" name="trash"></ion-icon>
      <ion-icon class="edit-icon"   name="create"></ion-icon>
    </div>`;
    let quizzDiv = document.createElement("div");
    quizzDiv.setAttribute("class", "box-container");
    quizzDiv.addEventListener("click", function (e: Event) {
      renderFromQuizzesToQuizz(e, quizz);
    });
    quizzDiv.innerHTML = html;

    let editIcon = quizzDiv.querySelector(".edit-icon");
    editIcon.addEventListener("click", function (e: Event) {
      renderFromQuizzesToCreate(quizz);
    });
    let deleteIcon = quizzDiv.querySelector(".delete-icon");
    deleteIcon.addEventListener("click", () => {
      deleteQuizz(quizz.id, token);
    });

    quizzesScreen?.insertAdjacentElement("beforeend", quizzDiv);
  }
}
