import React, { useState } from "react";
import { ImagePlus, AlertCircle, Upload, X, Plus } from "lucide-react";
import Image from "next/image";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import BasicForm from "./BasicForm";
import AdvancedForm from "./AdvancedForm";

interface FormData {
  name: string;
  ticker: string;
  description: string;
  type: string;
  image: string | null;
  telegramBotName: string;
  telegramToken: string;
  specialties: string[];
  knowledgeFiles: File[];
  knowledgeLinks: string[];
  personality: string;
  firstMessage: string;
  lore: string;
  style: string;
  adjectives: string[];
  framework: "eliza" | "goat" | "zerepy";
  imageGeneration: boolean;
  videoGeneration: boolean;
  voiceChat: boolean;
  enableTelegram: boolean;
  launchType: string;
}

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
    name: "",
    ticker: "",
    description: "",
    type: "",
    image: null,
    telegramBotName: "",
    telegramToken: "",
    specialties: [],
    knowledgeFiles: [],
    knowledgeLinks: [],
    personality: "",
    firstMessage: "",
    lore: "",
    style: "",
    adjectives: [],
    framework: "eliza",
    imageGeneration: false,
    videoGeneration: false,
    voiceChat: false,
    enableTelegram: false,
    launchType: "normal",
  });

  const [isAdvancedMode, setIsAdvancedMode] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission
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
            Create AI Companion
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
    </form>
  );
}
