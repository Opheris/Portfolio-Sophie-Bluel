// Données globales (réutilisables partout)
let allWorks = [];
let allCategories = [];

// Affiche une liste de works dans la galerie (et vide avant)
function renderGallery(works) {
  const sectionGallery = document.querySelector(".gallery");
  sectionGallery.innerHTML = "";

  for (let i = 0; i < works.length; i++) {
    renderOneWork(works[i]);
  }
}

// Affiche 1 work (figure + img + figcaption)
function renderOneWork(work) {
  const sectionGallery = document.querySelector(".gallery");

  const figure = document.createElement("figure");
  const image = document.createElement("img");
  const figcaption = document.createElement("figcaption");

  image.src = work.imageUrl;
  image.alt = work.title;
  figcaption.textContent = work.title;

  figure.appendChild(image);
  figure.appendChild(figcaption);
  sectionGallery.appendChild(figure);
}

// Crée les boutons de filtres
function renderFilters(categories) {
  const filtersContainer = document.querySelector(".filters");
  filtersContainer.innerHTML = "";

  // Bouton "Tous"
  const allButton = document.createElement("button");
  allButton.textContent = "Tous";
  allButton.addEventListener("click", function () {
    renderGallery(allWorks);
  });
  filtersContainer.appendChild(allButton);

  // (On ajoutera ici les boutons de catégories juste après)
  // for (let i = 0; i < categories.length; i++) { ... }
  for (let i = 0; i < categories.length; i++) {
    const category = categories[i];
    const button = document.createElement("button");
    button.textContent = category.name;
    button.addEventListener("click", function () {
      const filteredWorks = allWorks.filter(
        (work) => work.categoryId === category.id
      );
      renderGallery(filteredWorks);
    });
    filtersContainer.appendChild(button);
  }
}

// Récupère les works depuis l'API
async function getWorks() {
  const url = "http://localhost:5678/api/works";

  try {
    const reponse = await fetch(url);

    if (!reponse.ok) {
      throw new Error(`Statut de réponse : ${reponse.status}`);
    }

    const resultat = await reponse.json();
    allWorks = resultat;

    // Affiche tous les works
    renderGallery(allWorks);

    // Debug utile
    console.log("Works :", allWorks.length);
  } catch (error) {
    console.error(error.message);
  }
}

// Récupère les catégories depuis l'API
async function getCategories() {
  const url = "http://localhost:5678/api/categories";

  try {
    const reponse = await fetch(url);

    if (!reponse.ok) {
      throw new Error(`Statut de réponse : ${reponse.status}`);
    }

    const resultat = await reponse.json();
    allCategories = resultat;

    // Affiche les filtres
    renderFilters(allCategories);

    // Debug utile
    console.log("Categories :", allCategories.length);
  } catch (error) {
    console.error(error.message);
  }
}

// Lancement
getWorks();
getCategories();
