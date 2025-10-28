import { useContext, useEffect, useRef, useState } from "react";
import { LyricsContext } from "./App";

export function NavBar() {
  const { setSong, setArtist } = useContext(LyricsContext);
  const inputRef = useRef(null);
  const [currentArtist, setCurrentArtist] = useState("");
  const [currentSong, setCurrentSong] = useState("");

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    setArtist(currentArtist);
    setSong(currentSong);
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
              value={currentArtist}
              onChange={(e) => setCurrentArtist(e.target.value)}
              ref={inputRef}
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              placeholder="Song"
              value={currentSong}
              onChange={(e) => setCurrentSong(e.target.value)}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-primary" type="submit">
              Search
            </button>
          </div>
        </form>
      </div>
    </nav>
  );
}
