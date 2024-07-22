// import { cn } from "@/lib/utils";
// import { useEffect, useRef } from "react";
// import { Avatar, AvatarImage } from "../ui/avatar";
// import { AnimatePresence, motion } from "framer-motion";
// import ChatBottomBar from "./ChatBottomBar";
// import { Message, UserData } from "@/interfaces/data";
// import { useParams } from "react-router-dom";
// import { getConversation } from "@/http/auth";
// import { useQuery } from "@tanstack/react-query";
// import Pusher from "pusher-js";
// import { useSelector } from "react-redux";
// import { RootState } from "@/redux/store";
// import { baseApiUrl } from "@/config/app.config";
// interface ChatListProps {
//   messages?: Message[];
//   selectedUser: UserData;
//   sendMessage: (newMessage: Message) => void;
//   isMobile: boolean;
// }

// export function ChatList({
//   messages,
//   selectedUser,
//   sendMessage,
//   isMobile,
// }: ChatListProps) {
//   const messagesContainerRef = useRef<HTMLDivElement>(null);
//   const { receiver, sender } = useParams();
//   const { user } = useSelector((state: RootState) => state.auth);
//   useEffect(() => {
//     if (messagesContainerRef.current) {
//       messagesContainerRef.current.scrollTop =
//         messagesContainerRef.current.scrollHeight;
//     }
//   }, [messages]);

//   const conversations = useQuery({
//     queryKey: ["chat-conversation", receiver, sender],
//     queryFn: async () => {
//       if (!sender || !receiver) throw new Error("User ID is required");
//       return getConversation(sender, receiver);
//     },
//   });

//   useEffect(() => {
//     if (user) {
//       conversations.refetch();
//       const pusher = new Pusher("b93d4d5049ce1bb75f6d", {
//         cluster: "ap2",
//         authEndpoint: `${baseApiUrl}/chat/login`,
//         auth: {
//           params: {
//             id: user._id,
//           },
//         },
//       });

//       const channel = pusher.subscribe(`private-chat-${user._id}`);
//       channel.bind("message", (data: any) => {
//         console.log("data", data);
//         if (
//           (data.sender === user._id && data.receiver === receiver) ||
//           (data.sender === receiver && data.receiver === user._id)
//         ) {
//           // setMessages((prevMessages) => {
//           //   const isDuplicate = prevMessages.some(
//           //     (msg) => msg._id === data._id
//           //   );
//           //   if (!isDuplicate) {
//           //     return [...prevMessages, data];
//           //   }
//           //   return prevMessages;
//           // });
//         }
//       });

//       return () => {
//         channel.unbind_all();
//         channel.unsubscribe();
//       };
//     }
//   }, [user, receiver]);

//   return (
//     <div className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col">
//       <div
//         ref={messagesContainerRef}
//         className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col justify-end"
//       >
//         <AnimatePresence>
//           {conversations.data?.data?.data?.map((message: any, index: any) => (
//             <motion.div
//               key={index}
//               layout
//               initial={{ opacity: 0, scale: 1, y: 50, x: 0 }}
//               animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
//               exit={{ opacity: 0, scale: 1, y: 1, x: 0 }}
//               transition={{
//                 opacity: { duration: 0.1 },
//                 layout: {
//                   type: "spring",
//                   bounce: 0.3,
//                   duration: messages.indexOf(message) * 0.05 + 0.2,
//                 },
//               }}
//               style={{
//                 originX: 0.5,
//                 originY: 0.5,
//               }}
//               className={cn(
//                 "flex flex-col gap-2 p-4 whitespace-pre-wrap",
//                 message.sender != selectedUser._id ? "items-end" : "items-start"
//               )}
//             >
//               <div className="flex gap-3 items-start">
//                 {message?.receiver != selectedUser?._id && (
//                   <Avatar className="flex justify-center items-center">
//                     <AvatarImage
//                       src={"/user.png"}
//                       alt={message.name}
//                       width={6}
//                       height={6}
//                     />
//                   </Avatar>
//                 )}
//                 <span className=" bg-accent p-3 rounded-md max-w-xs">
//                   {message?.text}
//                 </span>
//                 {message?.sender != selectedUser?._id && (
//                   <Avatar className="flex justify-center items-center">
//                     <AvatarImage
//                       src={"/user.png"}
//                       alt={message.name}
//                       width={6}
//                       height={6}
//                     />
//                   </Avatar>
//                 )}
//               </div>
//             </motion.div>
//           ))}
//         </AnimatePresence>
//       </div>
//       <ChatBottomBar sendMessage={sendMessage} isMobile={isMobile} />
//     </div>
//   );
// }

// import { cn } from "@/lib/utils";
// import { useEffect, useRef } from "react";
// import { Avatar, AvatarImage } from "../ui/avatar";
// import { AnimatePresence, motion } from "framer-motion";
// import ChatBottomBar from "./ChatBottomBar";
// import { Message, UserData } from "@/interfaces/data";
// import { useParams } from "react-router-dom";
// import { getConversation } from "@/http/auth";
// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import Pusher from "pusher-js";
// import { useSelector } from "react-redux";
// import { RootState } from "@/redux/store";
// import { baseApiUrl } from "@/config/app.config";

// interface ChatListProps {
//   messages?: Message[];
//   selectedUser: UserData;
//   sendMessage: (newMessage: Message) => void;
//   isMobile: boolean;
// }

// export function ChatList({
//   messages,
//   selectedUser,
//   sendMessage,
//   isMobile,
// }: ChatListProps) {
//   const messagesContainerRef = useRef<HTMLDivElement>(null);
//   const { receiver, sender } = useParams();
//   const { user } = useSelector((state: RootState) => state.auth);
//   const queryClient = useQueryClient();

//   useEffect(() => {
//     if (messagesContainerRef.current) {
//       messagesContainerRef.current.scrollTop =
//         messagesContainerRef.current.scrollHeight;
//     }
//   }, [messages]);

//   const { data: conversationData, refetch } = useQuery({
//     queryKey: ["chat-conversation", receiver, sender],
//     queryFn: async () => {
//       if (!sender || !receiver) throw new Error("User ID is required");
//       return getConversation(sender, receiver);
//     },
//     enabled: !!sender && !!receiver,
//   });

//   useEffect(() => {
//     if (user) {
//       refetch();

//       const pusher = new Pusher("b93d4d5049ce1bb75f6d", {
//         cluster: "ap2",
//         authEndpoint: `${baseApiUrl}/chat/login`,
//         auth: {
//           params: {
//             id: user._id,
//           },
//         },
//       });

//       const channel = pusher.subscribe(`private-chat-${user._id}`);
//       channel.bind("message", (data: any) => {
//         console.log("data", data);
//         if (
//           (data.sender === user._id && data.receiver === receiver) ||
//           (data.sender === receiver && data.receiver === user._id)
//         ) {
//           queryClient.setQueryData(
//             ["chat-conversation", receiver, sender],
//             (oldData: any) => {
//               console.log("oldData", oldData.data.data);
//               const isDuplicate = oldData.data.data?.some(
//                 (msg: any) => msg._id === data._id
//               );
//               console.log('isDuplicate' ,isDuplicate)
//               if (!isDuplicate) {
//                 return [...oldData, data];
//               }
//               console.log("oldData", oldData);
//               return oldData;
//             }
//           );
//         }
//       });

//       return () => {
//         channel.unbind_all();
//         channel.unsubscribe();
//       };
//     }
//   }, [user, receiver, queryClient]);

//   return (
//     <div className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col">
//       <div
//         ref={messagesContainerRef}
//         className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col justify-end"
//       >
//         <AnimatePresence>
//           {conversationData?.data?.data?.map((message: any, index: any) => (
//             <motion.div
//               key={index}
//               layout
//               initial={{ opacity: 0, scale: 1, y: 50, x: 0 }}
//               animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
//               exit={{ opacity: 0, scale: 1, y: 1, x: 0 }}
//               transition={{
//                 opacity: { duration: 0.1 },
//                 layout: {
//                   type: "spring",
//                   bounce: 0.3,
//                   duration: messages?.indexOf(message) * 0.05 + 0.2,
//                 },
//               }}
//               style={{
//                 originX: 0.5,
//                 originY: 0.5,
//               }}
//               className={cn(
//                 "flex flex-col gap-2 p-4 whitespace-pre-wrap",
//                 message.sender != selectedUser._id ? "items-end" : "items-start"
//               )}
//             >
//               <div className="flex gap-3 items-start">
//                 {message?.receiver != selectedUser?._id && (
//                   <Avatar className="flex justify-center items-center">
//                     <AvatarImage
//                       src={"/user.png"}
//                       alt={message.name}
//                       width={6}
//                       height={6}
//                     />
//                   </Avatar>
//                 )}
//                 <span className=" bg-accent p-3 rounded-md max-w-xs">
//                   {message?.text}
//                 </span>
//                 {message?.sender != selectedUser?._id && (
//                   <Avatar className="flex justify-center items-center">
//                     <AvatarImage
//                       src={"/user.png"}
//                       alt={message.name}
//                       width={6}
//                       height={6}
//                     />
//                   </Avatar>
//                 )}
//               </div>
//             </motion.div>
//           ))}
//         </AnimatePresence>
//       </div>
//       <ChatBottomBar sendMessage={sendMessage} isMobile={isMobile} />
//     </div>
//   );
// }

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { AnimatePresence, motion } from "framer-motion";
import ChatBottomBar from "./ChatBottomBar";
import { Message, UserData } from "@/interfaces/data";
import { useParams } from "react-router-dom";
import { getConversation, readMessages } from "@/http/auth";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Pusher from "pusher-js";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { baseApiUrl } from "@/config/app.config";
import moment from "moment";
import { Empty } from "antd";

interface ChatListProps {
  selectedUser: UserData;
  sendMessage: (newMessage: Message) => void;
  isMobile: boolean;
}

export function ChatList({
  selectedUser,
  sendMessage,
  isMobile,
}: ChatListProps) {
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const { receiver, sender } = useParams();
  const { user, userChat } = useSelector((state: RootState) => state.auth);
  const queryClient = useQueryClient();
  const [messages, setMessages] = useState<Message[]>([]);

  const handleReadMessages = async () => {
    try {
      let obj = {
        userId: user._id,
        selectedUserId: receiver,
      };
      const temp = await readMessages(obj);
    } catch (error) {
      console.log("error reading messages", error);
    }
  };

  useEffect(() => {
    handleReadMessages();
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const { data: conversationData, refetch } = useQuery({
    queryKey: ["chat-conversation", receiver, sender],
    queryFn: async () => {
      if (!sender || !receiver) throw new Error("User ID is required");
      return getConversation(sender, receiver);
    },
    enabled: !!sender && !!receiver,
  });

  useEffect(() => {
    if (conversationData) {
      setMessages(conversationData.data.data);
    }
  }, [conversationData]);

  useEffect(() => {
    if (user) {
      refetch();

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
      channel.bind("message", (data: any) => {
        console.log("data", data);
        if (
          (data.sender === user._id && data.receiver === receiver) ||
          (data.sender === receiver && data.receiver === user._id)
        ) {
          setMessages((prevMessages) => {
            const isDuplicate = prevMessages.some(
              (msg: any) => msg._id === data._id
            );
            if (!isDuplicate) {
              return [...prevMessages, data];
            }
            return prevMessages;
          });
        }
      });

      return () => {
        channel.unbind_all();
        channel.unsubscribe();
      };
    }
  }, [user, receiver, userChat, queryClient]);

  return (
    <div className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col">
      <div
        ref={messagesContainerRef}
        className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col "
      >
        <AnimatePresence>
          {messages.map((message: any, index: any) => (
            <motion.div
              key={index}
              layout
              initial={{ opacity: 0, scale: 1, y: 50, x: 0 }}
              animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, scale: 1, y: 1, x: 0 }}
              transition={{
                opacity: { duration: 0.1 },
                layout: {
                  type: "spring",
                  bounce: 0.3,
                  duration: index * 0.05 + 0.2,
                },
              }}
              style={{
                originX: 0.5,
                originY: 0.5,
              }}
              className={cn(
                "flex flex-col gap-2 p-4 whitespace-pre-wrap",
                message.sender != selectedUser._id ? "items-end" : "items-start"
              )}
            >
              <div className="flex gap-3 items-start">
                {message?.receiver != selectedUser?._id && (
                  <Avatar className="flex justify-center items-center">
                    <AvatarImage
                      src={"/user.png"}
                      alt={message.name}
                      width={6}
                      height={6}
                    />
                  </Avatar>
                )}
                <div>
                  <div className=" bg-accent flex flex-col gap-1 p-2  rounded-md max-w-xs min-w-32">
                    <span className="text-[12px]">{message?.text}</span>
                    <span className="text-[9px] text-end">
                      {moment(message?.timestamp).format("hh:mm a")}
                    </span>
                  </div>
                  {/* <span className=" bg-accent p-2 text-[10px] rounded-md max-w-xs">
                    {moment(message?.timestamp).fromNow()}
                  </span> */}
                </div>
                {message?.sender != selectedUser?._id && (
                  <Avatar className="flex justify-center items-center">
                    <AvatarImage
                      src={"/user.png"}
                      alt={message.name}
                      width={6}
                      height={6}
                    />
                  </Avatar>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <ChatBottomBar sendMessage={sendMessage} isMobile={isMobile} />
    </div>
  );
}
