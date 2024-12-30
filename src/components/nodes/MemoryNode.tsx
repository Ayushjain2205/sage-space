import React, { memo } from "react";
import { Handle, Position, NodeProps } from "reactflow";

const MemoryNode = ({ data }: NodeProps) => {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-[#E0AAFF] text-[#10002B]">
      <Handle
        type="target"
        position={Position.Top}
        className="w-16 !bg-[#7B2CBF]"
      />
      <div className="font-bold">{data.label}</div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-16 !bg-[#3BF4FB]"
      />
    </div>
  );
};

export default memo(MemoryNode);
