// Obtener el ID del post de la URL
const params = new URLSearchParams(window.location.search);
const postId = params.get('id');
const imageUrl = params.get('image'); // Obtener la imagen desde la URL

// URL de la API de JSONPlaceholder
const apiUrl = `https://jsonplaceholder.typicode.com/posts/${postId}`;

// Función para obtener el post y llenar el HTML

async function fetchPost() {
    try {
        const response = await fetch(apiUrl);
        const post = await response.json();

        // Rellenar el contenido del post
        document.getElementById('post-title').innerText = post.title;
        document.getElementById('post-body').innerText = post.body;

        // Asignar la imagen al elemento de imagen en el post
        document.getElementById('post-image').src = imageUrl || 'https://via.placeholder.com/600x300'; // Placeholder si no hay imagen
    } catch (error) {
        console.error('Error fetching post:', error);
    }
}


// Llamada a la función para obtener y mostrar el post
fetchPost();