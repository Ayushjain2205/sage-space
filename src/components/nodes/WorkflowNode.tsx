import React, { memo, useState } from "react";
import { Handle, Position, NodeProps } from "reactflow";
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

const icons: { [key: string]: IconType } = {
  llm: FaBrain,
  memory: FaDatabase,
  api: FaGlobe,
  agent: FaRobot,
  prompt: FaComments,
  function: FaCode,
  tool: FaCog,
  output: FaChartBar,
  retrieval: FaSearch,
  auth: FaLock,
};

const WorkflowNode = ({ data }: NodeProps) => {
  const Icon = icons[data.type] || FaCog;
  const [nodeData, setNodeData] = useState<{ [key: string]: string }>({});

  const handleInputChange = (key: string, value: string) => {
    setNodeData((prev) => ({ ...prev, [key]: value }));
  };

  const renderInputs = () => {
    switch (data.type) {
      case "llm":
        return (
          <select
            value={nodeData.model || ""}
            onChange={(e) => handleInputChange("model", e.target.value)}
            className="w-full px-3 py-2 mt-2 text-sm bg-[#3B0764] border border-[#7B2CBF] rounded-md focus:outline-none focus:border-[#E0AAFF] text-white font-outfit"
          >
            <option value="">Select LLM</option>
            <option value="openai">OpenAI</option>
            <option value="claude">Claude</option>
            <option value="gemini">Gemini</option>
          </select>
        );
      case "api":
        return (
          <>
            <input
              type="text"
              value={nodeData.endpoint || ""}
              onChange={(e) => handleInputChange("endpoint", e.target.value)}
              placeholder="API Endpoint"
              className="w-full px-3 py-2 mt-2 text-sm bg-[#3B0764] border border-[#7B2CBF] rounded-md focus:outline-none focus:border-[#E0AAFF] text-white font-outfit"
            />
            <input
              type="text"
              value={nodeData.params || ""}
              onChange={(e) => handleInputChange("params", e.target.value)}
              placeholder="Parameters (JSON)"
              className="w-full px-3 py-2 mt-2 text-sm bg-[#3B0764] border border-[#7B2CBF] rounded-md focus:outline-none focus:border-[#E0AAFF] text-white font-outfit"
            />
          </>
        );
      case "memory":
        return (
          <select
            value={nodeData.type || ""}
            onChange={(e) => handleInputChange("type", e.target.value)}
            className="w-full px-3 py-2 mt-2 text-sm bg-[#3B0764] border border-[#7B2CBF] rounded-md focus:outline-none focus:border-[#E0AAFF] text-white font-outfit"
          >
            <option value="">Select Memory Type</option>
            <option value="short-term">Short-term</option>
            <option value="long-term">Long-term</option>
            <option value="episodic">Episodic</option>
          </select>
        );
      case "prompt":
        return (
          <textarea
            value={nodeData.content || ""}
            onChange={(e) => handleInputChange("content", e.target.value)}
            placeholder="Enter prompt template"
            className="w-full px-3 py-2 mt-2 text-sm bg-[#3B0764] border border-[#7B2CBF] rounded-md focus:outline-none focus:border-[#E0AAFF] text-white font-outfit resize-none h-20"
          />
        );
      default:
        return (
          <input
            type="text"
            value={nodeData.default || ""}
            onChange={(e) => handleInputChange("default", e.target.value)}
            placeholder={`Enter ${data.label.toLowerCase()} details`}
            className="w-full px-3 py-2 mt-2 text-sm bg-[#3B0764] border border-[#7B2CBF] rounded-md focus:outline-none focus:border-[#E0AAFF] text-white font-outfit"
          />
        );
    }
  };

  return (
    <div className="px-4 py-3 rounded-lg bg-[#44318D] border border-[#7B2CBF] text-white w-64 shadow-lg">
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 !bg-[#3BF4FB]"
      />
      <div className="flex items-center mb-2">
        <Icon className={`mr-2 text-[#3BF4FB]`} />
        <div className="text-sm font-bold font-outfit">{data.label}</div>
      </div>
      {renderInputs()}
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 !bg-[#3BF4FB]"
      />
    </div>
  );
};

export default memo(WorkflowNode);
