import { createContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Body } from "./Body";
import { NavBar } from "./NavBar";

export const LyricsContext = createContext();

export default function App() {
  const [artist, setArtist] = useState("");
  const [song, setSong] = useState("");

  return (
    <LyricsContext.Provider
      value={{
        song,
        artist,
        setArtist,
        setSong,
      }}
    >
      <div className="container-lg text-center">
        <NavBar />
        {(artist || song) && <Body />}
      </div>
    </LyricsContext.Provider>
  );
}
