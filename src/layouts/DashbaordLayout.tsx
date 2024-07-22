
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { DashboardTwo } from "@/pages/dashbaord/DashbaordTwo";

const DashbaordLayout = () => {
  const auth = useSelector((state: RootState) => state.auth);
  console.log("auth.isLogin", auth.isLogin);

  // const layout = cookies().get("react-resizable-panels:layout")
  // const collapsed = cookies().get("react-resizable-panels:collapsed")

  // const defaultLayout = layout ? JSON.parse(layout.value) : undefined
  // const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined
  // if (!auth.isLogin) {
  //   return <Navigate to="/auth/login" />;
  // }

  return (
    <>
      {/* <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <Header />
        <main className="flex flex-1 flex-col gap-4 px-7 py-3">
          <Outlet />
        </main>
      </div> */}
      <DashboardTwo />
     
      {/* <DashboardThree
        accounts={accounts}
        mails={mails}
        defaultLayout={defaultLayout}
        defaultCollapsed={defaultCollapsed}
        navCollapsedSize={4}
      /> */}
    </>
  );
};

export default DashbaordLayout;
