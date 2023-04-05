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

        fetch(`${apiUrl}/categories`)
            .then(response => response.json())
            .then((response) => {
                const responseCategories = response;

                if (responseCategories && categories) {
                    for (const category of responseCategories) {
                        const button = document.createElement("button");
                        button.textContent = category.name;
                        button.setAttribute("data-id", category.id);
                        button.setAttribute("class", "filters");
                        categories.appendChild(button);
                    }
                }
            });
    }

    // Appel du chargements des Projets et des Filtres
    getWorks();

    // Modifications CSS des filtres
    //document.getElementById("categories").style.display = "flex";
    //document.getElementById("categories").style.alignItems = "center";
    //document.getElementsByClassName("filters").style.font = "normal 700 16px Syne";
});