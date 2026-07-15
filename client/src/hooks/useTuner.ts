import { useRef, useState, useCallback } from "react";
import { PitchDetector } from "pitchy";

export const GUITAR_STRINGS = {
  E2: 82.41,
  A2: 110.0,
  D3: 146.83,
  G3: 196.0,
  B3: 246.94,
  E4: 329.63,
} as const;

export const STRING_ORDER: (keyof typeof GUITAR_STRINGS)[] = [
  "E2",
  "A2",
  "D3",
  "G3",
  "B3",
  "E4",
];

type StringName = keyof typeof GUITAR_STRINGS;

const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

const REQUIRED_TUNE_TIME = 600;
const MIN_CLARITY = 0.82;
const MIN_RMS = 0.000001;
const MIN_GUITAR_FREQUENCY = 65;
const MAX_GUITAR_FREQUENCY = 380;
const IN_TUNE_CENTS = 20; //
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

  const tunedTimeRef = useRef(0);
  const centsHistoryRef = useRef<number[]>([]);
  const currentAngleRef = useRef(0);
  const lastFrameTimeRef = useRef(performance.now());
  const lastTunedSignalRef = useRef(-Infinity);
  const canTuneRef = useRef(true);
  const successTriggeredRef = useRef(false);
  const lastLitRef = useRef(0);

  const selectString = useCallback((note: StringName) => {
    const index = STRING_ORDER.indexOf(note);
    stringIndexRef.current = index;
    setStringIndex(index);
    tunedTimeRef.current = 0;
    centsHistoryRef.current = [];
    lastTunedSignalRef.current = -Infinity;
    lastLitRef.current = 0;
    setLitSegments(0);
  }, []);

  const stop = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    streamRef.current?.getTracks().forEach((t) => t.stop());
    audioCtxRef.current?.close();
    setIsListening(false);
  }, []);

  const start = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false,
        },
      });
      streamRef.current = stream;

      const ctx = new AudioContext();
      audioCtxRef.current = ctx;
      if (ctx.state === "suspended") await ctx.resume();

      const analyser = ctx.createAnalyser();
      analyser.fftSize = 4096;
      analyser.smoothingTimeConstant = 0;
      ctx.createMediaStreamSource(stream).connect(analyser);

      const buffer = new Float32Array(analyser.fftSize);
      const detector = PitchDetector.forFloat32Array(analyser.fftSize);

      setIsListening(true);

      const loop = () => {
        const now = performance.now();
        const deltaTime = now - lastFrameTimeRef.current;
        lastFrameTimeRef.current = now;

        analyser.getFloatTimeDomainData(buffer);
        const rms = getRms(buffer);

        const [pitch, clarity] = detector.findPitch(buffer, ctx.sampleRate);

        if (!canTuneRef.current) {
          rafRef.current = requestAnimationFrame(loop);
          return;
        }

        const hasUsableSignal =
          rms >= MIN_RMS && 
          clarity >= MIN_CLARITY && 
          pitch >= MIN_GUITAR_FREQUENCY && 
          pitch <= MAX_GUITAR_FREQUENCY;
        if (hasUsableSignal) {
          let activeIndex = stringIndexRef.current;

          if (modeRef.current === "auto") {
            const closest = getClosestGuitarString(pitch);
            activeIndex = STRING_ORDER.indexOf(closest);
            if (activeIndex !== stringIndexRef.current) {
              stringIndexRef.current = activeIndex;
              setStringIndex(activeIndex);
            }
          }

          const targetFreq = GUITAR_STRINGS[STRING_ORDER[activeIndex]];

          const octaveMultipliers = [0.5, 1, 2];
          const closestOctaveFreq = octaveMultipliers
            .map((m) => targetFreq * m)
            .reduce((closest, freq) =>
              Math.abs(getCents(pitch, freq)) <
              Math.abs(getCents(pitch, closest))
                ? freq
                : closest,
            );

          const cents = getCents(pitch, closestOctaveFreq);

          const history = centsHistoryRef.current;
          history.push(cents);
          if (history.length > 5) history.shift();
          const averageCents =
            history.reduce((a, b) => a + b, 0) / history.length;

          const angle = Math.max(-45, Math.min(45, averageCents));
          const smoothing = 1 - Math.pow(0.85, deltaTime / 16.67); // interpolação suave
          currentAngleRef.current +=
            (angle - currentAngleRef.current) * smoothing;

          if (needleRef.current) {
            needleRef.current.style.transform = `translateX(-50%) rotate(${currentAngleRef.current}deg)`;
          }

          const tuned =
            Math.abs(cents) <= 50 && Math.abs(averageCents) <= IN_TUNE_CENTS;
          if (tuned) {
            tunedTimeRef.current += deltaTime;
            lastTunedSignalRef.current = now;
          } else {
            tunedTimeRef.current = Math.max(
              0,
              tunedTimeRef.current - deltaTime * 0.35,
            );
          }
        } else if (now - lastTunedSignalRef.current > SIGNAL_GRACE_TIME) {
          tunedTimeRef.current = 0;
        }

        tunedTimeRef.current = Math.max(
          0,
          Math.min(tunedTimeRef.current, REQUIRED_TUNE_TIME),
        );

        const progressPercent =
          (tunedTimeRef.current / REQUIRED_TUNE_TIME) * 100;
        const lit = Math.floor(progressPercent / 20);

        if (lit !== lastLitRef.current) {
          lastLitRef.current = lit;
          setLitSegments(lit);
        }

        if (progressPercent >= 100 && !successTriggeredRef.current) {
          successTriggeredRef.current = true;
          canTuneRef.current = false;
          setIsTuned(true);

          if (modeRef.current === "manual") {
            const next = (stringIndexRef.current + 1) % STRING_ORDER.length;
            stringIndexRef.current = next;
            setStringIndex(next);
          }

          setTimeout(() => {
            tunedTimeRef.current = 0;
            centsHistoryRef.current = [];
            lastTunedSignalRef.current = -Infinity;
            lastLitRef.current = 0;
            setLitSegments(0);
            setIsTuned(false);
            successTriggeredRef.current = false;
            canTuneRef.current = true;
          }, 2000);
        }

        rafRef.current = requestAnimationFrame(loop);
      };

      loop();
    } catch (error) {
      console.error("Erro ao acessar microfone:", error);
      setIsListening(false);
    }
  }, []);

  const targetNote = STRING_ORDER[stringIndex];
  const noteName = targetNote.slice(0, -1);
  const noteIdx = NOTES.indexOf(noteName);
  const leftNote = NOTES[noteIdx - 1] ?? NOTES[NOTES.length - 1];
  const rightNote = NOTES[(noteIdx + 1) % NOTES.length];

  return {
    mode,
    setMode,
    isListening,
    start,
    stop,
    litSegments,
    isTuned,
    needleRef,
    targetNote,
    centerNote: noteName,
    leftNote,
    rightNote,
    selectString,
  };
};
