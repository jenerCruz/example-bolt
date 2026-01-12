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
  Image,
  Video,
  Mic,
  FileText,
  MapPin,
  Phone,
  Users,
  Calendar,
  ShoppingCart,
  CreditCard,
  Bot,
  UserCheck,
  Settings,
} from "lucide-react";
import { IconWithBackground } from "./ui/components/IconWithBackground";

type SidebarProps = {
  onAddNode: (type: string) => void;
  collapsed?: boolean;
};

export function Sidebar({ onAddNode, collapsed = false }: SidebarProps) {
  return (
    <div className={`flex h-full flex-col gap-4 py-4 overflow-y-auto transition-all duration-300 ${collapsed ? 'px-2' : 'px-4'}`}>
      <div className={`flex items-center gap-2 px-1 ${collapsed ? 'justify-center' : ''}`}>
        <Workflow className="h-5 w-5 text-[#ff0071]" />
        {!collapsed && <h2 className="text-lg font-semibold">Componentes</h2>}
      </div>

      <Section title="TRIGGERS" collapsed={collapsed}>
        <Item
          icon={<Play size={18} />}
          label="Inicio"
          desc="Punto de entrada"
          onClick={() => onAddNode("startNode")}
          collapsed={collapsed}
        />
        <Item
          icon={<MessageSquare size={18} />}
          label="Mensaje recibido"
          desc="Escucha mensajes"
          onClick={() => onAddNode("messageReceivedNode")}
          collapsed={collapsed}
        />
      </Section>

      <Section title="MENSAJES" collapsed={collapsed}>
        <Item
          icon={<Send size={18} />}
          label="Enviar mensaje"
          desc="Texto WhatsApp"
          onClick={() => onAddNode("sendMessageNode")}
          collapsed={collapsed}
        />
        <Item
          icon={<Image size={18} />}
          label="Enviar imagen"
          desc="Imagen/foto"
          onClick={() => onAddNode("sendImageNode")}
          collapsed={collapsed}
        />
        <Item
          icon={<Video size={18} />}
          label="Enviar video"
          desc="Video/GIF"
          onClick={() => onAddNode("sendVideoNode")}
          collapsed={collapsed}
        />
        <Item
          icon={<Mic size={18} />}
          label="Enviar audio"
          desc="Audio/voz"
          onClick={() => onAddNode("sendAudioNode")}
          collapsed={collapsed}
        />
        <Item
          icon={<FileText size={18} />}
          label="Enviar documento"
          desc="PDF/archivo"
          onClick={() => onAddNode("sendDocumentNode")}
          collapsed={collapsed}
        />
        <Item
          icon={<MapPin size={18} />}
          label="Enviar ubicación"
          desc="Localización"
          onClick={() => onAddNode("sendLocationNode")}
          collapsed={collapsed}
        />
        <Item
          icon={<Phone size={18} />}
          label="Enviar contacto"
          desc="Información contacto"
          onClick={() => onAddNode("sendContactNode")}
          collapsed={collapsed}
        />
      </Section>

      <Section title="ACCIONES" collapsed={collapsed}>
        <Item
          icon={<Clock size={18} />}
          label="Esperar respuesta"
          desc="Pausa flujo"
          onClick={() => onAddNode("waitResponseNode")}
          collapsed={collapsed}
        />
        <Item
          icon={<GitBranch size={18} />}
          label="Condición"
          desc="If / else"
          onClick={() => onAddNode("conditionNode")}
          collapsed={collapsed}
        />
        <Item
          icon={<Database size={18} />}
          label="Guardar datos"
          desc="Persistir info"
          onClick={() => onAddNode("saveDataNode")}
          collapsed={collapsed}
        />
        <Item
          icon={<Calendar size={18} />}
          label="Programar mensaje"
          desc="Envío diferido"
          onClick={() => onAddNode("scheduleMessageNode")}
          collapsed={collapsed}
        />
        <Item
          icon={<Users size={18} />}
          label="Crear grupo"
          desc="Nuevo grupo"
          onClick={() => onAddNode("createGroupNode")}
          collapsed={collapsed}
        />
      </Section>

      <Section title="COMERCIO" collapsed={collapsed}>
        <Item
          icon={<ShoppingCart size={18} />}
          label="Catálogo"
          desc="Mostrar productos"
          onClick={() => onAddNode("sendCatalogNode")}
          collapsed={collapsed}
        />
        <Item
          icon={<CreditCard size={18} />}
          label="Solicitar pago"
          desc="Cobro WhatsApp"
          onClick={() => onAddNode("paymentRequestNode")}
          collapsed={collapsed}
        />
      </Section>

      <Section title="INTEGRACIONES" collapsed={collapsed}>
        <Item
          icon={<Zap size={18} />}
          label="Webhook"
          desc="HTTP externo"
          onClick={() => onAddNode("webhookNode")}
          collapsed={collapsed}
        />
        <Item
          icon={<Bot size={18} />}
          label="Respuesta IA"
          desc="Bot inteligente"
          onClick={() => onAddNode("botResponseNode")}
          collapsed={collapsed}
        />
        <Item
          icon={<UserCheck size={18} />}
          label="Validar usuario"
          desc="Verificación"
          onClick={() => onAddNode("userValidationNode")}
          collapsed={collapsed}
        />
        <Item
          icon={<Settings size={18} />}
          label="Configuración"
          desc="Ajustes bot"
          onClick={() => onAddNode("configurationNode")}
          collapsed={collapsed}
        />
      </Section>
    </div>
  );
}

function Section({
  title,
  children,
  collapsed = false,
}: {
  title: string;
  children: React.ReactNode;
  collapsed?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      {!collapsed && <span className="px-1 text-xs font-bold text-neutral-500">{title}</span>}
      {children}
    </div>
  );
}

function Item({
  icon,
  label,
  desc,
  onClick,
  collapsed = false,
}: {
  icon: React.ReactNode;
  label: string;
  desc: string;
  onClick: () => void;
  collapsed?: boolean;
}) {
  if (collapsed) {
    return (
      <button
        onClick={onClick}
        className="flex w-full items-center justify-center rounded-lg border border-neutral-200 bg-white p-3 transition-all hover:border-[#ff0071] hover:shadow-sm active:scale-95"
        title={`${label} - ${desc}`}
      >
        <IconWithBackground icon={icon} size="small" variant="brand" />
      </button>
    );
  }

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
