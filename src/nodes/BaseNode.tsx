import React, { useState } from "react";
import { Handle, Position } from "@xyflow/react";
import { Plus, CreditCard as Edit, Trash2, Copy } from "lucide-react";
import { NodeContextMenu } from "./NodeContextMenu";

type BaseNodeProps = {
  data: {
    label?: string;
    [key: string]: any;
  };
  icon: React.ReactNode;
  color: string;
  showInput?: boolean;
  showOutput?: boolean;
};

export function BaseNode({
  data,
  icon,
  color,
  showInput = true,
  showOutput = true,
}: BaseNodeProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      className="relative min-w-[200px] rounded-lg border-2 bg-white shadow-md"
      style={{ borderColor: color }}
    >
      {/* INPUT */}
      {showInput && (
        <Handle
          type="target"
          position={Position.Top}
          className="!bg-neutral-400"
        />
      )}

      {/* CONTENT */}
      <div className="flex items-center justify-between gap-3 p-3">
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-lg text-white"
            style={{ backgroundColor: color }}
          >
            {icon}
          </div>

          <div className="font-medium text-sm text-neutral-900">
            {data.label || "Sin título"}
          </div>
        </div>

        {/* BOTÓN + */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen((v) => !v);
          }}
          className="flex h-6 w-6 items-center justify-center rounded border text-neutral-600 hover:bg-neutral-100"
        >
          <Plus size={14} />
        </button>
      </div>

      {/* MENÚ CONTEXTUAL */}
      {menuOpen && (
        <div
          className="absolute right-2 top-12 z-50"
          onClick={(e) => e.stopPropagation()}
        >
          <NodeContextMenu
            items={[
              {
                label: "Edit",
                icon: <Edit size={16} />,
                onClick: () => {
                  console.log("edit node");
                  setMenuOpen(false);
                }
              },
              {
                label: "Duplicate",
                icon: <Copy size={16} />,
                onClick: () => {
                  console.log("duplicate node");
                  setMenuOpen(false);
                }
              },
              {
                label: "Delete",
                icon: <Trash2 size={16} />,
                onClick: () => {
                  console.log("delete node");
                  setMenuOpen(false);
                }
              }
            ]}
          />
        </div>
      )}

      {/* OUTPUT */}
      {showOutput && (
        <Handle
          type="source"
          position={Position.Bottom}
          className="!bg-neutral-400"
        />
      )}
    </div>
  );
}
