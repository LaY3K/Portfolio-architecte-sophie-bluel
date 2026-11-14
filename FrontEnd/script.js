const gallery = document.querySelector(".gallery");
const filters = document.querySelector(".filters");
const token = localStorage.getItem("token");

console.log(token);
    if (token) {
        console.log("Utilisateur connecté");

    const editMode = document.querySelector("#edit-mode");
        editMode.style.display = "flex";
        filters.style.display = "none";

    const editLink = document.querySelector("#edit-link");
        editLink.style.display = "inline-flex";

    const loginLink = document.querySelector("#login-link");
        loginLink.textContent = "logout";

        loginLink.addEventListener("click", (event) => {
        event.preventDefault();

        localStorage.removeItem("token");

        window.location.href = "index.html";
        });

    }

let works = [];

const buttonAll = document.createElement("button");

    buttonAll.textContent = "Tous";
    buttonAll.classList.add("all");

    filters.appendChild(buttonAll);
    
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

fetch ("http://localhost:5678/api/categories")
    .then (response => response.json())
    .then (categories => {
        categories.forEach(category => {

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
        })
        
    })

fetch ("http://localhost:5678/api/works")
    .then (response => response.json())
    .then (data => {
        works=data;

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
