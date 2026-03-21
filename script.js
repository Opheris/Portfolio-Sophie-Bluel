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

function updateEditMode() {
  const token = localStorage.getItem("token");
  const loginLink = document.getElementById("login-link");

  if (token) {
    document.body.classList.add("edit-mode");

    if (loginLink) {
      loginLink.textContent = "logout";
      loginLink.href = "#";
    }
  } else {
    document.body.classList.remove("edit-mode");

    if (loginLink) {
      loginLink.textContent = "login";
      loginLink.href = "./login.html";
    }
  }
}

updateEditMode();

function logout() {
  localStorage.removeItem("token");
  document.body.classList.remove("edit-mode");
  window.location.reload();
}

const logoutLink = document.getElementById("logout-link");

if (logoutLink) {
  logoutLink.addEventListener("click", logout);
}

// Modal du mode édition

// Ouvrir la modale galerie
function openModalGallery() {
  const modalGallery = document.getElementById("modal-gallery");
  if (modalGallery) {
    modalGallery.classList.add("active");
    renderModalGallery();
  }
}

// Fermer la modale galerie
function closeModalGallery() {
  const modalGallery = document.getElementById("modal-gallery");
  if (modalGallery) {
    modalGallery.classList.remove("active");
  }
}

// Créer une miniature dans la modale
function createModalGalleryItem(work) {
  const item = document.createElement("div");
  item.classList.add("modal-gallery-item");

  const img = document.createElement("img");
  img.src = work.imageUrl;
  img.alt = work.title;

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-icon");
  deleteBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="9" height="11" viewBox="0 0 9 11" fill="none">
    <path d="M2.71607 0.35558C2.82455 0.136607 3.04754 0 3.29063 0H5.70938C5.95246 0 6.17545 0.136607 6.28393 0.35558L6.42857 0.642857H8.35714C8.71272 0.642857 9 0.930134 9 1.28571C9 1.64129 8.71272 1.92857 8.35714 1.92857H0.642857C0.287277 1.92857 0 1.64129 0 1.28571C0 0.930134 0.287277 0.642857 0.642857 0.642857H2.57143L2.71607 0.35558ZM0.642857 2.57143H8.35714V9C8.35714 9.70915 7.78058 10.2857 7.07143 10.2857H1.92857C1.21942 10.2857 0.642857 9.70915 0.642857 9V2.57143ZM2.57143 3.85714C2.39464 3.85714 2.25 4.00179 2.25 4.17857V8.67857C2.25 8.85536 2.39464 9 2.57143 9C2.74821 9 2.89286 8.85536 2.89286 8.67857V4.17857C2.89286 4.00179 2.74821 3.85714 2.57143 3.85714ZM4.5 3.85714C4.32321 3.85714 4.17857 4.00179 4.17857 4.17857V8.67857C4.17857 8.85536 4.32321 9 4.5 9C4.67679 9 4.82143 8.85536 4.82143 8.67857V4.17857C4.82143 4.00179 4.67679 3.85714 4.5 3.85714ZM6.42857 3.85714C6.25179 3.85714 6.10714 4.00179 6.10714 4.17857V8.67857C6.10714 8.85536 6.25179 9 6.42857 9C6.60536 9 6.75 8.85536 6.75 8.67857V4.17857C6.75 4.00179 6.60536 3.85714 6.42857 3.85714Z" fill="white"/>
  </svg>`;

  deleteBtn.addEventListener("click", function () {
    deleteWork(work.id);
  });

  item.appendChild(img);
  item.appendChild(deleteBtn);

  return item;
}

// Afficher la galerie dans la modale
function renderModalGallery() {
  const modalGalleryContent = document.getElementById("modal-gallery-content");
  if (!modalGalleryContent) return;

  modalGalleryContent.innerHTML = "";

  for (let i = 0; i < allWorks.length; i++) {
    const item = createModalGalleryItem(allWorks[i]);
    modalGalleryContent.appendChild(item);
  }
}

// Supprimer un projet
async function deleteWork(workId) {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Vous devez être connecté pour supprimer un projet.");
    return;
  }

  const confirmation = confirm("Voulez-vous vraiment supprimer ce projet ?");
  if (!confirmation) return;

  try {
    const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la suppression");
    }

    // Mettre à jour allWorks
    allWorks = allWorks.filter(function (work) {
      return work.id !== workId;
    });

    // Re-générer la galerie principale et la modale
    renderGallery(allWorks);
    renderModalGallery();
  } catch (erreur) {
    console.error("Erreur lors de la suppression :", erreur);
    alert("Impossible de supprimer le projet.");
  }
}

// Ouvrir la modale d'ajout de photo
function openModalAddPhoto() {
  const modalGallery = document.getElementById("modal-gallery");
  const modalAddPhoto = document.getElementById("modal-add-photo");

  if (modalGallery) {
    modalGallery.classList.remove("active");
  }

  if (modalAddPhoto) {
    modalAddPhoto.classList.add("active");
    loadCategories();
    resetFormAddPhoto();
  }
}

// Fermer la modale d'ajout de photo
function closeModalAddPhoto() {
  const modalAddPhoto = document.getElementById("modal-add-photo");
  if (modalAddPhoto) {
    modalAddPhoto.classList.remove("active");
  }
}

// Retour vers la modale galerie
function backToGallery() {
  const modalGallery = document.getElementById("modal-gallery");
  const modalAddPhoto = document.getElementById("modal-add-photo");

  if (modalAddPhoto) {
    modalAddPhoto.classList.remove("active");
  }

  if (modalGallery) {
    modalGallery.classList.add("active");
  }
}

// Charger les catégories dans le select
function loadCategories() {
  const selectCategory = document.getElementById("photo-category");
  if (!selectCategory) return;

  selectCategory.innerHTML = '<option value=""></option>';

  for (let i = 0; i < allCategories.length; i++) {
    const option = document.createElement("option");
    option.value = allCategories[i].id;
    option.textContent = allCategories[i].name;
    selectCategory.appendChild(option);
  }
}

// Réinitialiser le formulaire d'ajout
function resetFormAddPhoto() {
  const form = document.getElementById("form-add-photo");
  const previewContainer = document.getElementById("preview-container");
  const previewImage = document.getElementById("preview-image");

  if (form) {
    form.reset();
  }

  if (previewContainer) {
    previewContainer.classList.remove("active");
  }

  if (previewImage) {
    previewImage.src = "";
  }

  checkFormValidity();
}

// Prévisualiser l'image sélectionnée
function previewPhoto(file) {
  const previewContainer = document.getElementById("preview-container");
  const previewImage = document.getElementById("preview-image");

  if (!file) return;

  // Vérifier la taille du fichier (4 Mo max)
  if (file.size > 4 * 1024 * 1024) {
    alert("Le fichier ne doit pas dépasser 4 Mo.");
    return;
  }

  // Vérifier le type de fichier
  if (!file.type.match("image/jpeg") && !file.type.match("image/png")) {
    alert("Seuls les fichiers JPG et PNG sont acceptés.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    if (previewImage) {
      previewImage.src = e.target.result;
    }
    if (previewContainer) {
      previewContainer.classList.add("active");
    }
  };
  reader.readAsDataURL(file);
}

// Vérifier la validité du formulaire
function checkFormValidity() {
  const photoFile = document.getElementById("photo-file");
  const photoTitle = document.getElementById("photo-title");
  const photoCategory = document.getElementById("photo-category");
  const btnValidate = document.getElementById("btn-validate-photo");

  if (!photoFile || !photoTitle || !photoCategory || !btnValidate) return;

  const hasFile = photoFile.files.length > 0;
  const hasTitle = photoTitle.value.trim() !== "";
  const hasCategory = photoCategory.value !== "";

  if (hasFile && hasTitle && hasCategory) {
    btnValidate.disabled = false;
  } else {
    btnValidate.disabled = true;
  }
}
// Ajouter un nouveau projet
async function addNewWork(formData) {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Vous devez être connecté pour ajouter un projet.");
    return;
  }

  try {
    const response = await fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Erreur lors de l'ajout du projet");
    }

    const newWork = await response.json();

    // Ajouter le nouveau projet à allWorks
    allWorks.push(newWork);

    // Re-générer la galerie principale
    renderGallery(allWorks);

    // Fermer la modale et retourner à la galerie
    closeModalAddPhoto();
    openModalGallery();

    alert("Projet ajouté avec succès !");
  } catch (erreur) {
    console.error("Erreur lors de l'ajout :", erreur);
    alert("Impossible d'ajouter le projet.");
  }
}

// Événements pour les modales
function initModalEvents() {
  // Déclaration des éléments du formulaire d'ajout
  const photoFile = document.getElementById("photo-file");
  const photoTitle = document.getElementById("photo-title");
  const photoCategory = document.getElementById("photo-category");
  const btnSelectFile = document.getElementById("btn-select-file");
  const btnValidate = document.getElementById("btn-validate-photo");

  // Bouton modifier
  const btnModifier = document.getElementById("btn-modifier");
  if (btnModifier) {
    btnModifier.addEventListener("click", openModalGallery);
  }

  // Fermer la modale galerie
  const closeModalGalleryBtn = document.getElementById("close-modal-gallery");
  if (closeModalGalleryBtn) {
    closeModalGalleryBtn.addEventListener("click", closeModalGallery);
  }

  // Ouvrir la modale d'ajout
  const btnAddPhoto = document.getElementById("btn-add-photo");
  if (btnAddPhoto) {
    btnAddPhoto.addEventListener("click", openModalAddPhoto);
  }

  // Fermer la modale d'ajout
  const closeModalAddBtn = document.getElementById("close-modal-add");
  if (closeModalAddBtn) {
    closeModalAddBtn.addEventListener("click", closeModalAddPhoto);
  }

  // Retour à la galerie
  const backToGalleryBtn = document.getElementById("back-to-gallery");
  if (backToGalleryBtn) {
    backToGalleryBtn.addEventListener("click", backToGallery);
  }

  // Fermer la modale en cliquant sur l'overlay
  const modalGallery = document.getElementById("modal-gallery");
  if (modalGallery) {
    modalGallery.addEventListener("click", function (e) {
      if (e.target === modalGallery) {
        closeModalGallery();
      }
    });
  }

  const modalAddPhoto = document.getElementById("modal-add-photo");
  if (modalAddPhoto) {
    modalAddPhoto.addEventListener("click", function (e) {
      if (e.target === modalAddPhoto) {
        closeModalAddPhoto();
      }
    });
  }

  // Bouton de sélection de fichier
  if (btnSelectFile && photoFile) {
    btnSelectFile.addEventListener("click", function () {
      photoFile.click();
    });
  }

  // Prévisualisation de l'image
  if (photoFile) {
    photoFile.addEventListener("change", function (e) {
      const file = e.target.files[0];
      if (file) {
        previewPhoto(file);
        checkFormValidity();
      }
    });
  }

  // Vérifier la validité du formulaire
  if (photoTitle) {
    photoTitle.addEventListener("input", checkFormValidity);
  }

  if (photoCategory) {
    photoCategory.addEventListener("change", checkFormValidity);
  }

  // Soumettre le formulaire d'ajout
  const formAddPhoto = document.getElementById("form-add-photo");
  if (formAddPhoto) {
    formAddPhoto.addEventListener("submit", function (e) {
      e.preventDefault();

      if (!photoFile || !photoTitle || !photoCategory) return;

      const formData = new FormData();
      formData.append("image", photoFile.files[0]);
      formData.append("title", photoTitle.value.trim());
      formData.append("category", photoCategory.value);

      addNewWork(formData);
    });
  }

  // Initialiser le bouton de validation comme désactivé
  if (btnValidate) {
    btnValidate.disabled = true;
  }
}

// Initialiser les événements de la modale au chargement du DOM
initModalEvents();
