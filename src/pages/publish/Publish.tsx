import React, { useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Button, Card, Drawer } from "antd";
import Icon from "@/components/Icon";
import { socialChannels } from "@/static/Social";
import PostCard from "@/components/elements/PostCard";
import { PostData } from "@/static/Post";
import { PostInf } from "@/interfaces/Post";
import { useNavigate } from "react-router-dom";
import ChannelSidebar from "@/components/elements/ChannelSidebar";

interface CalendarProps {
  events?: CalendarEvent[]; // Optional events for the calendar
}

interface CalendarEvent {
  title: string;
  date: string | Date; // Allow both string and Date types for flexibility
}

const Publish: React.FC<CalendarProps> = () => {
  const calendarRef = useRef<FullCalendar>(null);
  const navigate = useNavigate();
  const events = [
    {
      title: "Event 1",
      start: "2024-06-01T09:00:00",
      end: "2024-06-01T10:00:00",
    },
    {
      title: "Event 2",
      start: "2024-06-07T10:30:00",
      end: "2024-06-07T12:30:00",
    },
    {
      title: "Event 3",
      start: "2024-06-09T12:00:00",
      end: "2024-06-09T13:00:00",
    },
    {
      title: "Event 4",
      start: "2024-06-11T14:00:00",
      end: "2024-06-11T15:00:00",
    },
    {
      title: "Event 5",
      start: "2024-06-30T16:00:00",
      end: "2024-06-30T1:00:00",
    },
  ];
  return (
    <div className="grid grid-cols-6 gap-3">
      <ChannelSidebar />
      <Card className="xl:col-span-2 " x-chunk="dashboard-01-chunk-4">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-[20px]">Post</h1>
          <Button
            type="primary"
            onClick={() => {
              navigate("create-post");
            }}
          >
            Create Post
          </Button>
        </div>
        <div className="mt-4 pe-5 flex flex-col gap-3 max-h-[calc(100vh-190px)] overflow-scroll">
          {PostData?.map((ele: any) => (
            <PostCard data={ele} />
          ))}
        </div>
      </Card>
      <Card className="xl:col-span-3" x-chunk="dashboard-01-chunk-4">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin]}
          ref={calendarRef}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            // left: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          events={events}
        />
      </Card>
      <Drawer />
    </div>
  );
};

export default Publish;
