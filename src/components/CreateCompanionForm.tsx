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
  // Add any additional fields for advanced mode here
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
    // Initialize any additional fields for advanced mode here
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

  const handleSpecialtyToggle = (specialty: string) => {
    setFormData((prev) => ({
      ...prev,
      specialties: prev.specialties.includes(specialty)
        ? prev.specialties.filter((s) => s !== specialty)
        : [...prev.specialties, specialty],
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData((prev) => ({
      ...prev,
      knowledgeFiles: [...prev.knowledgeFiles, ...files],
    }));
  };

  const handleRemoveFile = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      knowledgeFiles: prev.knowledgeFiles.filter((_, i) => i !== index),
    }));
  };

  const handleAddLink = () => {
    if (newLink.trim()) {
      setFormData((prev) => ({
        ...prev,
        knowledgeLinks: [...prev.knowledgeLinks, newLink.trim()],
      }));
      setNewLink("");
    }
  };

  const handleRemoveLink = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      knowledgeLinks: prev.knowledgeLinks.filter((_, i) => i !== index),
    }));
  };

  const handleAddCustomSpecialty = () => {
    if (
      customSpecialty.trim() &&
      !formData.specialties.includes(customSpecialty.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        specialties: [...prev.specialties, customSpecialty.trim()],
      }));
      setCustomSpecialty("");
    }
  };

  const [newLink, setNewLink] = useState("");
  const [customSpecialty, setCustomSpecialty] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);

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
