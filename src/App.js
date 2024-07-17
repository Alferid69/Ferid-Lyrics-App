import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  const [artist, setArtist] = useState("");
  const [song, setSong] = useState("");
  // const [errorMessage, setErrorMessage] = useState("");

  return (
    <div className="container-lg text-center">
      <NavBar
        song={song}
        artist={artist}
        setArtist={setArtist}
        setSong={setSong}
        // errorMessage={errorMessage}
        // setErrorMessage={setErrorMessage}
      />
      {(artist || song) && <Body song={song} artist={artist} />}
    </div>
  );
}

function NavBar({ artist, song, setSong, setArtist }) {
  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <nav className="row mt-4">
      <div className="col-4 text-bg-warning d-flex align-items-center justify-content-center">
        <h3>Ferid Lyrics🎶</h3>
      </div>
      <div className="col p-2">
        <form
          className="form d-flex align-items-center justify-content-center gap-5"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="form-group">
            <input
              className="form-control"
              placeholder="Artist"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              placeholder="Song"
              value={song}
              onChange={(e) => setSong(e.target.value)}
            />
          </div>
        </form>
      </div>
    </nav>
  );
}

function Loader() {
  return (
    <div>
      <h1 className="text-center">Loading...</h1>
    </div>
  );
}

function Body({ song, artist, setErrorMessage }) {
  const [lyrics, setLyrics] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const lyricsLine = [];

  useEffect(
    function () {
      const controller = new AbortController();

      async function fetchLyrics() {
        try {
          if (artist && song) {
            setIsLoading(true);
            // setErrorMessage("");
            const res = await fetch(
              `https://api.vagalume.com.br/search.php?art=${artist}&mus=${song}&apikey=${process.env.REACT_APP_API_KEY}`,
              {
                signal: controller.signal,
              }
            );
            if (!res.ok) throw new Error("failed to fetch lyrics");
            const data = await res.json();
            // console.log(data)
            if (data.type === "notfound") throw new Error("Music Not Found");
            setLyrics(data.mus[0].text);
          }
          // console.log();
        } catch (error) {
          if (error.name !== "AbortError") console.log(error);
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
    <div className="mt-5 pb-5 pt-4 text-bg-dark">
      <h4 className="text-uppercase">
        {artist} | {song}
      </h4>
      {!isLoading ? lyricsLine.map((line) => <Line line={line} />) : <Loader />}
    </div>
  );
}

function Line({ line }) {
  return <div className="pb-3">{line}</div>;
}

// function Error({ message }) {
//   return (
//     <div>
//       <h1 className="text-center">{message}</h1>
//     </div>
//   );
// }
