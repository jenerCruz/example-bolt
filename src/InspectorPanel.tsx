import React from "react";
import { Node } from "@xyflow/react";
import { TextField } from "./ui/components/TextField";
import { Button } from "./ui/components/Button";
import { Info } from "lucide-react";

type InspectorPanelProps = {
  node: Node | null;
  onChange: (data: any) => void;
};

export function InspectorPanel({ node, onChange }: InspectorPanelProps) {
  if (!node) {
    return (
      <aside className="flex h-full w-full flex-col gap-4 p-4">
        <div className="flex items-center gap-2">
          <Info className="h-5 w-5 text-neutral-400" />
          <h3 className="font-semibold text-neutral-900">Inspector</h3>
        </div>
        <p className="text-sm text-neutral-500">
          Selecciona un nodo del canvas para ver y editar sus propiedades
        </p>
      </aside>
    );
  }

  const update = (key: string, value: any) => {
    onChange({
      ...node.data,
      [key]: value,
    });
  };

  return (
    <aside className="flex h-full w-full flex-col gap-4 overflow-y-auto p-4">
      <div className="flex items-center gap-2">
        <Info className="h-5 w-5 text-[#ff0071]" />
        <h3 className="font-semibold text-neutral-900">Inspector</h3>
      </div>

      <div className="flex flex-col gap-4">
        <TextField label="Etiqueta del nodo">
          <TextField.Input
            value={String(node.data?.label ?? "")}
            onChange={(e) => update("label", e.target.value)}
            placeholder="Escribe un nombre..."
          />
        </TextField>

        {"message" in (node.data || {}) && (
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-neutral-700">
              Mensaje
            </label>
            <textarea
              value={String(node.data?.message ?? "")}
              onChange={(e) => update("message", e.target.value)}
              placeholder="Escribe el mensaje..."
              rows={4}
              className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm transition-colors focus:border-[#ff0071] focus:outline-none focus:ring-2 focus:ring-pink-100"
            />
          </div>
        )}

        {"url" in (node.data || {}) && (
          <TextField label="URL del Webhook">
            <TextField.Input
              value={String(node.data?.url ?? "")}
              onChange={(e) => update("url", e.target.value)}
              placeholder="https://..."
            />
          </TextField>
        )}

        {"condition" in (node.data || {}) && (
          <TextField label="Condición">
            <TextField.Input
              value={String(node.data?.condition ?? "")}
              onChange={(e) => update("condition", e.target.value)}
              placeholder="ej: respuesta == 'si'"
            />
          </TextField>
        )}

        <div className="mt-2 rounded-lg bg-neutral-50 p-3">
          <p className="text-xs text-neutral-600">
            <strong>ID:</strong> {node.id}
          </p>
          <p className="text-xs text-neutral-600">
            <strong>Tipo:</strong> {node.type}
          </p>
        </div>
      </div>
    </aside>
  );
}
