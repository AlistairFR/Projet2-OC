const apiUrl = "http://localhost:5678/api";

document.addEventListener("DOMContentLoaded", () => {
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
            })
            .catch((error) => {
                console.error(error)
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
            })
            .catch((error) => {
                console.error(error)
            });

        // Modifications CSS des filtres
        document.getElementById("categories").setAttribute("class", "filterBar");
    }

    // Appel du chargements des Projets et des Filtres
    getWorks();
});

// Tri des travaux à l'aide des filtres
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

// Système de login

// Formulaire de login
const form = {
    email: document.getElementById("email"),
    password: document.getElementById("password"),
    submitButton: document.getElementById("submit")
};

// Message d'erreur pour login incorrect
const errorDiv = document.createElement("div");
errorDiv.textContent = "Adresse mail ou mot de passe incorrect";
document.getElementById("loginForm").appendChild(errorDiv);
errorDiv.style.background = "pink";
errorDiv.style.color = "red";
errorDiv.style.padding = "15px 0px";
errorDiv.style.margin= "25px";
errorDiv.classList.add("hidden");

// Fonctions pour gérer le token dans le local Storage
const saveElement = (key, value) => {
    localStorage.setItem(key, value)
};

const getElement = (key) => {
    return localStorage.getItem(key)
};

const removeElement = (key) => {
    localStorage.removeItem(key)
};

// Quand on clique sur le bouton "Se connecter"
if (form.submitButton){
    let submit = form.submitButton.addEventListener("click", (e) => {
        e.preventDefault();

        fetch(`${apiUrl}/users/login`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                // A mettre dans les posts avec auth : "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
                email: form.email.value,
                password: form.password.value,
            }),
            })
            .then((response) => response.json())
            .then((response) => {
                saveElement("authToken", response.token)
                if (getElement("authToken") !== "undefined"){
                    window.location.href = "index.html"
                }
                    else {
                        errorDiv.removeAttribute("class");
                    }
            })
            .catch( (error) => {
                console.error(error)
            })
    });
}
