import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import MarqueeStrip from './components/MarqueeStrip';
import LifestyleSection from './components/LifestyleSection';
import BenefitsSection from './components/BenefitsSection';
import StorySection from './components/StorySection';
import IngredientsSection from './components/IngredientsSection';
import CommunitySection from './components/CommunitySection';
import FinalCTA from './components/FinalCTA';

// ─────────────────────────────────────────────────────────────────
// COCO — Premium Coconut Water
// Page flow:
//   1. Hero           — can fall animation, editorial chips
//   2. Marquee        — transitional brand strip
//   3. Lifestyle      — bento grid of campaign imagery
//   4. Benefits       — sticky can, scrolling benefit cards
//   5. Story          — brand origin narrative, Koh Samui
//   6. Ingredients    — sensory moment, ice bucket
//   7. Community      — people & lifestyle gallery
//   8. Final CTA      — Open. Sip. Reset.
//
// Three.js integration points:
//   • CanStage.jsx        → hero 3D can scene (drop + float)
//   • BenefitsSection.jsx → scroll-driven can rotation
// ─────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="grain relative w-full overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <MarqueeStrip />
      <LifestyleSection />
      <BenefitsSection />
      <StorySection />
      <IngredientsSection />
      <CommunitySection />
      <FinalCTA />
    </div>
  );
}
