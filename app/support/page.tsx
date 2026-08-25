import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Support - TypeMate",
  description:
    "Get help with TypeMate: setup, troubleshooting, and how to report problems.",
};

export default function SupportPage() {
  return (
    <LegalPage title="Support" updated="5 August 2026">
      <p>
        Need help with TypeMate? Start with the quick answers below; if that
        does not solve it, report the problem and we will look at it.
      </p>

      <h2>Report a problem</h2>
      <p>
        The fastest way to get help is to open an issue on{" "}
        <a
          href="https://github.com/CW-Codewalnut/typemate/issues"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
        . Include your operating system, the app version (shown in
        Settings), and what you expected to happen. You can also attach the
        diagnostic log: Settings has an &quot;Open log folder&quot; option,
        and the log never contains your dictated text.
      </p>
      <p>
        Prefer not to use GitHub? Contact us through{" "}
        <a href="https://www.codewalnut.com" target="_blank" rel="noreferrer">
          codewalnut.com
        </a>
        .
      </p>

      <h2>Quick answers</h2>
      <ul>
        <li>
          <strong>Nothing happens when I hold the shortcut.</strong> Make
          sure the language&apos;s speech model has finished downloading
          (the Dictate tab shows a download button on first use), and check
          that another app has not claimed the same shortcut.
        </li>
        <li>
          <strong>The first dictation in a language is slow.</strong> The
          model loads into memory on first use; after that, dictations are
          fast. English lands in about a second on a typical laptop.
        </li>
        <li>
          <strong>Linux: the shortcut does not work on Wayland.</strong>{" "}
          Wayland does not allow apps to type into other apps, so TypeMate
          supports X11 sessions on Linux. Log in with an X11 session to use
          global dictation.
        </li>
        <li>
          <strong>Android: the floating mic does nothing.</strong> Check
          that the microphone permission is granted and the speech model
          for your language is downloaded; the bubble shows the reason on
          screen when something is missing.
        </li>
        <li id="msix">
          <strong>Windows: how do I install the .msix package?</strong>{" "}
          Windows will not install an app package unless it already trusts
          who signed it, so this takes one extra step the first time.
          Download{" "}
          <strong>TypeMate-CodeWalnut-cert.cer</strong> from the same
          release, right click it, choose &quot;Install Certificate&quot;,
          pick &quot;Local Machine&quot;, then &quot;Place all
          certificates in the following store&quot; and choose
          &quot;Trusted People&quot;. After that, open the .msix and it
          will install. You only do this once. If you would rather not,
          use the .exe installer instead, which needs none of this.
        </li>
        <li>
          <strong>Windows: the app package says the microphone is
          off.</strong> A packaged install gets its own microphone
          permission, separate from the one you may have already granted.
          Open Windows Settings, go to Privacy &amp; security, then
          Microphone, and turn TypeMate on. The app picks it up without a
          restart.
        </li>
        <li>
          <strong>Where is my data?</strong> Everything stays on your
          device: transcription happens locally and your dictation history
          never leaves your machine. See the{" "}
          <a href="/privacy">Privacy Policy</a> for details.
        </li>
      </ul>

      <h2>Feature requests</h2>
      <p>
        Ideas are welcome as GitHub issues too. TypeMate is developed in the
        open, and the{" "}
        <a
          href="https://github.com/CW-Codewalnut/typemate"
          target="_blank"
          rel="noreferrer"
        >
          roadmap discussions
        </a>{" "}
        happen there.
      </p>
    </LegalPage>
  );
}
