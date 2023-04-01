const apiUrl = "http://localhost:5678/api-docs/";

fetch(`${apiUrl}/works`)
    .then(response => response.json())
    .then((response) => {
        const works = response.docs;
        const worksContainer = document.getElementById("portfolio");

        if (works && worksContainer) {
            let html = "";

            for (const work of works) {
                html += `
                    <p>${work.title}</p>
                    <small>${work.id}</small>
                `;
            }

            worksContainer.innerHTML = html;
        }
    });