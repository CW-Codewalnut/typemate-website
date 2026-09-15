import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import { Languages } from "@/components/languages";
import { Downloads } from "@/components/downloads";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Features />
      <Languages />
      <Downloads />
      <Footer />
    </main>
  );
}
