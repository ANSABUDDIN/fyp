import { setUserChat } from "@/redux/slice/authSlice";
import { RootState } from "@/redux/store";
import { Avatar, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface StartupCardProps {
  data: any;
}

export function StartupCard({ data }: StartupCardProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  return (
    <div className="w-full text-center relative  max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-center p-5">
        <Avatar
          size={100}
          src="https://media.istockphoto.com/id/1171169127/photo/headshot-of-cheerful-handsome-man-with-trendy-haircut-and-eyeglasses-isolated-on-gray.jpg?s=612x612&w=0&k=20&c=yqAKmCqnpP_T8M8I5VTKxecri1xutkXH7zfybnwVWPQ="
        />
      </div>
      <span className="bg-blue-100 absolute top-3 right-2 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
        {data?.role == 10 ? "Invester" : "Startup"}
      </span>
      <div className="px-5 pb-5">
        <a href="#">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {data?.username}
          </h5>
          <p className="text-[13px] opacity-[0.8]">Email : {data?.email}</p>
          <div className="flex gap-1 mt-3 flex-col text-start">
            {data?.founderName && (
              <p className="text-[13px] opacity-[0.8]">
                <span className="font-bold"> Founder Name</span> :{" "}
                {data?.founderName}
              </p>
            )}
            {data?.targetCountry && (
              <p className="text-[13px] opacity-[0.8]">
                <span className="font-bold">Target Country </span> :{" "}
                {data?.targetCountry}
              </p>
            )}
            {data?.website && (
              <p className="text-[13px] opacity-[0.8]">
                <span className="font-bold">Website </span> : {data?.website}
              </p>
            )}
            {data?.fundingRaise && (
              <p className="text-[13px] opacity-[0.8]">
                <span className="font-bold">Website </span> :{" "}
                {data?.fundingRaise}
              </p>
            )}
            {data?.investorType && (
              <p className="text-[13px] opacity-[0.8]">
                <span className="font-bold">Investor Type </span> :{" "}
                {data?.investorType}
              </p>
            )}
          </div>
          <Button
            className="w-full mt-3"
            type="primary"
            size="large"
            htmlType="submit"
            onClick={() => {
              // dispatch(
              //   setUserChat({
              //     _id: data?._id,
              //     username: data?.username,
              //     email: data?.email,
              //   })
              // );
              dispatch(
                setUserChat({
                  _id: data?._id,
                  username: data?.username,
                  email: data?.email,
                })
              );
              navigate(`/dashbaord/chat/${user?._id}/${data._id}`);
            }}
          >
            Chat
          </Button>
        </a>
        <div className="flex items-center mt-2.5 mb-5">
          {/* <div className="flex items-center space-x-1 rtl:space-x-reverse">
            <svg
              className="w-4 h-4 text-yellow-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg
              className="w-4 h-4 text-yellow-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg
              className="w-4 h-4 text-yellow-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg
              className="w-4 h-4 text-yellow-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg
              className="w-4 h-4 text-gray-200 dark:text-gray-600"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default StartupCard;
