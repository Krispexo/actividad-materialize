document.addEventListener("DOMContentLoaded", function () {
    const latestPostContent = document.getElementById("latest-post-content");
    const latestPostLink = document.getElementById("latest-post-link");
    const articlesContainer = document.getElementById("articles");

    // Tu API Key de Pexels
    const PEXELS_API_KEY =
        "h1zM5ZyelBFsGaZVdxt5arPhI4Yj9czHd2zHc22wMqMCIYzroju73XPK";
    const PEXELS_API_URL =
        "https://api.pexels.com/v1/search?query=blog&per_page=6";

    // Headers para la API de Pexels
    const pexelsHeaders = {
        headers: {
            Authorization: PEXELS_API_KEY,
        },
    };

    // Fetch para obtener imágenes de Pexels
    fetch(PEXELS_API_URL, pexelsHeaders)
        .then((response) => response.json())
        .then((imagesData) => {
            const images = imagesData.photos;

            // Fetch para obtener los posts de JSONPlaceholder
            fetch("https://jsonplaceholder.typicode.com/posts?_limit=7")
                .then((response) => response.json())
                .then((posts) => {
                    // Último artículo
                    const latestPost = posts[0];
                    latestPostContent.textContent = latestPost.body;
                    latestPostLink.href = `https://jsonplaceholder.typicode.com/posts/${latestPost.id}`;

                    // Genera el HTML para los otros tres artículos con imágenes de Pexels
                    let articlesHTML = "";
                    for (let i = 1; i < posts.length; i++) {
                        const post = posts[i];
                        const imageUrl = images[i - 1]
                            ? images[i - 1].src.medium
                            : "https://via.placeholder.com/300x200";

                        articlesHTML += `
                            <div class="col s12 m4">
                                <div class="card">
                                    <div class="card-image">
                                        <img src="${imageUrl}" alt="${post.title}" class="responsive-img">
                                    </div>
                                    <div class="card-content">
                                        <span class="card-title black-text">${post.title}</span>
                                        <p>${post.body.substring(0, 255)}...</p>
                                            <a class="waves-effect waves-light btn" href="html/post.html?id=${post.id}&image=${imageUrl}">Leer más</a>
                                    </div>
                                </div>
                            </div>
                        `;
                    }
                    articlesContainer.innerHTML = articlesHTML;
                })
                .catch((error) => console.error("Error fetching posts:", error));
        })
        .catch((error) =>
            console.error("Error fetching images from Pexels:", error)
        );
});
