import React from "react";
import { ImagePlus, Plus } from "lucide-react";
import Image from "next/image";

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
}

export default function BasicForm({
  formData,
  setFormData,
  handleInputChange,
  handleImageUpload,
  previewImage,
  COMPANION_TYPES,
  SPECIALTIES,
}: BasicFormProps) {
  const [showCustomInput, setShowCustomInput] = React.useState(false);
  const [customSpecialty, setCustomSpecialty] = React.useState("");

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
    </div>
  );
}
