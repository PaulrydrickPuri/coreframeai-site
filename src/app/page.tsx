import Navbar from "@shared/components/organisms/Navbar";
import ScrollIndicator from "@shared/components/atoms/ScrollIndicator";
import ProjectHub from "@shared/components/organisms/ProjectHub";
import ClientHero from "./components/ClientHero";

export default function HomePage() {
  return (
    <div className="bg-[#0c101a] overflow-hidden scroll-smooth">
      <Navbar />
      <ScrollIndicator />
      <ClientHero />
      <ProjectHub />
    </div>
  );
}
