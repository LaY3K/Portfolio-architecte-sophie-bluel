const gallery = document.querySelector(".gallery");
const filters = document.querySelector(".filters");

const buttonAll = document.createElement("button");
    buttonAll.textContent = "Tous";
    buttonAll.classList.add("all");
    filters.appendChild(buttonAll);

fetch ("http://localhost:5678/api/categories")
    .then (response => response.json())
    .then (categories => {
        categories.forEach(category => {

            const button = document.createElement("button");

            button.textContent = category.name;

            filters.appendChild(button);
        })
        
    })

fetch ("http://localhost:5678/api/works")
    .then (response => response.json())
    .then (works => {
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
