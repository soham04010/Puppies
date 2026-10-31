import React from "react";
import HeroSection from "@/components/HeroSection";
import MeetSection from "@/components/MeetSection";
import TwoWaysSection from "@/components/TwoWaysSection";
import JourneySection from "@/components/JourneySection";
import PassportSection from "@/components/PassportSection";
import DuskSection from "@/components/DuskSection";
import NightSection from "@/components/NightSection";
import HomeSection from "@/components/HomeSection";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* 1. HERO SCENE: Sun, Wavy Text, Arched Lineup, Peeking Cartoon Puppy & Quilt Blanket */}
      <div data-section="hero" id="hero">
        <HeroSection />
      </div>

      {/* 2. MEET THE PUPS: 3D Opening Doors Hallway & Treadmill */}
      <div data-section="meet" id="meet">
        <MeetSection />
      </div>

      {/* 3. TWO WAYS TO MEET YOUR PUPPY: Wooden Fork, Dubai Skyline & Airplane Flight */}
      <div data-section="paths" id="paths">
        <TwoWaysSection />
      </div>

      {/* 4. YOUR PUPPY JOURNEY: Interactive WhatsApp Smartphone Simulator */}
      <div data-section="chat" id="chat">
        <JourneySection />
      </div>

      {/* 5. PUPPY PASSPORT: Open Vintage Passport Book & Stamped Visas */}
      <div data-section="trust" id="trust">
        <PassportSection />
      </div>

      {/* 6. DUSK: Wall of Happy Families with Polaroid Washi Tape */}
      <div data-section="dusk" id="dusk">
        <DuskSection />
      </div>

      {/* 7. NIGHT: Twinkling Starry Sky & Questions Answered */}
      <div data-section="questions" id="questions">
        <NightSection />
      </div>

      {/* 8. HOME: Night Cottage, Front Porch & Mad-Libs Contact Letter */}
      <div data-section="cta" id="cta">
        <HomeSection />
      </div>
    </div>
  );
}
