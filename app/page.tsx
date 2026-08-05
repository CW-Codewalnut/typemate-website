import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { Features } from "@/components/features";
import { Languages } from "@/components/languages";
import { Android } from "@/components/android";
import { Downloads } from "@/components/downloads";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <HowItWorks />
      <Features />
      <Languages />
      <Android />
      <Downloads />
      <Footer />
    </main>
  );
}
