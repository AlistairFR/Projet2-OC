document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = "http://localhost:5678/api";

    fetch(`${apiUrl}/works`)
        .then(response => response.json())
        .then((response) => {
            const works = response;
            const worksContainer = document.getElementById("gallery");

            if (works && worksContainer) {
                let html = "";

                for (const work of works) {
                    html += `
                    <figure>
                        <img src="${work.imageUrl}" alt="${work.id}">
                        <figcaption>${work.title}</figcaption>
                    </figure>
                    `;
                }

                worksContainer.innerHTML = html;
            }
        });
});