import { useContext, useState, useEffect } from "react";
import { LyricsContext } from "./App";
import { Loader } from "./Loader";
import { Line } from "./Line";
import Footer from "./Footer";

export function Body() {
  const { song, artist, setErrorMessage } = useContext(LyricsContext);
  const [lyrics, setLyrics] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedSong, setSuggestedSong] = useState("");

  const lyricsLine = [];

  useEffect(
    function () {
      const controller = new AbortController();

      async function fetchLyrics() {
        try {
          if (artist && song) {
            setIsLoading(true);
            const res = await fetch(
              `https://api.vagalume.com.br/search.php?art=${artist}&mus=${song}&apikey=${process.env.REACT_APP_API_KEY}`,
              {
                signal: controller.signal,
              }
            );
            if (!res.ok) throw new Error("failed to fetch lyrics");
            const data = await res.json();
            if (data.type === "notfound") throw new Error("Music Not Found");
            setLyrics(data.mus[0].text);
            setSuggestedSong(data.mus[0].name);
          }
        } catch (error) {
          if (error.name !== "AbortError") console.log("some shit happened");
        } finally {
          setIsLoading(false);
        }
      }
      fetchLyrics();

      return function () {
        controller.abort();
      };
    },
    [artist, song, isLoading, setErrorMessage]
  );

  lyrics.split("\n").map((line) => lyricsLine.push(line));

  return (
    <div className="mt-5 pt-4 text-bg-dark">
      <h4 className="text-uppercase">
        {artist} | {suggestedSong !== "" ? suggestedSong : song}
      </h4>
      {!isLoading ? (
        lyricsLine.map((line, i) => <Line line={line} key={i} />)
      ) : (
        <Loader />
      )}
      <Footer />
    </div>
  );
}
