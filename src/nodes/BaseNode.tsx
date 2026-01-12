import React, { useState } from "react";
import { Handle, Position } from "@xyflow/react";
import { Plus, CreditCard as Edit, Trash2, Copy } from "lucide-react";
import { NodeContextMenu } from "./NodeContextMenu";

type BaseNodeProps = {
  id: string;
  data: {
    label?: string;
    [key: string]: any;
  };
  icon: React.ReactNode;
  color: string;
  showInput?: boolean;
  showOutput?: boolean;
  onEdit?: (id: string) => void;
  onDuplicate?: (id: string) => void;
  onDelete?: (id: string) => void;
  onRename?: (id: string) => void;
};

export function BaseNode({
  id,
  data,
  icon,
  color,
  showInput = true,
  showOutput = true,
  onEdit,
  onDuplicate,
  onDelete,
  onRename,
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
                label: "Editar",
                icon: <Edit size={16} />,
                onClick: () => {
                  onEdit?.(id);
                  setMenuOpen(false);
                }
              },
              {
                label: "Renombrar",
                icon: <Edit size={16} />,
                onClick: () => {
                  onRename?.(id);
                  setMenuOpen(false);
                }
              },
              {
                label: "Duplicar",
                icon: <Copy size={16} />,
                onClick: () => {
                  onDuplicate?.(id);
                  setMenuOpen(false);
                }
              },
              {
                label: "Eliminar",
                icon: <Trash2 size={16} />,
                onClick: () => {
                  onDelete?.(id);
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

      {/* Click outside to close menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </div>
  );
}
