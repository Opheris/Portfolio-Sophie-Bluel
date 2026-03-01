// console.log("Script chargé avec succès !");
let allWorks = [];
let allCategories = [];

async function getWorks() {
  const url = "http://localhost:5678/api/works";
  try {
    const reponse = await fetch(url);
    if (!reponse.ok) {
      throw new Error(`Statut de réponse : ${reponse.status}`);
    }

    const resultat = await reponse.json();
    allWorks = resultat;
    console.log(allWorks.length);
    const sectionGallery = document.querySelector(".gallery");
    sectionGallery.innerHTML = "";
    for (let i = 0; i < resultat.length; i++) {
      renderOneWork(resultat[i]);
    }
    console.log(resultat);
  } catch (error) {
    console.error(error.message);
  }
}
getWorks();

function renderOneWork(work) {
  const sectionGallery = document.querySelector(".gallery");
  const figure = document.createElement("figure");
  const image = document.createElement("img");
  const figcaption = document.createElement("figcaption");
  image.src = work.imageUrl;
  image.alt = work.title;
  figcaption.textContent = work.title;

  // 4) On construit l'arbre HTML
  figure.appendChild(image);
  figure.appendChild(figcaption);

  // 5) On ajoute dans la page
  sectionGallery.appendChild(figure);
}

async function getCategories() {
  const url = "http://localhost:5678/api/categories";
  try {
    const reponse = await fetch(url);
    if (!reponse.ok) {
      throw new Error(`Statut de réponse : ${reponse.status}`);
    }
    const resultat = await reponse.json();
    allCategories = resultat;
    renderFilters();
    console.log(allCategories.length);
  } catch (error) {
    console.error(error.message);
  }
}

getCategories();

function renderFilters(categories) {
  const filtersContainer = document.querySelector(".filters");
  filtersContainer.innerHTML = "";
  const allButton = document.createElement("button");
  allButton.textContent = "Tous";
  allButton.addEventListener("click", function () {
    const sectionGallery = document.querySelector(".gallery");
    sectionGallery.innerHTML = "";
    for (let i = 0; i < allWorks.length; i++) {
      renderOneWork(allWorks[i]);
    }
  });
  filtersContainer.appendChild(allButton);
}
