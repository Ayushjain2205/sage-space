import React, { useState, useRef, useEffect } from "react";
import { Send, Loader2, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Message {
  role: "user" | "ai";
  content: string;
}

interface AICompanionSimulatorProps {
  aiName: string;
  firstMessage: string;
  personality: string;
  avatarUrl?: string;
}

export default function AICompanionSimulator({
  aiName,
  firstMessage,
  personality,
}: AICompanionSimulatorProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      content:
        firstMessage || `Hello! I'm ${aiName}. How can I assist you today?`,
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (input.trim()) {
      setMessages((prev) => [...prev, { role: "user", content: input }]);
      setInput("");
      setIsTyping(true);

      // Simulate AI response
      setTimeout(() => {
        const aiResponse = simulateAIResponse(input, personality);
        setMessages((prev) => [...prev, { role: "ai", content: aiResponse }]);
        setIsTyping(false);
      }, Math.random() * 1000 + 500); // Random delay between 500ms and 1500ms
    }
  };

  const simulateAIResponse = (
    userInput: string,
    personality: string
  ): string => {
    // This is a basic simulation. In a real scenario, you'd use a more sophisticated AI model.
    const responses = [
      `As an AI with ${personality} traits, I'd say: That's an interesting point!`,
      `Given my ${personality} nature, I think we should consider multiple perspectives on this.`,
      `My ${personality} programming suggests that we could explore this topic further.`,
      `Interesting question! My ${personality} algorithms are processing the best way to respond.`,
      `Based on my ${personality} framework, I'd recommend looking into this more deeply.`,
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  return (
    <div className="flex flex-col h-[500px] bg-[#44318D] rounded-lg overflow-hidden">
      <ScrollArea className="flex-grow p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`flex items-start space-x-2 max-w-[80%] ${
                  message.role === "user"
                    ? "flex-row-reverse space-x-reverse"
                    : ""
                }`}
              >
                <Avatar className="w-8 h-8">
                  {message.role === "ai" ? (
                    <AvatarImage src="/sage.svg" alt={aiName} />
                  ) : (
                    <Avatar className="w-8 h-8 bg-[#3BF4FB]">
                      <AvatarFallback className="text-[#10002B] font-bold">
                        U
                      </AvatarFallback>
                    </Avatar>
                  )}
                </Avatar>
                <div
                  className={`rounded-lg px-3 py-2 ${
                    message.role === "user"
                      ? "bg-[#3BF4FB] text-[#10002B]"
                      : "bg-[#7B2CBF] text-[#E0AAFF]"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-center space-x-2 max-w-[80%]">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/sage.svg" alt={aiName} />
                </Avatar>
                <div className="bg-[#7B2CBF] text-[#E0AAFF] rounded-lg px-3 py-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      <div className="p-4 bg-[#7B2CBF]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex space-x-2"
        >
          <Input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow bg-[#44318D] text-[#E0AAFF] border-[#E0AAFF] focus:ring-[#3BF4FB]"
          />
          <Button
            type="submit"
            className="bg-[#3BF4FB] text-[#10002B] hover:bg-[#E0AAFF] hover:text-[#10002B]"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
