import type { CSSProperties } from "react";
import { useRef, useCallback, useEffect } from "react"
import tunedNoteSound from "../../assets/sounds/tunedNoteSound.mp3"

type GuitarString = "E2" | "A2" | "D3" | "G3" | "B3" | "E4";

type NoteProps = {
  label: string;
  string: GuitarString;
  isTuned: boolean;
  style: CSSProperties;
  active: boolean;
  onClick: (string: GuitarString) => void;
  disabled?: boolean;
};

export const Note = ({
  label,
  string,
  style,
  isTuned = false,
  active,
  onClick,
  disabled = false,
}: NoteProps) => {

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playSuccessSound = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(tunedNoteSound);
      audioRef.current.preload = "auto";
    }
    
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(err => 
      console.error("Erro ao tocar áudio:", err)
    );
  }, []);

  useEffect(() => {
      if (isTuned) {
          playSuccessSound()
      }
  }, [isTuned])
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onClick(string)}
      style={style}
      className={`
        absolute -translate-x-1/2 -translate-y-1/2
        w-8 h-8 rounded-full border
        flex items-center justify-center
        text-xs transition-all
        ${
          active
            ? "bg-green-500 border-green-300 text-white scale-110"
            : "bg-black/60 border-white text-white hover:bg-white/20"
        }
        ${disabled ? "cursor-default opacity-60" : "cursor-pointer"}
      `}
    >
      {label}
    </button>
  );
};
