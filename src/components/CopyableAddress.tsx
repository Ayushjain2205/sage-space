import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CopyableAddressProps {
  address: string;
  isPopup?: boolean;
}

const CopyableAddress: React.FC<CopyableAddressProps> = ({
  address,
  isPopup = false,
}) => {
  const [copied, setCopied] = useState(false);

  const shortAddress = `${address.slice(0, 6)}...${address.slice(-4)}`;

  const copyToClipboard = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(address).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div
      className={`
        flex items-center justify-between w-full rounded-md px-2 py-1 transition-colors duration-200
        ${
          isPopup
            ? "hover:bg-[#3BF4FB] hover:text-[#10002B]"
            : "bg-[#7B2CBF] text-[#E0AAFF] hover:bg-[#3BF4FB] hover:text-[#10002B]"
        }
      `}
    >
      <span className="font-outfit text-sm">{shortAddress}</span>
      <button onClick={copyToClipboard} className="focus:outline-none">
        {copied ? (
          <Check className="w-4 h-4 text-green-500" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
      </button>
    </div>
  );
};

export default CopyableAddress;
