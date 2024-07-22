import { PostTypes } from "@/enum/enum";

export const PostData = [
  {
    name: "Ultra Verse",
    createdAt: "You Created this : today at 6:31 PM",
    scheduleMsg: "Post scheduled for July 2nd at 9:30 PM (GMT+5).",
    description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit .",
    tag: ["nature", "mountains"],
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWASU17mqsM8uLNVPQe5CH9z45B7qjDYQfhQ&s",
    type: PostTypes.REELS,
  },
  {
    name: "Ultra Verse",
    createdAt: "You Created this : today at 9:31 PM",
    scheduleMsg: "Post scheduled for July 4th at 10:30 PM (GMT+5).",
    description: "Eid Mubarak",
    tag: ["eid", "2k25"],
    type: PostTypes.STORY,
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1IpmDG3M8PilCylKcHjAAccokrZwfP_rrQw&s",
  },
  {
    name: "Ultra Verse",
    createdAt: "You Created this : today at 10:31 PM",
    scheduleMsg: "Post scheduled for July 4th at 10:30 PM (GMT+5).",
    description: "We Are hiring Mern Stack Developer and Digital Engineer and Ui Ux Designger",
    tag: ["react", "hiring" , "job"],
    type: PostTypes.POST,
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQafQTrRpwPLxvjXpu4CokahZl-sSkGx91Etw&s",
  },
];


