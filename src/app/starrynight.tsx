"use client";

import { Sparkles } from "lucide-react";
import type { BillSideBarInfo } from "~/lib/types";
import { createDummyBillInfo } from "~/lib/utils";
import { useCosmosContext } from "./cosmos-provider";

interface Star {
  id: number;
  name: string;
  constellation: string;
  distance: string;
  magnitude: number;
  spectralType: string;
  description: string;
  facts: string[];
  x: number;
  y: number;
  size: number;
  color: string;
  twinkleDelay: number;
  bill?: BillSideBarInfo;
}

const stars: Star[] = [
  {
    id: 1,
    name: "Sirius",
    constellation: "Canis Major",
    distance: "8.6 light-years",
    magnitude: -1.46,
    spectralType: "A1V",
    description:
      "The brightest star in the night sky, Sirius is actually a binary star system consisting of a main-sequence star and a white dwarf companion.",
    facts: [
      'Known as the "Dog Star"',
      "Twice as massive as the Sun",
      "Visible from almost everywhere on Earth",
      "Ancient Egyptians based their calendar on its rising",
    ],
    x: 15,
    y: 25,
    size: 8,
    color: "rgb(155, 176, 255)",
    twinkleDelay: 0,
  },
  {
    id: 2,
    name: "Betelgeuse",
    constellation: "Orion",
    distance: "642.5 light-years",
    magnitude: 0.42,
    spectralType: "M1-2",
    description:
      "A red supergiant star nearing the end of its life. If placed at the center of our Solar System, it would extend past the orbit of Mars.",
    facts: [
      "One of the largest known stars",
      "Expected to explode as a supernova",
      "Varies in brightness over time",
      "Surface temperature around 3,500K",
    ],
    x: 75,
    y: 40,
    size: 7,
    color: "rgb(255, 180, 120)",
    twinkleDelay: 0.5,
  },
  {
    id: 3,
    name: "Vega",
    constellation: "Lyra",
    distance: "25 light-years",
    magnitude: 0.03,
    spectralType: "A0V",
    description:
      "One of the most luminous stars in the Sun's neighborhood. Vega was the northern pole star around 12,000 BCE and will be again around 13,727 CE.",
    facts: [
      "First star photographed besides the Sun",
      "Rotates rapidly, completing a rotation every 12.5 hours",
      "Part of the Summer Triangle asterism",
      "Has a debris disk that may contain planets",
    ],
    x: 85,
    y: 15,
    size: 6,
    color: "rgb(200, 215, 255)",
    twinkleDelay: 1,
  },
  {
    id: 4,
    name: "Rigel",
    constellation: "Orion",
    distance: "860 light-years",
    magnitude: 0.13,
    spectralType: "B8",
    description:
      "A blue supergiant star and the brightest star in the constellation Orion. Despite being designated Beta Orionis, it is usually brighter than Alpha Orionis (Betelgeuse).",
    facts: [
      "About 120,000 times more luminous than the Sun",
      "Actually a multiple star system",
      "Surface temperature around 11,000K",
      'Name comes from Arabic meaning "the foot"',
    ],
    x: 65,
    y: 55,
    size: 6,
    color: "rgb(170, 191, 255)",
    twinkleDelay: 1.5,
  },
  {
    id: 5,
    name: "Polaris",
    constellation: "Ursa Minor",
    distance: "433 light-years",
    magnitude: 1.98,
    spectralType: "F7",
    description:
      "The North Star, Polaris is the brightest star in Ursa Minor and lies nearly in a direct line with Earth's rotational axis, making it the current northern pole star.",
    facts: [
      "Used for navigation for centuries",
      "Actually a triple star system",
      "About 2,500 times more luminous than the Sun",
      "Will not always be the pole star due to Earth's precession",
    ],
    x: 50,
    y: 8,
    size: 5,
    color: "rgb(245, 245, 255)",
    twinkleDelay: 2,
  },
  {
    id: 6,
    name: "Aldebaran",
    constellation: "Taurus",
    distance: "65 light-years",
    magnitude: 0.85,
    spectralType: "K5",
    description:
      'An orange giant star and the brightest star in the constellation Taurus. Its name comes from Arabic meaning "the follower" because it appears to follow the Pleiades star cluster.',
    facts: [
      "About 44 times larger than the Sun",
      "Has a faint red dwarf companion",
      "Marks the eye of the bull in Taurus",
      "One of the easiest stars to find in the night sky",
    ],
    x: 30,
    y: 45,
    size: 6,
    color: "rgb(255, 200, 150)",
    twinkleDelay: 2.5,
  },
  {
    id: 7,
    name: "Antares",
    constellation: "Scorpius",
    distance: "550 light-years",
    magnitude: 1.06,
    spectralType: "M1.5",
    description:
      'A red supergiant star and one of the largest stars visible to the naked eye. Its name means "rival of Mars" due to its reddish appearance.',
    facts: [
      "If placed at the Sun's position, would extend to Mars' orbit",
      "About 10,000 times more luminous than the Sun",
      "Has a hot blue companion star",
      "Marks the heart of the scorpion",
    ],
    x: 45,
    y: 75,
    size: 7,
    color: "rgb(255, 170, 120)",
    twinkleDelay: 3,
  },
  {
    id: 8,
    name: "Altair",
    constellation: "Aquila",
    distance: "16.7 light-years",
    magnitude: 0.77,
    spectralType: "A7V",
    description:
      "One of the closest stars visible to the naked eye and one of the vertices of the Summer Triangle asterism. It rotates very rapidly.",
    facts: [
      "Rotates once every 9 hours",
      "Flattened at the poles due to rapid rotation",
      "Part of the Summer Triangle",
      'Name means "the flying eagle" in Arabic',
    ],
    x: 70,
    y: 30,
    size: 5,
    color: "rgb(220, 230, 255)",
    twinkleDelay: 3.5,
  },
  {
    id: 9,
    name: "Spica",
    constellation: "Virgo",
    distance: "250 light-years",
    magnitude: 0.97,
    spectralType: "B1",
    description:
      "The brightest star in Virgo and one of the brightest stars in the night sky. It is actually a binary star system with two stars orbiting very close to each other.",
    facts: [
      "Two stars orbit each other every 4 days",
      "About 12,100 times more luminous than the Sun",
      "Used to discover the precession of the equinoxes",
      'Name means "ear of grain" in Latin',
    ],
    x: 40,
    y: 60,
    size: 5,
    color: "rgb(180, 195, 255)",
    twinkleDelay: 4,
  },
  {
    id: 10,
    name: "Arcturus",
    constellation: "Boötes",
    distance: "36.7 light-years",
    magnitude: -0.05,
    spectralType: "K0",
    description:
      "The brightest star in the northern celestial hemisphere and the fourth-brightest star in the night sky. It is an orange giant star.",
    facts: [
      "About 170 times more luminous than the Sun",
      "Moving rapidly through space",
      "One of the first stars to be seen in daylight with a telescope",
      'Name means "Guardian of the Bear" in Greek',
    ],
    x: 20,
    y: 35,
    size: 6,
    color: "rgb(255, 210, 160)",
    twinkleDelay: 4.5,
  },
  {
    id: 11,
    name: "Capella",
    constellation: "Auriga",
    distance: "42.9 light-years",
    magnitude: 0.08,
    spectralType: "G8",
    description:
      "The brightest star in Auriga and the sixth-brightest star in the night sky. It is actually a system of four stars in two binary pairs.",
    facts: [
      "Contains two giant stars orbiting each other",
      "Each giant is about 10 times larger than the Sun",
      'Name means "little goat" in Latin',
      "Circumpolar from northern latitudes",
    ],
    x: 55,
    y: 20,
    size: 6,
    color: "rgb(255, 245, 220)",
    twinkleDelay: 5,
  },
  {
    id: 12,
    name: "Deneb",
    constellation: "Cygnus",
    distance: "2,615 light-years",
    magnitude: 1.25,
    spectralType: "A2",
    description:
      "One of the most luminous stars known, Deneb is the brightest star in Cygnus and one of the vertices of the Summer Triangle.",
    facts: [
      "One of the most distant stars visible to the naked eye",
      "About 200,000 times more luminous than the Sun",
      "If it were as close as Sirius, it would be as bright as the Moon",
      'Name means "tail" in Arabic, marking the tail of the swan',
    ],
    x: 90,
    y: 25,
    size: 5,
    color: "rgb(210, 220, 255)",
    twinkleDelay: 5.5,
  },
];

export default function StarryNightSky() {
  const { selectedStar, setSelectedStar } = useCosmosContext();

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-[#000814] via-[#001d3d] to-[#000814]">
      {/* Background stars (decorative) */}
      <div className="absolute inset-0">
        {Array.from({ length: 200 }).map((_, i) => (
          <div
            key={`bg-star-${i}`}
            className="star-twinkle absolute rounded-full bg-white"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              opacity: Math.random() * 0.7 + 0.3,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 3 + 2}s`,
            }}
          />
        ))}
      </div>

      {/* Title */}
      <div className="absolute top-8 left-1/2 z-10 -translate-x-1/2 text-center">
        <h1 className="mb-2 flex items-center justify-center gap-3 text-4xl font-bold text-white md:text-5xl">
          <Sparkles className="text-accent h-8 w-8" />
          Explore the Stars
        </h1>
        <p className="text-muted-foreground text-sm md:text-base">
          Click on any star to discover its secrets
        </p>
      </div>

      {/* Interactive stars */}
      {stars.map((star) => (
        <button
          key={star.id}
          onClick={() => setSelectedStar(star.bill ?? createDummyBillInfo())}
          className="star-twinkle star-glow focus:ring-primary focus:ring-offset-background absolute cursor-pointer rounded-full transition-all duration-300 hover:scale-150 focus:ring-2 focus:ring-offset-2 focus:outline-none"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: star.color,
            boxShadow: `0 0 ${star.size * 2}px ${star.color}`,
            animationDelay: `${star.twinkleDelay}s`,
            transform: "translate(-50%, -50%)",
          }}
          aria-label={`Learn about ${star.name}`}
        />
      ))}

      {/* Star information dialog */}
      {selectedStar && (
        <div className="absolute top-0 left-0 h-full w-full bg-black/50">
          testing
        </div>
      )}
    </div>
  );
}
