import React from "react";
import { IconType } from "react-icons";
import {
  FaBrain,
  FaDatabase,
  FaGlobe,
  FaRobot,
  FaComments,
  FaCode,
  FaCog,
  FaChartBar,
  FaSearch,
  FaLock,
} from "react-icons/fa";

const toolbarItems = [
  {
    type: "llm",
    label: "Language Model",
    icon: FaBrain,
    color: "text-[#3BF4FB]",
  },
  {
    type: "memory",
    label: "Memory",
    icon: FaDatabase,
    color: "text-[#E0AAFF]",
  },
  { type: "api", label: "API", icon: FaGlobe, color: "text-[#FF6B6B]" },
  { type: "agent", label: "Agent", icon: FaRobot, color: "text-[#4ECB71]" },
  {
    type: "prompt",
    label: "Prompt",
    icon: FaComments,
    color: "text-[#FCA311]",
  },
  {
    type: "function",
    label: "Function",
    icon: FaCode,
    color: "text-[#9D4EDD]",
  },
  { type: "tool", label: "Tool", icon: FaCog, color: "text-[#00B4D8]" },
  {
    type: "output",
    label: "Output",
    icon: FaChartBar,
    color: "text-[#FF9F1C]",
  },
  {
    type: "retrieval",
    label: "Retrieval",
    icon: FaSearch,
    color: "text-[#FF5733]",
  },
  {
    type: "auth",
    label: "Authentication",
    icon: FaLock,
    color: "text-[#4CAF50]",
  },
];

const Toolbar: React.FC = () => {
  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: string
  ) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="w-64 bg-[#10002B] overflow-y-auto border-r border-[#3C096C] pt-16">
      <div className="p-4 space-y-2">
        <h1 className="text-[#3BF4FB] font-permanent-marker text-2xl mb-4">
          Ability Builder
        </h1>
        {toolbarItems.map((item) => (
          <div
            key={item.type}
            className="flex items-center p-2 rounded-md cursor-move bg-[#240046] hover:bg-[#3C096C] transition-colors"
            onDragStart={(event) => onDragStart(event, item.type)}
            draggable
          >
            <item.icon className={`mr-2 ${item.color}`} />
            <span className="text-sm text-white font-outfit">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Toolbar;
