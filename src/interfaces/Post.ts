import { PostTypes } from "@/enum/enum";

export interface PostInf {
  createdAt: string;
  scheduleMsg: string;
  description: string;
  tag: string[];
  src: string;
  name: string;
  type: PostTypes.POST;
}

export interface PostCardProps {
  data?: PostInf; // Optional events for the calendar
}
