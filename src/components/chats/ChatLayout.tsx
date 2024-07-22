import React, { useEffect, useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { cn } from "@/lib/utils";
import { UserData, userData } from "@/interfaces/data";
import { Chat } from "./Chat";
import { Sidebar } from "./SideBar";
import { useQuery } from "@tanstack/react-query";
import { getChatList, getConversation } from "@/http/auth";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Pusher from "pusher-js";
import { baseApiUrl } from "@/config/app.config";
import { Empty } from "antd";
import { useLocation } from "react-router-dom";

interface ChatLayoutProps {
  defaultLayout?: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize?: number;
}

export function ChatLayout({
  defaultLayout = [100, 100],
  defaultCollapsed = false,
  navCollapsedSize,
}: ChatLayoutProps) {
  const { state } = useLocation();
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
  const [isMobile, setIsMobile] = useState(false);
  const { user, userChat } = useSelector((state: RootState) => state.auth);
  const [messagesList, setMessagesList] = useState<any>([]);
  const [receiver, setReceiver] = useState<UserData | null>(null);
  
  useEffect(() => {
    const checkScreenWidth = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    checkScreenWidth();

    // Event listener for screen width changes
    window.addEventListener("resize", checkScreenWidth);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", checkScreenWidth);
    };
  }, []);

  const chatList: any = useQuery({
    queryKey: ["chat-list", user?._id, user?.send],
    queryFn: async () => {
      return getChatList(user?._id);
    },
  });

  // useEffect(() => {
  //   if (chatList.isSuccess) {
  //     console.log('first')
  //     setMessagesList(chatList?.data?.data?.data);
  //   }
  // }, [chatList.isSuccess]);

  useEffect(() => {
    if (user) {
      chatList.refetch();

      const pusher = new Pusher("b93d4d5049ce1bb75f6d", {
        cluster: "ap2",
        authEndpoint: `${baseApiUrl}/chat/login`,
        auth: {
          params: {
            id: user._id,
          },
        },
      });

      const channel = pusher.subscribe(`private-chat-${user._id}`);
      channel.bind("list", (data: any) => {
        console.log("data", data);
        if (data) {
          // setMessagesList(data);
          chatList.refetch();
        }
      });

      return () => {
        channel.unbind_all();
        channel.unsubscribe();
      };
    }
  }, [user]);

  return (
    <ResizablePanelGroup
      direction="horizontal"
      onLayout={(sizes: number[]) => {
        document.cookie = `react-resizable-panels:layout=${JSON.stringify(
          sizes
        )}`;
      }}
      className="max-h-[calc(100vh-100px)] min-h-[calc(100vh-100px)] items-stretch"
    >
      <ResizablePanel
        defaultSize={defaultLayout[0]}
        collapsedSize={navCollapsedSize}
        collapsible={true}
        minSize={isMobile ? 0 : 24}
        maxSize={isMobile ? 8 : 30}
        onCollapse={() => {
          setIsCollapsed(true);
          document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
            true
          )}`;
        }}
        onExpand={() => {
          setIsCollapsed(false);
          document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
            false
          )}`;
        }}
        className={cn(
          isCollapsed &&
            "min-w-[50px] md:min-w-[100px] transition-all duration-300 ease-in-out"
        )}
      >
        <Sidebar
          isCollapsed={isCollapsed || isMobile}
          setReceiver={setReceiver}
          onPress={() => {}}
          links={chatList?.data?.data?.data?.map(
            ({ lastMessage, email, userId, unreadCount, username }: any) => ({
              username: username,
              email: email,
              last: lastMessage?.text ?? "-",
              userId: userId ?? "",
              unreadCount: unreadCount ?? 0,
              lastTime: lastMessage?.timestamp ?? "2024-07-16T19:33:34.990Z",
              // avatar: user.avatar,
              // variant: selectedUser.name === user.name ? "grey" : "ghost",
            })
          )}
          isMobile={isMobile}
        />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
        {userChat && (
          <Chat messages={[]} selectedUser={userChat} isMobile={isMobile} />
        )}
        {userChat == null && (
          <Empty className="my-16" description="Go To Profile And Start Chat" />
        )}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
