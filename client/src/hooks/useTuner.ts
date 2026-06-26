import { useRef, useState, useCallback } from "react";
import { PitchDetector } from "pitchy";

export const GUITAR_STRING = {
  E2: 82.41,
  A2: 110.0,
  D3: 146.83,
  G3: 196.0,
  B3: 246.94,
  E4: 329.63,
} as const;

export const STRING_ORDER: (keyof typeof GUITAR_STRING)[] = [
  "E2",
  "A2",
  "D3",
  "G3",
  "B3",
  "E4",
];

type StringName = keyof typeof GUITAR_STRING;

const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

const REQUIRED_TUNE_TIME = 600;
const MIN_CLARITY = 0.82;
const MIN_RMS = 0.000001;
const MIN_GUITAR_FREQUENCY = 65;
const MAX_GUITAR_FREQUENCY = 380;
const IN_TUNE_CENTS = 20;
const SIGNAL_GRACE_TIME = 180;

const getCents = (frequency: number, perfectFrequency: number) => {
  return 1200 * Math.log2(frequency / perfectFrequency);
};

const getRms = (buffer: Float32Array) => {
  let sum = 0;
  for (const sample of buffer) sum += sample * sample;
  return Math.sqrt(sum / buffer.length);
};

const getClosestGuitarString = (frequency: number): StringName => {
  return STRING_ORDER.reduce((closest, name) => {
    const d1 = Math.abs(getCents(frequency, GUITAR_STRINGS[name]));
    const d2 = Math.abs(getCents(frequency, GUITAR_STRINGS[closest]));
    return d1 < d2 ? name : closest;
  }, STRING_ORDER[0]);
};

export const useTuner = () => {
  const [mode, setMode] = useState<"auto" | "manual">("auto");
  const [stringIndex, setStringIndex] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [litSegments, setLitSegments] = useState(0);
  const [isTuned, setIsTuned] = useState(false);

  const needleRef = useRef<HTMLDivElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const rafRef = useRef<number | null>(null);

  const modeRef = useRef(mode);
  const stringIndexRef = useRef(stringIndex);
  modeRef.current = mode;
  stringIndexRef.current = stringIndex;

  const modeRef = useRef(mode);
  const stringIndexRef = useRef(stringIndex);
  modeRef.current = mode;
  stringIndexRef.current = stringIndex;

  const tunedTimeRef = useRef(0);
  const centsHistoryRef = useRef<number[]>([]);
  const currentAngleRef = useRef(0);
  const lastFrameTimeRef = useRef(performance.now());
  const lastTunedSignalRef = useRef(-Infinity);
  const canTuneRef = useRef(true);
  const successTriggeredRef = useRef(false);
  const lastLitRef = useRef(0);

  const selectString = useCallback((note: StringName) => {
      const index = STRING_ORDER.indexOf(note)
      stringIndexRef.current = index
      setStringIndex(index)
      tunedTimeRef.current = 0
      centsHistoryRef.current = []
      lastTunedSignalRef.current. - Infinity
      lastLitRef.current = 0
      setLitSegments(0)
  },[])

  const stop = useCallback(()  => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    streamRef.current?getTracks().forEach((t) => t.stop() )
    audioCtxRef.current?.close()
    setIsListening(false)
   }, []);


