import React, { useCallback } from "react";
import ReactFlow, {
  Node,
  Edge,
  Connection,
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  Panel,
  Background,
} from "reactflow";
import "reactflow/dist/style.css";

import WorkflowNode from "./nodes/WorkflowNode";

const nodeTypes = {
  workflowNode: WorkflowNode,
};

const WorkflowCanvas = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { project } = useReactFlow();

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");

      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = project({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode: Node = {
        id: `${type}-${Date.now()}`,
        type: "workflowNode",
        position,
        data: {
          label: type.charAt(0).toUpperCase() + type.slice(1),
          type: type,
        },
      };

      setNodes((nds) => {
        const updatedNodes = nds.concat(newNode);

        if (nds.length > 0) {
          const lastNode = nds[nds.length - 1];
          setEdges((eds) =>
            eds.concat({
              id: `e${lastNode.id}-${newNode.id}`,
              source: lastNode.id,
              target: newNode.id,
              type: "smoothstep",
            })
          );
        }

        return updatedNodes;
      });
    },
    [project, setNodes, setEdges]
  );

  return (
    <div className="h-full pt-16 relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        nodeTypes={nodeTypes}
        fitView
        snapToGrid={true}
        snapGrid={[20, 20]}
      >
        <Background color="#E0AAFF" gap={16} size={1} />
        <Panel position="top-right" className="absolute top-4 right-4">
          <button
            onClick={() => {
              const flowExport = JSON.stringify({ nodes, edges });
              console.log(flowExport);
            }}
            className="px-4 py-2 bg-[#3BF4FB] text-[#10002B] rounded-md text-sm font-bold hover:bg-[#00FFFF] transition-colors shadow-md font-permanent-marker"
          >
            Export Flow
          </button>
        </Panel>
      </ReactFlow>
    </div>
  );
};

export default WorkflowCanvas;
