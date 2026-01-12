import React from "react";
import {
  Play,
  MessageSquare,
  Send,
  Clock,
  GitBranch,
  Database,
  Zap,
  Workflow,
} from "lucide-react";
import { IconWithBackground } from "./ui/components/IconWithBackground";

type SidebarProps = {
  onAddNode: (type: string) => void;
};

export function Sidebar({ onAddNode }: SidebarProps) {
  return (
    <div className="flex h-full flex-col gap-6 px-4 py-4 overflow-y-auto">
      <div className="flex items-center gap-2 px-1">
        <Workflow className="h-5 w-5 text-[#ff0071]" />
        <h2 className="text-lg font-semibold">Componentes</h2>
      </div>

      <Section title="TRIGGERS">
        <Item
          icon={<Play size={18} />}
          label="Inicio"
          desc="Punto de entrada"
          onClick={() => onAddNode("startNode")}
        />
        <Item
          icon={<MessageSquare size={18} />}
          label="Mensaje recibido"
          desc="Escucha mensajes"
          onClick={() => onAddNode("messageReceivedNode")}
        />
      </Section>

      <Section title="ACCIONES">
        <Item
          icon={<Send size={18} />}
          label="Enviar mensaje"
          desc="Texto WhatsApp"
          onClick={() => onAddNode("sendMessageNode")}
        />
        <Item
          icon={<Clock size={18} />}
          label="Esperar respuesta"
          desc="Pausa flujo"
          onClick={() => onAddNode("waitResponseNode")}
        />
        <Item
          icon={<GitBranch size={18} />}
          label="Condición"
          desc="If / else"
          onClick={() => onAddNode("conditionNode")}
        />
        <Item
          icon={<Database size={18} />}
          label="Guardar datos"
          desc="Persistir info"
          onClick={() => onAddNode("saveDataNode")}
        />
      </Section>

      <Section title="INTEGRACIONES">
        <Item
          icon={<Zap size={18} />}
          label="Webhook"
          desc="HTTP externo"
          onClick={() => onAddNode("webhookNode")}
        />
      </Section>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="px-1 text-xs font-bold text-neutral-500">{title}</span>
      {children}
    </div>
  );
}

function Item({
  icon,
  label,
  desc,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  desc: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-start gap-3 rounded-lg border border-neutral-200 bg-white px-3 py-3 text-left transition-all hover:border-[#ff0071] hover:shadow-sm active:scale-95"
    >
      <IconWithBackground icon={icon} size="small" variant="brand" />
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-neutral-900">{label}</div>
        <div className="text-xs text-neutral-500">{desc}</div>
      </div>
    </button>
  );
}
