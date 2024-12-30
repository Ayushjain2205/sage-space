import React from "react";
import { ReactFlowProvider } from "reactflow";
import Toolbar from "./Toolbar";
import WorkflowCanvas from "./WorkflowCanvas";
import { AlertTriangle } from "lucide-react";

const AgentWorkflowBuilder: React.FC = () => {
  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-[#10002B] to-[#3B0764] font-outfit relative overflow-hidden">
      <WorkInProgressBanner position="top" />
      <div className="bg-[#240046] h-12 flex items-center px-4 z-10 relative"></div>
      <div className="flex flex-grow">
        <Toolbar />
        <div className="flex-grow relative">
          <ReactFlowProvider>
            <WorkflowCanvas />
          </ReactFlowProvider>
        </div>
      </div>
      <WorkInProgressBanner position="bottom" />
    </div>
  );
};

const WorkInProgressBanner: React.FC<{ position: "top" | "bottom" }> = ({
  position,
}) => {
  return (
    <div
      className={`
        absolute left-0 right-0 h-12 bg-yellow-400 flex items-center overflow-hidden z-50
        ${position === "top" ? "top-0" : "bottom-0"}
      `}
    >
      <div className="animate-marquee whitespace-nowrap flex items-center">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="flex items-center mx-4">
            <AlertTriangle className="w-6 h-6 mr-2 text-[#10002B]" />
            <span className="text-[#10002B] font-permanent-marker text-lg">
              Work in Progress
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgentWorkflowBuilder;
