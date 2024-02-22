const availableProviders = [
  {
    logo_path: "/7YPdUs60C9qQQQfOFCgxpnF07D9.jpg",
    provider_name: "Disney Plus",
    provider_id: 337,
  },
  {
    logo_path: "/pbpMk2JmcoNnQwx5JGpXngfoWtp.jpg",
    provider_name: "Netflix",
    provider_id: 8,
  },
  {
    logo_path: "/dQeAar5H991VYporEjUspolDarG.jpg",
    provider_name: "Amazon Prime Video",
    provider_id: 119,
  },
  {
    logo_path: "/cv5S44vHpNoGj7wby6390AyhEkH.jpg",
    provider_name: "Star Plus",
    provider_id: 619,
  },
  {
    logo_path: "/b8edpTaLCHFrUnhpGQIZJUpFX7T.jpg",
    provider_name: "HBO Max",
    provider_id: 384,
  },
  {
    logo_path: "/h5DcR0J2EESLitnhR8xLG1QymTE.jpg",
    provider_name: "Paramount Plus",
    provider_id: 531,
  },
  {
    logo_path: "/21M5CpiOYGOhHj2sVPXqwt6yeTO.jpg",
    provider_name: "Claro video",
    provider_id: 167,
  },
];

const getProvidersUrl = (id: string) =>
  `${process.env.TMDB_API_URL}/movie/${id}/watch/providers?api_key=${process.env.TMDB_API_KEY}`;

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Lógica para hacer la solicitud a la API y obtener la información de la película
export async function getMovieProviders(movieId: string) {
  try {
    const result = await fetch(getProvidersUrl(movieId));
    const data = await result.json();

    // wait to prevent rate limiting
    await delay(100);

    // return only the ARG providers
    return data?.results?.AR?.flatrate || null;
  } catch (error) {
    // Log the error for awareness
    console.error(`Error fetching movie info ${movieId}:`, error);
    // No re-throwing the error to avoid interrupting the app's execution
    return null; // Returning a default value or a specific value to handle the error
  }
}

export function sanitizedProvidersList(rawProviders: any) {
  // with reduce, we can avoid the map and the filter and the array is only iterated once
  const providers = rawProviders?.reduce((acc: any, provider: any) => {
    const providerData = availableProviders.find(
      (p) => p.provider_id === provider.provider_id
    );
    if (providerData) {
      acc.push(providerData.provider_name);
    }
    return acc;
  }, []);

  const providersString = providers ? providers?.join(", ") : "N/A";

  return providersString;
}
