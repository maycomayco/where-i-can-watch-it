import movies from "@/data/movies.json";
import { getMovieProviders, sanitizedProvidersList } from "@/lib/TMDB/utils";

async function Providers({ movieId }: { movieId: string }) {
  const results = await getMovieProviders(movieId);
  const providers = sanitizedProvidersList(results);

  return (
    <span className="text-sm italic">{providers}</span>
  )
}

// TODO: remove <li> and change by <p> and apply some styles
export default async function Home() {
  return (
    <main className="max-w-prose mx-auto">
      <header>
        <h1 className="mb-6 text-3xl font-bold text-center">Where can I watch it?</h1>
      </header>
      <section>
        <ul>
          {movies.map((movie, idx) => (
            <li key={idx} className="text-lg leading-relaxed">{idx + 1} - {movie.title} - <Providers movieId={movie.id} /></li>
          ))}
        </ul>
      </section>
    </main>
  );
}