import React, { useState } from "react";
import { Star, MessageCircle, Zap } from "lucide-react";

const companions = [
  {
    id: 1,
    name: "FinanceGuru",
    specialties: ["Stocks", "Crypto", "Personal Finance"],
    rating: 4.8,
    conversations: 15243,
    energy: 92,
  },
  {
    id: 2,
    name: "TechWizard",
    specialties: ["AI", "Blockchain", "Web Development"],
    rating: 4.9,
    conversations: 20129,
    energy: 88,
  },
  {
    id: 3,
    name: "HealthBot",
    specialties: ["Nutrition", "Fitness", "Mental Health"],
    rating: 4.7,
    conversations: 18756,
    energy: 95,
  },
  {
    id: 4,
    name: "ArtMuse",
    specialties: ["Digital Art", "Art History", "Creative Writing"],
    rating: 4.6,
    conversations: 12567,
    energy: 79,
  },
  {
    id: 5,
    name: "EcoSage",
    specialties: ["Sustainability", "Climate Science", "Green Tech"],
    rating: 4.8,
    conversations: 14302,
    energy: 91,
  },
  {
    id: 6,
    name: "SpaceExplorer",
    specialties: ["Astronomy", "Space Technology", "Astrophysics"],
    rating: 4.9,
    conversations: 16789,
    energy: 87,
  },
];

const AiCompanionShowcase = () => {
  const [selectedCompanion, setSelectedCompanion] = useState(null);

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
            <div className="flex justify-between items-center font-outfit">
              <div className="flex items-center">
                <MessageCircle className="w-5 h-5 mr-1" />
                <span>{companion.conversations.toLocaleString()} chats</span>
              </div>
              <div className="flex items-center">
                <Zap className="w-5 h-5 mr-1" />
                <span>{companion.energy}% energy</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedCompanion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-[#10002B] p-8 rounded-lg max-w-md w-full">
            <h3
              className="text-3xl font-bold mb-4 font-space-grotesk"
              style={{ color: "#3BF4FB" }}
            >
              {selectedCompanion.name}
            </h3>
            <p className="mb-4 font-outfit">
              Specialties: {selectedCompanion.specialties.join(", ")}
            </p>
            <div className="flex justify-between items-center mb-4 font-outfit">
              <div className="flex items-center">
                <Star className="w-5 h-5 text-[#FFD700] mr-1" />
                <span>{selectedCompanion.rating.toFixed(1)} rating</span>
              </div>
              <div className="flex items-center">
                <MessageCircle className="w-5 h-5 mr-1" />
                <span>
                  {selectedCompanion.conversations.toLocaleString()} chats
                </span>
              </div>
              <div className="flex items-center">
                <Zap className="w-5 h-5 mr-1" />
                <span>{selectedCompanion.energy}% energy</span>
              </div>
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
