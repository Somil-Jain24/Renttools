import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { ChatMessage, RentalStatus } from "@/lib/mockData";
import { MessageCircle, Send, Lock } from "lucide-react";

interface RentalChatProps {
  messages: ChatMessage[];
  rentalStatus: RentalStatus;
  isOwner: boolean;
}

export function RentalChat({ messages, rentalStatus, isOwner }: RentalChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [newMessage, setNewMessage] = useState("");

  // Chat is only enabled after request is sent (for borrower) or after approval (visible to both)
  const chatEnabled = rentalStatus === "APPROVED" || rentalStatus === "BORROWED";
  const canSeeChat = rentalStatus !== "RETURNED" && (chatEnabled || rentalStatus === "REQUESTED");

  if (!canSeeChat) return null;

  if (!chatEnabled) {
    return (
      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2 p-2 rounded-lg bg-muted/50">
        <Lock className="h-3 w-3" />
        <span>{isOwner ? "Chat unlocks after you approve the request" : "Chat unlocks after the owner approves"}</span>
      </div>
    );
  }

  return (
    <div className="mt-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
      >
        <MessageCircle className="h-3.5 w-3.5" />
        Chat ({messages.length})
      </button>

      {isOpen && (
        <div className="mt-2 rounded-lg border bg-background p-3 space-y-2 max-h-48 flex flex-col">
          <div className="flex-1 overflow-y-auto space-y-2 min-h-0">
            {messages.length === 0 && (
              <p className="text-xs text-muted-foreground text-center py-4">No messages yet. Start a conversation!</p>
            )}
            {messages.map(msg => (
              <div key={msg.id} className={`flex flex-col ${msg.senderId === "me" ? "items-end" : "items-start"}`}>
                <div className={`rounded-lg px-3 py-1.5 text-xs max-w-[80%] ${msg.senderId === "me" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                  <p className="font-medium text-[10px] opacity-70 mb-0.5">{msg.senderName}</p>
                  <p>{msg.text}</p>
                </div>
                <span className="text-[10px] text-muted-foreground mt-0.5">{msg.timestamp}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-2 pt-1 border-t">
            <Input
              value={newMessage}
              onChange={e => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="h-8 text-xs"
              onKeyDown={e => e.key === "Enter" && newMessage.trim() && setNewMessage("")}
            />
            <Button size="sm" className="h-8 px-2" onClick={() => newMessage.trim() && setNewMessage("")}>
              <Send className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
