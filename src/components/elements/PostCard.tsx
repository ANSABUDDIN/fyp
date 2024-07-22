import { Badge, Image } from "antd";
import Icon from "@/components/Icon";
import { PostCardProps } from "@/interfaces/Post";
import { PostTypes, TagColorTypes } from "@/enum/enum";

const PostCard: React.FC<PostCardProps> = (props) => {
  const { data } = props;
  const color =
    data?.type == PostTypes.POST
      ? TagColorTypes.BLUE
      : data?.type == PostTypes.REELS
      ? TagColorTypes.GREEN
      : TagColorTypes.RED;
  return (
    <Badge.Ribbon text={data?.type} color={color}>
      <div className="border p-3 flex  rounded-md">
        <div className="flex gap-3 flex-col items-start">
          <div className="grid grid-cols-5 w-full">
            <div className="col-span-4 flex gap-3 items-start">
              <div className="border-2  p-2 rounded-full border-dashed border-[blue]">
                <Icon name={"Facebook"} color="blue" size={15} />
              </div>
              <div>
                <p className="font-semibold">{data?.name}</p>
                <p className="text-[11px] font-medium">{data?.createdAt}</p>
              </div>
            </div>
          </div>
          <div className="gap-3 grid grid-cols-3">
            <Image
              width={100}
              height={100}
              className="rounded-md"
              src={data?.src}
            />
            <div className="col-span-2">
              <div className="text-sm text-primary flex gap-1">
                {data?.tag.map((ele) => (
                  <div>#{ele}</div>
                ))}
              </div>
              <p className="text-sm">{data?.description}</p>
            </div>
          </div>
          <div className="grid grid-cols-5 w-full">
            <p className="text-[10px] text-primary font-medium col-span-4">{data?.scheduleMsg}</p>
            <div className=" flex justify-end">
              <Icon name={"EllipsisVertical"} color="blue" size={20} />
            </div>
          </div>
        </div>
      </div>
    </Badge.Ribbon>
  );
};

export default PostCard;
