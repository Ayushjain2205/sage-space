import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTelegram } from "react-icons/fa";

interface CreatingPreviewPopupProps {
  isOpen: boolean;
  onClose: () => void;
  formData: any;
}

export default function CreatingPreviewPopup({
  isOpen,
  onClose,
  formData,
}: CreatingPreviewPopupProps) {
  const [creationStage, setCreationStage] = useState(0);
  const [isCreationComplete, setIsCreationComplete] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const timer = setInterval(() => {
        setCreationStage((prev) => {
          if (prev < 3) return prev + 1;
          clearInterval(timer);
          setIsCreationComplete(true);
          return prev;
        });
      }, 2000);

      return () => clearInterval(timer);
    }
  }, [isOpen]);

  const handleCloseAttempt = (open: boolean) => {
    if (!open && isCreationComplete) {
      onClose();
    }
  };

  const stages = [
    { title: "Initializing AI Core", color: "#3BF4FB" },
    { title: "Loading Knowledge Base", color: "#7B2CBF" },
    { title: "Calibrating Personality", color: "#E0AAFF" },
    { title: "Finalizing Agent", color: "#44318D" },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={handleCloseAttempt}>
      <DialogContent className="sm:max-w-[500px] bg-[#44318D] p-0 rounded-lg overflow-hidden">
        <DialogHeader className="p-4 bg-[#3BF4FB] flex flex-row items-center justify-between">
          <DialogTitle className="text-[#10002B] font-space-grotesk text-xl">
            Creating AI Agent
          </DialogTitle>
          <DialogClose
            disabled={!isCreationComplete}
            className={`w-6 h-6 rounded-md flex items-center justify-center transition-colors ${
              isCreationComplete
                ? "text-[#10002B] hover:bg-[#E0AAFF]"
                : "text-[#10002B] opacity-50 cursor-not-allowed"
            }`}
          />
        </DialogHeader>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-center space-x-4">
            <Loader2
              className={`h-8 w-8 text-[#3BF4FB] ${
                isCreationComplete ? "" : "animate-spin"
              }`}
            />
            <p className="text-[#E0AAFF] font-space-grotesk text-lg">
              {isCreationComplete
                ? "AI Agent created successfully!"
                : "Building your AI agent..."}
            </p>
          </div>
          <div className="bg-[#7B2CBF] rounded-lg p-4 space-y-4">
            <h3 className="text-[#3BF4FB] font-space-grotesk text-lg">
              Creation Progress
            </h3>
            {stages.map((stage, index) => (
              <div key={index} className="relative h-8">
                <motion.div
                  className="absolute inset-0 bg-[#44318D] rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: creationStage > index ? 1 : 0 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute inset-0 flex items-center justify-between px-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <span className="text-[#E0AAFF] font-space-grotesk z-10">
                    {stage.title}
                  </span>
                  <AnimatePresence>
                    {creationStage > index && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        }}
                        className="w-6 h-6 rounded-full bg-[#3BF4FB] flex items-center justify-center"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-[#10002B]"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            ))}
          </div>
          <div className="bg-[#7B2CBF] rounded-lg p-4 space-y-2">
            <h3 className="text-[#3BF4FB] font-space-grotesk text-lg">
              Preview
            </h3>
            <p className="text-[#E0AAFF]">
              <strong>Name:</strong> {formData.name}
            </p>
            <p className="text-[#E0AAFF]">
              <strong>Ticker:</strong> ${formData.ticker}
            </p>
            <p className="text-[#E0AAFF]">
              <strong>Type:</strong> {formData.type}
            </p>
            <p className="text-[#E0AAFF]">
              <strong>Description:</strong> {formData.description}
            </p>
            <p className="text-[#E0AAFF]">
              <strong>Framework:</strong> {formData.framework}
            </p>
            <p className="text-[#E0AAFF]">
              <strong>Specialties:</strong> {formData.specialties.join(", ")}
            </p>
            {isCreationComplete && (
              <div className="mt-4">
                <button
                  className="w-full py-2 rounded font-bold text-[#10002B] font-space-grotesk bg-[#3BF4FB] hover:bg-[#E0AAFF] transition-colors flex items-center justify-center"
                  onClick={() =>
                    window.open(
                      `https://t.me/${formData.telegramBotName}`,
                      "_blank"
                    )
                  }
                >
                  Start Conversation with {formData.name}
                  <FaTelegram className="ml-2 text-xl" />
                </button>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
