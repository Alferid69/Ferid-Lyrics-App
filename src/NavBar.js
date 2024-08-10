import { useContext, useEffect, useRef } from "react";
import { LyricsContext } from "./App";

export function NavBar() {
  const { artist, song, setSong, setArtist } = useContext(LyricsContext);
  const inputRef = useRef(null);

  useEffect(()=>{
    inputRef.current.focus();
  },[])

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
              ref={inputRef}
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
