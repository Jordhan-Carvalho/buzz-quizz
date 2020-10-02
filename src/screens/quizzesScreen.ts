import { Quizz } from "../interfaces";
import {
  renderFromQuizzesToCreate,
  renderFromQuizzesToQuizz,
} from "../renderFunctions";
import { isLoading } from "../helperFunctions";

// ---STATUS---
// ---NODES---
const quizzesScreen = document.querySelector(".quizzes-screen") as HTMLElement;

export async function fetchQuizzes(token: string): Promise<Quizz[]> {
  let quizzes: Quizz[] = [];
  try {
    isLoading();
    // @ts-ignore
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

// async function deleteQuizz(quizzId: string) {
//   const presp = prompt("Tem certeza? pra apagar digite SIM");
//   if (presp !== "SIM") return;

//   try {
//     //@ts-ignore
//     await axios.delete(
//       `https://mock-api.bootcamp.respondeai.com.br/api/v1/buzzquizz/quizzes/${quizzId}`,
//       {
//         headers: {
//           "User-Token": token,
//         },
//       }
//     );
//     renderQuizzes();
//   } catch (e) {
//     console.error(e);
//   }
// }

// ---------------------------------RENDER FUNCTIONS------------------------------------

export async function renderQuizzes(token: string) {
  let quizzes = await fetchQuizzes(token);
  quizzesScreen.innerHTML = "";
  let newQuizzDiv = `<div class="box-container new-quizz-container" onclick="renderFromQuizzesToCreate()">
                        <h3>Novo Quizz</h3>
                        <ion-icon name="add-circle"></ion-icon>
                      </div>`;
  quizzesScreen?.insertAdjacentHTML("beforeend", newQuizzDiv);
  for (let quizz of quizzes) {
    let html = `<h3>${quizz.title}</h3>
    <div class="icons-container">
      <ion-icon class="delete-icon" onclick="deleteQuizz(${quizz.id})" name="trash"></ion-icon>
      <ion-icon class="edit-icon"   name="create"></ion-icon>
    </div>`;
    let quizzDiv = document.createElement("div");
    quizzDiv.setAttribute("class", "box-container");
    quizzDiv.addEventListener("click", function (e: Event) {
      renderFromQuizzesToQuizz(e, quizz);
    });
    quizzDiv.innerHTML = html;
    let editIcon = quizzDiv.querySelector(".edit-icon");
    editIcon?.addEventListener("click", function (e: Event) {
      renderFromQuizzesToCreate(quizz);
    });
    quizzesScreen?.insertAdjacentElement("beforeend", quizzDiv);
  }
}
