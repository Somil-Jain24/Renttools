import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Send } from "lucide-react";
import { myRentals } from "@/lib/mockData";
import { ChatMessage } from "@/lib/mockData";

const Chat = () => {
  const navigate = useNavigate();
  const { rentalId } = useParams<{ rentalId: string }>();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const rental = myRentals.find((r) => r.id === rentalId);

  useEffect(() => {
    if (rental?.chatMessages) {
      setMessages(rental.chatMessages);
    }
  }, [rental]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg: ChatMessage = {
        id: Date.now().toString(),
        senderId: "me",
        senderName: "You",
        text: newMessage,
        timestamp: new Date().toLocaleString(),
      };
      setMessages([...messages, newMsg]);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!rental) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <div className="container mx-auto flex-1 px-4 py-8 max-w-2xl flex items-center justify-center">
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground mb-4">
                Rental not found
              </p>
              <Button onClick={() => navigate("/my-rentals")}>
                Back to My Rentals
              </Button>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <div className="container mx-auto flex-1 px-4 py-8 max-w-2xl flex flex-col">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/my-rentals")}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Back
          </Button>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Chat with Owner</h1>
              <p className="text-muted-foreground">
                {rental.tool.owner.name}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Rental: {rental.tool.name}
              </p>
            </div>
          </div>
        </div>

        {/* Chat Card */}
        <Card className="flex flex-col flex-1">
          {/* Messages Container */}
          <CardContent
            className="flex-1 p-6 overflow-y-auto max-h-[400px]"
            ref={scrollRef}
          >
            <div className="space-y-4">
              {messages.length === 0 ? (
                <div className="flex items-center justify-center h-32 text-muted-foreground">
                  <p>No messages yet. Start the conversation!</p>
                </div>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.senderId === "me" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                        msg.senderId === "me"
                          ? "bg-blue-500 text-white"
                          : "bg-muted text-foreground"
                      }`}
                    >
                      {msg.senderId !== "me" && (
                        <p className="text-xs font-semibold mb-1 opacity-80">
                          {msg.senderName}
                        </p>
                      )}
                      <p className="text-sm">{msg.text}</p>
                      <p
                        className={`text-xs mt-1 ${
                          msg.senderId === "me"
                            ? "opacity-70"
                            : "text-muted-foreground"
                        }`}
                      >
                        {msg.timestamp}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>

          {/* Message Input */}
          <div className="border-t p-6">
            <div className="flex gap-2">
              <Input
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                size="sm"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default Chat;
