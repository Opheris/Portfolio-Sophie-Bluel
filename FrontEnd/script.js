// // Petit test
// console.log("Hello, World !");

// Coffre-fort pour Works et Catégories :

let allWorks = [];
let allCategories = [];
const token = localStorage.getItem("token");

// Récupération API de Works et Categories :

async function getWorks() {
  const url = "http://localhost:5678/api/works";
  try {
    const reponse = await fetch(url);
    if (!reponse.ok) {
      throw new Error("Statut de réponse : ${reponse.status}");
    }
    const resultat = await reponse.json();
    allWorks = resultat;
    console.log(allWorks);
  } catch (erreur) {
    console.error(erreur.message);
  }
  renderGallery(allWorks);
}

async function getCategories() {
  const url = "http://localhost:5678/api/categories";
  try {
    const reponse = await fetch(url);
    if (!reponse.ok) {
      throw new Error("Statut de réponse : ${reponse.status}");
    }
    const resultat = await reponse.json();
    allCategories = resultat;
    console.log(allCategories);
  } catch (erreur) {
    console.error(erreur.message);
  }
  buttonCategories();
}

function newGallery(work) {
  const sectionGallery = document.querySelector(".gallery");

  const figure = document.createElement("figure");
  const img = document.createElement("img");
  const figcaption = document.createElement("figcaption");

  img.src = work.imageUrl;
  img.alt = work.title;
  figcaption.textContent = work.title;

  sectionGallery.appendChild(figure);
  figure.appendChild(img);
  figure.appendChild(figcaption);
}

function renderGallery(works) {
  const sectionGallery = document.querySelector(".gallery");

  sectionGallery.innerHTML = "";

  for (let i = 0; i < works.length; i++) {
    newGallery(works[i]);
  }
}

// ✅ Lancer au démarrage
getWorks();
getCategories();

function buttonCategories() {
  const sectionFilters = document.querySelector(".filters");

  // Création des bouttons des catégories au DOM

  const buttonTous = document.createElement("button");

  // Ajout des classes

  buttonTous.classList.add("filter-btn");

  // Ajout du texte

  buttonTous.textContent = "Tous";

  // Ajout au DOM

  sectionFilters.appendChild(buttonTous);

  buttonTous.addEventListener("click", function () {
    renderGallery(allWorks);
  });

  for (let i = 0; i < allCategories.length; i++) {
    const category = allCategories[i];
    const button = document.createElement("button");
    button.classList.add("filter-btn");
    button.textContent = category.name;

    sectionFilters.appendChild(button);
    button.addEventListener("click", function () {
      // console.log(category.id);
      let filteredWorks = allWorks.filter(function (work) {
        return work.categoryId === category.id;
      });
      renderGallery(filteredWorks);
    });
  }
}

// MODE ÉDITION :

if (token) {
  document.body.classList.add("edit-mode");
}