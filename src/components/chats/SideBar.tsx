"use client";

import { Link, useNavigate } from "react-router-dom";
import { MoreHorizontal, SquarePen } from "lucide-react";
import { cn, handleDescription } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Message } from "../../interfaces/data";
import { Badge, Empty } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setUserChat } from "@/redux/slice/authSlice";

interface SidebarProps {
  isCollapsed: boolean;
  onPress: (receiver: string) => void;
  links: {
    name: string;
    messages: Message[];
    avatar: string;
    variant: "grey" | "ghost";
  }[];
  onClick?: () => void;
  isMobile: boolean;
}

export function Sidebar({
  links,
  isCollapsed,
}: SidebarProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div
      data-collapsed={isCollapsed}
      className="relative group flex flex-col h-full gap-4 p-2 data-[collapsed=true]:p-2 "
    >
      {!isCollapsed && (
        <div className="flex justify-between p-2 items-center border-b">
          <div className="flex gap-2 items-center text-2xl">
            <p className="text-[18px] font-bold">Chats</p>
            <span className="text-primary text-[14px] font-bold">
              ({links?.length})
            </span>
          </div>
          <div>
            <Link
              to="#"
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "h-9 w-9"
              )}
            >
              <MoreHorizontal size={20} />
            </Link>

            <Link
              to="#"
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "h-9 w-9"
              )}
            >
              <SquarePen size={20} />
            </Link>
          </div>
        </div>
      )}
      <nav className="grid gap-1 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {links?.map((link: any, index) =>
          isCollapsed ? (
            <TooltipProvider key={index}>
              <Tooltip key={index} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    to="#"
                    onClick={() => {
                      dispatch(
                        setUserChat({
                          _id: link?.userId,
                          username: link?.username,
                          email: link?.email,
                        })
                      );
                      navigate(`/dashbaord/chat/${link?.userId}/${user._id}`);
                    }}
                   
                  >
                    <Avatar className="flex justify-center items-center">
                      <AvatarImage
                        src={"/user.png"}
                        // alt={link.avatar}
                        width={6}
                        height={6}
                        className="w-10 h-10 "
                      />
                    </Avatar>{" "}
                    <span className="sr-only">{link?.username}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="flex items-center gap-4"
                >
                  {link?.username}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <div
              key={index}
              onClick={() => {
                
                dispatch(
                  setUserChat({
                    _id: link?.userId,
                    username: link?.username,
                    email: link?.email,
                  })
                );
                navigate(`/dashbaord/chat/${link?.userId}/${user._id}`);
              }}
              className="flex items-center gap-2 border-b  pb-2 px-4"
            
            >
              <Avatar className="flex justify-center items-center">
                <AvatarImage
                  src={"/user.png"}
                  alt={link?.username}
                  width={10}
                  height={10}
                  className="w-10 h-10 "
                />
              </Avatar>
              <div className="flex flex-col w-full">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-[15px]">
                    {link?.username}
                  </span>
                  <span className="font-normal text-[12px]">
                    {moment(link?.lastTime).format("hh:mm")}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-normal text-[12px] opacity-[0.6]">
                    {handleDescription(link?.last, 40)}
                  </span>
                  {link?.unreadCount > 0 && (
                    <Badge dot={false} count={link?.unreadCount} color="blue" />
                  )}
                </div>
                {/* {link.messages.length > 0 && (
                  <span className="text-zinc-300 text-xs truncate ">
                    {link.messages[link.messages.length - 1].name.split(" ")[0]}
                    : {link.messages[link.messages.length - 1].message}
                  </span>
                )} */}
              </div>
            </div>
          )
        )}
        {links?.length == 0 && <Empty description="No Chats Found" />}
      </nav>
    </div>
  );
}
