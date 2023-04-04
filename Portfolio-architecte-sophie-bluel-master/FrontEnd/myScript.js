document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = "http://localhost:5678/api/";

    fetch(`${apiUrl}/works`)
        .then(response => response.json())
        .then((response) => {
            const works = response.docs;
            const worksContainer = document.getElementsByClassName("gallery");

            if (works && worksContainer) {
                let html = "";

                for (const work of works) {
                    html += `
                    <figure>
                        <img src="${work.imageUrl}" alt="Abajour Tahina">
                        <figcaption>${work.title}</figcaption>
                    </figure>
                    `;
                }

                worksContainer.innerHTML = html;
            }
        });
});