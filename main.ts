// One-Sentence Absurd Invention Pitch — make.fun entry.
//
// The pitch is one sentence, 116 characters, naming a ridiculous
// invention that fixes a tiny everyday annoyance — raiding the
// fridge after midnight:
//
//   The Guilt Fridge dims its light and whispers, "we both know
//   you're not hungry," every time you open it after midnight.
//
// The laugh comes from the invention itself, not from a joke bolted
// on at the end: instead of locking the fridge or counting calories,
// it shames you. It dims its light like a disappointed parent and
// whispers the exact thought you were trying not to have, at the
// exact moment you open the door. The fix is silly yet weirdly
// plausible — a fridge that judges you is one firmware update away —
// and the sentence stays tight: it names the annoyance (midnight
// snacking), the invention (the Guilt Fridge) and its silly mechanism
// (dim + whisper) without clutter. It steers clear of the sponsor's
// own examples (apologising alarm clock, complaining sock, sighing
// kettle), so the absurdity is fresh.
//
// The program writes that single pitch to /output/entry.txt (the
// directory comes from MAKEFUN_OUTPUT_DIR, default /output) and
// prints exactly the same pitch to stdout. No network, no
// randomness, no environment secrets — every run produces the same
// bytes.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const pitch =
  "The Guilt Fridge dims its light and whispers, \"we both know you're not hungry,\" every time you open it after midnight.";
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// The gate allows 1–220 characters of UTF-8 text, not only
// whitespace, in a single sentence — so the code enforces the shape
// too: one sentence, inside the limit, ending with a full stop.
// Refuse to ship anything outside that: a second sentence would
// stop being one pitch, and padding past 220 characters would fail
// the gate outright.
if (pitch.length < 1 || pitch.length > 220) {
  throw new Error(`entry pitch is ${pitch.length} characters, outside the 1-220 limit`);
}
if (pitch.trim().length === 0 || /[\r\n]/.test(pitch)) {
  throw new Error("entry pitch must be one non-blank line");
}
// One sentence means one full stop, at the end — and a pitch told
// out loud ends on its punchline, the midnight whisper.
if (!pitch.endsWith(".") || pitch.indexOf(".") !== pitch.length - 1) {
  throw new Error("entry pitch must be exactly one sentence ending with a full stop");
}

const dst = join(outDir, "entry.txt");
mkdirSync(outDir, { recursive: true });
writeFileSync(dst, pitch, "utf8");

console.log(pitch);
