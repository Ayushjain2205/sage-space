import React, { useState } from "react";
import Image from "next/image";
import { Star, Users, MessageSquare, Wallet } from "lucide-react";
import CopyableAddress from "./CopyableAddress";

interface Companion {
  id: number;
  name: string;
  image: string;
  specialties: string[];
  rating: number;
  username: string;
  users: number;
  address: string;
  ticker: string;
  value: number;
}

const companions: Companion[] = [
  {
    id: 1,
    name: "FinanceGuru",
    image: "/placeholder.svg?height=400&width=400",
    specialties: ["Stocks", "Crypto", "Personal Finance"],
    rating: 4.8,
    username: "@financeguru",
    users: 5420,
    address: "0x1234567890123456789012345678901234567890",
    ticker: "$FIN",
    value: 0.75,
  },
  {
    id: 2,
    name: "TechWizard",
    image: "/placeholder.svg?height=400&width=400",
    specialties: ["AI", "Blockchain", "Web Development"],
    rating: 4.9,
    username: "@techwizard",
    users: 7890,
    address: "0x2345678901234567890123456789012345678901",
    ticker: "$TECH",
    value: 1.2,
  },
  {
    id: 3,
    name: "HealthBot",
    image: "/placeholder.svg?height=400&width=400",
    specialties: ["Nutrition", "Fitness", "Mental Health"],
    rating: 4.7,
    username: "@healthbot",
    users: 6543,
    address: "0x3456789012345678901234567890123456789012",
    ticker: "$HLTH",
    value: 0.9,
  },
  {
    id: 4,
    name: "ArtMuse",
    image: "/placeholder.svg?height=400&width=400",
    specialties: ["Digital Art", "Art History", "Creative Writing"],
    rating: 4.6,
    username: "@artmuse",
    users: 4321,
    address: "0x4567890123456789012345678901234567890123",
    ticker: "$ART",
    value: 0.6,
  },
  {
    id: 5,
    name: "EcoSage",
    image: "/placeholder.svg?height=400&width=400",
    specialties: ["Sustainability", "Climate Science", "Green Tech"],
    rating: 4.8,
    username: "@ecosage",
    users: 5678,
    address: "0x5678901234567890123456789012345678901234",
    ticker: "$ECO",
    value: 0.85,
  },
  {
    id: 6,
    name: "SpaceExplorer",
    image: "/placeholder.svg?height=400&width=400",
    specialties: ["Astronomy", "Space Technology", "Astrophysics"],
    rating: 4.9,
    username: "@spaceexplorer",
    users: 6789,
    address: "0x6789012345678901234567890123456789012345",
    ticker: "$SPACE",
    value: 1.05,
  },
];

const AiCompanionShowcase: React.FC = () => {
  const [selectedCompanion, setSelectedCompanion] = useState<Companion | null>(
    null
  );

  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center p-8"
      style={{ backgroundColor: "#10002B", color: "#E0AAFF" }}
    >
      <h2
        className="text-5xl font-bold mb-12 font-permanent-marker"
        style={{ color: "#3BF4FB" }}
      >
        Discover AI Companions
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full">
        {companions.map((companion) => (
          <div
            key={companion.id}
            className="bg-[#7B2CBF] p-6 rounded-lg shadow-lg cursor-pointer transition-transform hover:scale-105"
            onClick={() => setSelectedCompanion(companion)}
          >
            <div className="mb-4 relative w-full pt-[100%]">
              <Image
                src={companion.image}
                alt={companion.name}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
            <div className="flex items-center justify-between mb-4">
              <h3
                className="text-2xl font-bold font-space-grotesk"
                style={{ color: "#C77DFF" }}
              >
                {companion.name}
              </h3>
              <div className="flex items-center">
                <Star className="w-5 h-5 text-[#FFD700] mr-1" />
                <span className="font-outfit">
                  {companion.rating.toFixed(1)}
                </span>
              </div>
            </div>
            <div className="mb-4">
              {companion.specialties.map((specialty, index) => (
                <span
                  key={index}
                  className="inline-block bg-[#3BF4FB] text-[#10002B] rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2 font-outfit"
                >
                  {specialty}
                </span>
              ))}
            </div>
            <div className="flex justify-between items-center font-outfit text-sm mb-2">
              <div className="flex items-center">
                <MessageSquare className="w-4 h-4 mr-1" />
                <span>{companion.username}</span>
              </div>
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-1" />
                <span>{companion.users.toLocaleString()} users</span>
              </div>
            </div>
            <div className="flex justify-between items-center font-outfit text-sm mb-2">
              <div className="flex items-center">
                <Wallet className="w-4 h-4 mr-1" />
                <span>{companion.ticker}</span>
              </div>
              <span>${companion.value.toFixed(2)}</span>
            </div>
            <div className="mt-2 text-sm">
              <CopyableAddress address={companion.address} />
            </div>
          </div>
        ))}
      </div>
      {selectedCompanion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-[#10002B] p-8 rounded-lg max-w-md w-full">
            <div className="mb-4 relative w-full pt-[100%]">
              <Image
                src={selectedCompanion.image}
                alt={selectedCompanion.name}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
            <h3
              className="text-3xl font-bold mb-4 font-space-grotesk"
              style={{ color: "#3BF4FB" }}
            >
              {selectedCompanion.name}
            </h3>
            <p className="mb-4 font-outfit">
              Specialties: {selectedCompanion.specialties.join(", ")}
            </p>
            <div className="grid grid-cols-2 gap-4 mb-4 font-outfit">
              <div className="flex items-center">
                <Star className="w-5 h-5 text-[#FFD700] mr-1" />
                <span>{selectedCompanion.rating.toFixed(1)} rating</span>
              </div>
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-1" />
                <span>{selectedCompanion.users.toLocaleString()} users</span>
              </div>
              <div className="flex items-center">
                <MessageSquare className="w-5 h-5 mr-1" />
                <span>{selectedCompanion.username}</span>
              </div>
              <div className="flex items-center">
                <Wallet className="w-5 h-5 mr-1" />
                <span>
                  {selectedCompanion.ticker} ($
                  {selectedCompanion.value.toFixed(2)})
                </span>
              </div>
            </div>
            <div className="mb-4 font-outfit text-sm">
              <span className="font-bold mr-2">Address:</span>
              <CopyableAddress
                address={selectedCompanion.address}
                isPopup={true}
              />
            </div>
            <button
              className="w-full py-2 rounded font-bold text-[#10002B] font-space-grotesk"
              style={{ backgroundColor: "#3BF4FB" }}
            >
              Start Conversation
            </button>
            <button
              className="w-full mt-4 py-2 rounded font-bold font-space-grotesk"
              style={{ backgroundColor: "#7B2CBF", color: "#E0AAFF" }}
              onClick={() => setSelectedCompanion(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default AiCompanionShowcase;
