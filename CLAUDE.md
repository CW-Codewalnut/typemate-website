@AGENTS.md

# TypeMate website

The marketing site for TypeMate at typemate.codewalnut.com. The app lives in
the private `CW-Codewalnut/typemate` repo (checkout at `~/Projects/typemate`);
this site only describes it and links to the public downloads mirror.

## Copy stays in sync with the store listings and the app

Every claim on this site must be true of the shipped app and must match the
store listings. The canonical store copy is `docs/STORE-DESC.md` in the app
repo (app name, short and full descriptions); the app's `CLAUDE.md` there
records what the app really does. Keep these aligned:

- The page title (`app/layout.tsx`) is the store app name,
  `TypeMate: Private Dictation`.
- Languages: 28 in total. English on its own model, Hindi, Hinglish and
  Tamil on dedicated fine-tunes, 24 European languages on one multilingual
  model. Never "one model per language" or any other count.
- How dictation starts: hold the shortcut on Windows, macOS and Linux; tap
  the floating mic on Android; the TypeMate keyboard's mic key on iPhone
  and iPad. Never "hold a key" as the universal claim.
- Platforms and download names come from the downloads mirror
  (`lib/releases.ts`); do not hardcode a version or file name.
- Privacy: everything transcribes on the device, no cloud, no account.

When a fact changes in the app, update `docs/STORE-DESC.md` and this site in
the same piece of work, and say so in the PR. Ranjan caught "one model, 28
languages" and "hold a key" here on 2026-09-16; do not let that recur.

## House rules

- No em dashes anywhere, in copy or code comments.
- Plain words a non-technical reader follows; no jargon in visible text.
- Conventional commits (`feat:`, `fix:`, `docs:`, `chore:`), no Claude
  attribution in commits or PR bodies.
- Check the page at phone width (about 390 px) and desktop before calling
  a change done; the hero demo has separate phone and desktop layouts.
