import Icon from "@/components/Icon";
import { TagColorTypes } from "@/enum/enum";
import { facebookPostType } from "@/static/Social";
import {
  Avatar,
  Badge,
  Button,
  Card,
  GetProp,
  Input,
  message,
  Radio,
  RadioChangeEvent,
  Tabs,
  Upload,
  UploadProps,
} from "antd";
import { useState } from "react";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
const { TextArea } = Input;

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const CreatePost = () => {
  const [value1, setValue1] = useState("Post");
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const onChange1 = ({ target: { value } }: RadioChangeEvent) => {
    console.log("radio1 checked", value);
    setValue1(value);
  };

  const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };
  const getBase64 = (img: FileType, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  const handleChange: UploadProps["onChange"] = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as FileType, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );
  return (
    <div className="grid grid-cols-6 gap-3">
      <Card
        className="xl:col-span-4 min-h-[calc(100vh-100px)] relative"
        x-chunk="dashboard-01-chunk-4"
      >
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-[20px] mb-0">Create Post</h1>

          <div className="flex gap-2 items-center">
            <div className="relative">
              <Avatar
                size={40}
                className="border-2 border-[blue] p-[1px]"
                src="https://lh3.googleusercontent.com/a/ACg8ocI9WtpsQQVn0oz3N3QN4xpITQ7Ru8vvZ6mMOdDChpmqF_VIWnN8Rw=s96-c-rg-br100"
              />
              <span className="bg-primary absolute bottom-[-3px] right-0  h-[20px] w-[20px] flex  justify-center items-center rounded-full">
                <Icon name={"Facebook"} color="white" size={13} />
              </span>
            </div>
            <div className="relative">
              <Avatar
                size={40}
                className="border-2 border-[red] p-[1px]"
                src="https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg"
              />
              <span className="bg-[red] absolute bottom-[-3px] right-0  h-[20px] w-[20px] flex  justify-center items-center rounded-full">
                <Icon name={"Youtube"} color="white" size={13} />
              </span>
            </div>
          </div>
        </div>
        <Radio.Group
          options={facebookPostType}
          onChange={onChange1}
          value={value1}
        />
        <div className="my-4">
          <TextArea
            rows={5}
            placeholder="Start Writing Or Use The Ai Assistant"
          />
        </div>
        <div>
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {imageUrl ? (
              <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
            ) : (
              uploadButton
            )}
          </Upload>
        </div>
        <div className="flex gap-2 justify-end mt-3 absolute bottom-3 right-3 ">
          <Button type="default" size="large">Save as Draft</Button>
          <Button type="primary" size="large">Share Now</Button>
          {/* <Button type="primary" >Share Next</Button>
          <Button type="primary" >Schedule Post</Button>
          <Button type="primary" >Add To Queue</Button> */}
        </div>
        {/* <Tabs
          defaultActiveKey="1"
          // centered
          items={facebookPostType.map((ele, i) => {
            const id = String(i + 1);
            return {
              label: ele,
              key: id,
              children: `Content of Tab Pane ${id}`,
            };
          })}
        /> */}
      </Card>
      <Card
        className="xl:col-span-2 min-h-[calc(100vh-100px)]"
        x-chunk="dashboard-01-chunk-4"
      >
        <h1 className="font-bold text-[20px] aitext flex gap-2 items-center">
          <svg
            viewBox="0 0 16 16"
            // title=""
            className="ai"
          >
            <title></title>
            <g>
              <path d="M7.125 3.625l.438-.875.875-.437-.875-.438L7.125 1l-.437.875-.875.438.875.437.437.875zm-3.937 1.75l.729-1.458 1.458-.73-1.458-.729L3.187 1 2.46 2.458 1 3.188l1.459.729.729 1.458zm9.625 3.5l-.73 1.458-1.458.73 1.459.729.729 1.458.729-1.458 1.458-.73-1.458-.729-.73-1.458zm1.93-5.298l-2.32-2.32a.87.87 0 00-1.237 0l-9.93 9.93a.875.875 0 000 1.237l2.32 2.32a.872.872 0 001.238 0l9.93-9.93a.874.874 0 000-1.237zM10.83 6.563L9.437 5.171l2.368-2.368 1.392 1.392-2.368 2.368z"></path>
            </g>
          </svg>
          AI Assistant
        </h1>
        <div>
          <p className="font-semibold my-3">What do you want to write about?</p>
          <TextArea
            rows={8}
            placeholder="Eg. Promote my photography course to get new signups. Registration closes in 3 days."
          />
          <div className="text-[13px] font-semibold gap-2 mt-3">
            <span className="font-semibold text-primary">Pro tip:</span>
            <p className="text-[10px]">
              Include key points, your target audience and your desired outcome
              for this post
            </p>
          </div>
          <div className="flex justify-end my-4">
            <Button
              type="dashed"
              size="large"
              className="flex font-semibold text-[#ba6bff] hover:text-[#ba6bff]"
              icon={
                <>
                  <svg
                    viewBox="0 0 16 16"
                    // title=""
                    className="ai"
                  >
                    <title></title>
                    <g>
                      <path d="M7.125 3.625l.438-.875.875-.437-.875-.438L7.125 1l-.437.875-.875.438.875.437.437.875zm-3.937 1.75l.729-1.458 1.458-.73-1.458-.729L3.187 1 2.46 2.458 1 3.188l1.459.729.729 1.458zm9.625 3.5l-.73 1.458-1.458.73 1.459.729.729 1.458.729-1.458 1.458-.73-1.458-.729-.73-1.458zm1.93-5.298l-2.32-2.32a.87.87 0 00-1.237 0l-9.93 9.93a.875.875 0 000 1.237l2.32 2.32a.872.872 0 001.238 0l9.93-9.93a.874.874 0 000-1.237zM10.83 6.563L9.437 5.171l2.368-2.368 1.392 1.392-2.368 2.368z"></path>
                    </g>
                  </svg>
                </>
              }
            >
              Generate
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CreatePost;
