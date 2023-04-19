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
                        figure.setAttribute("id", work.id);

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

        // Message d'erreur pour login incorrect
        const errorDiv = document.createElement("div");
        errorDiv.textContent = "Adresse mail ou mot de passe incorrect";
        document.getElementById("loginForm").appendChild(errorDiv);
        errorDiv.style.background = "pink";
        errorDiv.style.color = "red";
        errorDiv.style.padding = "15px 0px";
        errorDiv.style.margin= "25px";
        errorDiv.classList.add("hidden");

        let submit = form.submitButton.addEventListener("click", (e) => {
            e.preventDefault();

            fetch(`${apiUrl}/users/login`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: form.email.value,
                    password: form.password.value,
                })
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

// Quand AUTHENTIFIED et sur la page d'accueil
if (getElement("authToken") !== "undefined" && typeof getElement("authToken") === "string" && document.querySelector("title").innerHTML === "Sophie Bluel - Architecte d'intérieur") {

    // Mode édition de la page index
        // Bandereau mode édition
        const editionDiv = document.createElement("div");
        const editionDivButton = document.createElement("button");
        const editionText = document.createElement("p");
        const editionIconBar = document.createElement("div");
        const editionDivIcon = document.createElement("i");

        editionDivButton.textContent = "publier les changements"
        editionText.textContent = "Mode édition";
        editionDivIcon.setAttribute("class", "fa-regular fa-pen-to-square");
        editionDivIcon.setAttribute("style", "color: #ffffff;");

        editionDiv.appendChild(editionDivIcon);
        editionDiv.appendChild(editionText);
        editionDiv.appendChild(editionDivButton);
        const body = document.querySelector("body")
        body.insertBefore(editionDiv, document.querySelector("header"));

        // Style du bandereau
        editionDiv.style.width = "100vw";
        editionDiv.style.marginLeft = "calc(-1 * ((100vw - 100%) / 2))";
        editionDiv.style.display = "flex"
        editionDiv.style.justifyContent = "center";
        editionDiv.style.alignItems = "center";
        editionDiv.style.padding = "10px 0px";
        editionDiv.style.background = "black";

        editionDivIcon.style.height = "15px";
        editionDivIcon.style.width = "15px";

        editionText.style.color = "white";
        editionText.style.padding = "0px 30px 0px 8px";

        editionDivButton.style.padding = "8px 15px";
        editionDivButton.style.fontFamily = "Work Sans";
        editionDivButton.style.fontWeight = "600";
        editionDivButton.style.borderRadius = "25px";
        editionDivButton.style.border = "none";
        editionDivButton.style.cursor = "pointer";

        // Icônes "modifier"
        const editionDivSmall = document.createElement("div");
        const editionButton = document.createElement("a");
        const editionIcon = document.createElement("i");

        editionButton.setAttribute("onclick", "openModale()");
        editionIcon.setAttribute("onclick", "openModale()");
        editionIcon.setAttribute("class", "fa-regular fa-pen-to-square");
        editionIcon.setAttribute("style", "color: black;");

        editionButton.textContent = "modifier";
        editionDivSmall.appendChild(editionIcon);
        editionDivSmall.appendChild(editionButton);

        // Style des boutons "modifier"
        editionDivSmall.style.color = "black";
        editionDivSmall.style.fontFamily = "Work Sans";
        editionDivSmall.style.fontStyle = "normal";
        editionDivSmall.style.fontSize = "14px";
        editionDivSmall.style.fontWeight = "normal";
        editionDivSmall.style.padding = "15px";

        editionIcon.style.padding = "0px 8px 0px 0px";
        editionIcon.style.cursor = "pointer";

        editionButton.style.cursor = "pointer";

        const title = document.getElementById("projectTitle");
        const photo = document.querySelector("figure");
        const editionDivSmall2 = editionDivSmall.cloneNode(true);
        photo.appendChild(editionDivSmall);
        title.appendChild(editionDivSmall2);

        title.style.display = "flex";
        title.style.justifyContent = "center";
        title.style.alignItems = "center";
        title.style.translate = "5%";

        editionDivSmall.style.translate = "8%";

    // Création de la modale
        const overlay = document.createElement("div");
        overlay.setAttribute("class", "hidden");
        overlay.setAttribute("onclick", "closeModale()");
        const modale = document.createElement("div");
        modale.setAttribute("class", "hidden");
        const modaleIcons = document.createElement("div");
        // Bouton BACK
        const modaleBack = document.createElement("i");
        modaleBack.setAttribute("class", "fa-solid fa-arrow-left");
        modaleBack.setAttribute("onclick", "closeForm()")
        // Bouton EXIT
        const modaleExit = document.createElement("i");
        modaleExit.setAttribute("class", "fa-solid fa-xmark");
        modaleExit.setAttribute("onclick", "closeModale()");
        // Titre
        const modaleTitle = document.createElement("h3");
        modaleTitle.textContent = "Galerie photo";
        // Gallerie
        const modaleGallery = document.createElement("div");
        // Bouton "Ajouter des photos"
        const modaleAdd = document.createElement("button");
        modaleAdd.setAttribute("onclick", "openForm()");
        modaleAdd.textContent = "Ajouter une photo";
        // Bouton "Supprimer la gallerie"
        const modaleDelete = document.createElement("button");
        modaleDelete.textContent = "Supprimer la gallerie"

        // Style de la modale
        overlay.style.position = "fixed";
        overlay.style.top = "0";
        overlay.style.left = "0";
        overlay.style.width = "100vw";
        overlay.style.height = "100vh";
        overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";

        modale.style.flexDirection = "column";
        modale.style.alignItems = "center";
        modale.style.position = "fixed";
        modale.style.top = "50%";
        modale.style.left = "50%";
        modale.style.translate = "-50% -50%";
        modale.style.maxWidth = "630px";
        modale.style.width = "80vw";
        modale.style.backgroundColor = "white";
        modale.style.borderRadius = "15px";
        modale.style.padding = "20px";

        modaleIcons.style.display = "flex";
        modaleIcons.style.justifyContent = "space-between";
        modaleIcons.style.width = "100%";

        modaleBack.style.visibility = "hidden";
        modaleBack.style.cursor = "pointer";

        modaleExit.style.cursor = "pointer";

        modaleTitle.style.textAlign = "center";
        modaleTitle.style.fontSize = "26px";
        modaleTitle.style.padding = "25px 0px 45px 0px"

        modaleGallery.style.display = "flex";
        modaleGallery.style.flexWrap = "wrap";
        modaleGallery.style.width = "70%";
        modaleGallery.style.paddingBottom = "45px";
        modaleGallery.style.borderBottom = "1px solid #B3B3B3";

        modaleAdd.style.fontFamily = "Syne";
        modaleAdd.style.fontWeight = "700";
        modaleAdd.style.color = "white";
        modaleAdd.style.backgroundColor = "#1D6154";
        modaleAdd.style.padding = "10px 50px";
        modaleAdd.style.margin = "40px 0px 25px 0px"
        modaleAdd.style.width = "40%"
        modaleAdd.style.cursor = "pointer";
        modaleAdd.style.borderRadius = "25px";
        modaleAdd.style.border = "none";

        modaleDelete.style.color = "Red";
        modaleDelete.style.fontFamily = "Syne";
        modaleDelete.style.fontWeight = "400";
        modaleDelete.style.border = "none";
        modaleDelete.style.backgroundColor = "white";
        modaleDelete.style.cursor = "pointer";
        modaleDelete.style.marginBottom = "25px";

        // Ajout de la modale dans la page
        modaleIcons.appendChild(modaleBack);
        modaleIcons.appendChild(modaleExit);
        modale.appendChild(modaleIcons);
        modale.appendChild(modaleTitle);
        modale.appendChild(modaleGallery);
        modale.appendChild(modaleAdd);
        modale.appendChild(modaleDelete);

        body.appendChild(overlay);
        body.appendChild(modale);

        // getWorks() pour la modale
        fetch(`${apiUrl}/works`)
            .then(response => response.json())
            .then((response) => {
                const works = response;

                if (works && modaleGallery) {
                    for (const work of works) {
                        const figure = document.createElement("figure");
                        figure.style.position = "relative";
                        figure.style.marginRight = "9px"

                        const image = document.createElement("img");
                        image.setAttribute("class", "modaleImage");
                        image.src = work.imageUrl;
                        image.alt = work.title;
                        image.style.height = "105px";
                        image.style.marginTop = "10px";

                        const deleteIcon = document.createElement("i");
                        deleteIcon.setAttribute("class", "fa-solid fa-trash-can");
                        deleteIcon.setAttribute("style", "color: #ffffff;");
                        deleteIcon.setAttribute("onclick", `deleteWork(${work.id})`);
                        deleteIcon.style.padding = "4px";
                        deleteIcon.style.backgroundColor = "black";
                        deleteIcon.style.borderRadius = "2px";
                        deleteIcon.style.position = "absolute";
                        deleteIcon.style.translate = "-125% 70%";
                        deleteIcon.style.cursor = "pointer";

                        const figCaption = document.createElement("figcaption");
                        figCaption.textContent = "éditer";

                        figure.appendChild(image);
                        figure.appendChild(deleteIcon);
                        figure.appendChild(figCaption);
                        modaleGallery.appendChild(figure);
                    }
                }
            })
            .catch((error) => {
                console.error(error)
            });

    // Ouvrir la modale quand clic sur icône
    function openModale() {
        overlay.style.display = "block";
        modale.style.display = "flex";
    };

    // Fermer la modale quand clic icone ou overlay
    function closeModale() {
        overlay.style.display = "none";
        modale.style.display = "none";
        closeForm();
    };

    // Suppression d'un Work à l'appui d'une icone
    function deleteWork(id) {
        fetch(`${apiUrl}/works/${id}`, {
            method: "DELETE",
            headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                }
            })
            .then((response) => {
                console.log(id);
                console.log(`${apiUrl}/works/${id}`);
            })
            .catch((error) => {
                console.error(error)
            })
    };

    // Création du formulaire de la modale
    const modaleForm = document.createElement("form");
    modaleForm.setAttribute("action", `${apiUrl}/works`);
    modaleForm.setAttribute("method", "post");
    modaleForm.setAttribute("enctype", "multipart/form-data");
    // Div bleue pour le file input
    const modaleFormBlueDiv = document.createElement("div");
    // Icone image
    const modaleFormImageIcon = document.createElement("i");
    modaleFormImageIcon.setAttribute("class", "fa-regular fa-image");
    modaleFormImageIcon.setAttribute("style", "color: #b9c5cc;");
    // Input file photo
    const modaleFormImage = document.createElement("input");
    modaleFormImage.setAttribute("type", "file");
    modaleFormImage.setAttribute("name", "photo");
    modaleFormImage.setAttribute("id", "photo");
    modaleFormImage.setAttribute("accept", "image/png, image/jpeg");
    modaleFormImage.setAttribute("required", "");
    // Label titre
    const modaleFormTitleLabel = document.createElement("label");
    modaleFormTitleLabel.setAttribute("for", "titre");
    modaleFormTitleLabel.textContent = "Titre";
    // Input titre
    const modaleFormTitle = document.createElement("input");
    modaleFormTitle.setAttribute("type", "text");
    modaleFormTitle.setAttribute("name", "titre");
    modaleFormTitle.setAttribute("id", "titre");
    modaleFormTitle.setAttribute("required", "");
    // Label categories
    const modaleFormCategoriesLabel = document.createElement("label");
    modaleFormCategoriesLabel.setAttribute("for", "categories");
    modaleFormCategoriesLabel.textContent = "Catégorie";
    // Select input categories
    const modaleFormCategories = document.createElement("select");
    modaleFormCategories.setAttribute("id", "categories");
    modaleFormCategories.setAttribute("name", "categories");
    modaleFormCategories.setAttribute("required", "");
    // Div vide pour la border
    const modaleFormBorder = document.createElement("div");
    // Option vide comme placeholder
    const modaleOptionEmpty =  document.createElement("option");
    modaleOptionEmpty.setAttribute("value", "");
    modaleOptionEmpty.setAttribute("disabled", "");
    modaleOptionEmpty.setAttribute("selected", "");
    modaleFormCategories.appendChild(modaleOptionEmpty);
    // Option categories via fetch categories
    fetch(`${apiUrl}/categories`)
        .then(response => response.json())
        .then((response) => {
            const categories = response;

            if (categories) {
                // Création des options à partir des catégories de l'API
                for (const category of categories) {
                    const modaleOption =  document.createElement("option");
                    modaleOption.setAttribute("value", category.id);
                    modaleOption.textContent = category.name;
                    modaleFormCategories.appendChild(modaleOption);
                }
            }
        })
        .catch((error) => {
            console.error(error)
        });
    // Création du bouton Valider
    const modaleFormValidate = document.createElement("input");
    modaleFormValidate.setAttribute("type", "submit");
    modaleFormValidate.setAttribute("id", "validate");
    modaleFormValidate.setAttribute("value", "Valider");
    modaleFormValidate.setAttribute("disabled", "");

    // Append du Formulaire
    modaleFormBlueDiv.appendChild(modaleFormImageIcon);
    modaleFormBlueDiv.appendChild(modaleFormImage);
    modaleForm.appendChild(modaleFormBlueDiv);
    modaleForm.appendChild(modaleFormTitleLabel);
    modaleForm.appendChild(modaleFormTitle);
    modaleForm.appendChild(modaleFormCategoriesLabel);
    modaleForm.appendChild(modaleFormCategories);
    modaleForm.appendChild(modaleFormBorder);
    modaleForm.appendChild(modaleFormValidate);
    modale.appendChild(modaleForm);

    // Style du Formulaire
    modaleForm.style.display = "none";
    modaleForm.style.flexDirection = "column";

    modaleFormBlueDiv.style.display = "flex";
    modaleFormBlueDiv.style.flexDirection = "column";
    modaleFormBlueDiv.style.alignItems = "center";
    modaleFormBlueDiv.style.padding = "30px 120px 25px 120px";
    modaleFormBlueDiv.style.marginBottom = "30px";
    modaleFormBlueDiv.style.backgroundColor = "#E8F1F7";

    modaleFormImageIcon.style.fontSize = "5em";
    modaleFormImageIcon.style.paddingBottom = "20px";

    modaleFormTitle.style.height = "40px";
    modaleFormTitle.style.margin = "10px 0px 20px 0px";
    modaleFormTitle.style.paddingLeft = "15px";
    modaleFormTitle.style.border = "none";
    modaleFormTitle.style.boxShadow = "rgba(0, 0, 0, 0.1) 0px 4px 12px";

    modaleFormCategories.style.height = "45px";
    modaleFormCategories.style.margin = "10px 0px 50px 0px";
    modaleFormCategories.style.paddingLeft = "15px";
    modaleFormCategories.style.border = "none";
    modaleFormCategories.style.boxShadow = "rgba(0, 0, 0, 0.1) 0px 4px 12px";
    modaleFormCategories.style.cursor = "pointer";

    modaleFormBorder.style.borderTop = "1px solid #B3B3B3"

    modaleFormValidate.style.fontFamily = "Syne";
    modaleFormValidate.style.fontWeight = "700";
    modaleFormValidate.style.color = "white";
    modaleFormValidate.style.backgroundColor = "#A7A7A7";
    modaleFormValidate.style.padding = "10px 50px";
    modaleFormValidate.style.marginTop ="30px";
    modaleFormValidate.style.cursor = "pointer";
    modaleFormValidate.style.borderRadius = "25px";
    modaleFormValidate.style.border = "none";

    // Check if (form rempli) then (boutton validate disabled=false)


    // openForm()
    function openForm() {
        modaleTitle.textContent = "Ajout photo";
        modaleBack.style.visibility = "visible";
        modaleGallery.style.display = "none";
        modaleAdd.style.display = "none";
        modaleDelete.style.display = "none";
        modaleForm.style.display = "flex";

    }
    // closeForm()
    function closeForm() {
        modaleTitle.textContent = "Gallerie photo";
        modaleBack.style.visibility = "hidden";
        modaleGallery.style.display = "flex";
        modaleAdd.style.display = "block";
        modaleDelete.style.display = "block";
        modaleForm.style.display = "none";
    }
};
