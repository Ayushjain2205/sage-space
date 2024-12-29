import React from "react";
import { ImagePlus, Plus, AlertCircle, Upload, X } from "lucide-react";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface BasicFormProps {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  handleInputChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  previewImage: string | null;
  COMPANION_TYPES: string[];
  SPECIALTIES: string[];
  ADJECTIVES: string[];
}

export default function BasicForm({
  formData,
  setFormData,
  handleInputChange,
  handleImageUpload,
  previewImage,
  COMPANION_TYPES,
  SPECIALTIES,
  ADJECTIVES,
}: BasicFormProps) {
  const [showCustomInput, setShowCustomInput] = React.useState(false);
  const [customSpecialty, setCustomSpecialty] = React.useState("");
  const [newLink, setNewLink] = React.useState("");

  const handleSpecialtyToggle = (specialty: string) => {
    setFormData((prev) => ({
      ...prev,
      specialties: prev.specialties.includes(specialty)
        ? prev.specialties.filter((s) => s !== specialty)
        : [...prev.specialties, specialty],
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

  return (
    <div className="space-y-6">
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
              name="name"
              value={formData.name}
              onChange={handleInputChange}
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
                name="ticker"
                value={formData.ticker}
                onChange={handleInputChange}
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
              name="type"
              value={formData.type}
              onChange={handleInputChange}
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
      <div>
        <label className="block text-[#E0AAFF] font-space-grotesk mb-2">
          Description *
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className="w-full bg-[#44318D] text-[#E0AAFF] rounded-lg px-4 py-2 font-outfit h-32 focus:outline-none focus:ring-2 focus:ring-[#3BF4FB]"
          required
        />
      </div>

      {/* Specialties Section */}
      <div>
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
          {formData.specialties
            .filter((s) => !SPECIALTIES.includes(s))
            .map((customSpecialty) => (
              <button
                key={customSpecialty}
                type="button"
                onClick={() => handleSpecialtyToggle(customSpecialty)}
                className="bg-[#3BF4FB] text-[#10002B] px-3 py-1 rounded-full font-outfit text-sm transition-colors"
              >
                {customSpecialty}
              </button>
            ))}
          <div className="relative">
            <button
              type="button"
              onMouseEnter={() => setShowCustomInput(true)}
              onMouseLeave={() => setShowCustomInput(false)}
              className="px-3 py-1 rounded-full font-outfit text-sm bg-[#44318D] text-[#E0AAFF] hover:bg-[#3BF4FB] hover:text-[#10002B] transition-colors flex items-center"
            >
              <Plus size={14} className="mr-1" />
              Add Custom
            </button>
            {showCustomInput && (
              <div
                className="absolute top-0 left-0 flex"
                onMouseEnter={() => setShowCustomInput(true)}
                onMouseLeave={() => setShowCustomInput(false)}
              >
                <input
                  type="text"
                  value={customSpecialty}
                  onChange={(e) => setCustomSpecialty(e.target.value)}
                  placeholder="Custom specialty"
                  className="bg-[#44318D] text-[#E0AAFF] rounded-l-full px-3 py-1 font-outfit text-sm focus:outline-none focus:ring-2 focus:ring-[#3BF4FB] w-32"
                />
                <button
                  type="button"
                  onClick={handleAddCustomSpecialty}
                  className="bg-[#3BF4FB] text-[#10002B] rounded-r-full px-3 py-1 font-outfit text-sm hover:bg-[#44318D] hover:text-[#E0AAFF] transition-colors"
                >
                  Add
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Knowledge Base Section */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold font-space-grotesk text-[#3BF4FB]">
          Knowledge Base
        </h2>
        {/* File Upload */}
        <div>
          <label className="block text-[#E0AAFF] font-space-grotesk mb-2">
            Upload Files
          </label>
          <div className="flex items-center space-x-2">
            <label className="cursor-pointer bg-[#3BF4FB] text-[#10002B] px-4 py-2 rounded-lg font-space-grotesk hover:bg-[#44318D] hover:text-[#E0AAFF] transition-colors">
              <Upload className="inline-block mr-2" size={18} />
              Choose Files
              <input
                type="file"
                multiple
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
            <span className="text-[#E0AAFF] font-outfit">
              {formData.knowledgeFiles.length} file(s) selected
            </span>
          </div>
          {formData.knowledgeFiles.length > 0 && (
            <ul className="mt-2 space-y-1">
              {formData.knowledgeFiles.map((file: File, index: number) => (
                <li
                  key={index}
                  className="flex items-center justify-between bg-[#44318D] text-[#E0AAFF] rounded px-3 py-2"
                >
                  <span className="font-outfit truncate">{file.name}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveFile(index)}
                    className="text-[#E0AAFF] hover:text-[#3BF4FB]"
                  >
                    <X size={18} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Link Input */}
        <div>
          <label className="block text-[#E0AAFF] font-space-grotesk mb-2">
            Add Links
          </label>
          <div className="flex space-x-2">
            <input
              type="url"
              value={newLink}
              onChange={(e) => setNewLink(e.target.value)}
              placeholder="https://example.com"
              className="flex-grow bg-[#44318D] text-[#E0AAFF] rounded-lg px-4 py-2 font-outfit focus:outline-none focus:ring-2 focus:ring-[#3BF4FB]"
            />
            <button
              type="button"
              onClick={handleAddLink}
              className="bg-[#3BF4FB] text-[#10002B] px-4 py-2 rounded-lg font-space-grotesk hover:bg-[#44318D] hover:text-[#E0AAFF] transition-colors"
            >
              Add
            </button>
          </div>
          {formData.knowledgeLinks.length > 0 && (
            <ul className="mt-2 space-y-1">
              {formData.knowledgeLinks.map((link: string, index: number) => (
                <li
                  key={index}
                  className="flex items-center justify-between bg-[#44318D] text-[#E0AAFF] rounded px-3 py-2"
                >
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-outfit truncate hover:text-[#3BF4FB]"
                  >
                    {link}
                  </a>
                  <button
                    type="button"
                    onClick={() => handleRemoveLink(index)}
                    className="text-[#E0AAFF] hover:text-[#3BF4FB]"
                  >
                    <X size={18} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Telegram Integration Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold font-space-grotesk text-[#3BF4FB]">
          Telegram Integration
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-space-grotesk text-[#E0AAFF]">
              Telegram Configuration
            </h3>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="enable-telegram"
                checked={formData.enableTelegram}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({ ...prev, enableTelegram: checked }))
                }
              />
              <label
                htmlFor="enable-telegram"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#E0AAFF]"
              >
                Enable Telegram
              </label>
            </div>
          </div>
          <div>
            <label className="block text-[#E0AAFF] font-space-grotesk mb-2">
              Bot Name
            </label>
            <input
              type="text"
              name="telegramBotName"
              value={formData.telegramBotName}
              onChange={handleInputChange}
              className="w-full bg-[#44318D] text-[#E0AAFF] rounded-lg px-4 py-2 font-outfit focus:outline-none focus:ring-2 focus:ring-[#3BF4FB]"
            />
          </div>
          <div>
            <label className="block text-[#E0AAFF] font-space-grotesk mb-2">
              Bot Token
            </label>
            <input
              type="password"
              name="telegramToken"
              value={formData.telegramToken}
              onChange={handleInputChange}
              className="w-full bg-[#44318D] text-[#E0AAFF] rounded-lg px-4 py-2 font-outfit focus:outline-none focus:ring-2 focus:ring-[#3BF4FB]"
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
    </div>
  );
}
