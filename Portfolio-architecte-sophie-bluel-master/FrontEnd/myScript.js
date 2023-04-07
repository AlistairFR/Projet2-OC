document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = "http://localhost:5678/api";
    const gallery = document.getElementById("gallery");
    const projectTitle = document.getElementById("projectTitle");

    // Fetch des works à l'aide de l'API
    const getWorks = () => {
        fetch(`${apiUrl}/works`)
            .then(response => response.json())
            .then((response) => {
                const works = response;

                if (works && gallery) {
                    getCategories();

                    for (const work of works) {
                        const figure = document.createElement("figure");
                        figure.setAttribute("class", work.categoryId);

                        const image = document.createElement("img");
                        image.src = work.imageUrl;
                        image.alt = work.title;

                        const figCaption = document.createElement("figcaption");
                        figCaption.textContent = work.title;

                        figure.appendChild(image);
                        figure.appendChild(figCaption);
                        gallery.appendChild(figure);
                    }
                }
            });
    }

    // Fetch des catégories à l'aide de l'API
    const getCategories = () => {
        const categoriesContainer = document.createElement("div");
        categoriesContainer.id = "categories";

        projectTitle.after(categoriesContainer);

        const categories = document.getElementById("categories");

        // Création du bouton "Tous"
        const button = document.createElement("button");
            button.textContent = "Tous";
            button.setAttribute("data-id", "0");
            button.setAttribute("class", "filters");
            button.setAttribute("onclick", `filterWorks(event)`);
            categories.appendChild(button);

        fetch(`${apiUrl}/categories`)
            .then(response => response.json())
            .then((response) => {
                const responseCategories = response;

                if (responseCategories && categories) {
                            // Création des bouttons à partir des catégories de l'API
                    for (const category of responseCategories) {
                        const button = document.createElement("button");
                        button.textContent = category.name;
                        button.setAttribute("data-id", category.id);
                        button.setAttribute("class", "filters");
                        button.setAttribute("onclick", `filterWorks(event)`);
                        categories.appendChild(button);
                    }
                }
            });

        // Modifications CSS des filtres
        document.getElementById("categories").setAttribute("class", "filterBar");
    }

    // Appel du chargements des Projets et des Filtres
    getWorks();
});

// Fonction des filtres
function filterWorks(e) {
    const works = document.querySelectorAll("#gallery figure");
    let filter = e.target.dataset.id;
    if (filter === "0") {
        works.forEach(work => work.classList.remove("hidden"));
    }
        else {
            works.forEach(work => {
                work.classList.contains(filter)
                ? work.classList.remove('hidden')
                : work.classList.add('hidden');
            });
        };
    };

