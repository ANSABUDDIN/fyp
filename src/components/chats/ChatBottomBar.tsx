import {
  FileImage,
  Mic,
  Paperclip,
  PlusCircle,
  SendHorizontal,
  ThumbsUp,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Message } from "@/interfaces/data";
import { EmojiPicker } from "./EmojiPicker";
import { Input } from "antd";
import { sendMessageToUser } from "@/http/auth";
import { useDispatch } from "react-redux";
import { setSend, setUserChat } from "@/redux/slice/authSlice";

interface ChatBottombarProps {
  sendMessage: (newMessage: Message) => void;
  isMobile: boolean;
}

export const BottombarIcons = [{ icon: FileImage }, { icon: Paperclip }];

export default function ChatBottomBar({ isMobile }: ChatBottombarProps) {
  const [message, setMessage] = useState("");
  const inputRef = useRef<any>(null);
  const { receiver, sender } = useParams();
  const dispatch = useDispatch();
  // const { user, userChat } = useSelector((state: RootState) => state.auth);
  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };
  const handleThumbsUp = async () => {
    const newMessage: any = {
      sender: sender,
      receiver: receiver,
      text: "👍",
    };
    try {
      const sendMessageToUserTemp = await sendMessageToUser(newMessage);
      setMessage("");
      dispatch(setSend(true));
      console.log("sendMessageToUserTemp", sendMessageToUserTemp);
    } catch (error) {
      console.log("error sending message ", error);
    }
  };

  const handleSend = async () => {
    if (message.trim()) {
      const newMessage: any = {
        sender: sender,
        receiver: receiver,
        text: message.trim(),
      };
      // sendMessage(newMessage);
      try {
        const sendMessageToUserTemp = await sendMessageToUser(newMessage);
        setMessage("");
        dispatch(setSend(true));
        console.log("sendMessageToUserTemp", sendMessageToUserTemp);
      } catch (error) {
        console.log("error sending message ", error);
      }

      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }

    if (event.key === "Enter" && event.shiftKey) {
      event.preventDefault();
      setMessage((prev) => prev + "\n");
    }
  };

  useEffect(() => {
    if (!sender && !receiver) {
      dispatch(setUserChat(null));
    }
  }, []);

  return (
    <div className="p-2 flex justify-between w-full items-center gap-2">
      <div className="flex">
        <Popover>
          <PopoverTrigger asChild>
            <Link
              to="#"
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "h-9 w-9",
                "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
              )}
            >
              <PlusCircle size={20} className="text-muted-foreground" />
            </Link>
          </PopoverTrigger>
          <PopoverContent side="top" className="w-full p-2">
            {message.trim() || isMobile ? (
              <div className="flex gap-2">
                <Link
                  to="#"
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "h-9 w-9",
                    "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                  )}
                >
                  <Mic size={20} className="text-muted-foreground" />
                </Link>
                {BottombarIcons.map((icon, index) => (
                  <Link
                    key={index}
                    to="#"
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "h-9 w-9",
                      "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                    )}
                  >
                    <icon.icon size={20} className="text-muted-foreground" />
                  </Link>
                ))}
              </div>
            ) : (
              <Link
                to="#"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "h-9 w-9",
                  "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                )}
              >
                <Mic size={20} className="text-muted-foreground" />
              </Link>
            )}
          </PopoverContent>
        </Popover>
        {!message.trim() && !isMobile && (
          <div className="flex">
            {BottombarIcons.map((icon, index) => (
              <Link
                key={index}
                to="#"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "h-9 w-9",
                  "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                )}
              >
                <icon.icon size={20} className="text-muted-foreground" />
              </Link>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence initial={false}>
        <motion.div
          key="input"
          className="w-full relative"
          layout
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1 }}
          transition={{
            opacity: { duration: 0.05 },
            layout: {
              type: "spring",
              bounce: 0.15,
            },
          }}
        >
          {/* <Textarea
              autoComplete="off"
              value={message}
              ref={inputRef}
              onKeyDown={handleKeyPress}
              onChange={handleInputChange}
              name="message"
              placeholder="Aa"
              className=" w-full border rounded-full flex items-center h-9 resize-none overflow-hidden bg-background"
              // rows={1}
            ></Textarea> */}

          <Input
            value={message}
            name="message"
            placeholder="Aa"
            onKeyDown={(e: any) => handleKeyPress(e)}
            className=" w-full border rounded-full flex items-center h-9 resize-none overflow-hidden bg-background"
            ref={inputRef}
            onChange={(e: any)=>handleInputChange(e)}
          />
          <div className="absolute right-2 top-[25%]  ">
            <EmojiPicker
              onChange={(value) => {
                setMessage(message + value);
                if (inputRef.current) {
                  inputRef.current.focus();
                }
              }}
            />
          </div>
        </motion.div>

        {message.trim() ? (
          <Link
            to="#"
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "h-9 w-9",
              "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white shrink-0"
            )}
            onClick={handleSend}
          >
            <SendHorizontal size={20} className="text-muted-foreground" />
          </Link>
        ) : (
          <Link
            to="#"
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "h-9 w-9",
              "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white shrink-0"
            )}
            onClick={handleThumbsUp}
          >
            <ThumbsUp size={20} className="text-muted-foreground" />
          </Link>
        )}
      </AnimatePresence>
    </div>
  );
}
