import { useContext, useState, useEffect } from "react";
import { LyricsContext } from "./App";
import { Loader } from "./Loader";
import { Line } from "./Line";
import Footer from "./Footer";

export function Body() {
  const { song, artist } = useContext(LyricsContext);
  const [lyrics, setLyrics] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
      const controller = new AbortController();

      async function fetchLyrics() {
        if (!artist || !song) return;

        try {
          setIsLoading(true);
          setError("");
          setLyrics("");
          const res = await fetch(
            `https://api.lyrics.ovh/v1/${artist}/${song}`,
            { signal: controller.signal }
          );

          const data = await res.json();

          if (data.error) {
            throw new Error(data.error);
          }

          setLyrics(data.lyrics);
        } catch (err) {
          if (err.name !== "AbortError") {
            console.error(err.message);
            setError("Lyrics not found for this song.");
          }
        } finally {
          setIsLoading(false);
        }
      }
      fetchLyrics();

      return function () {
        controller.abort();
      };
    },
    [artist, song]
  );

  const lyricsLines = lyrics ? lyrics.split("\n") : [];

  return (
    <div className="mt-5 pt-4 text-bg-dark">
      <h4 className="text-uppercase">
        {artist} | {song}
      </h4>
      {isLoading && <Loader />}
      {!isLoading && error && <div>{error}</div>}
      {!isLoading &&
        !error &&
        lyrics &&
        lyricsLines.map((line, i) => <Line line={line} key={i} />)}
      <Footer />
    </div>
  );
}
