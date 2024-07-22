// import { Message, UserData } from "@/app/data";

import React from "react";
import { ChatList } from "./ChatList";
import { Message, UserData } from "@/interfaces/data";
import ChatTopbar from "./TopBar";

interface ChatProps {
  messages?: Message[];
  selectedUser: UserData;
  isMobile: boolean;
}

export function Chat({ messages, selectedUser, isMobile }: ChatProps) {
  const [messagesState, setMessages] = React.useState<Message[]>(
    messages ?? []
  );

  const sendMessage = (newMessage: Message) => {
    setMessages([...messagesState, newMessage]);
  };
  return (
    <div className="flex flex-col justify-between w-full h-full col-span-4">
      <ChatTopbar selectedUser={selectedUser} />
      <ChatList
        selectedUser={selectedUser}
        sendMessage={sendMessage}
        isMobile={isMobile}
      />
    </div>
  );
}
