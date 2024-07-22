import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  const auth = useSelector((state: RootState) => state.auth);

  if (auth.isLogin) {
    return <Navigate to="/dashbaord" />;
  }
  // return <Outlet />;
  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 xl:min-h-screen">
      <div className="flex items-center justify-center py-12 " >
        <Outlet />
      </div>  
      <div className="hidden col-span-1  border-secondary border-l-[1px]  lg:block">
        <img
          src="https://static.vecteezy.com/system/resources/previews/007/062/700/large_2x/business-team-meeting-present-investor-working-with-new-startup-project-finance-managers-meeting-digital-tablet-laptop-computer-design-smart-phone-using-blurred-background-free-photo.jpg"
          alt="Login Image"
          className="h-full  w-full object-cover  "
        />
        {/* dark:grayscale */}
      </div>
    </div>
  );
};

export default AuthLayout;
