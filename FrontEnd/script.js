const gallery = document.querySelector(".gallery");
const filters = document.querySelector(".filters");
const token = localStorage.getItem("token");

const modalGalleryGrid = document.querySelector(".modal-gallery-grid");
const modalGallery = document.querySelector("#modal-gallery");
const modalForm = document.querySelector("#modal-form");
const modal = document.querySelector("#modal");
// FORMULAIRE D'AJOUT DE PROJET
const addPhotoForm = document.querySelector("#add-photo-form");
const photoFile = document.querySelector("#photo-file");
const photoTitle = document.querySelector("#photo-title");
const photoCategory = document.querySelector("#photo-category");
const submitButton = addPhotoForm.querySelector('button[type="submit"]');

const uploadIcon = document.querySelector(".upload-icon");
const uploadArea = document.querySelector(".upload-area");

const formError = document.querySelector("#form-error");

// DÉTECTION DE LA SÉLECTION D'UNE IMAGE
photoFile.addEventListener("change", () => {

    const imageFile = photoFile.files[0];

    if (imageFile) {
        const imageUrl = URL.createObjectURL(imageFile);

        uploadIcon.src = imageUrl;
        uploadArea.classList.add("has-preview");
    }

});
// VALIDATION DU FORMULAIRE 
function checkFormValidity() {
    const hasImage = photoFile.files.length > 0;
    const hasTitle = photoTitle.value.trim() !== "";
    const hasCategory = photoCategory.value !== "";

    const isFormValid = hasImage && hasTitle && hasCategory;

    submitButton.disabled = !isFormValid;

    // Afficher ou cacher le message d'erreur
    formError.hidden = isFormValid;
}
// ECOUTE DES MODIFICATIONS DES CHAMPS
photoFile.addEventListener("change", checkFormValidity);
photoTitle.addEventListener("input", checkFormValidity);
photoCategory.addEventListener("change", checkFormValidity);


addPhotoForm.addEventListener("submit", (event) => {

    // Empêche le rechargement automatique de la page
    event.preventDefault();

    // Création de l'objet FormData
    const formData = new FormData();

    // Ajout des informations du formulaire
    formData.append("title", photoTitle.value);
    formData.append("category", photoCategory.value);
    formData.append("image", photoFile.files[0]);

    // Envoi des données à l'API
    fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: formData
    })
    .then(response => {

        if (!response.ok) {
            throw new Error("Erreur lors de l'ajout du projet");
        }

        return response.json();
    })
    .then(newWork => {
        console.log("Projet ajouté avec succès :", newWork);
    })
    .catch(error => {
        console.error("Erreur :", error);
    });

});


// FERMETURE DES MODALES
const closeModal = document.querySelector("#close-modal");
closeModal.addEventListener("click", () => {
    modal.hidden = true;
});
const closeModalForm = document.querySelector("#close-modal-form");

closeModalForm.addEventListener("click", () => {
    modal.hidden = true;
});
// FERMETURE EN CLIQUANT A L EXTERIEUR DE LA MODALE
modal.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.hidden = true;
    }
});
// NAVIGATION ENTRE LES MODALES
const addPhotoButton = document.querySelector("#add-photo-button");

addPhotoButton.addEventListener("click", () => {
    modalGallery.hidden = true;
    modalForm.hidden = false;
});

const backToGallery = document.querySelector("#back-to-gallery");

backToGallery.addEventListener("click", () => {
    modalForm.hidden = true;
    modalGallery.hidden = false;
});
// GESTION DE LA CONNEXION
console.log(token);
    if (token) {
        console.log("Utilisateur connecté");

    const editMode = document.querySelector("#edit-mode");
        editMode.style.display = "flex";
        filters.style.display = "none";

    const editLink = document.querySelector("#edit-link");
        editLink.style.display = "inline-flex";

        editLink.addEventListener("click", (event) => {
        event.preventDefault();

        modal.hidden = false;
        modalGallery.hidden = false;
        modalForm.hidden = true;
    });

    const loginLink = document.querySelector("#login-link");
        loginLink.textContent = "logout";

        loginLink.addEventListener("click", (event) => {
        event.preventDefault();

        localStorage.removeItem("token");

        window.location.href = "index.html";
        });

    }
// AFFICHAGE DES PROJETS ET FILTRES
let works = [];
// CREATION DU BOUTON "TOUS"
const buttonAll = document.createElement("button");

    buttonAll.textContent = "Tous";
    buttonAll.classList.add("all");

    filters.appendChild(buttonAll);
// AFFICHAGE DE TOUS LES PROJETS
    buttonAll.addEventListener("click", () => {
        gallery.innerHTML = "";

        works.forEach(work => {

            const figure = document.createElement("figure");
            const img = document.createElement("img");
            const figcaption = document.createElement("figcaption");

            img.src = work.imageUrl;
            img.alt = work.title;
            figcaption.textContent = work.title;

            figure.appendChild(img);
            figure.appendChild(figcaption);

            gallery.appendChild(figure);

        });

    });
// RECUPERATION DES CATEGORIES DE L API
fetch ("http://localhost:5678/api/categories")
    .then (response => response.json())
    .then (categories => {
        categories.forEach(category => {
// CREATION DU BOUTON FILTRE
            const button = document.createElement("button");

            button.textContent = category.name;
            button.dataset.categoryId = category.id;
            button.addEventListener("click", (event) => {
                const categoryId = event.target.dataset.categoryId;
                const filteredWorks = works.filter(work => work.categoryId == categoryId);

                gallery.innerHTML = "";

                filteredWorks.forEach(work => {

                    const figure = document.createElement("figure");
                    const img = document.createElement("img");
                    const figcaption = document.createElement("figcaption");

                    img.src = work.imageUrl;
                    img.alt = work.title;
                    figcaption.textContent = work.title;

                    figure.appendChild(img);
                    figure.appendChild(figcaption);

                    gallery.appendChild(figure);

                })
            })

            filters.appendChild(button);

// Création de l'option dans le formulaire
            const option = document.createElement("option");
            option.value = category.id;
            option.textContent = category.name;
            photoCategory.appendChild(option);
        });
        
    });
// RECUPERATION DES PROJETS DE L API
fetch ("http://localhost:5678/api/works")
    .then (response => response.json())
    .then (data => {
        works=data;
// AFFICHAGE DES PROJETS DANS LA GALERIE    
        works.forEach(work => {

            const figure = document.createElement("figure");
            const img = document.createElement("img");
            const figcaption = document.createElement("figcaption");

            img.src = work.imageUrl;
            img.alt = work.title;
            figcaption.textContent = work.title;

            figure.appendChild(img);
            figure.appendChild(figcaption);

            gallery.appendChild(figure);

        });
// AFFICHAGE DES PROJETS DANS LA MODALE AVEC LE BOUTON SUPPRIMER        
        works.forEach(work => {

            console.log(work.id);

            const figure = document.createElement("figure");
            const img = document.createElement("img");
            const deleteButton = document.createElement("button");
            const deleteIcon = document.createElement("img");

            img.src = work.imageUrl;
            img.alt = work.title;

            deleteIcon.src = "assets/icons/trash-icon.svg";
            deleteIcon.alt = "Supprimer";

            deleteButton.appendChild(deleteIcon);

// SUPPRESSION D UN PROJET
            deleteButton.addEventListener("click", () => {

                fetch(`http://localhost:5678/api/works/${work.id}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then(response => {
                    if (response.ok) {
                        console.log("Travail supprimé de la base de données !");
                        figure.remove();

                    } else {
                        console.error("Erreur lors de la suppression :", response.status);
                    }
                })
                .catch(error => {
                    console.error("Erreur réseau :", error);
                });
            });

            figure.appendChild(img);
            figure.appendChild(deleteButton);

            modalGalleryGrid.appendChild(figure);

        });
    });
