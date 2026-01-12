import { 
  Play, 
  Send, 
  MessageSquare, 
  Clock, 
  GitBranch, 
  Database, 
  Zap,
  FileText,
  Image,
  Video,
  Mic,
  MapPin,
  Phone,
  Users,
  Calendar,
  ShoppingCart,
  CreditCard,
  Bot,
  UserCheck,
  Settings
} from "lucide-react";
import { BaseNode } from "./BaseNode";

export const StartNode = (props: any) => (
  <BaseNode {...props} icon={<Play size={20} />} color="#10b981" showInput={false} />
);

export const SendMessageNode = (props: any) => (
  <BaseNode {...props} icon={<Send size={20} />} color="#3b82f6" />
);

export const MessageReceivedNode = (props: any) => (
  <BaseNode {...props} icon={<MessageSquare size={20} />} color="#8b5cf6" showInput={false} />
);

export const WaitResponseNode = (props: any) => (
  <BaseNode {...props} icon={<Clock size={20} />} color="#f59e0b" />
);

export const ConditionNode = (props: any) => (
  <BaseNode {...props} icon={<GitBranch size={20} />} color="#ef4444" />
);

export const SaveDataNode = (props: any) => (
  <BaseNode {...props} icon={<Database size={20} />} color="#06b6d4" />
);

export const WebhookNode = (props: any) => (
  <BaseNode {...props} icon={<Zap size={20} />} color="#a855f7" />
);

export const SendImageNode = (props: any) => (
  <BaseNode {...props} icon={<Image size={20} />} color="#22c55e" />
);

export const SendVideoNode = (props: any) => (
  <BaseNode {...props} icon={<Video size={20} />} color="#f97316" />
);

export const SendAudioNode = (props: any) => (
  <BaseNode {...props} icon={<Mic size={20} />} color="#84cc16" />
);

export const SendDocumentNode = (props: any) => (
  <BaseNode {...props} icon={<FileText size={20} />} color="#6366f1" />
);

export const SendLocationNode = (props: any) => (
  <BaseNode {...props} icon={<MapPin size={20} />} color="#ec4899" />
);

export const SendContactNode = (props: any) => (
  <BaseNode {...props} icon={<Phone size={20} />} color="#14b8a6" />
);

export const CreateGroupNode = (props: any) => (
  <BaseNode {...props} icon={<Users size={20} />} color="#8b5cf6" />
);

export const ScheduleMessageNode = (props: any) => (
  <BaseNode {...props} icon={<Calendar size={20} />} color="#f59e0b" />
);

export const SendCatalogNode = (props: any) => (
  <BaseNode {...props} icon={<ShoppingCart size={20} />} color="#059669" />
);

export const PaymentRequestNode = (props: any) => (
  <BaseNode {...props} icon={<CreditCard size={20} />} color="#dc2626" />
);

export const BotResponseNode = (props: any) => (
  <BaseNode {...props} icon={<Bot size={20} />} color="#7c3aed" />
);

export const UserValidationNode = (props: any) => (
  <BaseNode {...props} icon={<UserCheck size={20} />} color="#0891b2" />
);

export const ConfigurationNode = (props: any) => (
  <BaseNode {...props} icon={<Settings size={20} />} color="#64748b" />
);

export const nodeTypes = {
  startNode: StartNode,
  sendMessageNode: SendMessageNode,
  messageReceivedNode: MessageReceivedNode,
  waitResponseNode: WaitResponseNode,
  conditionNode: ConditionNode,
  saveDataNode: SaveDataNode,
  webhookNode: WebhookNode,
  sendImageNode: SendImageNode,
  sendVideoNode: SendVideoNode,
  sendAudioNode: SendAudioNode,
  sendDocumentNode: SendDocumentNode,
  sendLocationNode: SendLocationNode,
  sendContactNode: SendContactNode,
  createGroupNode: CreateGroupNode,
  scheduleMessageNode: ScheduleMessageNode,
  sendCatalogNode: SendCatalogNode,
  paymentRequestNode: PaymentRequestNode,
  botResponseNode: BotResponseNode,
  userValidationNode: UserValidationNode,
  configurationNode: ConfigurationNode,
};
