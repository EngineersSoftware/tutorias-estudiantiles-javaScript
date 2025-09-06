// Ejemplo 1: API (Google Maps API) - Obtener direcciones
async function getGoogleMapsDirections() {
  const apiKey = 'TU_CLAVE_API'; // Reemplaza con tu clave de Google Maps
  const origin = 'New York, NY';
  const destination = 'Chicago, IL';
  const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log('Ruta de Google Maps:', data.routes[0].summary);
    return data;
  } catch (error) {
    console.error('Error al consultar Google Maps API:', error);
  }
}

// Ejemplo 2: API REST (Twitter/X API) - Obtener tweets de un usuario
async function getTwitterTweets(userId) {
  const bearerToken = 'TU_BEARER_TOKEN'; // Reemplaza con tu token de Twitter/X API
  const url = `https://api.x.com/2/users/${userId}/tweets`;

  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${bearerToken}`
      }
    });
    const data = await response.json();
    console.log('Tweets recientes:', data.data.map(tweet => tweet.text));
    return data;
  } catch (error) {
    console.error('Error al consultar Twitter/X API:', error);
  }
}

// Ejemplo 3: API RESTful (GitHub API) - Obtener información de un repositorio
async function getGitHubRepo(owner, repo) {
  const url = `https://api.github.com/repos/${owner}/${repo}`;

  try {
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/vnd.github.v3+json' // Especifica versión RESTful de GitHub
      }
    });
    const data = await response.json();
    console.log('Repositorio:', data.name);
    console.log('Enlaces relacionados (HATEOAS):', {
      issues: data.issues_url,
      commits: data.commits_url
    });
    return data;
  } catch (error) {
    console.error('Error al consultar GitHub API:', error);
  }
}

// Ejecutar ejemplos (descomenta para probar, asegurándote de tener las claves/tokens)
// getGoogleMapsDirections();
// getTwitterTweets('12345'); // Reemplaza '12345' con un ID de usuario válido
// getGitHubRepo('octocat', 'hello-world');