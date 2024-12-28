import React, { useState } from "react";
import { ImagePlus, AlertCircle } from "lucide-react";
import Image from "next/image";

interface FormData {
  name: string;
  ticker: string;
  description: string;
  type: string;
  image: string | null;
  telegramBotName: string;
  telegramToken: string;
  specialties: string[];
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
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission
  };

  const handleSpecialtyToggle = (specialty: string) => {
    setFormData((prev) => ({
      ...prev,
      specialties: prev.specialties.includes(specialty)
        ? prev.specialties.filter((s) => s !== specialty)
        : [...prev.specialties, specialty],
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
      <div className="bg-[#7B2CBF] rounded-lg p-8 mb-8 shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image Upload Section */}
          <div className="flex flex-col items-center justify-center">
            <div className="w-full aspect-square relative rounded-lg overflow-hidden bg-[#44318D] mb-4">
              {previewImage ? (
                <Image
                  src={previewImage}
                  alt="Preview"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              ) : (
                <div className="h-full flex items-center justify-center">
                  <ImagePlus className="w-16 h-16 text-[#E0AAFF]" />
                </div>
              )}
            </div>
            <label className="cursor-pointer bg-[#3BF4FB] text-[#10002B] px-4 py-2 rounded-lg font-space-grotesk hover:bg-[#44318D] hover:text-[#E0AAFF] transition-colors">
              Upload Image
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Basic Details Section */}
          <div className="space-y-4">
            <div>
              <label className="block text-[#E0AAFF] font-space-grotesk mb-2">
                AI Companion Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                className="w-full bg-[#44318D] text-[#E0AAFF] rounded-lg px-4 py-2 font-outfit focus:outline-none focus:ring-2 focus:ring-[#3BF4FB]"
                required
              />
            </div>
            <div>
              <label className="block text-[#E0AAFF] font-space-grotesk mb-2">
                Ticker Symbol *
              </label>
              <div className="relative">
                <span className="absolute left-4 top-2 text-[#E0AAFF]">$</span>
                <input
                  type="text"
                  value={formData.ticker}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, ticker: e.target.value }))
                  }
                  className="w-full bg-[#44318D] text-[#E0AAFF] rounded-lg px-4 py-2 pl-8 font-outfit uppercase focus:outline-none focus:ring-2 focus:ring-[#3BF4FB]"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-[#E0AAFF] font-space-grotesk mb-2">
                Type *
              </label>
              <select
                value={formData.type}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, type: e.target.value }))
                }
                className="w-full bg-[#44318D] text-[#E0AAFF] rounded-lg px-4 py-2 font-outfit focus:outline-none focus:ring-2 focus:ring-[#3BF4FB]"
                required
              >
                <option value="">Select a type</option>
                {COMPANION_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="mt-8">
          <label className="block text-[#E0AAFF] font-space-grotesk mb-2">
            Description *
          </label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
            className="w-full bg-[#44318D] text-[#E0AAFF] rounded-lg px-4 py-2 font-outfit h-32 focus:outline-none focus:ring-2 focus:ring-[#3BF4FB]"
            required
          />
        </div>

        {/* Specialties Section */}
        <div className="mt-8">
          <label className="block text-[#E0AAFF] font-space-grotesk mb-2">
            Specialties
          </label>
          <div className="flex flex-wrap gap-2">
            {SPECIALTIES.map((specialty) => (
              <button
                key={specialty}
                type="button"
                onClick={() => handleSpecialtyToggle(specialty)}
                className={`px-3 py-1 rounded-full font-outfit text-sm transition-colors ${
                  formData.specialties.includes(specialty)
                    ? "bg-[#3BF4FB] text-[#10002B]"
                    : "bg-[#44318D] text-[#E0AAFF] hover:bg-[#3BF4FB] hover:text-[#10002B]"
                }`}
              >
                {specialty}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Telegram Configuration Section */}
      <div className="bg-[#7B2CBF] rounded-lg p-8 mb-8 shadow-lg">
        <h2 className="text-2xl font-bold mb-6 font-space-grotesk text-[#3BF4FB]">
          Telegram Configuration
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-[#E0AAFF] font-space-grotesk mb-2">
              Bot Name *
            </label>
            <input
              type="text"
              value={formData.telegramBotName}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  telegramBotName: e.target.value,
                }))
              }
              className="w-full bg-[#44318D] text-[#E0AAFF] rounded-lg px-4 py-2 font-outfit focus:outline-none focus:ring-2 focus:ring-[#3BF4FB]"
              required
            />
          </div>
          <div>
            <label className="block text-[#E0AAFF] font-space-grotesk mb-2">
              Bot Token *
            </label>
            <input
              type="password"
              value={formData.telegramToken}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  telegramToken: e.target.value,
                }))
              }
              className="w-full bg-[#44318D] text-[#E0AAFF] rounded-lg px-4 py-2 font-outfit focus:outline-none focus:ring-2 focus:ring-[#3BF4FB]"
              required
            />
          </div>
          <div className="flex items-start space-x-2 text-[#E0AAFF]">
            <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <p className="text-sm font-outfit">
              You can get your bot token from the{" "}
              <a
                href="https://t.me/BotFather"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#3BF4FB] hover:underline"
              >
                BotFather
              </a>
              . Make sure to keep it secure and never share it publicly.
            </p>
          </div>
        </div>
      </div>

      {/* Submit Button */}
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
