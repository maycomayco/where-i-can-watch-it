import movies from "@/data/movies.json";
import { getMovieProviders, sanitizedProvidersList } from "@/lib/TMDB/utils";

async function Providers({ movieId }: { movieId: string }) {
  const results = await getMovieProviders(movieId);
  const providers = sanitizedProvidersList(results);

  return (
    <span className="text-sm italic">{providers}</span>
  )
}

export default async function Home() {
  return (
    <main className="max-w-prose mx-auto">
      <h1 className="mb-8 text-xl font-bold">IMDB Watchlist with streaming providers!!!</h1>
      <section>
        <ul>
          {movies.map((movie, idx) => (
            <li key={idx} className="text-lg">{idx + 1} - {movie.title} - <Providers movieId={movie.id} /></li>
          ))}
        </ul>
      </section>
    </main>
  );
}