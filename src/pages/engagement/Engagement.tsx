import Icon from "@/components/Icon";
import { Card } from "@/components/ui/card";
import { Avatar } from "antd";

const Engagement = () => {
  return (
    <div className="grid grid-cols-6 gap-3">
      <Card className="py-6 px-3 col-span-2">
        <div className="flex gap-2 items-start ">
          <div className="relative">
            <Avatar
              size={40}
              className="border-2 border-[blue] p-[1px]"
              src="https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg"
            />
            <span className="bg-[blue] absolute bottom-[-3px] right-0  h-[20px] w-[20px] flex  justify-center items-center rounded-full">
              <Icon name={"Facebook"} color="white" size={13} />
            </span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-sm font-semibold">Lorem ipsum .</h1>
            <h1 className="text-[11px] font-normal">Lorem ipsum .</h1>
          </div>
        </div>
        <hr className="my-4" />
      </Card>
    </div>
  );
};

export default Engagement;
