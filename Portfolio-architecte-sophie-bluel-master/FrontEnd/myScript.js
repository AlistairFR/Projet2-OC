document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = "http://localhost:5678/api";
    const gallery = document.getElementById("gallery");
    const portfolio = document.getElementById("portfolio");

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
        const categories = document.getElementById("categories");

        if (!categories) {
            const categoriesContainer = document.createElement("div");
            categoriesContainer.id = "categories";

            portfolio.appendChild(categoriesContainer);
        }

        fetch(`${apiUrl}/categories`)
            .then(response => response.json())
            .then((response) => {
                const responseCategories = response;

                if (responseCategories && categories) {
                    for (const category of responseCategories) {
                        const button = document.createElement("button");
                        button.textContent = category.name;
                        button.setAttribute("data-id", category.id);
                        categories.appendChild(button);
                    }
                }
            });
    }

    getWorks();
});