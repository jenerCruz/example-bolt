import React, { useCallback, useState } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  addEdge,
  Connection,
  Edge,
  Node,
  useNodesState,
  useEdgesState,
  NodeChange,
  EdgeChange,
  ConnectionLineType,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { Edit2, Save, Play } from "lucide-react";

import { Badge } from "./ui/components/Badge";
import { Button } from "./ui/components/Button";
import { TextField } from "./ui/components/TextField";

import { EditorLayout } from "./ui/layouts/EditorLayout";
import { Sidebar } from "./Sidebar";
import { InspectorPanel } from "./InspectorPanel";
import { nodeTypes } from "./nodes";

function createsCycle(
  sourceId: string,
  targetId: string,
  edges: Edge[]
): boolean {
  const graph: Record<string, string[]> = {};

  edges.forEach((e) => {
    if (!graph[e.source]) graph[e.source] = [];
    graph[e.source].push(e.target);
  });

  if (!graph[sourceId]) graph[sourceId] = [];
  graph[sourceId].push(targetId);

  const visited = new Set<string>();
  const stack = new Set<string>();

  function dfs(node: string): boolean {
    if (stack.has(node)) return true;
    if (visited.has(node)) return false;

    visited.add(node);
    stack.add(node);

    for (const next of graph[node] || []) {
      if (dfs(next)) return true;
    }

    stack.delete(node);
    return false;
  }

  return dfs(sourceId);
}

function isValidConnection(
  connection: Connection,
  nodes: Node[],
  edges: Edge[]
): boolean {
  const { source, target } = connection;
  if (!source || !target) return false;

  const sourceNode = nodes.find((n) => n.id === source);
  const targetNode = nodes.find((n) => n.id === target);

  if (!sourceNode || !targetNode) return false;

  if (targetNode.type === "startNode" || targetNode.type === "messageReceivedNode") {
    return false;
  }

  if (
    sourceNode.type === "customResponseNode" &&
    sourceNode.data?.isFinal
  ) {
    return false;
  }

  const inputUsed = edges.some((e) => e.target === target);
  if (inputUsed) return false;

  if (createsCycle(source, target, edges)) return false;

  return true;
}

const initialNodes: Node[] = [
  {
    id: "start",
    type: "startNode",
    position: { x: 250, y: 100 },
    data: { label: "Inicio del flujo" },
  },
];

const initialEdges: Edge[] = [];

const defaultEdgeOptions = {
  animated: true,
  style: { stroke: "#ff0071", strokeWidth: 2 },
  type: "smoothstep" as const,
};

const connectionLineStyle = {
  stroke: "#ff0071",
  strokeWidth: 2,
};

export default function WorkflowEditor() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [workflowName, setWorkflowName] = useState(
    "Mi Workflow de WhatsApp Bot"
  );
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  const onConnect = useCallback(
    (params: Connection) => {
      if (!isValidConnection(params, nodes, edges)) {
        console.warn("Conexión inválida", params);
        return;
      }
      setEdges((eds) => addEdge({ ...params, type: "smoothstep" }, eds));
    },
    [nodes, edges, setEdges]
  );

  const addNode = (type: string) => {
    if (type === "startNode") {
      const exists = nodes.some((n) => n.type === "startNode");
      if (exists) {
        alert("Solo puede existir un nodo de Inicio");
        return;
      }
    }

    const typeLabels: Record<string, string> = {
      startNode: "Inicio",
      messageReceivedNode: "Mensaje recibido",
      sendMessageNode: "Enviar mensaje",
      sendImageNode: "Enviar imagen",
      sendVideoNode: "Enviar video",
      sendAudioNode: "Enviar audio",
      sendDocumentNode: "Enviar documento",
      sendLocationNode: "Enviar ubicación",
      sendContactNode: "Enviar contacto",
      waitResponseNode: "Esperar respuesta",
      conditionNode: "Condición",
      saveDataNode: "Guardar datos",
      scheduleMessageNode: "Programar mensaje",
      createGroupNode: "Crear grupo",
      sendCatalogNode: "Catálogo",
      paymentRequestNode: "Solicitar pago",
      webhookNode: "Webhook",
      botResponseNode: "Respuesta IA",
      userValidationNode: "Validar usuario",
      configurationNode: "Configuración",
    };

    const newNode: Node = {
      id: crypto.randomUUID(),
      type,
      position: {
        x: 250 + Math.random() * 200,
        y: 150 + Math.random() * 200,
      },
      data: { label: typeLabels[type] || `Nuevo ${type}` },
    };

    setNodes((nds) => [...nds, newNode]);
  };

  const handleEditNode = useCallback((nodeId: string) => {
    const node = nodes.find(n => n.id === nodeId);
    if (node) {
      setSelectedNode(node);
    }
  }, [nodes]);

  const handleRenameNode = useCallback((nodeId: string) => {
    const newLabel = prompt("Nuevo nombre para el nodo:");
    if (newLabel) {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === nodeId
            ? { ...node, data: { ...node.data, label: newLabel } }
            : node
        )
      );
    }
  }, [setNodes]);

  const handleDuplicateNode = useCallback((nodeId: string) => {
    const nodeToDuplicate = nodes.find(n => n.id === nodeId);
    if (nodeToDuplicate) {
      const newNode: Node = {
        ...nodeToDuplicate,
        id: crypto.randomUUID(),
        position: {
          x: nodeToDuplicate.position.x + 50,
          y: nodeToDuplicate.position.y + 50,
        },
        data: {
          ...nodeToDuplicate.data,
          label: `${nodeToDuplicate.data.label} (copia)`,
        },
      };
      setNodes((nds) => [...nds, newNode]);
    }
  }, [nodes, setNodes]);

  const handleDeleteNode = useCallback((nodeId: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar este nodo?")) {
      setNodes((nds) => nds.filter((node) => node.id !== nodeId));
      setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
      if (selectedNode?.id === nodeId) {
        setSelectedNode(null);
      }
    }
  }, [setNodes, setEdges, selectedNode]);

  const handleNodeClick = useCallback(
    (_event: React.MouseEvent, node: Node) => {
      setSelectedNode(node);
    },
    []
  );

  const handlePaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  const handleNodeDataChange = useCallback(
    (newData: any) => {
      if (!selectedNode) return;

      setNodes((nds) =>
        nds.map((node) =>
          node.id === selectedNode.id
            ? { ...node, data: newData }
            : node
        )
      );

      setSelectedNode((prev) =>
        prev ? { ...prev, data: newData } : null
      );
    },
    [selectedNode, setNodes]
  );

  const handleSave = () => {
    const workflow = {
      name: workflowName,
      nodes,
      edges,
      lastModified: new Date().toISOString(),
    };
    console.log("Guardando workflow:", workflow);
    alert("Workflow guardado correctamente");
  };

  const handleExecute = () => {
    console.log("Ejecutando workflow con nodos:", nodes);
    alert("Iniciando ejecución del workflow...");
  };

  // Enhanced node types with action handlers
  const enhancedNodeTypes = Object.fromEntries(
    Object.entries(nodeTypes).map(([key, Component]) => [
      key,
      (props: any) => (
        <Component
          {...props}
          onEdit={handleEditNode}
          onRename={handleRenameNode}
          onDuplicate={handleDuplicateNode}
          onDelete={handleDeleteNode}
        />
      ),
    ])
  );

  return (
    <EditorLayout
      sidebar={<Sidebar onAddNode={addNode} />}
      inspector={
        <InspectorPanel
          node={selectedNode}
          onChange={handleNodeDataChange}
        />
      }
    >
      <div className="flex h-full w-full flex-col">
        <div className="flex flex-col gap-3 border-b bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <TextField className="w-full sm:w-80">
              <TextField.Input
                value={workflowName}
                onChange={(e) => setWorkflowName(e.target.value)}
                placeholder="Nombre del workflow"
              />
            </TextField>
            <Badge variant="neutral" icon={<Edit2 size={14} />}>
              Editando
            </Badge>
          </div>

          <div className="flex gap-2">
            <Button
              variant="neutral-secondary"
              icon={<Save size={16} />}
              onClick={handleSave}
            >
              <span className="hidden sm:inline">Guardar</span>
            </Button>
            <Button
              variant="brand-primary"
              icon={<Play size={16} />}
              onClick={handleExecute}
            >
              <span className="hidden sm:inline">Ejecutar</span>
            </Button>
          </div>
        </div>

        <div className="flex-1 min-w-0 min-h-0 bg-neutral-50">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={handleNodeClick}
            onPaneClick={handlePaneClick}
            nodeTypes={enhancedNodeTypes}
            defaultEdgeOptions={defaultEdgeOptions}
            connectionLineStyle={connectionLineStyle}
            connectionLineType={ConnectionLineType.SmoothStep}
            fitView
            proOptions={{ hideAttribution: true }}
            className="touch-none"
          >
            <Background />
            <Controls className="hidden sm:flex" />
            <MiniMap
              className="hidden lg:block"
              nodeColor={(node) => {
                const colors: Record<string, string> = {
                  startNode: "#10b981",
                  sendMessageNode: "#3b82f6",
                  sendImageNode: "#22c55e",
                  sendVideoNode: "#f97316",
                  sendAudioNode: "#84cc16",
                  sendDocumentNode: "#6366f1",
                  sendLocationNode: "#ec4899",
                  sendContactNode: "#14b8a6",
                  messageReceivedNode: "#8b5cf6",
                  waitResponseNode: "#f59e0b",
                  conditionNode: "#ef4444",
                  saveDataNode: "#06b6d4",
                  scheduleMessageNode: "#f59e0b",
                  createGroupNode: "#8b5cf6",
                  sendCatalogNode: "#059669",
                  paymentRequestNode: "#dc2626",
                  webhookNode: "#a855f7",
                  botResponseNode: "#7c3aed",
                  userValidationNode: "#0891b2",
                  configurationNode: "#64748b",
                };
                return colors[node.type || "default"] || "#666";
              }}
            />
          </ReactFlow>
        </div>
      </div>
    </EditorLayout>
  );
}
