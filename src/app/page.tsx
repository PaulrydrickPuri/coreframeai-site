import Hero from "@shared/components/organisms/Hero";
import Navbar from "@shared/components/organisms/Navbar";
import WorkflowButtons from "@features/landing/components/WorkflowButtons";
import ScrollIndicator from "@shared/components/atoms/ScrollIndicator";

export default function HomePage() {
  return (
    <div className="bg-[#0c101a] overflow-hidden scroll-smooth">
      <Navbar />
      <ScrollIndicator />
      <Hero />
      <WorkflowButtons />
    </div>
  );
}
