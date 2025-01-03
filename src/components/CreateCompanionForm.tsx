import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import BasicForm from "./BasicForm";
import AdvancedForm from "./AdvancedForm";
import CreatingPreviewPopup from "./CreatingPreviewPopup";
import { FormData } from "@/types/form";

const COMPANION_TYPES = [
  "Finance",
  "Technology",
  "Health",
  "Education",
  "Art",
  "Science",
  "Entertainment",
  "Other",
];

const SPECIALTIES = [
  "Stocks",
  "Crypto",
  "Personal Finance",
  "AI",
  "Blockchain",
  "Web Development",
  "Nutrition",
  "Fitness",
  "Mental Health",
  "Digital Art",
  "Art History",
  "Creative Writing",
  "Sustainability",
  "Climate Science",
  "Green Tech",
  "Astronomy",
  "Space Technology",
  "Astrophysics",
];

const ADJECTIVES = [
  "Intelligent",
  "Creative",
  "Analytical",
  "Empathetic",
  "Witty",
  "Professional",
  "Casual",
  "Technical",
  "Friendly",
  "Mysterious",
  "Philosophical",
  "Practical",
  "Adventurous",
  "Scholarly",
  "Artistic",
];

export default function CreateCompanionForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "SageBot",
    ticker: "SAGE",
    description:
      "An AI companion specializing in financial advice and market analysis. SageBot offers personalized insights on investments, budgeting, and financial planning.",
    type: "Finance",
    image: null,
    telegramBotName: "SageFinanceBot",
    telegramToken: "",
    specialties: ["Stocks", "Crypto", "Personal Finance"],
    knowledgeFiles: [],
    knowledgeLinks: [
      "https://www.investopedia.com/",
      "https://www.bloomberg.com/",
      "https://www.wsj.com/",
    ],
    personality:
      "Professional, analytical, and patient. Explains complex financial concepts in simple terms. Always up-to-date with the latest market trends and economic news.",
    firstMessage:
      "Hello! I'm SageBot, your AI financial advisor. How can I assist you with your financial goals today?",
    lore: "Created by top financial experts and AI researchers to democratize access to high-quality financial advice. SageBot combines decades of financial wisdom with cutting-edge AI technology.",
    style:
      "Formal yet approachable, using clear language to explain financial concepts. Provides data-driven insights and personalized recommendations based on individual user needs and market conditions.",
    adjectives: ["Intelligent", "Analytical", "Trustworthy", "Knowledgeable"],
    framework: "goat",
    imageGeneration: false,
    videoGeneration: false,
    voiceChat: true,
    enableTelegram: true,
    launchType: "normal",
    actionCapabilities: ["trade", "staking", "defi"],
  });

  const [isAdvancedMode, setIsAdvancedMode] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting form data:", formData);
    setIsCreating(true);
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
        setFormData((prev) => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
      <div className="bg-[#7B2CBF] rounded-lg p-8 mb-8 shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-[#3BF4FB] font-space-grotesk">
            Create AI Agent
          </h1>
          <div className="flex items-center space-x-2">
            <Switch
              id="advanced-mode"
              checked={isAdvancedMode}
              onCheckedChange={setIsAdvancedMode}
            />
            <Label
              htmlFor="advanced-mode"
              className="text-[#E0AAFF] font-space-grotesk"
            >
              Advanced Mode
            </Label>
          </div>
        </div>

        {isAdvancedMode ? (
          <AdvancedForm
            formData={formData}
            setFormData={setFormData}
            handleInputChange={handleInputChange}
            handleImageUpload={handleImageUpload}
            previewImage={previewImage}
            COMPANION_TYPES={COMPANION_TYPES}
            SPECIALTIES={SPECIALTIES}
            ADJECTIVES={ADJECTIVES}
          />
        ) : (
          <BasicForm
            formData={formData}
            setFormData={setFormData}
            handleInputChange={handleInputChange}
            handleImageUpload={handleImageUpload}
            previewImage={previewImage}
            COMPANION_TYPES={COMPANION_TYPES}
            SPECIALTIES={SPECIALTIES}
            ADJECTIVES={ADJECTIVES}
          />
        )}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-[#3BF4FB] text-[#10002B] px-8 py-3 rounded-lg font-space-grotesk font-bold hover:bg-[#44318D] hover:text-[#E0AAFF] transition-colors"
        >
          Create AI Companion
        </button>
      </div>

      <CreatingPreviewPopup
        isOpen={isCreating}
        onClose={() => setIsCreating(false)}
        formData={formData}
      />
    </form>
  );
}
