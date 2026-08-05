import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy - TypeMate",
  description:
    "How TypeMate handles your data: dictation is processed entirely on your device, and your voice never leaves your machine.",
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="5 August 2026">
      <p>
        TypeMate is built by{" "}
        <a href="https://www.codewalnut.com" target="_blank" rel="noreferrer">
          CodeWalnut
        </a>
        . This policy covers the TypeMate apps for Windows, macOS, Linux, and
        Android, and the website typemate.codewalnut.com. The short version:
        TypeMate is designed to be local-first. Your voice is processed on
        your own device, and we run no servers that receive your audio,
        transcripts, or typing.
      </p>

      <h2>No account, no sign-up</h2>
      <p>
        TypeMate does not have user accounts. We do not ask for your name,
        email address, or any other personal details to use the app.
      </p>

      <h2>Microphone and speech</h2>
      <ul>
        <li>
          The microphone is captured only while you actively dictate: while
          you hold the shortcut, or on Android while dictation is active
          after you tap the floating mic.
        </li>
        <li>
          Speech is transcribed <strong>entirely on your device</strong> by
          speech models running inside the app. Audio is never uploaded
          anywhere.
        </li>
        <li>
          Transcripts are typed into the field you are working in and kept
          in a local history on your device so the app can show your usage
          statistics (the Insights tab). This history never leaves your
          device, and you can delete it at any time.
        </li>
      </ul>

      <h2>Speech model downloads</h2>
      <p>
        The first time you use a language, the app downloads that
        language&apos;s speech model from our GitHub release storage. Like any download, this
        request exposes your IP address to the hosting provider (GitHub).
        The download contains no personal data, and every file is integrity
        checked before use.
      </p>

      <h2>Error reporting and diagnostics</h2>
      <ul>
        <li>
          The app keeps a <strong>local</strong> diagnostic log on your
          device. You can open it from Settings, and it is only shared if
          you choose to share it.
        </li>
        <li>
          Release builds include optional error reporting (via Sentry, using
          servers in the European Union). When enabled, the app sends crash
          and error details: the error message, app version, operating
          system version, and device model. Reports are scrubbed of
          usernames and <strong>never contain audio, transcripts, or
          anything you dictated</strong>.
        </li>
        <li>
          Error reporting can be turned off at any time in Settings.
        </li>
      </ul>

      <h2>The website</h2>
      <p>
        typemate.codewalnut.com uses Vercel Analytics and Speed Insights to
        count visits and measure page performance. These collect aggregated,
        anonymized data and do not use cookies or track you across sites.
        Download buttons link directly to GitHub releases.
      </p>

      <h2>What we never collect</h2>
      <ul>
        <li>Your voice recordings or transcripts</li>
        <li>The content of what you type or dictate</li>
        <li>Contacts, files, browsing history, or location</li>
        <li>Advertising identifiers of any kind</li>
      </ul>
      <p>
        We do not sell data, we do not show ads, and we have nothing to
        monetize about your speech: it never reaches us in the first place.
      </p>

      <h2>Children</h2>
      <p>
        TypeMate is a productivity tool and is not directed at children
        under 13. Since the app collects no personal data by design, no
        child-specific data handling applies.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        If we change this policy, the new version will be published on this
        page with an updated date. Material changes will be called out in
        release notes.
      </p>

      <h2>Contact</h2>
      <p>
        Questions or concerns? Open an issue on{" "}
        <a
          href="https://github.com/CW-Codewalnut/typemate/issues"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>{" "}
        or reach us through{" "}
        <a href="https://www.codewalnut.com" target="_blank" rel="noreferrer">
          codewalnut.com
        </a>
        .
      </p>
    </LegalPage>
  );
}
