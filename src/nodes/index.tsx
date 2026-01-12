import { Play, Send, MessageSquare, Clock, GitBranch, Database, Zap } from "lucide-react";
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

export const nodeTypes = {
  startNode: StartNode,
  sendMessageNode: SendMessageNode,
  messageReceivedNode: MessageReceivedNode,
  waitResponseNode: WaitResponseNode,
  conditionNode: ConditionNode,
  saveDataNode: SaveDataNode,
  webhookNode: WebhookNode,
};
