import type { CSSProperties } from "react"

type GuitarString = "E2" | "A2" | "D3" | "G3" | "B3" | "E4"

type NoteProps = {
    label: string
    string: GuitarString
    style: CSSProperties
    active: boolean
    onClick: (string: GuitarString) => void
    disabled?: boolean
}

export const Note = ({
    label,
    string,
    style,
    active,
    onClick,
    disabled = false,
}: NoteProps) => {
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
    )
}
