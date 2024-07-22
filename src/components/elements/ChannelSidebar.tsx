import { socialChannels } from "@/static/Social";
import Icon from "../Icon";
import { Card } from "antd";

const ChannelSidebar = () => {
  return (
    <Card  className="xl:col-span-1 min-h-[calc(100vh-100px)]" x-chunk="dashboard-01-chunk-4">
      <h1 className="font-bold text-[20px]">Channels</h1>
      <div className="mt-6 flex flex-col gap-4">
        {socialChannels.map((ele) => (
          <div className="flex gap-3 cursor-pointer items-center text-[13px] font-semibold   ">
            <div className="border-2 p-2 rounded-full border-dashed border-[black]">
              <Icon name={ele.icon} size={15} />
            </div>
            {ele.name}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ChannelSidebar;
