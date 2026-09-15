import { Reveal } from "./reveal";

const rowA = [
  "English",
  "Hindi",
  "Hinglish",
  "Tamil",
  "Spanish",
  "French",
  "German",
  "Italian",
  "Portuguese",
  "Dutch",
  "Polish",
  "Swedish",
  "Ukrainian",
  "Russian",
];

const rowB = [
  "Czech",
  "Danish",
  "Finnish",
  "Greek",
  "Hungarian",
  "Romanian",
  "Bulgarian",
  "Croatian",
  "Slovak",
  "Slovenian",
  "Estonian",
  "Latvian",
  "Lithuanian",
  "Maltese",
];

const highlighted = new Set(["Hindi", "Hinglish", "Tamil", "English"]);

function ChipRow({ items, reverse }: { items: string[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className={`marquee ${reverse ? "marquee-reverse" : ""} gap-3 py-1.5`}>
      {doubled.map((lang, i) => (
        <span
          key={`${lang}-${i}`}
          className={`whitespace-nowrap rounded-full border px-5 py-2 text-sm font-medium ${
            highlighted.has(lang)
              ? "border-accent/40 bg-accent-soft text-accent"
              : "border-edge bg-surface text-muted"
          }`}
        >
          {lang}
        </span>
      ))}
    </div>
  );
}

export function Languages() {
  return (
    <section id="languages" className="relative overflow-hidden py-28">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <p className="mb-3 font-mono text-sm uppercase tracking-[0.18em] text-accent">
            Supported languages
          </p>
          <h2 className="max-w-2xl font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
            28 languages, each on a model that earned its place.
          </h2>
          <p className="mt-5 max-w-2xl text-lg text-muted">
            No model picker to fiddle with. English runs on a model chosen for
            how it handles accents, Hindi, Hinglish and Tamil on dedicated
            fine-tunes, and 24 European languages on one multilingual model
            that recognises the language for you. All local.
          </p>
        </Reveal>
      </div>

      <Reveal className="mt-12 flex flex-col gap-2" delay={0.15}>
        <ChipRow items={rowA} />
        <ChipRow items={rowB} reverse />
      </Reveal>
    </section>
  );
}
